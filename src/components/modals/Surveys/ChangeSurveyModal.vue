<template>
  <div class="createSurveyWrapper">
    <span id="title">Новый опрос</span>
    <div class="createSurveySteps">
      <!-- Название опроса -->
      <ListItem title="Введите название опроса:">
        <input
            id="textInput"
            type="text"
            placeholder="Название опроса"
            v-model="survey.title"
        />
      </ListItem>

      <!-- Дата начала и окончания опроса -->
      <ListItem title="Выберите даты:">
        <div class="date-picker-row">
          <VueDatePicker
              v-model="survey.startDate"
              :min-date="new Date()"
              label="Дата начала"
          />
          <VueDatePicker
              v-model="survey.endDate"
              :min-date="calculateMinEndDate(survey.startDate)"
              label="Дата окончания"
          />
        </div>
      </ListItem>

      <draggable v-model="survey.questions" :itemKey="survey.id" class="draggable-list" @end="updateQuestionsOrder">
        <template #item="{ element, index }">
          <div class="draggable-item">
            <Question
                :key="element.id"
                :count="index + 1"
                :question="element"
                @updateQuestion="updateQuestion(index, $event)"
                @deleteQuestion="deleteQuestion(index)"
            />
          </div>
        </template>
      </draggable>

      <!-- Кнопка добавления вопроса -->
      <button class="addQuestionBtn" @click="handleAddQuestion">
        + Добавить вопрос
      </button>
    </div>

    <!-- Кнопка сохранения -->
    <button @click="handleUpdateSurvey" class="createSurveyBtn">
      Сохранить опрос
    </button>
  </div>
</template>

<script setup>
import {ref, watch} from "vue";
import ListItem from "../Surveys/ModalSurveyList/ListItem.vue";
import {v6} from "uuid";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import Question from "./ModalSurveyList/Question.vue";
import {useSurveyStore} from "../../../stores/surveys/surveysStore";
import {useAuthStore} from "../../../stores/auth/authStore.js";
import draggable from 'vuedraggable'

const surveyStore = useSurveyStore();
const emit = defineEmits(["update:modalValue"]);

const emptySurvey = {
  id: v6(),
  owner: "testOwner",
  title: "",
  startDate: new Date(),
  endDate: new Date(new Date().getTime() + 30 * 60 * 1000),
  status: "waiting",
  questions: [],
};

const emptyQuestion = {
  id: v6(),
  name: "",
  type: "empty",
  text: "",
  answers: [],
  order: 0, // Добавлено поле order
};

const survey = ref(JSON.parse(JSON.stringify(surveyStore.currentSurvey)));
const isDragging = ref(false);

const calculateMinEndDate = (startDate) => {
  return new Date(new Date(startDate).getTime() + 30 * 60 * 1000);
};

const updateQuestionsOrder = () => {
  survey.value.questions.forEach((question, index) => {
    question.order = index + 1;
  });
};

const handleAddQuestion = () => {
  survey.value.questions.push({...emptyQuestion, id: v6()});
  updateQuestionsOrder(); // Обновляем порядок после добавления нового вопроса
};

const updateQuestion = (index, {question}) => {
  survey.value.questions[index] = {...question};
};

const deleteQuestion = (index) => {
  survey.value.questions.splice(index, 1);
  updateQuestionsOrder(); // Обновляем порядок после удаления вопроса
};

const handleUpdateSurvey = async () => {
  if (!validateSurvey()) return;
  try {
    survey.value.startDate = new Date(survey.value.startDate).toISOString();
    survey.value.endDate = new Date(survey.value.endDate).toISOString();
    const authStore = useAuthStore()
    await surveyStore.updateSurvey(survey.value, authStore.accessToken);
    emit("update:modalValue", {modalValue: false});
  } catch (error) {
    console.error("Ошибка при создании опроса:", error);
    alert("Не удалось сохранить опрос. Попробуйте снова.");
  }
};

const validateSurvey = () => {
  if (!survey.value.title.trim()) {
    alert("Название опроса не может быть пустым.");
    return false;
  }
  if (survey.value.startDate >= survey.value.endDate) {
    alert("Дата окончания должна быть позже даты начала.");
    return false;
  }
  if (survey.value.questions.length === 0) {
    alert("Добавьте хотя бы один вопрос.");
    return false;
  }
  return true;
};

const handleCreateSurvey = () => {
  if (!validateSurvey()) return;
  try {
    const authStore = useAuthStore();
    const token = authStore.accessToken;
    surveyStore.createSurvey({...survey.value}, token);
    emit("update:modalValue", {modalValue: false});
  } catch (error) {
    console.error("Ошибка при создании опроса:", error);
    alert("Не удалось сохранить опрос. Попробуйте снова.");
  }
};

watch(
    () => survey.value.startDate,
    (newStartDate) => {
      if (survey.value.endDate <= newStartDate) {
        survey.value.endDate = calculateMinEndDate(newStartDate);
        alert("Дата окончания была обновлена.");
      }
    }
);

const onStart = () => {
  isDragging.value = true;
};

const onEnd = () => {
  isDragging.value = false;
};
</script>

<style scoped>
.createSurveyWrapper {
  width: 35vw;
  max-height: 60vh;
  overflow-y: scroll;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: flex-end;
  border-radius: 0.5rem;
  background-color: #21212B;
}

.createSurveyWrapper::-webkit-scrollbar-track {
  background: none;
}

.createSurveyWrapper::-webkit-scrollbar-thumb {
  background: none;
  border-radius: 0;
}

.createSurveyWrapper::-webkit-scrollbar {
  width: 0;
}

.createSurveyWrapper::-webkit-scrollbar-track {
  background: none;
}

.createSurveyWrapper {
  scrollbar-width: none;
  scrollbar-width: rgba(0, 0, 0, 0);
}

.inputRadio {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  width: 0.7rem;
  height: 0.7rem;
  border-radius: 0.25rem;
  background-color: grey;
  cursor: pointer;
  position: relative;
}

.inputRadio:checked {
  background-color: #00C78D;
}

.radioItem {
  font-size: 0.5rem;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  gap: 0.5rem;
  justify-content: flex-start;
}

.radioItem label {
  cursor: pointer;
  color: grey;
}

.inputRadio:checked + label {
  color: white;
}

#title {
  text-align: left;
  font-size: 1.5rem;
  font-weight: bold;
  width: 100%;
}

#textInput {
  width: 100%;
  padding: 0.2rem 0;
  background: none;
  outline: none;
  border: none;
  font-size: 0.8rem;
}

.createSurveySteps {
  margin-top: 2rem;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.createSurveyBtn {
  margin-top: 3rem;
  cursor: pointer;
  width: 30%;
  background: none;
  border: none;
  font-size: 0.9rem;
  color: #828288;
  text-align: right;
  transition: color 0.2s ease;
}

.createSurveyBtn:hover {
  color: #fff;
}

.addQuestionBtn {
  cursor: pointer;
  background: none;
  border: none;
  font-size: 0.7rem;
  color: #828288;
  text-align: left;
  transition: color 0.2s ease;
}

.addQuestionBtn:hover {
  color: #fff;
}

.date-picker-row {
  display: flex;
  gap: 1rem;
}

.date-picker-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-size: 0.2rem;
}

.date-picker-item label {
  font-size: 0.8rem;
  color: grey;
}

.date-picker-item input {
  padding: 0.2rem;
  font-size: 0.8rem;
}

.draggable-list {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.draggable-item {
  padding: 0.6rem;
  margin-bottom: 0.6rem;
  background-color: #21212B;
  border-radius: 0.5rem;
  cursor: grab;
  transition: background-color 0.2s ease, transform 0.2s ease;

}

.draggable-item:hover {
  transform: translateY(-4px);
  color: white;
}

.draggable-item .delete-btn {
  background: none;
  border: none;
  position: absolute;
  top: 0;
  color: #fff;
  font-size: 0.8rem;
  cursor: pointer;
  transition: color 0.2s ease;
}

.draggable-item .delete-btn:hover {
  color: #ff5b5b;
}
</style>
