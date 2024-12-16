<template>
  <div class="surveys-list">
    <SurveysListItem
        @update:modalValue="updateModalValue"
        v-for="survey in surveysArray"
        :key="survey.id"
        :survey="survey"
    />
  </div>
</template>

<script setup>
import { computed } from "vue";
import {useSurveyStore} from "../../../stores/surveys/surveysStore.js";
import SurveysListItem from "./SurveysListItem.vue";

const surveysStore = useSurveyStore();
const surveysArray = computed(() => surveysStore.surveys.values());

const emits = defineEmits(["update:modalValue"]);

const updateModalValue = (args) => {
  emits("update:modalValue", {
    modalValue: args.modalValue,
    component: args.component,
  });
};
</script>

<style scoped>
.surveys-list {
  gap: 2rem;
  display: flex;
  flex-direction: column;
}
</style>
