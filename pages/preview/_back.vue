<template>
  <div id="gameMaker">
    <div v-if="start.code === 'intro'">
      INTRO
      <br />
      <button @click="onClickProfileOpen">소개</button>
      <div v-if="start.profile === true" style="background: yellow">
        소개소개
        <br />
        <div v-for="(v, i) in tempData.profileList" :key="i">
          <div>이름 : {{ v.name }} / {{ v.profile }}</div>
        </div>
        <button @click="onClickProfileOpen">닫기</button>
      </div>
      <br />
      <button @click="gameStart">시작</button>
    </div>
    <div v-if="start.code === 'play'">
      <div>
        <!-- {{ scenarioData }} -->
        <br />
        <!-- {{ chaptersData }} -->
        <br />
        {{ play }}
      </div>
      <button @click="gameNextBtn">다음</button>
    </div>
  </div>
</template>

<script>
// import { mapActions, mapState, mapMutations } from 'vuex'
// import { kooLogin } from '~/config/util'
export default {
  components: {},
  validate({ params }) {
    return params.id
  },
  asyncData({ params }) {
    return {
      idx: params.id,
    }
  },
  data() {
    return {
      start: {
        code: 'intro',
        intro: 0,
        profile: false,
        scenario: 0,
        chapters: 0,
        cuts: 0,
      },
      play: {},
      scenarioData: {},
      chaptersData: {},
      tempData: {
        scenarioList: [
          {
            scenarioTitle: '시나리오제목',
            chapters: [
              {
                code: 1670216852415,
                title: '추가된 챕터',
                cuts: {
                  cut1: {
                    list: {
                      bg: 'https://api.school-os.net/game/upload/bg/10.jpg',
                      cr: 'https://api.school-os.net/game/upload/cr/12.png',
                      code: 1670216852415,
                      text: '1-1 1컷',
                      crName: '도훈2',
                      effect: '',
                      cutType: 1,
                    },
                    nextBtn: '2',
                  },
                  cut2: {
                    list: {
                      bg: 'https://api.school-os.net/game/upload/bg/10.jpg',
                      cr: 'https://api.school-os.net/game/upload/cr/12.png',
                      code: 1670216852415,
                      text: '1-1 2컷',
                      crName: '도훈2',
                      effect: '',
                      cutType: 1,
                    },
                    nextBtn: '3',
                  },
                  cut3: {
                    list: {
                      bg: 'https://api.school-os.net/game/upload/bg/10.jpg',
                      cr: 'https://api.school-os.net/game/upload/cr/12.png',
                      code: 1670216852415,
                      text: '1-1 3컷',
                      crName: '도훈2',
                      effect: '',
                      cutType: 1,
                    },
                    nextBtn: '4',
                  },
                  cut4: {
                    list: {
                      bg: 'https://api.school-os.net/game/upload/bg/5.jpg',
                      cr: 'https://api.school-os.net/game/upload/cr/11.png',
                      code: 1670216852415,
                      text: '1-1 4컷',
                      crName: '도훈2',
                      effect: '',
                      cutType: 1,
                    },
                    nextBtn: '5',
                  },
                  cut5: {
                    list: {
                      bg: 'https://api.school-os.net/game/upload/bg/5.jpg',
                      cr: 'https://api.school-os.net/game/upload/cr/8.png',
                      code: 1670216852415,
                      text: '1-1 5컷',
                      crName: '하린2',
                      effect: '',
                      cutType: 1,
                    },
                    nextBtn: '8',
                  },
                  cut8: {
                    list: {
                      bg: 'https://api.school-os.net/game/upload/bg/1.jpg',
                      cr: 'https://api.school-os.net/game/upload/cr/12.png',
                      code: 1670216852415,
                      text: '6컷',
                      crName: '주인공',
                      effect: 'vibration',
                      cutType: 1,
                    },
                    nextBtn: '10',
                  },
                  cut10: {
                    list: {
                      bg: 'https://api.school-os.net/game/upload/bg/5.jpg',
                      cr: 'https://api.school-os.net/game/upload/cr/11.png',
                      code: 1670216852415,
                      text: 'sadasdasd',
                      crName: '도훈2',
                      effect: '',
                      cutType: 1,
                    },
                    nextBtn: null,
                  },
                },
                initBtn: [
                  'cut1',
                  'cut2',
                  'cut3',
                  'cut4',
                  'cut5',
                  'cut8',
                  'cut10',
                ],
              },
            ],
          },
          {
            scenarioTitle: '시나리오제목123ㄴ',
            chapters: [
              {
                code: 1669783026106,
                title: '챕터제목',
                cuts: {
                  cut9: {
                    list: {
                      bg: 'https://api.school-os.net/game/upload/bg/5.jpg',
                      cr: 'https://api.school-os.net/game/upload/cr/9.png',
                      code: 1669783026106,
                      text: '시나리오2-1',
                      crName: '주인공',
                      effect: '',
                      cutType: 1,
                    },
                    nextBtn: null,
                  },
                },
                initBtn: ['cut9'],
              },
              {
                code: 1669783026908,
                title: '챕터제목',
                cuts: {
                  cut11: {
                    list: {
                      bg: 'https://api.school-os.net/game/upload/bg/5.jpg',
                      cr: 'https://api.school-os.net/game/upload/cr/9.png',
                      code: 1669783026908,
                      text: '시나리오2-2',
                      crName: '주인공',
                      effect: '',
                      cutType: 1,
                    },
                    nextBtn: null,
                  },
                },
                initBtn: ['cut11'],
              },
              {
                code: 1669783027328,
                title: '챕터제목',
                cuts: {
                  cut12: {
                    list: {
                      bg: 'https://api.school-os.net/game/upload/bg/5.jpg',
                      cr: 'https://api.school-os.net/game/upload/cr/9.png',
                      code: 1669783027328,
                      text: '시나리오2-3',
                      crName: '주인공',
                      effect: '',
                      cutType: 1,
                    },
                    nextBtn: null,
                  },
                },
                initBtn: ['cut12'],
              },
              {
                code: 1669783027529,
                title: '챕터제목',
                cuts: {
                  cut13: {
                    list: {
                      bg: 'https://api.school-os.net/game/upload/bg/5.jpg',
                      cr: 'https://api.school-os.net/game/upload/cr/9.png',
                      code: 1669783027529,
                      text: '시나리오2-4',
                      crName: '주인공',
                      effect: '',
                      cutType: 1,
                    },
                    nextBtn: null,
                  },
                },
                initBtn: ['cut13'],
              },
              {
                code: 1669783027731,
                title: '챕터제목',
                cuts: {
                  cut14: {
                    list: {
                      bg: 'https://api.school-os.net/game/upload/bg/5.jpg',
                      cr: 'https://api.school-os.net/game/upload/cr/9.png',
                      code: 1669783027731,
                      text: '시나리오2-5',
                      crName: '주인공',
                      effect: '',
                      cutType: 1,
                    },
                    nextBtn: null,
                  },
                },
                initBtn: ['cut14'],
              },
              {
                code: 1669968063930,
                title: '챕터제목',
                cuts: {
                  cut15: {
                    list: {
                      bg: 'https://api.school-os.net/game/upload/bg/5.jpg',
                      cr: 'https://api.school-os.net/game/upload/cr/9.png',
                      code: 1669968063930,
                      text: '시나리오2-6',
                      crName: '주인공',
                      effect: '',
                      cutType: 1,
                    },
                    nextBtn: null,
                  },
                },
                initBtn: ['cut15'],
              },
              {
                code: 1670224033756,
                title: '추가된 챕터',
                cuts: {
                  cut16: {
                    list: {
                      bg: 'https://api.school-os.net/game/upload/bg/5.jpg',
                      cr: 'https://api.school-os.net/game/upload/cr/9.png',
                      code: 1670224033756,
                      text: '시나리오2-7',
                      crName: '주인공',
                      effect: '',
                      cutType: 1,
                    },
                    nextBtn: null,
                  },
                },
                initBtn: ['cut16'],
              },
            ],
          },
          {
            scenarioTitle: '시나리오제목',
            chapters: [
              {
                code: 1669968118890,
                title: '추가된 챕터',
                cuts: {
                  cut17: {
                    list: {
                      bg: 'https://api.school-os.net/game/upload/bg/5.jpg',
                      cr: 'https://api.school-os.net/game/upload/cr/9.png',
                      code: 1669968118890,
                      text: '시나리오2-8',
                      crName: '주인공',
                      effect: '',
                      cutType: 1,
                    },
                    nextBtn: null,
                  },
                },
                initBtn: ['cut17'],
              },
            ],
          },
        ],
        profileList: [
          {
            bg: 'https://api.school-os.net/game/upload/bg/1.jpg',
            cr: 'https://api.school-os.net/game/upload/cr/8.png',
            name: '하린2',
            profile: 'ㅁㅋㅋㅋㅋㅋ',
            position: 'top',
          },
          {
            bg: 'https://api.school-os.net/game/upload/bg/12.jpg',
            cr: 'https://api.school-os.net/game/upload/cr/12.png',
            name: '도훈2',
            profile: '1234',
            position: 'top',
          },
          {
            bg: 'https://api.school-os.net/game/upload/bg/5.jpg',
            cr: 'https://api.school-os.net/game/upload/cr/11.png',
            name: '주인공',
            profile: '1234ㅋㅊㅊㅊ',
            position: 'top',
          },
          {
            bg: 'https://api.school-os.net/game/upload/bg/12.jpg',
            cr: 'https://api.school-os.net/game/upload/cr/9.png',
            name: '테스트',
            profile: '1234568900',
            position: 'top',
          },
          {
            bg: 'https://api.school-os.net/game/upload/bg/1.jpg',
            cr: 'https://api.school-os.net/game/upload/cr/8.png',
            name: 'sdfsd',
            profile: 'sdfsdfsdf',
            position: 'top',
          },
          {
            bg: 'https://api.school-os.net/game/upload/bg/12.jpg',
            cr: 'https://api.school-os.net/game/upload/cr/12.png',
            name: 'ㅁㅁㅁ',
            profile: 'ㅋㅌㅊㅋㅌ',
            position: 'top',
          },
        ],
        intro: {
          bg: 'https://api.school-os.net/game/upload/bg/2.jpg',
          copy: 'ㅁㄴㅇㅁㄴㅇㅁㅇㄴ',
          position: 'TOP',
        },
        introLogo:
          '688787d8ff144c502c7f5cffaafe2cc588d86079f9de88304c26b0cb99ce91c6.png',
      },
    }
  },
  mounted() {
    console.log(this.tempData.scenarioList[0])
  },
  methods: {
    onClickProfileOpen() {
      this.start.profile === true
        ? (this.start.profile = false)
        : (this.start.profile = true)
    },
    gameNextBtn() {
      const nextBtn = 'cut' + this.play.nextBtn
      const chapterLength =
        this.tempData.scenarioList[this.start.scenario].chapters.length
      const scenarioLength = this.tempData.scenarioList.length
      let cutStartData = ''
      if (scenarioLength - 1 === this.start.scenario) {
        return alert('엔딩')
      }
      if (this.play.nextBtn === null) {
        if (chapterLength - 1 === this.start.chapters) {
          this.start.scenario++
          //   챕터 초기화
          this.start.chapters = 0
        } else {
          this.start.chapters++
        }
      }
      console.log(nextBtn, this.start.scenario, this.start.chapters)
      // this.tempData.scenarioList[this.start.scenario].chapters[this.start.chapters]
      const data = this.tempData.scenarioList
      const scenarioData = data[this.start.scenario]
      const chapterData = scenarioData.chapters[this.start.chapters]
      const cutStartID = scenarioData.chapters[this.start.chapters].initBtn[0]
      if (this.play.nextBtn === null) {
        cutStartData = chapterData.cuts[cutStartID]
      } else {
        cutStartData = chapterData.cuts[nextBtn]
      }
      this.play = cutStartData
    },
    gameStart() {
      this.start.code = 'play'
      const data = this.tempData.scenarioList
      const scenarioData = data[this.start.scenario]
      const chapterData = scenarioData.chapters[this.start.chapters]
      const cutStartID = scenarioData.chapters[this.start.chapters].initBtn[0]
      const cutStartData = chapterData.cuts[cutStartID]
      this.scenarioData = scenarioData
      this.chaptersData = chapterData
      this.play = cutStartData
      console.log(data, scenarioData, chapterData, cutStartID, cutStartData)
    },
  },
}
</script>

<style lang="scss">
#gameMaker {
  font-size: 20px;
}
</style>
