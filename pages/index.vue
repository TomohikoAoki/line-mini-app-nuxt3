<template>
    <div>
        <p>{{ sdkVersion }}</p>
        <p>{{ token }}</p>
        <p>{{ profileData }}</p>
    </div>
</template>

<script setup>
const sdkVersion = ref('')
const token = ref('')
const profileData = ref('')


onMounted(() => {
    const { $liffInit, $liff } = useNuxtApp()

    console.log($liffInit, 'テスト１')
    console.log($liff, 'テスト2')


    $liffInit
        .then(async () => {
            sdkVersion.value = $liff.getVersion();

            token.value = await $liff.getIDToken();
            profileData.value = await $liff.getDecodedIDToken()

            // //storeにLINEのtokenとprofileを保存
            // this.$store.dispatch('setToken', token)
            // this.$store.dispatch('setProfile', profileData)

            // this.$router.push('/top')
        })
        .catch((error) => {
            console.error(error);
            // this.showButton = true;
        });

})
</script>