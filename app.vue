<template>
  <div id="app">
    <Loading></Loading>
    <NuxtPage />
    <footer class="footer">
      <p class="copy-right">Copyright © 2023 占いハートフル All Rights Reserved.</p>
      <p class="footer-name">心占株式会社</p>
      <p class="footer-address">〒112-0001 東京都文京区白山2-30-2 平林ビル1F</p>
      <p class="footer-tel">03-3868-0349</p>
    </footer>
  </div>
</template>

<script setup>

useState('loading', () => false)

</script>

<style lang="scss" scoped>
$baseColor : #c3c1c5;

#app {
  position: relative;

  .footer {
    color: $baseColor;
    padding: 1em 0;
    background-color: rgb(23, 13, 36);

    .copy-right {
      font-size: 0.75em;
      text-align: center;
    }

    .footer-name {
      text-align: center;
      color: $baseColor;
      padding: 0.4em;
      font-size: 0.9em;

    }

    .footer-address {
      text-align: center;
      color: $baseColor;
      font-size: 0.80em;
    }

    .footer-tel {
      text-align: center;
      color: $baseColor;
      font-size: 0.80em;
      padding-top: 0.2em;
    }
  }
}
</style>
