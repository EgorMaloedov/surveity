<template>
  <div class="survey-container">
    <!-- Пока данные не загружены -->
    <p v-if="!survey">Загрузка опроса...</p>

    <!-- Данные загружены -->
    <div v-else>
      <h1>{{ survey?.title || "Опрос" }}</h1>
      <p>{{ survey?.description || "Описание отсутствует." }}</p>

      <!-- Если срок действия токена истек -->
      <p v-if="isTokenExpired" class="expired-message">Срок действия ссылки истек</p>

      <!-- Если токен валиден и есть inputs -->
      <form v-else-if="survey.inputs && survey.inputs.length" @submit.prevent="startSurvey">
        <div v-for="(input, index) in survey.inputs" :key="index" class="form-group">
          <label :for="'input-' + index">{{ input.label }}</label>

          <!-- Поля ввода в зависимости от типа -->
          <input
              v-if="input.type === 'text'"
              :id="'input-' + index"
              type="text"
              v-model="formValues[input.name]"
              class="form-control"
          />

          <textarea
              v-else-if="input.type === 'textarea'"
              :id="'input-' + index"
              v-model="formValues[input.name]"
              class="form-control"
          ></textarea>

          <select
              v-else-if="input.type === 'select'"
              :id="'input-' + index"
              v-model="formValues[input.name]"
              class="form-control"
          >
            <option v-for="(option, i) in input.options" :key="i" :value="option">
              {{ option }}
            </option>
          </select>

          <input
              v-else-if="input.type === 'date'"
              :id="'input-' + index"
              type="date"
              v-model="formValues[input.name]"
              class="form-control"
          />

          <!-- Обработка других типов -->
          <p v-else>Тип {{ input.type }} пока не поддерживается.</p>
        </div>

        <button type="submit" class="start-button">Начать опрос</button>
      </form>

      <!-- Если inputs отсутствует -->
      <p v-else>В этом опросе нет полей для заполнения.</p>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { apiFetchSurvey } from "../api/surveys/compliteSurvey.js";

const route = useRoute();
const router = useRouter();
const token = route.query.token;
const survey = ref(null);

const isTokenExpired = ref(false);
const tokenPayload = ref(null);
const formValues = ref({}); // Для хранения значений формы

// Функция для декодирования JWT токена
const decodeToken = (token) => {
  if (!token) return null;

  try {
    const payload = token.split(".")[1];
    const decodedPayload = JSON.parse(atob(payload)); // Декодируем из Base64
    return decodedPayload;
  } catch (e) {
    return null;
  }
};

// Проверка срока действия токена
const checkTokenExpiration = (payload) => {
  if (!payload.exp) return true;

  const expirationTimeUTC = new Date(payload.exp * 1000);
  const now = new Date();
  return expirationTimeUTC.getTime() < now.getTime();
};

// Логика при монтировании компонента
onMounted(async () => {
  const payload = decodeToken(token);
  console.log(payload)
  if (payload) {
    tokenPayload.value = payload;
    isTokenExpired.value = checkTokenExpiration(payload);

    try {
      const response = await apiFetchSurvey(token);
      survey.value = response.survey;

      // Инициализация значений формы
      if (survey.value.inputs) {
        survey.value.inputs.forEach((input) => {
          formValues.value[input.name] = ""; // Устанавливаем начальные значения
        });
      }
    } catch (error) {
      console.error("Ошибка загрузки опроса:", error);
    }
  } else {
    isTokenExpired.value = true;
  }
});

// Функция отправки данных опроса
const startSurvey = () => {
  console.log("Данные формы отправлены:", formValues.value);
  alert("Опрос начат. Проверьте консоль для отправленных данных.");
};
</script>

<style scoped>
.survey-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

h1 {
  text-align: center;
  color: #333;
}

.expired-message {
  color: red;
  text-align: center;
}

.no-inputs-message {
  text-align: center;
  color: gray;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

.form-control {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.start-button {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}

.start-button:hover {
  background-color: #45a049;
}
</style>
