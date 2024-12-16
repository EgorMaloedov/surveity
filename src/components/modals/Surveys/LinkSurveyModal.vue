<template>
  <div class="linkSurveyModal">
    <h1>Поделиться опросом</h1>

    <div v-if="validLinks">
      <div v-if="surveyLinks.telegramLink">
        <a :href="surveyLinks.telegramLink" target="_blank">
          <button class="surveyButton">Перейти к Telegram-боту</button>
        </a>
      </div>
      <div v-if="surveyLinks.webLink">
        <a :href="surveyLinks.webLink" target="_blank">
          <button class="surveyButton">Перейти к опросу</button>
        </a>
      </div>
    </div>

    <div v-else>
      <p>Ссылки недоступны или токены устарели. Нажмите на кнопки ниже, чтобы сгенерировать новые.</p>
      <div class="actionButtons">
        <button @click="generateTelegramLink" class="surveyButton">Сгенерировать ссылку для Telegram</button>
        <button @click="generateWebLink" class="surveyButton">Сгенерировать ссылку для Web</button>
      </div>
    </div>

    <span class="agreeButtons">
      <button @click="handleCloseModal" class="agreementBtn deny">Закрыть</button>
    </span>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useSurveyStore } from "../../../stores/surveys/surveysStore.js";
import { useAuthStore } from "../../../stores/auth/authStore.js";
import axios from 'axios'; // Используем axios для отправки запроса на сервер

const surveyStore = useSurveyStore();
const authStore = useAuthStore();
const emit = defineEmits(['update:modalValue']);

const survey = computed(() => surveyStore.currentSurvey);
const tokenExpiryHours = ref(1); // Срок жизни токена в часах (можно настроить)
const validLinks = ref(false);
const surveyLinks = ref({
  telegramLink: '',
  webLink: ''
});

// Проверка на наличие ссылок и их срок действия
const checkLinksValidity = () => {
  const surveyData = survey.value;
  if (surveyData) {
    const now = Date.now();
    const telegramToken = surveyData.telegramToken;
    const webToken = surveyData.webToken;

    // Проверка на срок действия токенов
    if (telegramToken && (now < new Date(telegramToken.expiry).getTime())) {
      surveyLinks.value.telegramLink = generateLink(telegramToken);
    } else {
      surveyLinks.value.telegramLink = '';
    }

    if (webToken && (now < new Date(webToken.expiry).getTime())) {
      surveyLinks.value.webLink = generateLink(webToken);
    } else {
      surveyLinks.value.webLink = '';
    }

    validLinks.value = !!(surveyLinks.value.telegramLink || surveyLinks.value.webLink);
  }
};

// Генерация ссылки на основе токена
const generateLink = (token) => {
  const baseUrl = token.isTelegram ? 'https://t.me/' : 'https://yourwebapp.com/survey/';
  return `${baseUrl}${token.id}?token=${token.value}`;
};

// Генерация ссылки для Telegram по кнопке
const generateTelegramLink = async () => {
  const surveyData = survey.value;
  if (surveyData) {
    try {
      console.log(`Отправка запроса на сервер для генерации ссылки для Telegram...`);

      const response = await axios.post('/api/generate-link', {
        surveyId: surveyData.id,
        type: 'telegram',
        expiryHours: tokenExpiryHours.value
      });

      console.log('Ссылка для Telegram:', response.data.link);
      surveyLinks.value.telegramLink = response.data.link;
      validLinks.value = true; // Обновляем флаг доступности ссылок
    } catch (error) {
      console.error('Ошибка при генерации ссылки для Telegram:', error);
    }
  }
};

// Генерация ссылки для Web по кнопке
const generateWebLink = async () => {
  const surveyData = survey.value;
  if (surveyData) {
    try {
      console.log(`Отправка запроса на сервер для генерации ссылки для Web...`);

      const response = await axios.post('/api/generate-link', {
        surveyId: surveyData.id,
        type: 'web',
        expiryHours: tokenExpiryHours.value
      });

      console.log('Ссылка для Web:', response.data.link);
      surveyLinks.value.webLink = response.data.link;
      validLinks.value = true; // Обновляем флаг доступности ссылок
    } catch (error) {
      console.error('Ошибка при генерации ссылки для Web:', error);
    }
  }
};

const handleCloseModal = () => {
  emit("update:modalValue", { modalValue: false });
};

// Вызов проверки при изменении данных опроса
checkLinksValidity();
</script>

<style scoped>
.linkSurveyModal {
  box-shadow: 0 0 1px 1px rgba(255, 194, 105, 0.53);
  width: 20vw;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  border-radius: 0.5rem;
  background-color: #21212B;
}

.surveyButton {
  margin-top: 1rem;
  cursor: pointer;
  padding: 1rem 2rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 1.2rem;
  transition: background-color 0.2s ease;
}

.surveyButton:hover {
  background-color: #45a049;
}

.actionButtons {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.agreeButtons {
  display: flex;
  flex-direction: row;
  gap: 2rem;
}

.agreementBtn {
  margin-top: 2rem;
  cursor: pointer;
  width: 30%;
  background: none;
  border: none;
  font-size: 1.2rem;
  color: #828288;
  text-align: right;
  transition: color 0.2s ease;
}

.deny\:hover {
  font-weight: bold;
  color: #ff5151;
}
</style>
