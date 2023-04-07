<template>
  <div
    v-loading="LOADING"
    :element-loading-text="loadingText()"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <header class="maker-header">
      <ul class="maker-header--menu">
        <li
          v-for="(menu, menuIndex) in gnb"
          :key="menuIndex"
          class="item"
          :class="{ active: MAKER_GNB == menu.code }"
        >
          <button
            type="button"
            :class="`icon icon-${menu.code}`"
            @click="onClickGnbTo(menu.code)"
          >
            <span class="icon-txt">{{ menu.menu }}</span>
          </button>
        </li>
      </ul>
      <ul class="maker-header--menu right">
        <li class="item">
          <button type="button" class="icon icon-8" @click="onClickGnbTo(11)">
            <span class="icon-txt">미리보기</span>
          </button>
        </li>
        <li class="item">
          <button type="button" class="icon icon-12" @click="onClickOpenGuid">
            <span class="icon-txt">제작 가이드</span>
          </button>
        </li>
        <li class="item">
          <button
            type="button"
            class="icon icon-11"
            @click="$router.push('/project-manager')"
          >
            <span class="icon-txt">프로젝트 리스트</span>
          </button>
        </li>

        <li class="item">
          <button type="button" class="icon icon-2" @click="onClickApply">
            <span class="icon-txt">배포요청</span>
          </button>
        </li>
      </ul>
      <!-- <nuxt-link to="">나가기</nuxt-link>
      <button v-b-modal.ScenarioInsert type="button">모달</button> -->
    </header>
    <Nuxt />
    <!-- <ScenarioInsert @scenarioInsert="scenarioInsert" /> -->
    <!-- <JsonDatapreview /> -->
    <div class="popup-toast">
      <!-- <b-alert :show="alertSave" dismissible variant="warning">
        저장되었습니다.
      </b-alert> -->
      <!-- <b-alert :show="alertSave" dismissible variant="warning">
        저장되었습니다.
      </b-alert> -->
    </div>
    <div>
      <!-- <el-dialog title="" width="800px" :visible.sync="popsModalVisible"> -->
      <div class="modal-request applyModal">
        <!-- <el-dialog title="" :visible.sync="isGiftOpen"> -->
        <el-dialog title="" :visible.sync="IS_APPLY">
          <div class="modal-container">
            <div class="tit">
              <h2>배포요청 (현재 버전 : ver.001)</h2>
            </div>
            <div style="margin-top: 10px">
              <p>배포요청 스토어에 등록할 수 있는 빌드 파일이 제공됩니다.</p>
              <p>배포요청은 시나리오와 엔딩까지 작업이 종료된 후 가능합니다.</p>
              <p>
                배포 시 버전이 등록되며, 다음 배포 시까지 수정사항은 적용되지
                않습니다.
              </p>
              <p>배포요청은 2~5일이 소요됩니다.</p>
            </div>
            <div class="main">
              <span class="main-tit">게임 제목</span>
              <input
                v-model="build.subject"
                type="text"
                placeholder="후원 시 닉네임을 입력해 주세요"
                class="input"
              />
            </div>
            <div class="main">
              <span class="main-tit">구글 개발자<br />아이디</span>
              <input
                v-model="build.google"
                type="text"
                placeholder="후원 시 닉네임을 입력해 주세요"
                class="input"
              />
            </div>
            <div class="main">
              <span class="main-tit">애플 개발자<br />아이디</span>
              <input
                v-model="build.apple"
                type="text"
                placeholder="후원 시 닉네임을 입력해 주세요"
                class="input"
              />
            </div>
            <div class="text-center btn-modal">
              <button
                class="button md btn-primary"
                @click="onClickBuildApplyClose"
              >
                닫기
              </button>
              <button class="button md btn-primary" @click="onClickBuildApply">
                배포요청하기
              </button>
            </div>
          </div>
        </el-dialog>
      </div>
    </div>
    <!-- <LoadingContent v-show="LOADING === true" /> -->
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
// import ScenarioInsert from '~/components/simulation/ScenarioInsert'
// import JsonDatapreview from '~/components/modal/JsonDatapreview'
// import LoadingContent from '~/components/modules/LoadingContent'
import { kooLogin } from '~/config/util'
export default {
  components: {
    // ScenarioInsert,
    // JsonDatapreview,
    // LoadingContent,
  },
  data() {
    return {
      stateLogin: [],
      isApply: false,
      build: {
        google: '',
        apple: '',
        subject: '',
      },
      gnb: [
        { code: 6, menu: '에셋관리' },
        { code: 5, menu: 'UI설정' },
        { code: 4, menu: '인물설정' },
        { code: 10, menu: '인트로' },
        { code: 1, menu: '스토리' },
        { code: 3, menu: '엔딩' },
        { code: 7, menu: '프로젝트설정' },
      ],
      params: {},
    }
  },
  computed: {
    ...mapState([
      'LOGIN',
      'LOADING',
      'SCENE_CODE',
      'MAKER_GNB',
      'alertSave',
      'PROJECT_ID',
      'IS_APPLY',
    ]),
  },
  watch: {
    LOGIN: {
      handler(value) {
        console.log(value)
        console.log('SUCCESS')
        this.MUTATIONS_LOADING()
        // 로그인 성공 시 페이지 이동
      },
      immediate: true,
    },
  },
  mounted() {
    // 로그인 체크
    this.stateLogin = [
      ...this.stateLogin,
      {
        user_idx: kooLogin('user_idx'),
        user_name: kooLogin('user_name'),
      },
    ]
    if (kooLogin('user_idx') && kooLogin('user_name')) {
      this.MUTATIONS_LOGIN_CHECK(this.stateLogin)
    } else {
      this.$router.push('/sign-in')
    }

    // setTimeout(() => {
    //   const frm = new FormData()
    //   frm.append('type', 'projectChk')
    //   frm.append('user_idx', kooLogin('user_idx'))
    //   frm.append('secretKey', this.PROJECT_ID)
    //   frm.append('apiKey', process.env.API_KEY)
    //   console.log('===================', frm)
    //   this.$axios
    //     .post(process.env.VUE_APP_API, frm, {
    //       header: {
    //         'Context-Type': 'multipart/form-data',
    //       },
    //     })
    //     .then((res) => {
    //       console.log('===================', res)
    //       if (res.data === 'ERROR') {
    //         alert('잘못된 프로젝트 코드 입니다.')
    //         this.$router.push('/')
    //       }
    //     })
    //     .catch((res) => {
    //       console.log('AXIOS FALSE', res)
    //     })
    // })

    // fdacfa91187dda475c6e06ed3649e5e579e7db4942b097d7d382beb11a584ea0

    // window.addEventListener('beforeunload', this.unLoadEvent)
  },
  beforeUnmount() {
    // window.removeEventListener('beforeunload', this.unLoadEvent)
  },
  methods: {
    ...mapMutations([
      'MUTATIONS_LOGIN_CHECK',
      'MUTATIONS_MAKER_GNB',
      'MUTATIONS_ASSETS_INIT',
      'MUTATIONS_LOADING',
      'MUTATIONS_CUT_LIST_INIT',
      'MUTATIONS_AXIOS_GET_IS_APPLY',
    ]),
    ...mapActions(['ACTION_AXIOS_GET']),
    onClickApply() {
      this.MUTATIONS_LOADING(true)
      this.params.type = 'develop'
      this.params.chk = 'c'
      this.params.mode = 'web'
      this.params.secretKey = this.PROJECT_ID
      this.params.user_idx = kooLogin('user_idx')
      this.params.apiKey = process.env.API_KEY
      this.ACTION_AXIOS_GET(this.params)
      this.MUTATIONS_AXIOS_GET_IS_APPLY(true)
    },
    onClickBuildApplyClose() {
      this.MUTATIONS_AXIOS_GET_IS_APPLY(false)
      this.build = {
        google: '',
        apple: '',
        subject: '',
      }
    },
    onClickBuildApply() {
      this.build.type = 'buildApply'
      this.build.secretKey = this.PROJECT_ID
      this.build.user_idx = kooLogin('user_idx')
      this.build.apiKey = process.env.API_KEY
      this.ACTION_AXIOS_GET(this.build)
      this.MUTATIONS_AXIOS_GET_IS_APPLY(false)
      this.build = {
        google: '',
        apple: '',
        subject: '',
      }
    },
    // 페이지 이탈 경고
    unLoadEvent(event) {
      event.preventDefault()
      event.returnValue = ''
    },
    // scenarioInsert(e) {
    //   console.log(e)
    // },
    onClickGnbTo(e) {
      if (e === 11) {
        return window.open(`/preview?projectKey=${this.PROJECT_ID}`)
        // return alert('3월 1일 15시에 오픈됩니다!!')
      }
      this.MUTATIONS_CUT_LIST_INIT([])
      this.MUTATIONS_ASSETS_INIT()
      this.MUTATIONS_MAKER_GNB(e)
      this.activeMenu = e
    },
    loadingText() {
      let text = []
      if (this.activeMenu === 6) {
        text = ['노력하는 중', '노력하는 중', '노력하는 중', '노력하는 중']
      } else {
        // text = [
        //   '시나리오 펼치는중',
        //   '챕터 펼치는중',
        //   '컷을 불러오는 중',
        //   '노력하는 중',
        // ]
        text = ['노력하는 중', '노력하는 중', '노력하는 중', '노력하는 중']
      }
      return text[Math.floor(Math.random() * 4)] + '...'
    },
    onClickOpenGuid() {
      window.open('https://project-koo.tistory.com/4')
    },
  },
}
</script>

<style lang="scss">
@import '~/assets/maker.scss';
.applyModal {
  .el-dialog__headerbtn {
    display: none;
  }
}
</style>
