<template>
  <div
      class="survey-item"
      :class="{ active: openStatus }"
      @mouseover="hovered = true"
      @mouseleave="hovered = false"
  >
    <div class="item-content">
      <div id="surveyTitle" :style="{ '--statusColor': statusColor }">
        <img src="../../../assets/media/surveyListItem/surveyTitle.svg" alt="Survey Icon" />
        <span>{{ survey.title }}</span>
        <SurveyStatus :status="survey.status" />
      </div>
      <img
          class="menuArrow"
          @click="toggleMenu"
          :class="{ rotated: openStatus }"
          src="../../../assets/media/surveyListItem/surveyItemArrow.svg"
          alt="Survey arrow"
      />
    </div>
    <transition
        name="smooth-height"
        @before-enter="beforeEnter"
        @enter="enter"
        @leave="leave"
    >
      <div v-if="openStatus" class="item-menu">
        <div class="menu-content">
          <div class="left">
            <span @click="linkSurvey">
              <img src="../../../assets/media/surveyListItem/linnk.svg" alt="Survey Icon" />
              <span>Поделиться опросом</span>
            </span>
            <span @click="changeSurvey">
              <img src="../../../assets/media/surveyListItem/changeSurveyIcon.svg" alt="Survey Icon" />
              <span>Редактировать опрос</span>
            </span>
            <span @click="removeSurvey">
              <img src="../../../assets/media/surveyListItem/removeSurveyIcon.svg" alt="Survey Icon" />
              <span>Удалить опрос</span>
            </span>
          </div>
          <div class="right">
            <span>
              <span>Перейти к анализу</span>
              <img src="../../../assets/media/surveyListItem/surveyDashboardIcon.svg" alt="Survey Icon" />
            </span>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { computed, ref, markRaw } from 'vue';
import {useSurveyStore} from "../../../stores/surveys/surveysStore.js";
import RemoveSurveyModal from "../../modals/Surveys/RemoveSurveyModal.vue";
import ChangeSurveyModal from "../../modals/Surveys/ChangeSurveyModal.vue";
import {useAuthStore} from "../../../stores/auth/authStore.js";
import SurveyStatus from "./SurveyStatus.vue";
import LinkSurveyModal from "../../modals/Surveys/LinkSurveyModal.vue";

// Define props
const props = defineProps({
  survey: Object,
});

// Access store
const surveyStore = useSurveyStore();

// Emit modal updates
const emit = defineEmits(['update:modalValue']);

// Reactive properties
const openStatus = ref(false);
const hovered = ref(false);

// Toggle the menu
const toggleMenu = () => {
  openStatus.value = !openStatus.value;
};

// Open the change survey modal
const changeSurvey = async () => {
  const authStore = useAuthStore()
  await surveyStore.setCurrentSurvey(props.survey, authStore.accessToken);
  emit('update:modalValue', {
    modalValue: true,
    component: markRaw(ChangeSurveyModal),
  });
};

// Open the remove survey modal
const removeSurvey = () => {
  surveyStore.setCurrentSurvey(props.survey);
  emit('update:modalValue', {
    modalValue: true,
    component: markRaw(RemoveSurveyModal),
  });
};

// Open the remove survey modal
const linkSurvey = () => {
  surveyStore.setCurrentSurvey(props.survey);
  emit('update:modalValue', {
    modalValue: true,
    component: markRaw(LinkSurveyModal),
  });
};

// Before enter transition
const beforeEnter = (el) => {
  el.style.height = '0';
  el.style.opacity = '0';
};

// Enter transition
const enter = (el) => {
  el.style.height = el.scrollHeight + 'px';
  el.style.opacity = '1';
  el.style.transition = 'height 0.4s ease, opacity 0.4s ease';
};

// Leave transition
const leave = (el) => {
  el.style.height = '0';
  el.style.opacity = '0';
  el.style.transition = 'height 0.4s ease, opacity 0.4s ease';
};

// Compute the status color
const statusColor = computed(() => {
  switch (props.survey.status) {
    case 'completed':
      return '#fff';
    case 'pending':
      return '#000';
    case 'waiting':
      return '#123';
    default:
      return '#fff'; // Default color
  }
});
</script>

<style scoped>
.survey-item {
  width: 100%;
  background: #272732;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  border-radius: 0.3rem;
  transition: opacity 0.3s ease;
  opacity: 0.5; /* By default, semi-transparent */
}

.survey-item:hover,
.survey-item.active {
  opacity: 1; /* Fully visible when open or hovered */
}

.item-content {
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
}

#surveyTitle {
  display: flex;
  align-items: center;
  gap: 1rem;
}

#surveyTitle img {
  height: 2.8rem;
}

/* Arrow icon */
.menuArrow {
  cursor: pointer;
  transition: transform 0.3s ease, opacity 0.3s ease;
  transform: rotate(180deg);
  opacity: 0.8; /* Slightly transparent by default */
}

.menuArrow:hover {
  opacity: 1; /* Fully visible when hovered */
}

.menuArrow.rotated {
  transform: rotate(0); /* Arrow rotated when open */
}

.item-menu {
  background-color: #21212b;
  overflow: hidden; /* Important for height animation */
}

.left,
.right {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2rem;
}

.menu-content {
  color: #828288;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  box-sizing: border-box;
  font-size: 0.6rem;
}

.menu-content span {
  cursor: pointer;
  gap: 0.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  transition: 0.2s ease;
}

.menu-content span:hover {
  color: #fff;
}

.menu-content img {
  height: 0.8rem;
}
</style>
