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
import { mapActions, mapState } from 'vuex'
export default {
  data() {
    return {
      login: {
        id: '',
        pw: '',
      },
    }
  },
  computed: {
    ...mapState(['LOGIN', 'LOADING']),
  },
  mounted() {},
  methods: {
    // ------------------------ INIT
    ...mapActions(['ACTION_AXIOS_LOGIN']),

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