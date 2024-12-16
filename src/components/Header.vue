<template>
  <header>
    <div class="left">
      <img id="logo-left" src="../assets/media/surveyListItem/logo.svg" alt="Surveity logo">
      <nav class="headerNavigation">
        <RouterLink v-for="link in routerLinks" :key="link.path" :to="link.path">
          {{ link.name }}
        </RouterLink>
      </nav>
    </div>
    <div class="right">
      <img id="logo-right" src="../assets/media/header/account.svg" alt="Surveity logo">
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

const routerLinks = ref([
  {name: "Мои опросы", path: "/"},
  {name: "Дашборд", path: "/dashboard"},
]);

</script>

<style scoped>
header {
  height: 2.5rem;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 3rem;
}

a {
  font-size: 0.7rem;
}

.headerNavigation {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 3rem;
}

.left, .right {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 3rem;
  height: 100%;
  justify-content: center;
}

.right {
  height: 50%;
}

#logo-left, #logo-right {
  height: 100%;
}
</style>
