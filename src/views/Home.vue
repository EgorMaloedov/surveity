<template>
  <PageLayout>
    <SurveysControlPanel @update:modalValue="onUpdatedModalValueEmit" />
    <SurveyStoreLoader>
      <EmptySurveysList
          @update:modalValue="onUpdatedModalValueEmit"
          v-if="isSurveysEmpty"
      />
      <SurveysList
          @update:modalValue="onUpdatedModalValueEmit"
          v-else
      />
    </SurveyStoreLoader>
  </PageLayout>
  <ModalView @update:modalValue="onUpdatedModalValueEmit" :modalValue="isModalOpened">
    <component
        @update:modalValue="onUpdatedModalValueEmit"
        :is="modalComponent"
    />
  </ModalView>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import {useAuthStore} from "../stores/auth/authStore.js";
import {useSurveyStore} from "../stores/surveys/surveysStore.js";
import SurveyStoreLoader from "../components/SurveyStoreLoader.vue";
import SurveysControlPanel from "../components/surveys/SurveysControlPanel.vue";
import ModalView from "../components/modals/ModalView.vue";
import PageLayout from "../layouts/PageLayout.vue";
import EmptySurveysList from "../components/surveys/surveysList/EmptySurveysList.vue";
import SurveysList from "../components/surveys/surveysList/SurveysList.vue";

const surveyStore = useSurveyStore();
const authStore = useAuthStore();
const surveys = computed(() => surveyStore.surveys);
const isSurveysEmpty = computed(() => surveys.value.length === 0);

onMounted(() => {
  surveyStore.fetchUserSurveys(authStore.accessToken);
});

const isModalOpened = ref(false);
const modalComponent = ref(null);

const onUpdatedModalValueEmit = (args) => {
  isModalOpened.value = args.modalValue;
  modalComponent.value = args.component;
  if (!args.modalValue) {
    surveyStore.setCurrentSurvey(null);
  }
};
</script>
