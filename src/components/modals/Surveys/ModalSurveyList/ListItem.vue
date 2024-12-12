<template>
  <div class="listItem">
    <span class="title">
      {{ title }}
    </span>
    <div class="itemContent">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.listItem {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.title {
  color: #828288;
  font-size: 0.6rem;
  margin-bottom: 0.5rem;
}

.itemContent {
  border-radius: 0.2rem;
  box-sizing: border-box;
  width: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
  background-color: #272732;
}
</style>
