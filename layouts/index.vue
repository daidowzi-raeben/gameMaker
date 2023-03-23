<template>
  <div
    v-loading="LOADING"
    :element-loading-text="loadingText()"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
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
            <nuxt-link to="/">MAKER KOO</nuxt-link>
          </div>
          <ul class="header-menu">
            <li class="header-menu--item">
              <nuxt-link to="/">메이커 쿠</nuxt-link>
            </li>
            <li class="header-menu--item">
              <nuxt-link to="/info-page">소개</nuxt-link>
            </li>
            <li class="header-menu--item">
              <nuxt-link to="/store">스토어</nuxt-link>
            </li>
            <li class="header-menu--item" onclick="alert('준비중입니다')">
              이용방법
            </li>
            <li class="header-menu--item" onclick="alert('준비중입니다')">
              금액
            </li>
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
          <nuxt-link to="/mypage/cart-detail" class="btn btn-login"
            >장바구니</nuxt-link
          >
          <nuxt-link to="/project-manager" class="btn btn-primary"
            >내 프로젝트</nuxt-link
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
          <!-- <div class="name">하나피아</div>
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
          </div> -->
          <div class="copy">
            Copyright (c) 2023 TEAM Project Koo Allrights reseved.
          </div>
        </div>
        <div class="right">
          <a
            href="http://project-koo.tistory.com"
            target="_blank"
            class="btn sns-1"
          ></a>
          <a
            href="https://twitter.com/2023_koo"
            target="_blank"
            class="btn sns-2"
          ></a>
          <a
            href="https://instagram.com/project_koo"
            target="_blank"
            class="btn sns-3"
          ></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// MUTATIONS_LOGIN
import { mapState, mapMutations } from 'vuex'
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
    ...mapState(['LOGIN', 'LOADING']),
  },
  watch: {
    LOGIN: {
      handler(value) {
        console.log(value.result)
        this.MUTATIONS_LOADING(false)
        if (value.result === 'TRUE') {
          this.isLogin = value.login
        }
      },
    },
  },
  mounted() {
    this.MUTATIONS_LOADING(false)
    this.isLogin = kooLogin('user_idx')
    // setTimeout(() => {
    //   this.MUTATIONS_LOADING(false)
    //   console.log('layout')
    // }, 2000)
  },
  methods: {
    ...mapMutations(['MUTATIONS_LOADING']),
    onMenuActive() {
      this.isMenuActive = !this.isMenuActive
    },
    onClickLogout() {
      this.$cookies.set('user_name', '', 0)
      this.$cookies.set('user_idx', '', 0)
      this.isLogin = ''
      this.$router.push('/sign-in')
    },
    loadingText() {
      let text = []
      if (this.activeMenu === 6) {
        text = ['노력하는 중', '노력하는 중', '노력하는 중', '노력하는 중']
      } else {
        text = [
          '시나리오 펼치는중',
          '챕터 펼치는중',
          '컷을 불러오는 중',
          '노력하는 중',
        ]
      }
      return text[Math.floor(Math.random() * 4)] + '...'
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
