<template>
  <div class="status-indicator">
    <div class="status-circle" :style="{ background: statusGradient }"></div>
    <span class="status-text" :style="{ color: statusColor }">{{ statusText }}</span>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  status: String,
});

const statusText = computed(() => {
  switch (props.status) {
    case 'completed':
      return 'Завершён';
    case 'pending':
      return 'В ожидании';
    case 'waiting':
      return 'Ожидает';
    default:
      return 'Неизвестно';
  }
});

const statusColor = computed(() => {
  switch (props.status) {
    case 'completed':
      return '#4caf50'; // Зеленый
    case 'pending':
      return '#ff9800'; // Оранжевый
    case 'waiting':
      return '#f44336'; // Красный
    default:
      return '#9e9e9e'; // Серый
  }
});

const statusGradient = computed(() => {
  switch (props.status) {
    case 'completed':
      return 'linear-gradient(135deg, #4caf50, #66bb6a)';
    case 'pending':
      return 'linear-gradient(135deg, #ff9800, #ffc107)';
    case 'waiting':
      return 'linear-gradient(135deg, #f44336, #e57373)';
    default:
      return 'linear-gradient(135deg, #9e9e9e, #bdbdbd)';
  }
});
</script>

<style scoped>
.status-indicator {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s ease-in-out;
}

.status-circle {
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 50%;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.status-circle:hover {
  transform: scale(1.2);
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.25);
}

.status-text {
  transition: color 0.3s ease;
}
</style>
