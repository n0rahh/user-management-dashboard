<template>
  <div class="loader-circle" />
</template>

<style scoped lang="scss">
.loader-circle {
  border: 2px solid $border;
  border-top: 2px solid $primary;
  border-radius: 50%;
  width: 1rem;
  height: 1rem;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
