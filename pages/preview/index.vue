<template>
  <div class="preview-wrap">
    <div class="web-left">광고영역</div>
    <div class="preview" @click="nextGame">
      <div class="preview-img">
        <img v-if="inApp.bg" :src="inApp.bg" alt="" class="background" />
        <div class="character-1">
          <img :src="inApp.cr" alt="" class="character right" />
        </div>
        <!-- <div class="answer answer-multiple">
          <button type="button" class="btn">객관식1</button>
          <button type="button" class="btn">객관식2</button>
          <button type="button" class="btn">객관식3</button>
        </div> -->
        <!-- <div class="answer answer-subjective">
          <div class="text">주관식 질문</div>
          <input type="text" class="input-text" placeholder="주관식 답변을 입력해주세요" />
        </div> -->
        <div class="dialogue">
          <span v-if="cutType === 1" class="name">{{ inApp.crName }}</span>
          <p v-if="cutType === 1" class="text">{{ inApp.text }}</p>
          <p v-if="cutType === 2" class="text">{{ inApp.narration }}</p>
          <p v-if="cutType === 3" class="text">
            {{ inApp.questionsText[0] }}<br />{{ inApp.questionsText[1]
            }}<br />{{ inApp.questionsText[2] }}
          </p>
          <p v-if="cutType === 4" class="text">
            {{ inApp.subjectiveQuestion }}
          </p>
        </div>
        <img src="~/static/images/mockup.png" alt="" class="mockup" />
      </div>
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
      s: 0,
      c: 0,
      t: 0,
      cutType: '',
      initBtn: '',
      nextBtn: '',
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
    }
  },
  mounted() {
    console.log(appData)
    this.game = appData
    // 첫 데이터 찾기

    this.updateGame()
  },
  methods: {
    nextGame() {
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
            return console.log('ending')
          }
        }
      }
      this.updateGame()
    },
    updateGame() {
      this.initBtn =
        this.game.scenarioList[this.s].chapters[this.c].initBtn[this.t]

      this.inApp =
        this.game.scenarioList[this.s].chapters[this.c].cuts[this.initBtn].list

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
  },
}
</script>

<style></style>
