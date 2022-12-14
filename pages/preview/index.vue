<template>
  <div class="preview-wrap">
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
      <div
        v-if="cutType === 3"
        class="answer answer-multiple"
      >
        <button type="button" class="btn" @click="onClickQuestions(0)">
          {{ inApp.questionsText[0] }}
        </button>
        <button type="button" class="btn" @click="onClickQuestions(1)">
          {{ inApp.questionsText[1] }}
        </button>
        <button type="button" class="btn" @click="onClickQuestions(2)">
          {{ inApp.questionsText[2] }}
        </button>
      </div>
      <!-- 인트로화면 -->
      <div v-show="displayPreview" ref="displayIntro" class="preview-con preview-intro">
        <div class="preview-intro--background">
          <img src="https://mblogthumb-phinf.pstatic.net/MjAyMDAyMDNfOTcg/MDAxNTgwNjY4MzA1OTQ5.e9NJgX23nV_5ZM4Bn8LN-KQyJ2ZxsVuR5HZpJPb_TMMg.S8LQwAn8Q03YQVPvbVrCSdut5GqudOXLObvrWWzZSxcg.JPEG.westar4501/2%EC%9B%94_%EB%B0%B0%EA%B2%BD%ED%99%94%EB%A9%B4_se.jpg?type=w800" alt="background" />
        </div>
        <div class="preview-intro--logo">
          <img src="~/static/images/logo.svg" alt="logo" />
        </div>
        <div class="preview-intro--menu">
          <button type="button" class="btn" @click="onclickDisplayShow('displayGame')">시작하기</button>
          <button type="button" class="btn">불러오기</button>
          <button type="button" class="btn" @click="onclickDisplayShow('displayProfile')">등장인물</button>
          <button type="button" class="btn">갤러리</button>
        </div>
        <div class="preview-intro--copy">ⓒproject koo</div>
      </div>
      <!-- 게임화면 -->
      <div v-show="displayPreview" ref="displayGame" class="preview-con preview-img" @click="nextGame">
        <img v-if="inApp.bg" :src="inApp.bg" alt="" class="background" />
        <div v-if="inApp.cr && !inApp.cr2" class="character-1">
          <img :src="inApp.cr" alt="" class="character right" />
        </div>
        <div v-if="inApp.cr2" class="character-2">
          <img :src="inApp.cr" alt="" class="character right" />
          <img :src="inApp.cr2" alt="" class="character right" />
        </div>

        <div v-if="cutType === 4" class="answer answer-subjective">
          <div class="text">{{ inApp.subjectiveQuestion }}</div>
          <input
            type="text"
            class="input-text"
            placeholder="주관식 답변을 입력해주세요"
          />
        </div>
        <div class="dialogue">
          <span v-if="cutType === 1" class="name">{{ inApp.crName }}</span>
          <p v-if="cutType === 1" class="text">{{ inApp.text }}</p>
          <p v-if="cutType === 3" class="text">
            {{
              game.scenarioList[s].chapters[c].cuts[
                game.scenarioList[s].chapters[c].initBtn[t - 1]
              ].list.text
            }}
          </p>
          <p v-if="cutType === 2" class="text">{{ inApp.narration }}</p>
        </div>
      </div>
      <!-- 등장인물화면 -->
      <div v-show="displayPreview" ref="displayProfile" class="preview-con preview-profile">
        <div class="preview-profile--top">
          <button type="button" class="btn back" @click="onclickDisplayShow('displayIntro')">뒤로</button>
          <div class="title">등장인물</div>
        </div>
        <ul class="preview-profile--list">
          <li class="item" @click="onclickDisplayShow('displayProfileDetail')">
            <img :src="inApp.cr" alt="" />
            <span class="name">{{inApp.crName}}</span>
          </li>
        </ul>
      </div>
      <div v-show="displayPreview" ref="displayProfileDetail" class="preview-con preview-profile detail">
        <button type="button" class="btn close" @click="onclickDisplayShow('displayProfile')">닫기</button>
        <p class="name">{{inApp.crName}}</p>
        <img :src="inApp.cr" alt="" class="character" />
        <p class="profile">
          {{inApp.text}}
        </p>
      </div>
      <img src="~/static/images/mockup.png" alt="mockup" class="preview-mockup" />
    </div>
  </div>
</template>

<script>
import appData from '~/static/test.json'
export default {
  name: 'PreviewIndex',
  data() {
    return {
      game: [],
      s: 1,
      c: 0,
      t: 0,
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
    }
  },
  mounted() {
    console.log(appData)
    this.game = appData
    // 첫 데이터 찾기
    this.game.profileList.forEach((e, i) => {
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
  },
  methods: {
    nextGame(e) {
      if (this.isEnding === false) {
        this.t++
        // console.log(this.game.scenarioList[this.s].chapters[this.c].length)
        // 컷 구분

        console.log(this.s, this.c, this.t)
        if (
          this.game.scenarioList[this.s].chapters[this.c].initBtn.length ===
          this.t
        ) {
          console.log('챕터 끝')
          this.t = 0
          this.c++
          console.log('chpter length', this.initBtn)
          if (this.game.scenarioList[this.s].chapters.length === this.c) {
            this.t = 0
            this.c = 0
            this.s++
            console.log('시나리오 끝')
            if (this.game.scenarioList.length === this.s) {
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
        alert('끝났어유 새로고침해유')
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
      alert(
        `인물 : ${this.inApp.questionsPoint[e].pointCr} / 포인트 ${this.inApp.questionsPoint[e].point}`
      )

      this.nextGame(e)
    },
    cutUpdate(name, point, type) {
      // this.updateGame()
      console.log('cutUpdate', name, point, type)
      if (name && point && type) {
        this.gamePoint.forEach((e, i) => {
          if (e.name === name) {
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
        })
      } else {
        console.log('컷 미정산')
      }
    },
    updateGame(e) {
      this.initBtn =
        this.game.scenarioList[this.s].chapters[this.c].initBtn[this.t]
      if (e && e !== null) {
        console.log('객관식')
        this.inApp =
          this.game.scenarioList[this.s].chapters[this.c].cuts['cut' + e].list
      } else {
        console.log('객관식패스')
        this.inApp =
          this.game.scenarioList[this.s].chapters[this.c].cuts[
            this.initBtn
          ].list
      }

      this.cutType = this.inApp.cutType
      if (this.inApp.cutType === 1) {
        console.log('대사')
      }
      if (this.inApp.cutType === 2) {
        console.log('나레이션')
      }
      if (this.inApp.cutType === 3) {
        console.log('객관식')
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
    onclickDisplayShow(name){
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
    }
  },
}
</script>

<style></style>
