<template>
  <form @submit.prevent="handleSubmit">
    <input
        v-model="email"
        placeholder="Почта"
        class="input-field"
        :class="{ 'input-error': errors.email }"
    />
    <span v-if="errors.email" class="error-message">{{ errors.email }}</span>

    <input
        v-model="password"
        type="password"
        placeholder="Пароль"
        class="input-field"
        :class="{ 'input-error': errors.password }"
    />
    <span v-if="errors.password" class="error-message">{{ errors.password }}</span>

    <button type="submit" class="submit-button" :disabled="loading">
      <span v-if="loading" class="loader"></span>
      <span v-else>Войти</span>
    </button>

    <span v-if="serverError" class="error-message server-error">{{ serverError }}</span>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import {useAuthStore} from "../../stores/auth/authStore.js";
import router from "../../router.js";

const authStore = useAuthStore();

const email = ref('');
const password = ref('');
const errors = ref({});
const serverError = ref('');
const loading = ref(false);

const validate = () => {
  errors.value = {};

  if (!email.value) {
    errors.value.email = 'Введите почту.';
  } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email.value)) {
    errors.value.email = 'Некорректный формат почты.';
  }

  if (!password.value) {
    errors.value.password = 'Введите пароль.';
  } else if (password.value.length < 6) {
    errors.value.password = 'Пароль должен быть не менее 6 символов.';
  }

  return Object.keys(errors.value).length === 0;
};

const handleSubmit = async () => {
  serverError.value = '';
  if (!validate()) return;

  loading.value = true;
  try {
    await authStore.login(email.value, password.value);
    await router.push('/');
  } catch (error) {
    serverError.value = error.message;
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
  padding: 2rem;
  margin: 0 auto;
  border-radius: 0.5rem;
}

.input-field {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border-radius: 4px;
  border: none;
  box-sizing: border-box;
  outline: none;
  background: #272732;
  color: white;
}

.input-error {
  border-color: #e63946;
}

.error-message {
  font-size: 12px;
  color: #e63946;
  margin-top: -5px;
  margin-bottom: 10px;
  text-align: left;
  width: 100%;
}

.server-error {
  margin-top: 10px;
}

.submit-button {
  width: 100%;
  padding: 10px;
  color: white;
  border: none;
  border-radius: 4px;
  background: #1db954;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s, transform 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-top: 2rem;
}

.submit-button:disabled {
  background: #2c2c34;
  cursor: not-allowed;
}

.loader {
  width: 20px;
  height: 20px;
  border: 2px solid transparent;
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
