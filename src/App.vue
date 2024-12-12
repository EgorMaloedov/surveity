<template>
  <RouterView/>
</template>

<script setup>
  import {onMounted} from "vue";

  onMounted(() => {
    console.log(import.meta.env.API_URL);
  })

</script>