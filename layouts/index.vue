<template>
  <div>
    <div class="header">
      <div class="header-wrap">
        <div class="left">
          <div class="header-logo">
            <nuxt-link to="/"
              >PROJECT KOO<span class="maker">. MAKER</span></nuxt-link
            >
          </div>
          <ul class="header-menu">
            <li class="header-menu--item">
              <nuxt-link to="/">프로젝트 Koo</nuxt-link>
            </li>
            <li class="header-menu--item">
              <nuxt-link to="info-page">소개</nuxt-link>
            </li>
            <li class="header-menu--item">
              <nuxt-link to="">이용방법</nuxt-link>
            </li>
            <li class="header-menu--item"><nuxt-link to="">금액</nuxt-link></li>
          </ul>
        </div>
        <!-- <button type="button" class="menu-btn" :class="{active:isMenuActive}" @click="onMenuActive"><i class="fa-solid fa-bars"></i></button>
        <button type="button" class="close-btn" @click="onMenuActive">&times;</button>
        <div class="dim"></div> -->
        <div class="right">
          <nuxt-link to="/sign-in" class="btn btn-login">로그인</nuxt-link>
          <nuxt-link to="" class="btn btn-primary">회원가입</nuxt-link>
        </div>
      </div>
    </div>
    <div class="wrap">
      <Nuxt />
    </div>
    <div class="footer">
      <div class="footer-wrap">
        <div class="left">
          <div class="name">하나피아</div>
          <div class="info">
            <span>02-1234-5678</span>
            <span>projectkoo@projectkoo.com</span>
          </div>
          <div class="info">
            <span>서울시 중구 한강대로 416, 서울스퀘어 14층 [04637]</span>
          </div>
          <div class="info">
            <span>189-87-00172</span>
            <span>제2019-서울영등포-0298호</span>
          </div>
          <div class="copy">
            Copyright (c) 2023 TEAM Project Koo Allrights reseved.
          </div>
        </div>
        <div class="right">
          <button type="button" class="btn sns-1"></button>
          <button type="button" class="btn sns-2"></button>
          <button type="button" class="btn sns-3"></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexLayout',
  data() {
    return {
      isMenuActive: false,
    }
  },
  methods: {
    onMenuActive() {
      this.isMenuActive = !this.isMenuActive
    },
  },
}
</script>

<style></style>
