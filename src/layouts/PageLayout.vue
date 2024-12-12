<template>
  <ContentLayout>
    <Header/>
    <slot/>
  </ContentLayout>
</template>

<script setup>
  import ContentLayout from "./ContentLayout.vue";
  import Header from "../components/Header.vue";
</script>