<template>
  <div class="insert">
    <div v-if="!SCENE_CODE" class="insert-dim">챕터를 선택하세요</div>
    <div class="setting">
      <button type="button" class="button btn-pink delete-btn">삭제</button>
      <ImageController />
      <div class="setting-talk">
        <div class="setting-tit">대화 설정 {{ SCENE_INDEX }}</div>
        <div class="tab-list">
          <button
            type="button"
            class="tab-list--btn"
            :class="{ active: cutType === 1 }"
            @click="onClickChangeCutType(1)"
          >
            대사
          </button>
          <button
            type="button"
            class="tab-list--btn"
            :class="{ active: cutType === 2 }"
            @click="onClickChangeCutType(2)"
          >
            나레이션
          </button>
          <button
            type="button"
            class="tab-list--btn"
            :class="{ active: cutType === 3 }"
            @click="onClickChangeCutType(3)"
          >
            객관식
          </button>
          <button
            type="button"
            class="tab-list--btn"
            :class="{ active: cutType === 4 }"
            @click="onClickChangeCutType(4)"
          >
            주관식
          </button>
        </div>
        <swiper
          v-if="
            SCENE_DATA_CHARACTER &&
            SCENE_DATA_CHARACTER.jsonData &&
            cutType === 1
          "
          :options="swiperOptionSelectCharacter"
          class="tab-list type2"
        >
          <swiper-slide
            v-for="(v, i) in SCENE_DATA_CHARACTER.jsonData"
            :key="'SCENE_DATA_CHARACTER' + i"
            class="tab-list--item"
          >
            <label class="radio" @change="onCiickDataCr(v.name)">
              <input
                type="radio"
                name="character"
                :checked="v.name === PREVIEW.data.cr"
                :value="SCENE_DATA_CHARACTER.idx[i]"
              />
              <span>{{ v.name }}</span>
            </label>
          </swiper-slide>
          <div class="swiper-scrollbar"></div>
        </swiper>
        <label v-if="cutType === 4" class="label">질문</label>
        <div v-if="cutType === 4" class="insert-wrap">
          <textarea rows="3"></textarea>
          <div class="insert-set">
            <button type="button" class="btn sound">사운드 설정</button>
            <div class="set sound-set"></div>
          </div>
        </div>
        <label v-if="cutType === 4" class="label">정답</label>
        <div class="insert-wrap">
          <textarea
            v-if="cutType === 1"
            placeholder="인물의 대화를 입력해 주세요"
            rows="3"
            :value="PREVIEW.data.text"
            @input="onInputDataText"
          ></textarea>
          <textarea
            v-if="cutType === 2"
            placeholder="나레이션을 입력해 주세요"
            rows="3"
            :value="PREVIEW.data.narration"
            @input="onInputDataNarration"
          ></textarea>
          <!-- <textarea
            v-if="cutType === 3"
            placeholder="객관식의 답변을 작성해 주세요"
            rows="3"
            :value="PREVIEW.data.narration"
            @input="onInputDataNarration"
          ></textarea> -->
          <!-- <textarea v-else rows="3"></textarea> -->
          <div class="insert-set">
            <button type="button" class="btn sound">사운드 설정</button>
            <div class="set sound-set"></div>
            <button
              v-show="!pointSettingShow"
              type="button"
              class="btn point"
              @click="onClickPointSetting('set')"
            >
              포인트 설정
            </button>
            <div v-show="pointSettingShow" class="set point-set">
              <select
                v-if="SCENE_DATA_CHARACTER && SCENE_DATA_CHARACTER.jsonData"
                class="input-select"
              >
                <option
                  v-for="(v, i) in SCENE_DATA_CHARACTER.jsonData"
                  :key="'SCENE_DATA_CHARACTER' + i"
                >
                  {{ v.name }}
                </option>
              </select>
              <select v-else disabled class="input-select">
                <option>캐릭터 없음</option>
              </select>
              <input type="number" class="input-number" />
              <span class="text">포인트</span>
              <select class="input-select">
                <option>증가</option>
                <option>감소</option>
              </select>
              <button
                type="button"
                class="save"
                @click="onClickPointSetting('save')"
              >
                추가
              </button>
            </div>
            <button
              v-show="!scenarioSettingShow"
              type="button"
              class="btn scenario"
              @click="onClickScenarioSetting('set')"
            >
              시나리오 연결
            </button>
            <div v-show="scenarioSettingShow" class="set scenario-set">
              <!-- <select v-if="SCENE_DATA" class="input-select">
                <option
                  v-for="(v, i) in SCENE_DATA"
                  :key="i"
                  :value="v.timestamp"
                >
                  {{ v.tit }}
                </option>
              </select>
              <select v-else disabled class="input-select">
                <option>시나리오 없음</option>
              </select>
              <select class="input-select">
                <option>챕터2</option>
                <option>챕터2</option>
              </select>
              eventCut-->
              <select
                v-if="CUT_LIST && CUT_LIST.jsonData"
                class="input-select"
                :value="eventCut"
              >
                <option :value="''">선택안함</option>
                <option
                  v-for="(v, i) in CUT_LIST.jsonData"
                  :key="CUT_LIST.idx[i]"
                  :value="CUT_LIST.idx[i]"
                >
                  {{ CUT_LIST.jsonData.length - i }}
                </option>
              </select>
              <button
                type="button"
                class="save"
                @click="onClickScenarioSetting('save')"
              >
                저장
              </button>
            </div>
          </div>
        </div>
        <button v-if="cutType === 3" type="button" class="cut-add"></button>
      </div>
      <div class="text-center">
        <button
          v-if="CUT_CODE === 0"
          class="button lg btn-primary"
          @click="onSubmitCutData"
        >
          대사 추가
        </button>
        <button class="button lg btn-grey" @click="onSubmitCutDataUpdate">
          수정
        </button>
        <button
          v-if="CUT_LIST.idx && CUT_LIST.idx.length > 0 && CUT_CODE > 0"
          class="button lg btn-blue"
          @click="onSubmitCutDataAdd"
        >
          다음컷에 추가
        </button>
      </div>
    </div>
    <div class="right" :class="{ fold: rightContentShow === true }">
      <button
        type="button"
        class="btn-fold"
        :class="{ active: rightContentShow === true }"
        @click="onClickRightContentShow()"
      ></button>
    </div>
    <div class="cut" :class="{ fold: cutListShow === false }">
      <div class="cut-tit">
        <span v-if="SCENE_INDEX !== null" class="scenario">{{
          SCENE_DATA[SCENE_INDEX].tit
        }}</span>
        <span
          v-if="SCENE_INDEX !== null && CHAPTER_INDEX !== null"
          class="chapter"
          >{{ SCENE_DATA[SCENE_INDEX].chapters[CHAPTER_INDEX].tit }}</span
        >
        <button
          type="button"
          class="fold-btn"
          @click="cutListShow = !cutListShow"
        >
          <span v-if="cutListShow" class="text">접기</span>
          <span v-else class="text">펼치기</span>
        </button>
      </div>
      <!-- <div>
        <button @click="slideTo(1)">Slide 1</button>
        <button @click="slideTo(50)">Slide 50</button>
        <button @click="slideTo(100)">Slide 100</button>
      </div> -->
      <swiper
        v-if="CUT_LIST"
        v-show-slide="cutListShow"
        :options="swiperOptionCutList"
        class="cut-list"
      >
        <swiper-slide
          v-for="(v, i) in CUT_LIST.jsonData"
          :key="'cutList' + i"
          class="cut-list--item"
        >
          <div @click="onClickCutPush(i)">
            <span v-if="i === CUT_CODE" class="active-sign"></span>
            <div class="tit">{{ CUT_LIST.jsonData.length - i }} CUT</div>
            <ul class="preview-list">
              <li class="preview-list--item">
                <img v-if="v.cr" :src="v.cr" alt="" />
              </li>
              <li class="preview-list--item">
                <img v-if="v.cr2" :src="v.cr2" alt="" />
              </li>
              <li class="preview-list--item">
                <img v-if="v.bg" :src="v.bg" alt="" />
              </li>
              <li v-if="v.effect === 'vibration'" class="preview-list--item">
                흔들림
              </li>
              <li v-if="v.effect === 'fade'" class="preview-list--item">
                서서히
              </li>
              <li v-if="v.effect === 'right'" class="preview-list--item">
                오른쪽
              </li>
              <li v-if="v.effect === 'left'" class="preview-list--item">
                왼쪽
              </li>
              <li v-if="v.effect === 'bottom'" class="preview-list--item">
                아래
              </li>
              <li v-if="v.sound" class="preview-list--item">SD</li>
            </ul>
            <div class="state">
              <span v-if="v.cutType === 1" class="badge text-bg-primary"
                >일반대사</span
              >
              <span v-if="v.cutType === 2" class="badge text-bg-primary"
                >나레이션</span
              >
              <span v-if="v.cutType === 3" class="badge text-bg-primary"
                >객관식</span
              >
              <span v-if="v.cutType === 4" class="badge text-bg-primary"
                >주관식</span
              >
              <span v-if="v.cutType === 1" class="badge text-bg-red">{{
                v.crName
              }}</span
              ><br />
              <span class="badge text-bg-pink">이벤트</span>
              <span class="text">시나리오 1장</span>
              <span class="text">챕터1</span>
              <span class="text">CUT 5</span>
            </div>
            <div v-if="v.cutType === 1" class="text-preview">
              {{ v.text }}
            </div>
            <div v-if="v.cutType === 2" class="text-preview">
              {{ v.narration }}
            </div>
            <!-- <div v-if="i === 1" class="text-preview">
            Q. 질문을하는데 1 <span class="dot"></span> 이지안+5<br />
            Q. 질문을하는데 1 <span class="dot"></span> 이지안+5<br />
            Q. 질문을하는데 1 <span class="dot"></span> 이지안+5
          </div>
          <div v-if="i === 2" class="text-preview">
            Q. 질문을하는데 1<br />
            <span class="red">+5</span> 이지안<br />
            <span class="blue">-5</span> 이지안
          </div> -->
          </div>
        </swiper-slide>
        <div slot="button-prev" class="swiper-button-prev"></div>
        <div slot="button-next" class="swiper-button-next"></div>
      </swiper>
    </div>
  </div>
</template>

<script>
// SCENE_DATA
import { mapState, mapMutations, mapActions } from 'vuex'
import ImageController from './ImageController.vue'
import { kooLogin } from '~/config/util'
export default {
  components: {
    ImageController,
  },
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
      // cutType: 1,
      rightContentShow: false,
      cutData: [],
      rowIdx: [],
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
      if (type === 'save') this.pointSettingShow = false
    },
    onClickScenarioSetting(type) {
      this.pointSettingShow = false
      this.scenarioSettingShow = true
      if (type === 'save') this.scenarioSettingShow = false
    },
    onClickChangeCutType(type) {
      // this.MUTATIONS_ASSETS_INIT_TEXT()
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
      this.MUTATIONS_CUT_LIST_GET_DATA_DETAIL(e)
    },
    onWatchTextRowLimit(e) {},
    update() {
      this.paramsPreview.cutType = this.cutType
      this.paramsPreview.code = this.SCENE_CODE
      this.paramsPreview.bg = this.PREVIEW.img.bg
      this.paramsPreview.cr = this.PREVIEW.img.cr
      this.paramsPreview.cr2 = this.PREVIEW.img.cr2
      this.paramsPreview.crName = this.PREVIEW.data.cr
      this.paramsPreview.effect = this.PREVIEW.data.effect
      this.paramsPreview.text = this.PREVIEW.data.text.replaceAll('\n', '||n')
      this.paramsPreview.narration = this.PREVIEW.data.narration.replaceAll(
        '\n',
        '||n'
      )
      this.params.previewData = JSON.stringify(this.paramsPreview)
    },
  },
}
</script>

<style>
</style>
