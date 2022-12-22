<template>
  <el-scrollbar class="cut-list--wrap">
    <ul id="activeList" class="cut-list">
      <li
        v-for="(v, i) in CUT_LIST.jsonData"
        :key="'cutList' + i"
        class="cut-list--item"
        :class="{ active: i === 0 }"
        @click="onClickCutPush(i)"
      >
        <div class="thumbnail">
          <div class="thumbnail-wrap">
            <img v-if="v.cr" :src="v.cr" alt="" />
          </div>
          <div class="thumbnail-wrap">
            <img v-if="v.cr2" :src="v.cr2" alt="" />
          </div>
        </div>
        <div class="info">
          <div class="top">
            <span class="name">{{ v.crName }}</span>
            <span v-if="v.cutType === 1" class="category type1">대사</span>
            <span v-if="v.cutType === 2" class="category type2">나레이션</span>
            <span v-else-if="v.cutType === 3" class="category type4"
              >객관식</span
            >
            <span v-else-if="v.cutType === 5" class="category type3"
              >주관식</span
            >
          </div>
          <div v-if="v.cutType === 1" class="text normal">
            {{ v.text }}
          </div>
          <div v-if="v.cutType === 2" class="text normal">
            {{ v.narration }}
          </div>
          <div
            v-if="v.cutType === 3 && v.questionsText[0]"
            class="text answer"
          >
            {{ v.questionsText[0] }}
          </div>
          <div
            v-if="v.cutType === 3 && v.questionsText[1]"
            class="text answer"
          >
            {{ v.questionsText[1] }}
          </div>
          <div
            v-if="v.cutType === 3 && v.questionsText[2]"
            class="text answer"
          >
            {{ v.questionsText[2] }}
          </div>
          <div v-if="v.cutType === 4" class="text question line2">
            {{ v.subjectiveQuestion }}
          </div>
          <div v-if="v.cutType === 4" class="text answer">
            {{ v.answer }}
          </div>
        </div>
      </li>
    </ul>
  </el-scrollbar>
</template>

<script>
// SCENE_DATA
import { mapState, mapMutations, mapActions } from 'vuex'
import { kooLogin } from '~/config/util'
export default {
  components: {},
  data() {
    return {
      params: {},
      paramsPreview: {},
      paramsList: {},
      cutIndex: 0,
      eventCut: 3,
      cuts: [
        {
          index: 0,
          type: '0_1',
        },
      ],

      cutCode: '',
      tempInputData: {
        bg: [],
        cr: [],
        crName: [],
        text: [],
        effect: [],
      }, // input data bind
      sceneData: [],

      swiperOptionSelectCharacter: {
        allowTouchMove: false,
        loop: false,
        slidesPerView: 'auto',
        slidesPerGroup: 4,
        mousewheel: {
          draggable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      },
      swiperOptionCutList: {
        loop: false,
        slidesPerView: 4,
        slidesPerGroup: 4,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      },

      cutListShow: false,
      pointSettingShow: false,
      scenarioSettingShow: false,
      timerSettingShow: false,
      // cutType: 1,
      rightContentShow: false,
      cutData: [],
      rowIdx: [],
      questions: 1,
      questionsText: [],
      questionsPoint: [
        {
          pointType: null,
          pointCr: null,
          point: null,
          nextBtn: null,
        },
        {
          pointType: null,
          pointCr: null,
          point: null,
          nextBtn: null,
        },
        {
          pointType: null,
          pointCr: null,
          point: null,
          nextBtn: null,
        },
      ],
    }
  },
  computed: {
    ...mapState([
      'LOGIN',
      'LOADING',
      'SCENE_DATA',
      'SCENE_CODE',
      'SCENE_INDEX',
      'CHAPTER_INDEX',
      'ASSETS',
      'SCENE_DATA_CHARACTER',
      'PREVIEW',
      'PROJECT_ID',
      'CUT_LIST',
      'cutType',
      'CUT_CODE',
    ]),
  },
  // watch: {
  //   tempInputData: {
  //     handler(value) {
  //       console.log('===========> watch tempInputData', value)
  //     },
  //     immediate: true,
  //   },
  // },
  mounted() {
    // cutList
    // this.$nextTick(() => {
    //   this.SCENE_DATA.forEach((e, i) => {
    //     e.chapters.forEach((v, k) => {
    //       console.log('=================', v)
    //     })
    //   })
    // })
    if (this.SCENE_CODE) {
      this.paramsList.gc_timestamp = this.SCENE_CODE
      this.paramsList.type = 'cutList'
      this.paramsList.secretKey = this.PROJECT_ID
      this.paramsList.user_idx = kooLogin('user_idx')
      this.paramsList.apiKey = process.env.API_KEY
      console.log(this.SCENE_CODE)
    }
  },
  methods: {
    ...mapMutations([
      'MUTATIONS_SCENE_DATA',
      'MUTATIONS_ASSETS_DATA_CR',
      'MUTATIONS_ASSETS_DATA_TEXT',
      'MUTATIONS_CHAPTER_DEATILE_INIT',
      'MUTATIONS_ASSETS_INIT',
      'MUTATIONS_CUT_LIST_GET_DATA_DETAIL',
      'MUTATIONS_CUT_LIST_FIRST',
      'MUTATIONS_CUT_LIST_ADD',
      'MUTATIONS_ASSETS_INIT_TEXT',
      'MUTATIONS_ASSETS_DATA_NARRATION',
      'MUTATIONS_CUT_TYPE',
      'MUTATIONS_PREVIEW_POINT',
      'MUTATIONS_PREVIEW_POINT_CR',
      'MUTATIONS_PREVIEW_POINT_TYPE',
      'MUTATIONS_ASSETS_DATA_QUESTIONS',
      'MUTATIONS_ASSETS_DATA_ANSWER',
      'MUTATIONS_PREVIEW_QUESTIONS_POINT',
      'MUTATIONS_PREVIEW_TIMER',
      'MUTATIONS_ASSETS_DATA_SUBJECTIVE',
      'MUTATIONS_LOADING_INIT',
      'MUTATIONS_PREVIEW_END_TYPE',
      'MUTATIONS_CONTENT_CODE',
    ]),
    ...mapActions(['ACTION_AXIOS_GET', 'ACTION_AXIOS_POST']),
    onClickCutAdd() {
      this.cutIndex++
      this.cuts.push({
        index: this.cutIndex,
        type: this.cutIndex + '_1',
      })
      //   this.$emit(
      //     'myLoadBgImage',
      //     'https://img.lovepik.com/background/20211102/medium/lovepik-banff-national-park-mobile-wallpaper-canada-background-image_400706001.jpg'
      //   )
      //   this.$emit(
      //     'myLoadCrImage',
      //     'https://cdn.pixabay.com/photo/2013/07/12/13/27/man-147091_960_720.png'
      //   )
      //   this.$emit('myLoadText', '')
      //   this.$emit('myLoadFocus', `CUT CODE : ${this.cutIndex}`)
      console.log(this.cutIndex)
    },
    cutDelete(idx) {
      //   this.cuts.splice(idx, 1)
      console.log(idx)
      this.$refs[`cut${idx}`][0].remove()
    },
    onCiickDataCr(e) {
      console.log(e)
      this.MUTATIONS_ASSETS_DATA_CR(e)
    },

    onClickPointSetting(type) {
      this.pointSettingShow = true
      this.scenarioSettingShow = false
      this.timerSettingShow = false
      if (type === 'save') this.pointSettingShow = false
    },
    onClickScenarioSetting(type) {
      this.pointSettingShow = false
      this.scenarioSettingShow = true
      this.timerSettingShow = false
      if (type === 'save') this.scenarioSettingShow = false
    },
    onClickTimerSetting(type) {
      this.pointSettingShow = false
      this.scenarioSettingShow = false
      this.timerSettingShow = true
      if (type === 'save') this.timerSettingShow = false
    },
    onClickChangeCutType(type) {
      // this.MUTATIONS_ASSETS_INIT_TEXT()
      if (type !== 1) this.MUTATIONS_ASSETS_DATA_CR('')
      this.MUTATIONS_CUT_TYPE(type)
    },
    slideTo(index) {
      console.log(this.$refs.cutList)
      this.$refs.cutList.slideTo(index - 1, 0)
    },
    onClickRightContentShow() {
      this.rightContentShow = !this.rightContentShow
    },
    // 대사
    onInputDataText({ target }) {
      // this.onWatchTextRowLimit(target.value)
      const row = target.value.split('\n').length
      if (row > 3) {
        const modifiedText = target.value.split('\n').slice(0, 3)
        target.value = modifiedText.join('\n')
        return alert('대사는 세줄까지 입력 할 수 있습니다')
      }
      this.MUTATIONS_ASSETS_DATA_TEXT(target.value)
    },
    // 나레이션
    onInputDataNarration({ target }) {
      // this.onWatchTextRowLimit(target.value)
      const row = target.value.split('\n').length
      if (row > 3) {
        const modifiedText = target.value.split('\n').slice(0, 3)
        target.value = modifiedText.join('\n')
        return alert('나레이션은 세줄까지 입력 할 수 있습니다')
      }
      this.MUTATIONS_ASSETS_DATA_NARRATION(target.value)
    },
    onSubmitCutDataAdd() {
      this.rowIdx = this.CUT_LIST.idx
      // rowIdx.reverse()
      this.rowIdx.splice(this.CUT_CODE, 0, '@@')
      console.log(this.CUT_CODE, this.rowIdx)
      this.params.type = 'cutInsert'

      this.params.idxRow = JSON.stringify(this.rowIdx)
      this.params.secretKey = this.PROJECT_ID
      this.params.user_idx = kooLogin('user_idx')
      this.params.apiKey = process.env.API_KEY
      this.params.s_code = this.SCENE_CODE
      this.update()
      console.log('onSubmitCutData', this.params)
      this.ACTION_AXIOS_GET(this.params)
      this.cutListShow = true
    },
    onSubmitCutData() {
      // this.paramsPreview.cutType = this.cutType
      // this.paramsPreview.code = this.SCENE_CODE
      // this.paramsPreview.bg = this.PREVIEW.img.bg
      // this.paramsPreview.cr = this.PREVIEW.img.cr
      // this.paramsPreview.cr2 = this.PREVIEW.img.cr2
      // this.paramsPreview.crName = this.PREVIEW.data.cr
      // this.paramsPreview.effect = this.PREVIEW.data.effect
      // this.paramsPreview.text = this.PREVIEW.data.text

      // this.cutData = this.CUT_LIST.jsonData
      // this.cutData.push(this.paramsPreview)
      // console.log(JSON.stringify(this.cutData))
      console.log(
        'this.CUT_LIST.idx',
        this.CUT_LIST,
        this.CUT_LIST.idx,
        this.SCENE_CODE
      )
      this.params.type = 'cutInsert'
      if (!this.CUT_LIST.idx) {
        this.MUTATIONS_CUT_LIST_FIRST()
      } else {
        this.params.idxRow = this.CUT_LIST.idx.unshift('@@')
      }
      this.params.idxRow = JSON.stringify(this.CUT_LIST.idx)
      this.params.secretKey = this.PROJECT_ID
      this.params.user_idx = kooLogin('user_idx')
      this.params.apiKey = process.env.API_KEY
      this.params.s_code = this.SCENE_CODE
      this.update()
      console.log('onSubmitCutData', this.params)
      this.ACTION_AXIOS_GET(this.params)
      // this.MUTATIONS_CHAPTER_DEATILE_INIT()
      this.cutListShow = true
    },
    onSubmitCutDataUpdate() {
      // this.paramsPreview.cutType = this.cutType
      // this.paramsPreview.code = this.SCENE_CODE
      // this.paramsPreview.bg = this.PREVIEW.img.bg
      // this.paramsPreview.cr = this.PREVIEW.img.cr
      // this.paramsPreview.cr2 = this.PREVIEW.img.cr2
      // this.paramsPreview.crName = this.PREVIEW.data.cr
      // this.paramsPreview.effect = this.PREVIEW.data.effect
      // this.paramsPreview.text = this.PREVIEW.data.text

      // this.cutData = this.CUT_LIST.jsonData
      // this.cutData.push(this.paramsPreview)
      // console.log(JSON.stringify(this.cutData))
      console.log(
        'this.CUT_LIST.idx',
        this.CUT_LIST,
        this.CUT_LIST.idx,
        this.SCENE_CODE
      )
      this.params.type = 'cutInsert'
      this.params.mode = 'update'
      this.params.idx = this.CUT_LIST.idx[this.CUT_CODE]
      this.params.secretKey = this.PROJECT_ID
      this.params.user_idx = kooLogin('user_idx')
      this.params.apiKey = process.env.API_KEY
      this.params.s_code = this.SCENE_CODE
      this.update()
      console.log('onSubmitCutData', this.params)
      this.ACTION_AXIOS_GET(this.params)
      // this.MUTATIONS_CHAPTER_DEATILE_INIT()
      this.cutListShow = true
    },
    onClickCutPush(e) {
      console.log(e)
      const liList = document.getElementById('activeList').childNodes
      for (let i = 0; i < liList.length; i++) {
        liList[i].classList.remove('active')
      }
      liList[e].classList.add('active')
      this.MUTATIONS_CONTENT_CODE(5)
      this.MUTATIONS_CUT_LIST_GET_DATA_DETAIL(e)
    },
    onWatchTextRowLimit(e) {},
    onChageQuestionsTimer({ target }) {
      this.MUTATIONS_PREVIEW_TIMER(target.value)
    },
    dataPointUpdate(type, e) {
      console.log(type, e.target.value)
      if (type === 'point') this.MUTATIONS_PREVIEW_POINT(e.target.value)
      if (type === 'pointCr') this.MUTATIONS_PREVIEW_POINT_CR(e.target.value)
      if (type === 'pointType')
        this.MUTATIONS_PREVIEW_POINT_TYPE(e.target.value)
      if (type === 'endType') this.MUTATIONS_PREVIEW_END_TYPE(e.target.value)

      if (
        type !== 'point' &&
        type !== 'pointCr' &&
        type !== 'pointType' &&
        type !== 'endType'
      ) {
        console.log('ARRAY')
        const typeParam = type.substr(0, type.length - 1)
        this.questionsPoint[type.substr(-1)][typeParam] = e.target.value
        console.log(type.substr(-1), this.questionsPoint, typeParam)
        this.MUTATIONS_PREVIEW_QUESTIONS_POINT(this.questionsPoint)
      }
    },
    onInputDataQuestions(array, e) {
      // console.log(array, e.target.value)
      this.questionsText[array] = e.target.value.replaceAll('||n', '\n')
      this.MUTATIONS_ASSETS_DATA_QUESTIONS(this.questionsText)
      console.log(this.questionsText)
    },
    onInputDatAnswer({ target }) {
      this.MUTATIONS_ASSETS_DATA_ANSWER(target.value)
    },
    onInputDataSubjectiveQuestion({ target }) {
      this.MUTATIONS_ASSETS_DATA_SUBJECTIVE(target.value)
    },
    update() {
      this.MUTATIONS_LOADING_INIT()
      this.paramsPreview.cutType = this.cutType
      this.paramsPreview.code = this.SCENE_CODE
      this.paramsPreview.bg = this.PREVIEW.img.bg
      this.paramsPreview.cr = this.PREVIEW.img.cr
      this.paramsPreview.cr2 = this.PREVIEW.img.cr2
      this.paramsPreview.crName = this.PREVIEW.data.cr
      this.paramsPreview.effect = this.PREVIEW.data.effect
      this.paramsPreview.point = this.PREVIEW.data.point
      this.paramsPreview.pointCr = this.PREVIEW.data.pointCr
      this.paramsPreview.pointType = this.PREVIEW.data.pointType
      this.paramsPreview.subjectiveQuestion =
        this.PREVIEW.data.subjectiveQuestion
      this.paramsPreview.answer = this.PREVIEW.data.answer
      this.paramsPreview.questionsTimer = this.PREVIEW.data.questionsTimer
      this.paramsPreview.questionsPoint = this.PREVIEW.data.questionsPoint
      this.paramsPreview.text = this.PREVIEW.data.text.replaceAll('\n', '||n')
      this.paramsPreview.narration = this.PREVIEW.data.narration.replaceAll(
        '\n',
        '||n'
      )
      this.paramsPreview.questionsText = this.questionsText
      if (this.cutType === 1) {
        // this.paramsPreview.text = ''
        this.paramsPreview.answer = ''
        this.paramsPreview.narration = ''
        this.paramsPreview.subjectiveQuestion = ''
        this.paramsPreview.questions = {
          text: ['', '', ''],
        }
      }
      if (this.cutType === 2) {
        this.paramsPreview.text = ''
        this.paramsPreview.answer = ''
        // this.paramsPreview.narration = ''
        this.paramsPreview.subjectiveQuestion = ''
        this.paramsPreview.questions = {
          text: ['', '', ''],
        }
      }
      if (this.cutType === 3) {
        this.paramsPreview.text = ''
        this.paramsPreview.answer = ''
        this.paramsPreview.narration = ''
        this.paramsPreview.subjectiveQuestion = ''
        // this.paramsPreview.questions = {
        //   text: ['', '', ''],
        // }
      }
      if (this.cutType === 4) {
        this.paramsPreview.text = ''
        // this.paramsPreview.answer = ''
        this.paramsPreview.narration = ''
        // this.paramsPreview.subjectiveQuestion = ''
        this.paramsPreview.questions = {
          text: ['', '', ''],
        }
      }
      this.params.previewData = JSON.stringify(this.paramsPreview)
    },
  },
}
</script>

<style></style>
