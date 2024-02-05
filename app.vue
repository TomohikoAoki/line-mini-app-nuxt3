<template>
  <div id="app">
    <Loading></Loading>
    <NuxtPage />
  </div>
</template>

<script setup>

const router = useRouter()

const loading = useState('loading', () => false)


onMounted(() => {
  const { $liffInit, $liff } = useNuxtApp()

  loading.value = true

  $liffInit
    .then(async () => {
      const sdkVersion = await $liff.getVersion();

      const token = await $liff.getIDToken();
      const profileData = await $liff.getDecodedIDToken()

      useState('lineToken', () => token)
      useState('userProfile', () => profileData)

      loading.value = false

      router.push('/top')
    })
    .catch((error) => {
      console.error(error);
      loading.value = false
      // this.showButton = true;
    });

})

</script>

<style lang="scss" scoped>
#app {
  position: relative;
}
</style>
