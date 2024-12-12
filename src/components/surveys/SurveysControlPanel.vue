<template>
  <div class="SurveysControlPanel">
    <div class="left">
      <span class="title">Мои опросы:</span>
      <button class="addSurvey" @click="openModal">+ Добавить опрос</button>
    </div>
    <div class="right">
    </div>
  </div>
</template>

<script setup>
import CreateSurveyModal from "../modals/Surveys/CreateSurveyModal.vue";
import { markRaw } from "vue";

const emits = defineEmits(["update:modalValue"]);

const openModal = () => {
  emits("update:modalValue", {
    modalValue: true,
    component: markRaw(CreateSurveyModal),
  });
};
</script>

<style scoped>
.SurveysControlPanel {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 4rem;
}

.left {
  display: flex;
  flex-direction: column;
  gap: 1.7rem;
  height: 100%;
  width: 40%;
  align-items: flex-start;
}

.right {
  display: flex;
  flex-direction: column;
  gap: 1.7rem;
  height: 100%;
  width: 50%;
  align-items: flex-end;
}

.title {
  line-height: 1.3rem;
  font-size: 1.6rem;
  font-weight: bold;
}

.addSurvey {
  background: none;
  border: none;
  color: #7b7b81;
  cursor: pointer;
  font-weight: normal;
  padding: 0;
  font-size: 0.7rem;
  text-align: left;
  transition: color 0.3s;
}

.addSurvey:hover {
  color: #ffffff;
}

.filters {
  display: flex;
  height: 1rem;
  gap: 2rem;
}
</style>
