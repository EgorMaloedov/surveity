<template>
  <div v-if="isOpen" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <button class="modal-close" @click="closeModal">×</button>
      <slot @update:modalValue="updateModalValue"></slot>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  modalValue: Boolean
});

const emits = defineEmits(['update:modalValue']);
const isOpen = ref(props.modalValue);

watch(() => props.modalValue, (newValue) => {
  isOpen.value = newValue;
});

const closeModal = () => {
  isOpen.value = false;
  emits('update:modalValue', false);
};

const updateModalValue = (args) => {
  isOpen.value = args.modalValue;
  emits('update:modalValue', {
    modalValue: args.modalValue,
    component: args.component
  });
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: none;
  border-radius: 8px;
  position: relative;
}

.modal-close {
  color: #828288;
  position: absolute;
  top: 0.9rem;
  right: 0.9rem;
  background: none;
  border: none;
  font-size: 1.3rem;
  cursor: pointer;
  transition: color 0.2s ease;
}

.modal-close:hover {
  color: white;
}
</style>
