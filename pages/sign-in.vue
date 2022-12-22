<template>
  <div>
    <div class="header type2">
      <div class="header-wrap">
        <div class="header-logo"><a href="#"></a></div>
        <button type="button" class="menu-btn">
          <i class="fa-solid fa-bars"></i>
        </button>
        <button type="button" class="close-btn">&times;</button>
        <div class="dim"></div>
        <ul class="header-menu">
          <li class="header-menu--item">
            <nuxt-link to="">프로젝트 Koo</nuxt-link>
          </li>
          <li class="header-menu--item"><nuxt-link to="">공유</nuxt-link></li>
          <li class="header-menu--item">
            <nuxt-link to="">이용방법</nuxt-link>
          </li>
          <li class="header-menu--item"><nuxt-link to="">금액</nuxt-link></li>
          <li class="header-menu--item"><nuxt-link to="">로그인</nuxt-link></li>
        </ul>
      </div>
    </div>
    <div class="login">
      <div class="login-wrap">
        <form @submit.prevent="onSubmit">
          <div class="login-input id">
            <input
              v-model="login.id"
              class="input"
              type="text"
              placeholder="아이디를 입력하세요"
              required
            />
          </div>
          <div class="login-input pass">
            <input
              v-model="login.pw"
              class="input"
              type="password"
              placeholder="비밀번호를 입력하세요"
              required
            />
          </div>
          <div class="login-option">
            <label class="input-check">
              <input type="checkbox" />
              <span class="checkbox check"></span>
              <span class="text">아이디 기억하기</span>
            </label>
            <nuxt-link to="" class="join">회원가입</nuxt-link>
          </div>
          <button class="login-button" @click.prevent="onSubmit">로그인</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'
import { kooLogin } from '~/config/util'
export default {
  data() {
    return {
      login: {
        id: '',
        pw: '',
      },
      stateLogin: [],
    }
  },
  computed: {
    ...mapState(['LOGIN', 'LOADING']),
  },
  watch: {
    LOGIN: {
      handler(value) {
        console.log(value)
        console.log('SUCCESS')
        // 로그인 성공 시 페이지 이동
        if (value.user_idx) {
          // this.$router.push('/project-manager')
        }
      },
      immediate: true,
    },
  },
  mounted() {
    this.stateLogin = [
      ...this.stateLogin,
      {
        user_idx: kooLogin('user_idx'),
        user_name: kooLogin('user_name'),
      },
    ]
    if (kooLogin('user_idx') && kooLogin('user_name'))
      this.MUTATIONS_LOGIN_CHECK(this.stateLogin)
  },
  methods: {
    // ------------------------ INIT
    ...mapActions(['ACTION_AXIOS_LOGIN']),
    ...mapMutations(['MUTATIONS_LOGIN_CHECK']),

    onSubmit() {
      if (!this.login.id && !this.login.pw)
        return alert('아이디 및 패스워드를 입력하세요')

      const frm = new FormData()
      frm.append('type', 'login')
      frm.append('user_id', this.login.id)
      frm.append('user_pw', this.login.pw)
      frm.append('apiKey', process.env.API_KEY)
      this.ACTION_AXIOS_LOGIN(frm)
    },
  },
}
</script>

<style>
</style>
