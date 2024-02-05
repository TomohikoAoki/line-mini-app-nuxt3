<template>
  <div id="app">
    <Loading></Loading>
    <NuxtPage />
  </div>
</template>

<script setup>

const router = useRouter()

useState('loading', () => false)


onMounted(() => {
  const { $liffInit, $liff } = useNuxtApp()

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
