<template>
  <div v-if="isLoading" class="loader-background">
    <div class="loader">
      <img src="~assets/images/spinner_dark.svg">
    </div>
  </div>
</template>

<script setup lang="ts">
const { isLoading } = useLoading()
</script>

<style scoped>
.loader-background {
  z-index: 3001;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: fixed;
  height: 100%;
  top: 0;
  left: 0;
  margin: 0;
  background-color: rgba(56, 50, 61, 0.8);
}

.loader {
  color: #ffffff;
  font-size: 20px;
  margin: 100px auto;
  width: 1em;
  height: 1em;
  border-radius: 50%;
  position: relative;
  -webkit-animation: load4 1.3s infinite linear;
  animation: load4 1.3s infinite linear;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);

  img {
    width: 100%;
    height: auto;
  }
}
</style>
