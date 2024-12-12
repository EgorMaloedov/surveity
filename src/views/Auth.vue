<template>
  <ContentLayout>
    <div class="auth">
      <img id="previewLogo" src="../assets/media/preview/previewLogo.svg" alt="Preview logo">
      <div class="form">
        <Login v-if="actionType==='login'" />
        <Register v-if="actionType==='register'" />
        <RouterLink :to="actionType === 'login' ? '/auth?type=register' : '/auth?type=login'" >
          {{actionType === 'login' ? 'Зарегистрироваться' : 'Войти'}}
        </RouterLink>
      </div>

    </div>
  </ContentLayout>
</template>

<script setup>
import ContentLayout from "../layouts/ContentLayout.vue";
import { useRoute } from "vue-router";
import { computed } from "vue";
import Login from "../components/auth/Login.vue";
import Register from "../components/auth/Register.vue";

const route = useRoute();

const actionType = computed(() => route.query.type);
</script>

<style scoped>
.auth {
  user-select: none;
  margin: 0 auto;
  display: flex;
  gap: 5rem;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  justify-content: flex-start;
  height: 100%;
}

.form {
  height: 100%;
  width: 100%;
  padding-bottom: 10rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}


</style>
