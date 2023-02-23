<template>
  <div>
    <!-- <div class="commingSoon">
      <img src="~/static/images/soon.png" />
    </div> -->
    <div v-if="false">
      <Nuxt />
    </div>
    <div class="header">
      <div class="header-wrap">
        <button
          type="button"
          class="menu-btn"
          :class="{ active: isMenuActive }"
          @click="onMenuActive"
        ></button>
        <button type="button" class="close-btn" @click="onMenuActive">
          &times;
        </button>
        <div class="dim"></div>
        <div class="left">
          <div class="header-logo">
            <nuxt-link to="/"
              >MAKER KOO</nuxt-link
            >
          </div>
          <ul class="header-menu">
            <li class="header-menu--item">
              <nuxt-link to="/">메이커 쿠</nuxt-link>
            </li>
            <li class="header-menu--item">
              <nuxt-link to="info-page">소개</nuxt-link>
            </li>
            <li class="header-menu--item">
              <nuxt-link to="/store">스토어</nuxt-link>
            </li>
            <li class="header-menu--item">
              <nuxt-link to="">이용방법</nuxt-link>
            </li>
            <li class="header-menu--item"><nuxt-link to="">금액</nuxt-link></li>
          </ul>
        </div>
        <div v-if="!isLogin" class="right">
          <nuxt-link to="/sign-in" class="btn btn-login">로그인</nuxt-link>
          <nuxt-link to="/join" class="btn btn-primary">회원가입</nuxt-link>
        </div>
        <div v-if="isLogin" class="right">
          <a href="#_self" class="btn btn-login" @click.prevent="onClickLogout"
            >로그아웃</a
          >
          <nuxt-link to="/project-manager" class="btn btn-primary"
            >프로젝트</nuxt-link
          >
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
// MUTATIONS_LOGIN
import { mapState } from 'vuex'
import { kooLogin } from '~/config/util'
export default {
  name: 'IndexLayout',
  data() {
    return {
      isMenuActive: false,
      isLogin: '',
    }
  },
  computed: {
    ...mapState(['LOGIN']),
  },
  watch: {
    LOGIN: {
      handler(value) {
        console.log(value.result)
        if (value.result === 'TRUE') {
          this.isLogin = value.login
        }
      },
    },
  },
  mounted() {
    this.isLogin = kooLogin('user_idx')
  },
  methods: {
    onMenuActive() {
      this.isMenuActive = !this.isMenuActive
    },
    onClickLogout() {
      this.$cookies.set('user_name', '', 0)
      this.$cookies.set('user_idx', '', 0)
      this.isLogin = ''
      this.$router.push('/sign-in')
    },
  },
}
</script>

<style lang="scss">
.commingSoon {
  position: fixed;
  top: 0;
  left: 0;
  background: #66c7bb;
  width: 100%;
  height: 100%;
  text-align: center;
  > img {
    width: 475px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    max-width: 90%;
  }
}
</style>
