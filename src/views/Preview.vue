<template>
  <ContentLayout style="height: 100vh; padding: 0">
    <div class="preview">
      <img id="previewLogo" src="../assets/media/preview/previewLogo.svg" alt="Preview logo">
      <div id="previewText">
        <span>Проведи <span class="bold">Опрос</span> за пару кликов</span>
        <span id="links">
          <RouterLink to="/auth?type=login"> войти</RouterLink> / <RouterLink to="/auth?type=register">зарегистрироваться </RouterLink>
        </span>
      </div>
      <img class="animate-spin-slow" src="../assets/media/preview/previewCircle.svg" alt="Circle">
    </div>
  </ContentLayout>
</template>

<script setup>
import ContentLayout from "../layouts/ContentLayout.vue";
</script>

<style scoped>

@media (max-width: 768px) {
  #app {
    padding: 0;
  }
  .animate-spin-slow{
    z-index: -11111;
  }
}

@media (max-width: 480px) {
  #app {
    padding: 0;
  }
  .animate-spin-slow{
    z-index: -11111;
  }
}

.preview {
  height: 100%;
  user-select: none;
  width: 100%;
  margin: 0 auto;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  justify-content: flex-start;
}

#previewText{
  padding-bottom: 13rem;
  font-size: 3.3rem;
  height: 100%;
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

#links{
  margin-top: 2rem;
  font-size: 1rem;
  padding: 0;
}

#links a{
  opacity: 0.6;
  color: #00A87F;
  transition: 0.5s;
}

#links a:hover{
  opacity: 1;
}

@keyframes spin {
  from {
    transform: translateY(50%) rotate(0deg);
  }

  to {
    transform: translateY(50%) rotate(360deg);
  }
}

.animate-spin-slow{
  animation: spin 90s linear infinite;
  opacity: 0.3;
  position: absolute;
  bottom: 0;
  transform: translateY(50%) rotate(0deg);
  transition: opacity 3s;
}

.animate-spin-slow:hover {
  opacity: 1;
}

#previewLogo {
  height: 3rem;
}


</style>