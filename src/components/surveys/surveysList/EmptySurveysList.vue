<template>
  <div class="emptySurveysWrapper">
    Давайте <span @click="openCreateSurveyModal" id="createSurvey">добавим</span> <br> новый опрос!
  </div>
</template>

<script setup>
import {markRaw} from "vue";
import CreateSurveyModal from "../../modals/Surveys/CreateSurveyModal.vue";

const emit = defineEmits(['update:modalValue'])

const openCreateSurveyModal = () => {
  emit('update:modalValue', {
    modalValue: true,
    component: markRaw(CreateSurveyModal)
  })
}
</script>

<style scoped>
#createSurvey{
  color: #01AB80;
  opacity: 0.4;
  cursor: pointer;
  transition: opacity 0.2s ease;
}

#createSurvey:hover{
  opacity: 1;
}

.emptySurveysWrapper{
  color: #fff;
  font-size: 2.2rem;
  font-weight: bold;
}

</style>