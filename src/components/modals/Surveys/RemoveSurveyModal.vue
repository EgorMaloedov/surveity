<template>
  <div class="removeSurveyModal">
    <h1>Вы уверены?</h1>
    <span class="agreeButtons">
      <button @click="handleRemoveSurvey" class="agreementBtn access">Да</button>
      <button @click="handleCloseModal" class="agreementBtn deny">Нет</button>
    </span>
  </div>
</template>

<script setup>
import {computed} from "vue";
import { useSurveyStore } from "../../../stores/surveys/surveysStore.js";
import {useAuthStore} from "../../../stores/auth/authStore.js";

const surveyStore = useSurveyStore();
const authStore = useAuthStore();
const emit = defineEmits(['update:modalValue']);

const survey = computed(() => surveyStore.currentSurvey);

const handleRemoveSurvey = async () => {
  if (survey.value) {
    try {
      console.log(survey.value);
      await surveyStore.removeSurvey(survey.value.id, authStore.accessToken);
    } catch (error) {
      console.error("Failed to remove survey:", error);
    }
  }
  emit("update:modalValue", { modalValue: false });
};

const handleCloseModal = () => {
  emit("update:modalValue", { modalValue: false });
};
</script>

<style scoped>
.removeSurveyModal {
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

.access:hover {
  font-weight: bold;
  color: #51ff66;
}

.deny:hover {
  font-weight: bold;
  color: #ff5151;
}
</style>
