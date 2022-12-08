<template>
  <div>
    <header class="maker-header">
      <ul class="maker-header--menu">
        <li
          v-for="(menu, menuIndex) in gnb"
          :key="menuIndex"
          class="item"
          :class="{ active: activeMenu == menu.code }"
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
          <button type="button" class="icon icon-8">
            <span class="icon-txt">미리보기</span>
          </button>
        </li>
        <li class="item">
          <button type="button" class="icon icon-9">
            <span class="icon-txt">저장하기</span>
          </button>
        </li>
      </ul>
      <!-- <nuxt-link to="">나가기</nuxt-link>
      <button v-b-modal.ScenarioInsert type="button">모달</button> -->
    </header>
    <Nuxt />
    <ScenarioInsert @scenarioInsert="scenarioInsert" />
    <JsonDatapreview />
    <div style="position: fixed; top: 0">
      <b-alert :show="alertSave" dismissible variant="warning">
        저장되었습니다.
      </b-alert>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import ScenarioInsert from '~/components/simulation/ScenarioInsert'
import JsonDatapreview from '~/components/modal/JsonDatapreview'
import { kooLogin } from '~/config/util'
export default {
  components: {
    ScenarioInsert,
    JsonDatapreview,
  },
  data() {
    return {
      activeMenu: 1,
      stateLogin: [],
      gnb: [
        { code: 1, menu: '스토리' },
        { code: 2, menu: '인트로' },
        { code: 3, menu: '엔딩' },
        { code: 4, menu: '인물설정' },
        { code: 5, menu: 'UI설정' },
        { code: 6, menu: '에셋관리' },
        { code: 7, menu: '프로젝트설정' },
      ],
    }
  },
  computed: {
    ...mapState(['LOGIN', 'LOADING', 'SCENE_CODE', 'MAKER_GNB', 'alertSave']),
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
    ]),

    // 페이지 이탈 경고
    unLoadEvent(event) {
      event.preventDefault()
      event.returnValue = ''
    },
    scenarioInsert(e) {
      console.log(e)
    },
    onClickGnbTo(e) {
      this.MUTATIONS_ASSETS_INIT()
      this.MUTATIONS_MAKER_GNB(e)
      this.activeMenu = e
    },
  },
}
</script>

<style lang="scss">
@import '~/assets/maker.scss';
</style>
