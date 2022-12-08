<template>
  <div class="insert">
    {{ CUT_CODE }}
    <div v-if="!SCENE_CODE" class="insert-dim">챕터를 선택하세요</div>
    <div class="setting">
      <ImageController />
      <div class="setting-talk">
        <div class="setting-tit">대화 설정 {{ CUT_CODE }}</div>
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
          v-if="SCENE_DATA_CHARACTER && SCENE_DATA_CHARACTER.jsonData"
          :options="swiperOptionSelectCharacter"
          class="tab-list type2"
        >
          <swiper-slide
            v-for="(v, i) in SCENE_DATA_CHARACTER.jsonData"
            :key="i"
            class="tab-list--item"
          >
            <label class="radio" @change="onCiickDataCr(v.name)">
              <input
                type="radio"
                name="character"
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
            v-if="cutType !== 4"
            placeholder="TAB 키를 눌러 대사를 바로 추가할 수 있습니다.
인물의 대화를 입력해 주세요"
            rows="3"
            :value="PREVIEW.data.text"
            @input="onInputDataText"
          ></textarea>
          <textarea v-else rows="3"></textarea>
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
                  :key="i"
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
                저장
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
              <select v-if="SCENE_DATA" class="input-select">
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
              <select class="input-select">
                <option>선택안함</option>
                <option>CUT1</option>
                <option>CUT2</option>
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
        <button class="button lg btn-primary" @click="onSubmitCutData">저장</button>
        <button
          v-if="CUT_LIST.idx && CUT_LIST.idx.length > 0"
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
        <span class="scenario">시나리오 1장</span>
        <span class="chapter">챕터 1</span>
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
          :key="i"
          class="cut-list--item"
        >
          <div @click="onClickCutPush(i)">
            <span v-if="i === 0" class="active-sign"></span>
            <div class="tit">{{ CUT_LIST.jsonData.length - i }} CUT</div>
            <ul class="preview-list">
              <li class="preview-list--item">
                <img :src="v.cr" alt="" />
              </li>
              <li class="preview-list--item">
                <img :src="v.bg" alt="" />
              </li>
              <li v-if="v.effect === 'vibration'" class="preview-list--item">
                흔들
              </li>
              <li class="preview-list--item">SD</li>
            </ul>
            <div class="state">
              <span class="badge text-bg-primary">일반대사</span>
              <span class="badge text-bg-red">{{ v.crName }}</span
              ><br />
              <span class="badge text-bg-pink">이벤트</span>
              <span class="text">시나리오 1장</span>
              <span class="text">챕터1</span>
              <span class="text">CUT 5</span>
            </div>
            <div class="text-preview">
              {{ v.text }}
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
      },

      cutListShow: false,
      pointSettingShow: false,
      scenarioSettingShow: false,
      cutType: 1,
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
      'ASSETS',
      'SCENE_DATA_CHARACTER',
      'PREVIEW',
      'PROJECT_ID',
      'CUT_LIST',
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
      this.cutType = type
    },
    slideTo(index) {
      console.log(this.$refs.cutList)
      this.$refs.cutList.slideTo(index - 1, 0)
    },
    onClickRightContentShow() {
      this.rightContentShow = !this.rightContentShow
    },
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
    onSubmitCutDataAdd() {
      this.rowIdx = this.CUT_LIST.idx
      // rowIdx.reverse()
      this.rowIdx.splice(this.CUT_CODE, 0, 'ADD')
      console.log(this.CUT_CODE, this.rowIdx)
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
      if (this.CUT_LIST.idx) {
        this.params.idxRow = JSON.stringify(this.CUT_LIST.idx)
      }
      this.params.secretKey = this.PROJECT_ID
      this.params.user_idx = kooLogin('user_idx')
      this.params.apiKey = process.env.API_KEY
      this.params.s_code = this.SCENE_CODE
      this.paramsPreview.cutType = this.cutType
      this.paramsPreview.code = this.SCENE_CODE
      this.paramsPreview.bg = this.PREVIEW.img.bg
      this.paramsPreview.cr = this.PREVIEW.img.cr
      this.paramsPreview.cr2 = this.PREVIEW.img.cr2
      this.paramsPreview.crName = this.PREVIEW.data.cr
      this.paramsPreview.effect = this.PREVIEW.data.effect
      this.paramsPreview.text = this.PREVIEW.data.text.replaceAll('\n', '||n')
      this.params.previewData = JSON.stringify(this.paramsPreview)
      console.log('onSubmitCutData', this.params)
      this.ACTION_AXIOS_GET(this.params)
      // this.MUTATIONS_CHAPTER_DEATILE_INIT()
    },
    onClickCutPush(e) {
      console.log(e)
      this.MUTATIONS_CUT_LIST_GET_DATA_DETAIL(e)
    },
    onWatchTextRowLimit(e) {},
  },
}
</script>

<style>
</style>
