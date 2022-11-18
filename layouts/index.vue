<template>
  <div>
    <div class="header">
      <div class="header-wrap">
        <div class="header-logo"><a href="#"></a></div>
        <button type="button" class="menu-btn" :class="{active:isMenuActive}" @click="onMenuActive"><i class="fa-solid fa-bars"></i></button>
        <button type="button" class="close-btn" @click="onMenuActive">&times;</button>
        <div class="dim"></div>
        <ul class="header-menu">
          <li class="header-menu--item"><a href="#">프로젝트 Koo</a></li>
          <li class="header-menu--item"><a href="#">공유</a></li>
          <li class="header-menu--item"><a href="#">이용방법</a></li>
          <li class="header-menu--item"><a href="#">금액</a></li>
          <li class="header-menu--item"><a href="#">로그인</a></li>
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
      this.isMenuActive = !this.isMenuActive;
    },
  },
}
</script>

<style></style>
