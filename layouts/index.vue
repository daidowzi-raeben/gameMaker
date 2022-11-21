<template>
  <div>
    <div class="header">
      <div class="header-wrap">
        <div class="header-logo"><a href="#"></a></div>
        <button type="button" class="menu-btn" :class="{active:isMenuActive}" @click="onMenuActive"><i class="fa-solid fa-bars"></i></button>
        <button type="button" class="close-btn" @click="onMenuActive">&times;</button>
        <div class="dim"></div>
        <ul class="header-menu">
          <li class="header-menu--item"><nuxt-link to="">프로젝트 Koo</nuxt-link></li>
          <li class="header-menu--item"><nuxt-link to="">공유</nuxt-link></li>
          <li class="header-menu--item"><nuxt-link to="">이용방법</nuxt-link></li>
          <li class="header-menu--item"><nuxt-link to="">금액</nuxt-link></li>
          <li class="header-menu--item"><nuxt-link to="">로그인</nuxt-link></li>
        </ul>
      </div>
    </div>
    <div class="wrap">
      <Nuxt />
    </div>
    <div class="footer">
      <div class="footer-wrap">ⓒ project Koo</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexLayout',
  data(){
    return{
      isMenuActive: false,
    };
  },
  methods: {
    onMenuActive() {
      this.isMenuActive = !this.isMenuActive
    },
  },
}
</script>

<style></style>
