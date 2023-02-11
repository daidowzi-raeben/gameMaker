<template>
  <div>
    <div class="login type-join">
      <div class="login-tit">JOIN MAKER KOO</div>
      <div class="login-wrap">
        <form @submit.prevent="onSubmit">
          <div class="login-input">
            <label class="label">아이디(이메일)</label>
            <input
              v-model="login.id"
              class="input"
              type="text"
              required
            />
            <button type="button" class="button btn-l-grey2">중복확인</button>
          </div>
          <div class="input-guide blue">사용가능한 아이디입니다</div>
          <div class="login-input">
            <label class="label">비밀번호</label>
            <input
              class="input"
              type="password"
              required
            />
          </div>
          <div class="login-input">
            <label class="label">비밀번호 확인</label>
            <input
              class="input"
              type="password"
              required
            />
          </div>
          <div class="input-guide">비밀번호가 다릅니다</div>
          <div class="login-input">
            <label class="label">닉네임</label>
            <input
              class="input"
              type="text"
              required
            />
            <button type="button" class="button btn-l-grey2">중복확인</button>
          </div>
          <div class="login-input">
            <label class="label">생년월일</label>
            <el-select class="select">
              <el-option></el-option>
            </el-select>
            <el-select class="select sm">
              <el-option></el-option>
            </el-select>
            <el-select class="select sm">
              <el-option></el-option>
            </el-select>
          </div>
          <div class="login-input">
            <label class="label">휴대폰번호</label>
            <el-select class="select">
              <el-option></el-option>
            </el-select>
            <input
              class="input"
              type="text"
              required
            />
            <button type="button" class="button btn-l-grey2">인증하기</button>
          </div>
          <div class="login-input">
            <label class="label">인증번호</label>
            <input
              class="input"
              type="text"
              required
            />
            <button type="button" class="button btn-l-grey2">인증번호 확인</button>
          </div>
          <button class="login-button" @click.prevent="onSubmit">회원가입</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'
import { kooLogin } from '~/config/util'
export default {
  layout: 'index',
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
