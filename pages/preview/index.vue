<template>
  <div
    v-loading="loading"
    :element-loading-text="loadingText()"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
    class="preview-wrap"
  >
    <div id="preview">
      <div class="app">
        <div class="app-title">
          <div class="app-title__warp">
            <div class="logo">
              <img src="@/static/images/preview/logo.png" />
              <img src="@/static/images/preview/ProjectKoo.png" height="20" />
            </div>
            <div class="copy">
              코딩없이 누구나 클릭만으로 만드는<br />
              나만의 스토리형 게임
            </div>
            <div class="title" style="line-height: 30px">
              {{ IN_APP_GAME.projectTitle }}
            </div>
            <dl class="list">
              <dt>제작자</dt>
              <dd>{{ IN_APP_GAME.projectUser }}</dd>
            </dl>
            <dl class="list">
              <dt>공유하기</dt>
              <dd>
                <ul>
                  <li @click="shareTwitter">
                    <img src="@/static/images/preview/twitter_share.png" />
                  </li>
                  <li @click="shareFacebook">
                    <img src="@/static/images/preview/facebook_share.png" />
                  </li>
                  <li @click="sendkakao">
                    <img src="@/static/images/preview/chat.png" />
                    <img
                      src="@/static/images/preview/KAKAO.png"
                      class="kakao"
                    />
                  </li>
                  <li>
                    <img src="@/static/images/preview/reply-fill_share.png" />
                  </li>
                </ul>
              </dd>
            </dl>
            <dl class="list">
              <dt>도움주신분</dt>
              <dd style="line-height: 20px">
                에셋제작<br />
                장진님, 푸슬님, 팡님, 유령선님, 노넴님, 물개말이님, 킨님,
                북극산꽁치님, BUT님, 예제님, 신아님, 말랑님, 쟈몽님, Bbreaad님,
                김자반님, 몰라님, 진진자라님, 이자기님, 꽃깔콘님, 모차님,
                웅녀님, 성은이는 만극하지않아요님, 한결님, <br /><br />
                후원<br />
                청월적일님, 안민영님, 사내님, woduddl****님, 김승돈님, 유흥원님,
                임수묵님, 황수연님, 임새별님, ga0맨님, 최승용님, 형욱님,
                nike2335님, 나님, 허다솜님, 박람람님, PICKISS님, 박세영님,
                장영섭님, ㅈㅎ님, J보경님, nona님, viva****님, 곤돌라님, 곰곰님,
                K님, 검은발가락님, 정윤님
                <!-- <textarea readonly style="width: 100%">


                </textarea> -->
              </dd>
            </dl>
            <div class="footer-preview">
              <ul class="footer-preview-social">
                <li
                  onclick="window.open('https://instagram.com/project_koo')"
                ></li>
                <li
                  onclick="window.open('https://instagram.com/project_koo?igshid=YmMyMTA2M2Y=')"
                ></li>
                <li
                  onclick="window.open('http://project-koo.tistory.com')"
                ></li>
              </ul>
              <button
                type="button"
                class="footer-preview-blank"
                onclick="window.open('http://projectkoo.com')"
              >
                프로젝트 쿠 바로가기
              </button>
              <div class="footer-preview-copyright">
                Copyright (C) 2023 Project Koo
              </div>
            </div>
          </div>
        </div>
        <div class="app-device">
          <div class="app-device__warp" :class="isSafari">
            <div class="preview">
              <!-- <div
        style="
          background: #fff;
          color: #000;
          position: fixed;
          top: 0;
          left: 0;
          z-index: 99;
        "
      >
        {{ gamePoint }}
      </div> -->
              <div
                v-if="cutType === 3 || cutType === 4"
                class="preview-con answer-dim"
              ></div>
              <div v-if="cutType === 3" class="answer answer-multiple">
                <button
                  v-if="inApp.questions.text_1"
                  type="button"
                  class="btn"
                  :class="IN_APP_GAME.uiSet.font"
                  :style="
                    IN_APP_GAME.uiSet.fontColor
                      ? `${windowColor()}; color:${IN_APP_GAME.uiSet.fontColor}`
                      : windowColor()
                  "
                  @click="onClickQuestions(0)"
                >
                  {{ inApp.questions.text_1 }}
                </button>
                <button
                  v-if="inApp.questions.text_2"
                  type="button"
                  class="btn"
                  :class="IN_APP_GAME.uiSet.font"
                  :style="
                    IN_APP_GAME.uiSet.fontColor
                      ? `${windowColor()}; color:${IN_APP_GAME.uiSet.fontColor}`
                      : windowColor()
                  "
                  @click="onClickQuestions(1)"
                >
                  {{ inApp.questions.text_2 }}
                </button>
                <button
                  v-if="inApp.questions.text_3"
                  type="button"
                  class="btn"
                  :class="IN_APP_GAME.uiSet.font"
                  :style="
                    IN_APP_GAME.uiSet.fontColor
                      ? `${windowColor()}; color:${IN_APP_GAME.uiSet.fontColor}`
                      : windowColor()
                  "
                  @click="onClickQuestions(2)"
                >
                  {{ inApp.questions.text_3 }}
                </button>
              </div>
              <div v-if="cutType === 4" class="answer answer-subjective">
                <div class="text">{{ inApp.subjectiveQuestion }}</div>
                <div class="input-wrap">
                  <input
                    v-model="answer"
                    type="text"
                    class="input-text"
                    :class="IN_APP_GAME.uiSet.font"
                    :style="
                      IN_APP_GAME.uiSet.fontColor
                        ? `${windowColor()}; color:${
                            IN_APP_GAME.uiSet.fontColor
                          }`
                        : windowColor()
                    "
                    placeholder="주관식 답변을 입력해주세요"
                    @keyup.enter="onClickSubjectiveQuestion"
                  />
                  <button
                    type="button"
                    class="button"
                    :class="IN_APP_GAME.uiSet.font"
                    :style="
                      IN_APP_GAME.uiSet.fontColor
                        ? `${windowColor()}; color:${
                            IN_APP_GAME.uiSet.fontColor
                          }`
                        : windowColor()
                    "
                    @click="onClickSubjectiveQuestion"
                  >
                    입력
                  </button>
                </div>
              </div>
              <!-- 인트로화면 -->
              <div
                v-show="displayPreview"
                v-if="
                  IN_APP_GAME && IN_APP_GAME.intro && IN_APP_GAME.intro.data
                "
                ref="displayIntro"
                class="preview-con preview-intro"
                :class="[
                  IN_APP_GAME.intro.data.dim,
                  IN_APP_GAME.intro.data.copyrightPosition,
                  IN_APP_GAME.intro.data.position,
                ]"
              >
                <div class="preview-intro--background">
                  <img
                    :src="onLoadAssetsImage(IN_APP_GAME.intro.data.bg, 'bg')"
                    alt="background"
                  />
                </div>
                <div class="preview-intro--logo">
                  <img
                    :src="
                      onLoadAssetsImage(IN_APP_GAME.intro.introLogo, 'logo')
                    "
                    alt="logo"
                  />
                </div>
                <div class="preview-intro--menu">
                  <button
                    type="button"
                    class="btn"
                    :style="`box-shadow: ${IN_APP_GAME.uiSet.button.x}px ${IN_APP_GAME.uiSet.button.y}px 0 ${IN_APP_GAME.uiSet.button.shadowColor}; outline : ${IN_APP_GAME.uiSet.button.border}px solid ${IN_APP_GAME.uiSet.button.strokeColor}; background:${IN_APP_GAME.uiSet.mainColor}; color:${IN_APP_GAME.uiSet.mainFontColor}; border-radius:${IN_APP_GAME.uiSet.button.round}px`"
                    @click="onclickDisplayShow('displayGame')"
                  >
                    시작하기
                  </button>
                  <button
                    type="button"
                    class="btn"
                    :style="`box-shadow: ${IN_APP_GAME.uiSet.button.x}px ${IN_APP_GAME.uiSet.button.y}px 0 ${IN_APP_GAME.uiSet.button.shadowColor}; outline : ${IN_APP_GAME.uiSet.button.border}px solid ${IN_APP_GAME.uiSet.button.strokeColor}; background:${IN_APP_GAME.uiSet.mainColor}; color:${IN_APP_GAME.uiSet.mainFontColor}; border-radius:${IN_APP_GAME.uiSet.button.round}px`"
                    onclick="alert('정식오픈 후 지원됩니다.')"
                  >
                    불러오기
                  </button>
                  <!-- <button
                    type="button"
                    class="btn"
                    :style="`box-shadow: ${IN_APP_GAME.uiSet.button.x}px ${IN_APP_GAME.uiSet.button.y}px 0 ${IN_APP_GAME.uiSet.button.shadowColor}; outline : ${IN_APP_GAME.uiSet.button.border}px solid ${IN_APP_GAME.uiSet.button.strokeColor}; background:${IN_APP_GAME.uiSet.mainColor}; color:${IN_APP_GAME.uiSet.mainFontColor}; border-radius:${IN_APP_GAME.uiSet.button.round}px`"
                    @click="onclickDisplayShow('displayProfile')"
                  >
                    등장인물
                  </button> -->
                  <button
                    type="button"
                    class="btn"
                    :style="`box-shadow: ${IN_APP_GAME.uiSet.button.x}px ${IN_APP_GAME.uiSet.button.y}px 0 ${IN_APP_GAME.uiSet.button.shadowColor}; outline : ${IN_APP_GAME.uiSet.button.border}px solid ${IN_APP_GAME.uiSet.button.strokeColor}; background:${IN_APP_GAME.uiSet.mainColor}; color:${IN_APP_GAME.uiSet.mainFontColor}; border-radius:${IN_APP_GAME.uiSet.button.round}px`"
                    @click="onclickDisplayShow('displayProfile')"
                  >
                    등장인물
                  </button>
                  <!-- <button
                    type="button"
                    class="btn"
                    :style="`box-shadow: ${IN_APP_GAME.uiSet.button.x}px ${IN_APP_GAME.uiSet.button.y}px 0 ${IN_APP_GAME.uiSet.button.shadowColor}; outline : ${IN_APP_GAME.uiSet.button.border}px solid ${IN_APP_GAME.uiSet.button.strokeColor}; background:${IN_APP_GAME.uiSet.mainColor}; color:${IN_APP_GAME.uiSet.mainFontColor}; border-radius:${IN_APP_GAME.uiSet.button.round}px`"
                  >
                    갤러리
                  </button> -->
                </div>
                <div class="preview-intro--copy">
                  {{ IN_APP_GAME.intro.data.copyright }}
                </div>
              </div>

              <!-- 게임화면 -->
              <div
                v-show="displayPreview"
                ref="displayGame"
                class="preview-con preview-img"
                @click="
                  isEnding === false ? nextGame(isLoading) : nextEndingGame()
                "
              >
                <!-- 로딩화면 -->
                <div ref="loadingChater" class="loading-chapter">
                  <!-- <div class="bg" :class="IN_APP_GAME.intro.data.dim">
                    <img
                      :src="onLoadAssetsImage(IN_APP_GAME.intro.data.bg, 'bg')"
                      alt="background"
                    />
                  </div> -->
                  <div
                    class="box"
                    :style="
                      IN_APP_GAME.uiSet && IN_APP_GAME.uiSet.mainColor
                        ? `background:${IN_APP_GAME.uiSet.mainColor};color:${IN_APP_GAME.uiSet.mainFontColor}`
                        : ''
                    "
                  >
                    <p id="ST"></p>
                    <p id="CT"></p>
                  </div>
                </div>

                <img
                  v-if="inApp.bg"
                  :src="onLoadAssetsImage(inApp.bg, 'bg')"
                  alt=""
                  class="background"
                />
                <div v-if="inApp.cr && !inApp.cr2" class="character-1">
                  <img
                    :src="onLoadAssetsImage(inApp.cr, 'cr')"
                    alt=""
                    class="character right"
                  />
                </div>
                <div v-if="inApp.cr2" class="character-2">
                  <img
                    :src="onLoadAssetsImage(inApp.cr, 'cr')"
                    alt=""
                    class="character right"
                  />
                  <img
                    :src="onLoadAssetsImage(inApp.cr2, 'cr')"
                    alt=""
                    class="character right"
                  />
                </div>

                <div class="dialogue" :style="windowColor()">
                  <span
                    v-if="cutType === 1"
                    class="name"
                    :class="IN_APP_GAME.uiSet.font"
                    :style="
                      IN_APP_GAME.uiSet && IN_APP_GAME.uiSet.mainColor
                        ? `background:${IN_APP_GAME.uiSet.mainColor};color:${IN_APP_GAME.uiSet.mainFontColor}`
                        : ''
                    "
                    >{{ inApp.crName }}</span
                  >
                  <p
                    v-if="cutType === 1"
                    class="text"
                    :class="IN_APP_GAME.uiSet.font"
                    :style="
                      IN_APP_GAME.uiSet && IN_APP_GAME.uiSet.fontColor
                        ? `color:${IN_APP_GAME.uiSet.fontColor}`
                        : ''
                    "
                  >
                    {{ inApp.text.replaceAll('||n', '\n') }}
                  </p>
                  <p
                    v-if="cutType === 3"
                    class="text"
                    :class="IN_APP_GAME.uiSet.font"
                    :style="
                      IN_APP_GAME.uiSet && IN_APP_GAME.uiSet.fontColor
                        ? `color:${IN_APP_GAME.uiSet.fontColor}`
                        : ''
                    "
                  >
                    {{
                      IN_APP_GAME.scenarioList[s].chapters[c].cuts[
                        IN_APP_GAME.scenarioList[s].chapters[c].initBtn[t]
                      ].list.text
                        ? IN_APP_GAME.scenarioList[s].chapters[c].cuts[
                            IN_APP_GAME.scenarioList[s].chapters[c].initBtn[t]
                          ].list.text.replaceAll('||n', '\n')
                        : IN_APP_GAME.scenarioList[s].chapters[c].cuts[
                            IN_APP_GAME.scenarioList[s].chapters[c].initBtn[t]
                          ].list.narration.replaceAll('||n', '\n')
                    }}
                  </p>
                  <p
                    v-if="cutType === 2"
                    class="text"
                    :class="IN_APP_GAME.uiSet.font"
                    :style="
                      IN_APP_GAME.uiSet && IN_APP_GAME.uiSet.fontColor
                        ? `color:${IN_APP_GAME.uiSet.fontColor}`
                        : ''
                    "
                  >
                    {{ inApp.narration.replaceAll('||n', '\n') }}
                  </p>
                </div>
              </div>
              <!-- 등장인물화면 -->

              <div
                v-if="IN_APP_GAME.profileList"
                v-show="displayPreview"
                ref="displayProfile"
              >
                <div
                  class="preview-con preview-profile detail"
                  :style="
                    IN_APP_GAME.profileList[cIndex].bg
                      ? `background:url(https://api.school-os.net/game/upload/bg/1200/${IN_APP_GAME.profileList[cIndex].bg})`
                      : `background: ${IN_APP_GAME.profileList[cIndex].background}`
                  "
                >
                  <div class="preview-con icon type2" :style="`outline : ${IN_APP_GAME.uiSet.button.border}px solid ${IN_APP_GAME.uiSet.button.strokeColor}; background:${IN_APP_GAME.uiSet.mainColor}; color:${IN_APP_GAME.uiSet.mainFontColor};`">
                    <button
                      type="button"
                      class="btn back"
                      @click="onclickDisplayShow('displayIntro')"
                    ></button>
                    <button type="button" class="btn camera" onclick="alert('준비중입니다')"></button>
                    <!-- <button
                      type="button"
                      class="btn close"
                      @click="onclickDisplayShow('displayIntro')"
                    >
                      닫기
                    </button>
                    <button type="button" class="btn picture">사진</button> -->
                  </div>

                  <p class="name">
                    {{ IN_APP_GAME.profileList[cIndex].name }}
                  </p>
                  <div class="character head">
                    <img
                      :src="`https://api.school-os.net/game/upload/cr/${IN_APP_GAME.profileList[cIndex].h_img}`"
                      alt=""
                    />
                  </div>
                  <div class="character">
                    <img
                      :src="`https://api.school-os.net/game/upload/cr/1200/${IN_APP_GAME.profileList[cIndex].cr}`"
                      alt=""
                    />
                  </div>
                  <div class="profile">
                    <p class="con type2">
                      <span>{{
                        IN_APP_GAME.profileList[cIndex].profile.replaceAll(
                          '||n',
                          '\n'
                        )
                      }}</span>
                    </p>
                  </div>
                  <ul v-if="IN_APP_GAME.profileList" class="face-list">
                    <li
                      v-for="(v, i) in IN_APP_GAME.profileList"
                      :key="i"
                      class="face-list--item"
                      @click="cIndex = i"
                    >
                      <img
                        :src="`https://api.school-os.net/game/upload/cr/${v.h_img}`"
                        alt=""
                      />
                    </li>
                  </ul>
                </div>
              </div>
              <img
                src="~/static/images/mockup.png"
                alt="mockup"
                class="preview-mockup"
              />
            </div>
            <!-- <div class="ad"></div> -->
          </div>
          <div
            v-if="user_idx === IN_APP_GAME.userIdx"
            class="app-device--debug"
          >
            현재 포인트
            <span class="grey">(확인용으로, 제작자에게만 표시됩니다.)</span
            ><br />
            <ul>
              <li v-for="(v, i) in gamePoint" :key="i">
                {{ v.name }} / {{ v.point }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import { kooLogin } from '~/config/util'
// import appData from '~/static/test.json'
export default {
  name: 'PreviewIndex',
  data() {
    return {
      user_idx: '',
      isLoading: false,
      inAllStart: false,
      lastGame: false,
      loading: true,
      game: [],
      isSafari: '',
      s: 0,
      c: 0,
      t: 0,
      cIndex: 0,
      answer: '',
      isEnding: false,
      gamePoint: [],
      gamePointCr: {},
      cutType: 0,
      initBtn: '',
      nextBtn: '',
      profile: [],
      inApp: {
        bg: '',
        cr: '',
        cr2: '',
        sr: '',
        code: '',
        text: '',
        point: '',
        answer: '',
        crName: '',
        effect: '',
        cutType: 0,
        pointCr: '',
        narration: '',
        pointType: '',
        questions: {
          text: ['', '', ''],
        },
        questionsText: [],
        questionsPoint: [
          {
            point: null,
            nextBtn: null,
            pointCr: null,
            pointType: null,
          },
          {
            point: null,
            nextBtn: null,
            pointCr: null,
            pointType: null,
          },
          {
            point: null,
            nextBtn: null,
            pointCr: null,
            pointType: null,
          },
        ],
        questionsTimer: null,
        subjectiveQuestion: '',
      },
      displayPreview: false,
      paramsList: {},
      sharUrl: 'projectkoo.com',
      srPlay: [],
      introAudio: null,
    }
  },
  head: {
    title: '미리보기',
    script: [{ src: 'https://developers.kakao.com/sdk/js/kakao.min.js' }],
  },
  computed: {
    ...mapState(['IN_APP_GAME', 'PROJECT_ID', 'IN_APP_GAME_START']),
  },

  watch: {
    IN_APP_GAME_START: {
      handler(value) {
        console.log('IN_APP_GAME_START', value)
        if (value === true) {
          setTimeout(() => {
            // this.game = this.IN_APP_GAME
            // 첫 데이터 찾기
            this.IN_APP_GAME.profileList.forEach((e, i) => {
              this.gamePoint = [
                ...this.gamePoint,
                {
                  name: e.name,
                  point: 0,
                },
              ]
            })

            // 인트로 배경음
            if (this.IN_APP_GAME.intro.introBgm) {
              console.log(
                'this.IN_APP_GAME.intro.introBgm',
                this.IN_APP_GAME.intro.introBgm
              )
              this.introAudio = new Audio(
                `${process.env.VUE_APP_IMAGE}/logo/${this.IN_APP_GAME.intro.introBgm}.mp3`
              )
              this.introAudio.loop = true
              this.introAudio.play()
            }
            // this.updateGame()

            this.$refs.displayIntro.style = 'display:block'
            this.loading = false
          }, 1000)
        }
      },
      immediate: true,
    },
  },
  mounted() {
    // 이머전시
    const frm = new FormData()
    frm.append(`type`, 'config')
    frm.append('apiKey', process.env.API_KEY)

    this.$axios
      .post(process.env.VUE_APP_API, frm, {})
      .then((res) => {
        console.log('emergency', res.data.emergency)
        if (res.data.emergency === '1') {
          this.$router.push('/')
          return alert('점검중입니다')
        }
      })
      .catch((res) => {
        console.log('AXIOS FALSE', res)
      })

    // console.log(appData)
    navigator.userAgent.includes('iPhone OS 16') === true
      ? (this.isSafari = 'safari')
      : (this.isSafari = '')

    this.MUTATIONS_PROJECT(this.$route.query.projectKey)
    this.paramsList.type = 'develop'
    this.paramsList.secretKey = this.PROJECT_ID
    this.paramsList.user_idx = kooLogin('user_idx')
    this.paramsList.apiKey = process.env.API_KEY
    this.paramsList.mode = 'web'
    this.ACTION_AXIOS_GET(this.paramsList)
    // http://localhost:9001/preview?projectKey=688787d8ff144c502c7f5cffaafe2cc588d86079f9de88304c26b0cb99ce91c6

    this.setScreenSize()
    window.addEventListener('resize', () => this.setScreenSize())

    this.$nextTick(() => {
      this.user_idx = kooLogin('user_idx')
    })
  },
  destroyed() {
    window.removeEventListener('resize', () => this.setScreenSize())
  },
  methods: {
    ...mapMutations(['MUTATIONS_PROJECT']),
    ...mapActions(['ACTION_AXIOS_GET', 'ACTION_AXIOS_POST']),
    // 모바일 높이
    setScreenSize() {
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
    },
    // 공유하기
    shareTwitter() {
      const sendText = '코딩없이 만드는 나만의 스토리형 게임, 메이커 쿠' // 전달할 텍스트
      const sendUrl = this.sharUrl // 전달할 URL
      window.open(
        'https://twitter.com/intent/tweet?text=' + sendText + '&url=' + sendUrl
      )
    },
    shareFacebook() {
      const sendUrl = this.sharUrl // 전달할 URL
      window.open('http://www.facebook.com/sharer/sharer.php?u=' + sendUrl)
    },
    sendkakao() {
      Kakao.init('654e0eb959cb92350e11a4872c04acbb')
      Kakao.Link.sendDefault({
        objectType: 'feed',
        content: {
          title: '프로젝트 쿠',
          description: '프로젝트 쿠 디스크립션',
          imageUrl:
            'http://api.school-os.net/game/upload/logo/logo1675285700.png',
          link: {
            mobileWebUrl: 'http://projectkoo.com',
            webUrl: 'http://projectkoo.com',
          },
        },
        buttons: [
          {
            title: '웹으로 보기',
            link: {
              mobileWebUrl: 'http://projectkoo.com',
              webUrl: 'http://projectkoo.com',
            },
          },
        ],
      })
    },
    nextEndingGame() {
      if (this.lastGame === false) {
        // console.log(this.s, this.IN_APP_GAME.endingList[this.s].chapters)
        this.t++
        // console.log(this.IN_APP_GAME.scenarioList[this.s].chapters[this.c].length)
        // 컷 구분
        // console.log(this.s, this.c, this.t, `CUT${this.inApp.connect}`)
        console.log(
          'this.IN_APP_GAME.endingList[this.s].chapters.length',
          this.IN_APP_GAME.endingList[this.s].chapters.length
        )
        console.log(
          'this.IN_APP_GAME.endingList[this.s].chapters[this.c].initBtn.length',
          this.IN_APP_GAME.endingList[this.s].chapters[this.c].initBtn.length
        )

        if (
          this.IN_APP_GAME.endingList[this.s].chapters[this.c].initBtn
            .length === this.t
        ) {
          console.log('챕터 끝')
          this.t = 0
          this.c++
          console.log('chpter length', this.initBtn)
          if (this.IN_APP_GAME.endingList[this.s].chapters.length === this.c) {
            this.lastGame = true
            return alert('크레딧은 정식오픈 후 제공됩니다.')
          }
        }
        this.updateEndingGame()
      } else {
        return alert('크레딧은 정식오픈 후 제공됩니다.')
      }
    },
    // http://localhost:9001/preview?projectKey=45a53c85a1ed65946772808cec29efc597504ba5a59747e3825813b0f7e9e6d9
    nextGame(e) {
      if (this.isLoading === true) {
        return
      }
      if (this.isEnding === false) {
        this.t++
        // console.log(this.IN_APP_GAME.scenarioList[this.s].chapters[this.c].length)
        // 컷 구분

        console.log(this.s, this.c, this.t, `CUT${this.inApp.connect}`)
        for (
          let b = 0;
          b <
          this.IN_APP_GAME.scenarioList[this.s].chapters[this.c].initBtn.length;
          b++
        ) {
          if (
            this.IN_APP_GAME.scenarioList[this.s].chapters[this.c].initBtn[
              b
            ] === `cut${this.inApp.connect}`
          ) {
            console.log('========멈춰==========')
            this.t = b
          }
          console.log(
            this.IN_APP_GAME.scenarioList[this.s].chapters[this.c].initBtn[b]
          )
        }

        if (
          this.IN_APP_GAME.scenarioList[this.s].chapters[this.c].initBtn
            .length === this.t
        ) {
          console.log('챕터 끝')
          this.t = 0
          this.c++
          console.log('chpter length', this.initBtn)
          if (
            this.IN_APP_GAME.scenarioList[this.s].chapters.length === this.c
          ) {
            this.t = 0
            this.c = 0
            this.s++
            console.log('시나리오 끝')
            if (this.IN_APP_GAME.scenarioList.length === this.s) {
              this.isEnding = true
              for (let i = 0; i < this.IN_APP_GAME.endingList.length; i++) {
                // 이름

                for (let p = 0; p < this.gamePoint.length; p++) {
                  console.log(
                    this.IN_APP_GAME.endingList[i].cr,
                    this.gamePoint[p].name
                  )
                  if (
                    this.gamePoint[p].name === this.IN_APP_GAME.endingList[i].cr
                  ) {
                    if (
                      this.IN_APP_GAME.endingList[i].pu <=
                        this.gamePoint[p].point &&
                      this.IN_APP_GAME.endingList[i].pd >=
                        this.gamePoint[p].point
                    ) {
                      this.s = i
                      this.c = 0
                      this.t = 0
                      break
                    } else {
                      this.s = 0
                    }
                  }
                }
              }
              this.updateEndingGame()
              return console.log('ending')
            }
          }
        }
        if (
          this.inApp.questionsPoint &&
          this.inApp.questionsPoint[e] &&
          this.inApp.questionsPoint[e].nextBtn
        ) {
          this.updateGame(this.inApp.questionsPoint[e].nextBtn)
        } else {
          this.updateGame()
        }
        this.cutUpdate(
          this.inApp.pointCr,
          this.inApp.point,
          this.inApp.pointType
        )
      } else {
        console.log('엔딩시작')
      }
    },

    onClickQuestions(e) {
      this.isLoading = false
      // questionsText
      // this.gamePoint = [
      //   ...this.gamePoint,
      //   {
      //     cr: this.inApp.questionsPoint[e].pointCr,
      //     point: this.inApp.questionsPoint[e].point,
      //   },
      // ]
      this.pointUpdate(
        this.inApp.questionsPoint[e].pointCr,
        this.inApp.questionsPoint[e].point,
        this.inApp.questionsPoint[e].pointType
      )
      console.log(
        `인물 : ${this.inApp.questionsPoint[e].pointCr} / 포인트 ${this.inApp.questionsPoint[e].point}`
      )

      this.nextGame(e)
    },
    cutUpdate(name, point, type) {
      // this.updateGame()
      console.log('cutUpdate', name, point, type)
      if (name && point && type) {
        for (let i = 0; i < this.gamePoint.length; i++) {
          if (this.gamePoint[i].name === name) {
            if (type === 'P') {
              if (this.gamePoint[i].point < point) {
                this.t++
                this.updateGame()
                return console.log('P 포인트 낮음')
              } else {
                console.log('P 포인트 높음')
              }
            } else {
              console.log('????????????')
              if (this.gamePoint[i].point > point) {
                this.t++
                this.updateGame()
                return console.log('M 포인트 낮음', this.gamePoint[i].point)
              } else {
                console.log('M 포인트 높음')
              }
            }
          }
        }
      } else {
        console.log('컷 미정산')
      }
    },
    updateGame(e) {
      // 챕터 로딩
      console.log(this.IN_APP_GAME, this.displayPreview, '------------')

      if (this.t === 0) {
        if (this.inAllStart === true) {
          this.srPlay.forEach((element) => {
            if (element) {
              console.log(element.pause())
            }
          })
          if (this.IN_APP_GAME.scenarioList[this.s].chapters[this.c].bgm) {
            // bgm 재생
            const soundUrl = `${process.env.VUE_APP_IMAGE}/bgm/${
              this.IN_APP_GAME.scenarioList[this.s].chapters[this.c].bgm
            }`
            // this.audioBgm(soundUrl).puase()
            this.audioBgm(soundUrl, this.s + 1, this.c + 1)
            this.srPlay[this.s + 1 + this.c + 1].play()
            console.log('=========BGM START===========')
          }
        }

        console.log('**********통과1**********')

        this.$refs.loadingChater.classList.add('active')
        console.log(
          this.IN_APP_GAME.scenarioList[this.s].scenarioTitle,
          this.IN_APP_GAME.scenarioList[this.s].chapters[this.c].title
        )
        document.getElementById('ST').innerText =
          this.IN_APP_GAME.scenarioList[this.s].scenarioTitle
        document.getElementById('CT').innerText =
          this.IN_APP_GAME.scenarioList[this.s].chapters[this.c].title
        this.isLoading = true
        setTimeout(() => {
          this.$refs.loadingChater.classList.remove('active')
          // this.$refs.loadingChater.style = 'display:none'
          this.isLoading = false
        }, 3000)
      }

      if (
        this.IN_APP_GAME.scenarioList[this.s] &&
        this.IN_APP_GAME.scenarioList[this.s].chapters[this.c] &&
        this.IN_APP_GAME.scenarioList[this.s].chapters[this.c].initBtn[this.t]
      ) {
        this.initBtn =
          this.IN_APP_GAME.scenarioList[this.s].chapters[this.c].initBtn[this.t]
      } else {
        return console.log('================END============')
      }
      if (e && e !== null) {
        console.log('객관식')
        // this.isLoading = true
        for (
          let b = 0;
          b <
          this.IN_APP_GAME.scenarioList[this.s].chapters[this.c].initBtn.length;
          b++
        ) {
          if (
            this.IN_APP_GAME.scenarioList[this.s].chapters[this.c].initBtn[
              b
            ] === `cut${e}`
          ) {
            console.log('========멈춰==========')
            this.t = b
          }
          console.log(
            this.IN_APP_GAME.scenarioList[this.s].chapters[this.c].initBtn[b]
          )
        }
        this.inApp =
          this.IN_APP_GAME.scenarioList[this.s].chapters[this.c].cuts[
            'cut' + e
          ].list
      } else {
        console.log('객관식패스')
        this.inApp =
          this.IN_APP_GAME.scenarioList[this.s].chapters[this.c].cuts[
            this.initBtn
          ].list
      }

      console.log(
        this.cutType,
        '=============================',
        this.inApp.cutType
      )
      this.cutType = this.inApp.cutType
      if (this.inApp.sr) {
        const s = new Audio(`${process.env.VUE_APP_IMAGE}/sr/${this.inApp.sr}`)
        s.play()
      }
      if (this.inApp.cutType === 1) {
        console.log('대사')
      }
      if (this.inApp.cutType === 2) {
        console.log('나레이션')
      }
      if (this.inApp.cutType === 3) {
        // this.isLoading = true
        console.log('객관식', e)
      }
      if (this.inApp.cutType === 4) {
        console.log('주관식', this.inApp.answer)
      }
    },
    updateEndingGame(e) {
      // 챕터 로딩
      console.log(this.IN_APP_GAME, this.displayPreview, '------------')
      if (this.t === 0) {
        if (this.inAllStart === true) {
          this.srPlay.forEach((element) => {
            console.log(element.pause())
          })
          // bgm 재생
          const soundUrl = `${process.env.VUE_APP_IMAGE}/bgm/${
            this.IN_APP_GAME.endingList[this.s].chapters[this.c].bgm
          }`
          // this.audioBgm(soundUrl).puase()
          this.audioBgm(soundUrl, this.s + 1, this.c + 1)
          this.srPlay[this.s + 1 + this.c + 1].play()
          console.log('=========BGM START===========')
        }

        this.$refs.loadingChater.classList.add('active')
        console.log(
          this.IN_APP_GAME.endingList[this.s].scenarioTitle,
          this.IN_APP_GAME.endingList[this.s].chapters[this.c].title
        )
        document.getElementById('ST').innerText =
          this.IN_APP_GAME.endingList[this.s].scenarioTitle
        document.getElementById('CT').innerText =
          this.IN_APP_GAME.endingList[this.s].chapters[this.c].title
        this.isLoading = true
        setTimeout(() => {
          this.$refs.loadingChater.classList.remove('active')
          // this.$refs.loadingChater.style = 'display:none'
          this.isLoading = false
        }, 3000)
      }
      this.initBtn =
        this.IN_APP_GAME.endingList[this.s].chapters[this.c].initBtn[this.t]
      if (e && e !== null) {
        console.log('객관식')
        // this.isLoading = true
        for (
          let b = 0;
          b <
          this.IN_APP_GAME.endingList[this.s].chapters[this.c].initBtn.length;
          b++
        ) {
          if (
            this.IN_APP_GAME.endingList[this.s].chapters[this.c].initBtn[b] ===
            `cut${e}`
          ) {
            console.log('========멈춰==========')
            this.t = b
          }
          console.log(
            this.IN_APP_GAME.endingList[this.s].chapters[this.c].initBtn[b]
          )
        }
        this.inApp =
          this.IN_APP_GAME.endingList[this.s].chapters[this.c].cuts[
            'cut' + e
          ].list
      } else {
        console.log('객관식패스')
        this.inApp =
          this.IN_APP_GAME.endingList[this.s].chapters[this.c].cuts[
            this.initBtn
          ].list
      }
      console.log(this.cutType, '=============================')
      this.cutType = this.inApp.cutType
      if (this.inApp.sr) {
        const s = new Audio(`${process.env.VUE_APP_IMAGE}/sr/${this.inApp.sr}`)
        s.play()
      }
      if (this.inApp.cutType === 1) {
        console.log('대사')
      }
      if (this.inApp.cutType === 2) {
        console.log('나레이션')
      }
      if (this.inApp.cutType === 3) {
        this.isLoading = true
        console.log('객관식', e)
        return
      }
      if (this.inApp.cutType === 4) {
        console.log('주관식', this.inApp.answer)
      }
    },
    audioBgm(soundUrl, s, c) {
      this.srPlay[s + c] = new Audio(soundUrl)
      // s.stop()
      this.srPlay[s + c].loop = true
      // setTimeout(() => {
      //   s.pause()
      // }, 4000)
      return this.srPlay
    },
    introAutio() {},
    pointUpdate(name, point, type) {
      if (name && point && type) {
        this.gamePoint.forEach((e, i) => {
          if (e.name === name) {
            if (type === 'P') {
              this.gamePoint[i].point =
                Number(this.gamePoint[i].point) + Number(point)
            } else {
              this.gamePoint[i].point =
                Number(this.gamePoint[i].point) - Number(point)
            }
          }
        })
        // if(type === "P") {
      } else {
        console.log('포인트 미정산')
      }
      // }
    },
    onclickDisplayShow(name) {
      this.displayPreview = false
      console.log(this.displayPreview, '--------------------')

      switch (name) {
        case 'displayIntro':
          this.$refs.displayGame.style = 'display:none'
          this.$refs.displayProfile.style = 'display:none'
          this.$refs.displayIntro.style = 'display:block'
          break
        case 'displayGame':
          this.$refs.displayIntro.style = 'display:none'
          this.$refs.displayGame.style = 'display:block'
          this.inAllStart = true
          if (this.introAudio) {
            this.introAudio.pause()
          }
          this.updateGame()
          break
        case 'displayProfile':
          this.$refs.displayIntro.style = 'display:none'
          // this.$refs.displayProfileDetail.style = 'display:none'
          this.$refs.displayProfile.style = 'display:block'
          break
        case 'displayProfileDetail':
          this.$refs.displayProfile.style = 'display:none'
          this.$refs.displayProfileDetail.style =
            'display:block;background-color:#ffda72'
          break
      }

      console.log(this.displayPreview)
    },
    loadingText() {
      // const text = [
      //   '시나리오 펼치는중',
      //   '챕터 펼치는중',
      //   '컷을 불러오는 중',
      //   '노력하는 중',
      // ]
      const text = ['노력하는 중', '노력하는 중', '노력하는 중', '노력하는 중']
      return text[Math.floor(Math.random() * 4)] + '...'
    },
    windowColor() {
      let style = ''
      if (this.IN_APP_GAME.uiSet) {
        if (this.IN_APP_GAME.uiSet.windowColor) {
          style += `background:${this.IN_APP_GAME.uiSet.windowColor};`
        }
        if (this.IN_APP_GAME.uiSet.strokeColor) {
          style += `outline : ${this.IN_APP_GAME.uiSet.border}px solid ${this.IN_APP_GAME.uiSet.strokeColor};`
        }
        if (this.IN_APP_GAME.uiSet.round) {
          style += `border-radius:${this.IN_APP_GAME.uiSet.round}px;`
        }
        if (this.IN_APP_GAME.uiSet.shadowColor) {
          style += `box-shadow: ${this.IN_APP_GAME.uiSet.x}px ${this.IN_APP_GAME.uiSet.y}px 0 ${this.IN_APP_GAME.uiSet.shadowColor};`
        }
      }
      console.log(style)
      return style
    },
    // 주관식
    onClickSubjectiveQuestion() {
      // console.log(
      //   this.answer,
      //   this.inApp.questionsPoint[0].nextBtn,
      //   '주관식 처리'
      // )
      // this.updateGame(this.inApp.questionsPoint[e].nextBtn)

      if (this.inApp.answer === this.answer) {
        // return console.log('정답', this.inApp)
        if (this.inApp.questionsPoint[0].pointType === 'P') {
          console.log('포인트 증가')
          for (let i = 0; i < this.gamePoint.length; i++) {
            if (
              this.gamePoint[i].name === this.inApp.questionsPoint[0].pointCr
            ) {
              this.gamePoint[i].point =
                Number(this.gamePoint[i].point) +
                Number(this.inApp.questionsPoint[0].point)
            }
          }
          //  this.gamePoint[i].point =
          //                 Number(this.gamePoint[i].point) + Number(this.inApp.point)
        } else {
          console.log('포인트 감소')
        }
        if (this.inApp.questionsPoint[0].nextBtn) {
          // this.inApp =
          //   this.IN_APP_GAME.scenarioList[this.s].chapters[this.c].cuts[
          //     'cut' + this.inApp.questionsPoint[0].nextBtn
          //   ].list
          console.log('********************************')
          this.updateGame(this.inApp.questionsPoint[0].nextBtn)
        }
      }

      // for (let i = 0; i < this.gamePoint.length; i++) {
      //   if (this.gamePoint[i].name === this.inApp.pointCr) {
      //     if (this.inApp.answer === this.answer) {
      //       console.log(
      //         '정답',
      //         this.answer,
      //         this.inApp.questionsPoint[0].nextBtn
      //       )
      //       if (this.inApp.pointType === 'P') {
      //         this.gamePoint[i].point =
      //           Number(this.gamePoint[i].point) + Number(this.inApp.point)
      //       } else {
      //         this.gamePoint[i].point =
      //           Number(this.gamePoint[i].point) - Number(this.inApp.point)
      //       }
      //       if (this.inApp.questionsPoint[0].nextBtn) {
      //         this.inApp =
      //           this.IN_APP_GAME.scenarioList[this.s].chapters[this.c].cuts[
      //             'cut' + this.inApp.questionsPoint[0].nextBtn
      //           ].list
      //         console.log('********************************')
      //         return this.updateGame()
      //       }
      //     }
      //   }
      // }

      console.log(this.gamePoint)
      this.nextGame()
    },
    onLoadAssetsImage(v, f) {
      if (f === 'logo') {
        return `${process.env.VUE_APP_IMAGE}/${f}/${v}.png`
      }
      return `${process.env.VUE_APP_IMAGE}/${f}/${v}`
    },
    innerHeight() {
      const vh = window.innerHeight * 0.01
      return document.documentElement.style.setProperty('--vh', `${vh}px`)
    },
  },
}
</script>

<style></style>
