<template>
  <div>
    <form @submit.prevent="onSubmit">
      아이디<input v-model="login.id" required /><br />
      패스워드<input v-model="login.pw" required /><br />
      <button @click.prevent="onSubmit">로그인</button>
    </form>
    {{ LOGIN }}
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