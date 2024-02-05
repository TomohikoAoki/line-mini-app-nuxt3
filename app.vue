<template>
  <div id="app">
    <NuxtPage />
  </div>
</template>

<script setup>

const router = useRouter()


onMounted(() => {
  const { $liffInit, $liff } = useNuxtApp()

  $liffInit
    .then(async () => {
      const sdkVersion = await $liff.getVersion();

      const token = await $liff.getIDToken();
      const profileData = await $liff.getDecodedIDToken()

      useState('lineToken', () => token)
      useState('userProfile', () => profileData)

      router.push('/top')
    })
    .catch((error) => {
      console.error(error);
      // this.showButton = true;
    });

})

</script>
