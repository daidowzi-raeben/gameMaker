<template>
  <div>
    <div class="login type-join">
      <div class="login-tit">JOIN MAKER KOO</div>
      <div class="login-wrap">
        <div class="login-input">
          <label class="label">아이디(이메일)</label>
          <input
            v-model="login.id"
            class="input"
            type="text"
            required
            :readonly="JOIN_ID === 'SUCCESS' ? true : false"
            @input="onInputId"
          />
          <button
            type="button"
            class="button btn-l-grey2"
            @click="onClickIdChk"
          >
            중복확인
          </button>
        </div>
        <div v-if="JOIN_ID !== 'SUCCESS'" class="input-guide">
          중복확인 버튼을 클릭해 주세요
        </div>
        <div v-else class="input-guide blue">사용가능한 아이디입니다</div>
        <div class="login-input">
          <label class="label">비밀번호</label>
          <input
            v-model="login.pw"
            class="input"
            type="password"
            autocomplete="off"
            required
          />
        </div>
        <div class="login-input">
          <label class="label">비밀번호 확인</label>
          <input
            v-model="login.pw2"
            class="input"
            type="password"
            autocomplete="off"
            required
          />
        </div>
        <div
          v-if="login.pw !== login.pw || !login.pw || !login.pw2"
          class="input-guide"
        >
          비밀번호가 다릅니다
        </div>
        <div v-else class="input-guide blue">비밀번호가 입력되었습니다.</div>
        <div class="login-input">
          <label class="label">닉네임</label>
          <input
            v-model="login.name"
            class="input"
            type="text"
            required
            :readonly="JOIN_NAME === 'SUCCESS' ? true : false"
          />
          <button
            type="button"
            class="button btn-l-grey2"
            @click="onClickNameChk"
          >
            중복확인
          </button>
        </div>
        <div v-if="JOIN_NAME !== 'SUCCESS'" class="input-guide">
          중복확인 버튼을 클릭해 주세요
        </div>
        <div v-else class="input-guide blue">사용가능한 아이디입니다</div>
        <div class="login-input">
          <label class="label">생년월일</label>
          <el-select v-model="login.y" class="select">
            <el-option v-for="item in 80" :key="item" :value="item + 1943">{{
              item + 1943
            }}</el-option>
          </el-select>
          <el-select v-model="login.m" class="select sm">
            <el-option
              v-for="item in 12"
              :key="item"
              :value="item"
              :label="String(item).padStart(2, '0')"
            ></el-option>
          </el-select>
          <el-select v-model="login.d" class="select sm">
            <el-option
              v-for="item in 31"
              :key="item"
              :value="item"
              :label="String(item).padStart(2, '0')"
            ></el-option>
          </el-select>
        </div>
        <div class="login-input" style="display: none">
          <label class="label">휴대폰번호</label>
          <el-select v-model="login.hp1" class="select">
            <el-option
              v-for="(v, i) in hp"
              :key="i"
              :value="v"
              :label="v"
            ></el-option>
          </el-select>
          <input v-model="login.hp2" class="input sm mr" type="text" required />
          <input v-model="login.hp3" class="input sm" type="text" required />
          <!-- <button type="button" class="button btn-l-grey2">인증하기</button> -->
        </div>
        <!-- <div class="login-input">
            <label class="label">인증번호</label>
            <input class="input" type="text" required />
            <button type="button" class="button btn-l-grey2">
              인증번호 확인
            </button>
          </div> -->
        <div class="login-input">
          <label class="label">가입코드</label>
          <input
            v-model="login.code"
            class="input"
            type="text"
            autocomplete="off"
            required
          />
        </div>
        <button
          v-if="login.pw === login.pw2 && login.id && login.name && login.code"
          class="login-button"
          @click.prevent="onSubmit"
        >
          회원가입
        </button>
        <button v-else class="login-button" disabled>회원가입</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'

export default {
  layout: 'index',
  data() {
    return {
      login: {},
      stateLogin: [],
      joinParams: {},
      hp: ['010', '011', '017', '018', '019', '016'],
    }
  },
  computed: {
    ...mapState(['LOGIN', 'LOADING', 'JOIN_ID', 'JOIN_NAME']),
  },
  watch: {},
  mounted() {
    // if (kooLogin('user_idx') && kooLogin('user_name'))
    // this.MUTATIONS_LOGIN_CHECK(this.stateLogin)
  },
  methods: {
    // ------------------------ INIT
    ...mapActions(['ACTION_AXIOS_LOGIN', 'JOIN_ACTION_AXIOS_GET']),
    ...mapMutations(['MUTATIONS_LOGIN_CHECK', 'JOIN_MUTATIONS_AXIOS_INIT']),

    onSubmit() {
      console.log('asdasd')
      if (this.JOIN_ID !== 'SUCCESS') {
        return alert('아이디 중복체크를 먼저 해주세요')
      }
      if (this.JOIN_NAME !== 'SUCCESS') {
        return alert('닉네임 중복체크를 먼저 해주세요')
      }
      const frm = new FormData()

      frm.append('type', 'code')
      frm.append('code', this.login.code)
      this.$axios
        .post(process.env.VUE_APP_API, frm, {
          header: {
            'Context-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          console.log(res)
          if (res.data === 'SUCCESS') {
            this.login.apiKey = process.env.API_KEY
            this.login.type = 'join'
            this.JOIN_ACTION_AXIOS_GET(this.login)
            this.$router.push('/sign-in')
          } else {
            alert('잘못된 코드 입니다')
          }
        })
        .catch((res) => {
          console.log('AXIOS FALSE', res)
          alert('등록에 실패하였습니다. 관리자에게 문의해 주세요.')
        })
    },
    onClickIdChk() {
      const regex =
        /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
      if (regex.test(this.login.id) === false) {
        return alert('이메일 형식이 맞지 않습니다')
      }
      this.joinParams.apiKey = process.env.API_KEY
      this.joinParams.id = this.login.id
      this.joinParams.type = 'idChk'
      this.JOIN_ACTION_AXIOS_GET(this.joinParams)
    },
    onInputId() {
      this.JOIN_MUTATIONS_AXIOS_INIT()
    },
    onClickNameChk() {
      this.joinParams.apiKey = process.env.API_KEY
      this.joinParams.name = this.login.name
      this.joinParams.type = 'nameChk'
      this.JOIN_ACTION_AXIOS_GET(this.joinParams)
    },
  },
}
</script>

<style>
</style>
