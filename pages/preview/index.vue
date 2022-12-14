<template>
  <div class="preview-wrap">
    <div class="web-left">광고영역</div>
    <div class="preview" @click="nextGame">
      <div class="preview-img">
        <img :src="inApp.bg" alt="" class="background" />
        <div class="character-1">
          <img :src="inApp.cr" alt="" class="character right" />
        </div>
        <div class="dialogue">
          <span class="name">{{ inApp.crName }}</span>
          <p class="text">{{ inApp.text }}</p>
        </div>
        <img src="/_nuxt/static/images/mockup.png" alt="" class="mockup" />
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

    this.initBtn =
      this.game.scenarioList[this.s].chapters[this.c].initBtn[this.t]

    this.inApp =
      this.game.scenarioList[this.s].chapters[this.c].cuts[this.initBtn].list
  },
  methods: {
    nextGame() {
      this.t++
      // 컷 구분

      this.updateGame()
    },
    updateGame() {
      this.initBtn =
        this.game.scenarioList[this.s].chapters[this.c].initBtn[this.t]

      this.inApp =
        this.game.scenarioList[this.s].chapters[this.c].cuts[this.initBtn].list
    },
  },
}
</script>

<style></style>
