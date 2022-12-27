<template>
  <div
    v-loading="loading"
    :element-loading-text="loadingText()"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
    class="preview-wrap"
  >
    <div class="web-left">광고영역</div>
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
          v-if="inApp.questionsText[0]"
          type="button"
          class="btn"
          @click="onClickQuestions(0)"
        >
          {{ inApp.questionsText[0] }}
        </button>
        <button
          v-if="inApp.questionsText[1]"
          type="button"
          class="btn"
          @click="onClickQuestions(1)"
        >
          {{ inApp.questionsText[1] }}
        </button>
        <button
          v-if="inApp.questionsText[2]"
          type="button"
          class="btn"
          @click="onClickQuestions(2)"
        >
          {{ inApp.questionsText[2] }}
        </button>
      </div>
      <div v-if="cutType === 4" class="answer answer-subjective">
        <div class="text">{{ inApp.subjectiveQuestion }}</div>
        <div class="input-wrap">
          <input
            v-model="answer"
            type="text"
            class="input-text"
            placeholder="주관식 답변을 입력해주세요"
          />
          <button
            type="button"
            class="button"
            @click="onClickSubjectiveQuestion"
            @keyup.enter="onClickSubjectiveQuestion"
          >
            입력
          </button>
        </div>
      </div>
      <!-- 인트로화면 -->
      <div
        v-show="displayPreview"
        ref="displayIntro"
        class="preview-con preview-intro"
      >
        <div class="preview-intro--background">
          <img
            src="https://mblogthumb-phinf.pstatic.net/MjAyMDAyMDNfOTcg/MDAxNTgwNjY4MzA1OTQ5.e9NJgX23nV_5ZM4Bn8LN-KQyJ2ZxsVuR5HZpJPb_TMMg.S8LQwAn8Q03YQVPvbVrCSdut5GqudOXLObvrWWzZSxcg.JPEG.westar4501/2%EC%9B%94_%EB%B0%B0%EA%B2%BD%ED%99%94%EB%A9%B4_se.jpg?type=w800"
            alt="background"
          />
        </div>
        <div class="preview-intro--logo">
          <img src="~/static/images/logo.svg" alt="logo" />
        </div>
        <div class="preview-intro--menu">
          <button
            type="button"
            class="btn"
            @click="onclickDisplayShow('displayGame')"
          >
            시작하기
          </button>
          <button type="button" class="btn">불러오기</button>
          <button
            type="button"
            class="btn"
            @click="onclickDisplayShow('displayProfile')"
          >
            등장인물
          </button>
          <button type="button" class="btn">갤러리</button>
        </div>
        <div class="preview-intro--copy">ⓒproject koo</div>
      </div>
      <!-- 게임화면 -->
      <div
        v-show="displayPreview"
        ref="displayGame"
        class="preview-con preview-img"
        @click="nextGame"
      >
        <img v-if="inApp.bg" :src="inApp.bg" alt="" class="background" />
        <div v-if="inApp.cr && !inApp.cr2" class="character-1">
          <img :src="inApp.cr" alt="" class="character right" />
        </div>
        <div v-if="inApp.cr2" class="character-2">
          <img :src="inApp.cr" alt="" class="character right" />
          <img :src="inApp.cr2" alt="" class="character right" />
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
          <p v-if="cutType === 3" class="text">
            {{
              IN_APP_GAME.scenarioList[s].chapters[c].cuts[
                IN_APP_GAME.scenarioList[s].chapters[c].initBtn[t - 1]
              ].list.text
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
        v-show="displayPreview"
        ref="displayProfile"
        class="preview-con preview-profile"
      >
        <div class="preview-profile--top">
          <button
            type="button"
            class="btn back"
            @click="onclickDisplayShow('displayIntro')"
          >
            뒤로
          </button>
          <div class="title">등장인물</div>
        </div>
        <ul class="preview-profile--list">
          <li class="item" @click="onclickDisplayShow('displayProfileDetail')">
            <img :src="inApp.cr" alt="" />
            <span class="name">{{ inApp.crName }}</span>
          </li>
        </ul>
      </div>
      <div
        v-show="displayPreview"
        ref="displayProfileDetail"
        class="preview-con preview-profile detail"
      >
        <button
          type="button"
          class="btn close"
          @click="onclickDisplayShow('displayProfile')"
        >
          닫기
        </button>
        <p class="name">{{ inApp.crName }}</p>
        <img :src="inApp.cr" alt="" class="character" />
        <p class="profile">
          {{ inApp.text }}
        </p>
      </div>
      <img
        src="~/static/images/mockup.png"
        alt="mockup"
        class="preview-mockup"
      />
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
      loading: true,
      game: [],
      s: 0,
      c: 0,
      t: 0,
      answer: '',
      isEnding: false,
      gamePoint: [],
      gamePointCr: {},
      cutType: '',
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
    }
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

            this.updateGame()

            this.$refs.displayIntro.style = 'display:block'
            this.loading = false
          }, 3000)
        }
      },
      immediate: true,
    },
  },
  mounted() {
    // console.log(appData)
    this.MUTATIONS_PROJECT(this.$route.query.projectKey)
    this.paramsList.type = 'develop'
    this.paramsList.secretKey = this.PROJECT_ID
    this.paramsList.user_idx = kooLogin('user_idx')
    this.paramsList.apiKey = process.env.API_KEY
    this.paramsList.mode = 'web'
    this.ACTION_AXIOS_GET(this.paramsList)
    // http://localhost:9001/preview?projectKey=688787d8ff144c502c7f5cffaafe2cc588d86079f9de88304c26b0cb99ce91c6
  },
  methods: {
    ...mapMutations(['MUTATIONS_PROJECT']),
    ...mapActions(['ACTION_AXIOS_GET', 'ACTION_AXIOS_POST']),
    nextGame(e) {
      if (this.isEnding === false) {
        this.t++
        // console.log(this.IN_APP_GAME.scenarioList[this.s].chapters[this.c].length)
        // 컷 구분

        console.log(this.s, this.c, this.t)
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
        console.log('엔딩')
      }
    },
    onClickQuestions(e) {
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
      this.initBtn =
        this.IN_APP_GAME.scenarioList[this.s].chapters[this.c].initBtn[this.t]
      if (e && e !== null) {
        console.log('객관식')
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
      console.log(this.cutType, '=============================')
      this.cutType = this.inApp.cutType
      if (this.inApp.sr) {
        const s = new Audio(this.inApp.sr)
        s.play()
      }
      if (this.inApp.cutType === 1) {
        console.log('대사')
      }
      if (this.inApp.cutType === 2) {
        console.log('나레이션')
      }
      if (this.inApp.cutType === 3) {
        console.log('객관식', e)
        return
      }
      if (this.inApp.cutType === 4) {
        console.log('주관식')
      }
    },

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
      console.log(this.displayPreview)
      switch (name) {
        case 'displayIntro':
          this.$refs.displayGame.style = 'display:none'
          this.$refs.displayProfile.style = 'display:none'
          this.$refs.displayIntro.style = 'display:block'
          break
        case 'displayGame':
          this.$refs.displayIntro.style = 'display:none'
          this.$refs.displayGame.style = 'display:block'
          break
        case 'displayProfile':
          this.$refs.displayIntro.style = 'display:none'
          this.$refs.displayProfileDetail.style = 'display:none'
          this.$refs.displayProfile.style = 'display:block'
          break
        case 'displayProfileDetail':
          this.$refs.displayProfile.style = 'display:none'
          this.$refs.displayProfileDetail.style = 'display:block'
          break
      }

      console.log(this.displayPreview)
    },
    loadingText() {
      const text = [
        '시나리오 펼치는중',
        '챕터 펼치는중',
        '컷을 불러오는 중',
        '노력하는 중',
      ]
      return text[Math.floor(Math.random() * 4)] + '...'
    },
    windowColor() {
      let style = ''
      if (this.IN_APP_GAME.uiSet) {
        if (
          this.IN_APP_GAME.uiSet.windowColor &&
          this.IN_APP_GAME.uiSet.windowColor.rgba
        ) {
          style += `background:rgba(${this.IN_APP_GAME.uiSet.windowColor.rgba.r},${this.IN_APP_GAME.uiSet.windowColor.rgba.g},${this.IN_APP_GAME.uiSet.windowColor.rgba.b},${this.IN_APP_GAME.uiSet.windowColor.rgba.a});`
        }
        if (
          this.IN_APP_GAME.uiSet.strokeColor &&
          this.IN_APP_GAME.uiSet.strokeColor.rgba
        ) {
          style += `outline : ${this.IN_APP_GAME.uiSet.border}px solid rgba(${this.IN_APP_GAME.uiSet.strokeColor.rgba.r},${this.IN_APP_GAME.uiSet.strokeColor.rgba.g},${this.IN_APP_GAME.uiSet.strokeColor.rgba.b},${this.IN_APP_GAME.uiSet.strokeColor.rgba.a});`
        }
        if (this.IN_APP_GAME.uiSet.round) {
          style += `border-radius:${this.IN_APP_GAME.uiSet.round}px;`
        }
        if (
          this.IN_APP_GAME.uiSet.shadowColor &&
          this.IN_APP_GAME.uiSet.shadowColor.rgba
        ) {
          style += `box-shadow: ${this.IN_APP_GAME.uiSet.x}px ${
            this.IN_APP_GAME.uiSet.y
          }px rgb(${this.IN_APP_GAME.uiSet.shadowColor.rgba.r},${
            this.IN_APP_GAME.uiSet.shadowColor.rgba.g
          },${this.IN_APP_GAME.uiSet.shadowColor.rgba.b},${
            Number(this.IN_APP_GAME.uiSet.shadowColor.rgba.a) * 100
          }%);`
        }
      }
      console.log(style)
      return style
    },
    // 주관식
    onClickSubjectiveQuestion() {
      console.log(this.answer, '주관식 처리')

      for (let i = 0; i < this.gamePoint.length; i++) {
        if (this.gamePoint[i].name === this.inApp.pointCr) {
          if (this.inApp.pointType === 'P') {
            this.gamePoint[i].point =
              Number(this.gamePoint[i].point) + Number(this.inApp.point)
          } else {
            this.gamePoint[i].point =
              Number(this.gamePoint[i].point) - Number(this.inApp.point)
          }
        }
      }
      console.log(this.gamePoint)
      this.nextGame()
    },
  },
}
</script>

<style></style>
