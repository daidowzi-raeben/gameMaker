<template>
  <div class="cut-insert">
    <div class="setting">
      <ImageController />
      <div class="setting-talk">
        <div class="setting-tit">대화 설정</div>
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
          v-if="ASSETS && ASSETS.crList"
          :options="swiperOptionSelectCharacter"
          class="tab-list type2"
        >
          <swiper-slide
            v-for="(v, i) in ASSETS.crList"
            :key="i"
            class="tab-list--item"
          >
            <label class="radio">
              <input type="radio" name="character" :value="v.idx" />
              <span @click="onCiickDataCr(v.name)">{{ v.name }}</span>
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
              <select v-if="ASSETS && ASSETS.crList" class="input-select">
                <option v-for="(v, i) in ASSETS.crList" :key="i">
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
        v-show-slide="cutListShow"
        :options="swiperOptionCutList"
        class="cut-list"
      >
        <swiper-slide v-for="(v, i) in 100" :key="i" class="cut-list--item">
          <span v-if="i === 0" class="active-sign"></span>
          <div class="tit">CUT 10</div>
          <ul class="preview-list">
            <li class="preview-list--item">
              <img
                src="https://img.seoul.co.kr/img/upload/2017/10/07/SSI_20171007154542_O2.jpg"
                alt=""
              />
            </li>
            <li class="preview-list--item">
              <img
                src="https://img4.yna.co.kr/photo/yna/YH/2010/02/01/PYH2010020102450000400_P2.jpg"
                alt=""
              />
            </li>
            <li class="preview-list--item">흔들</li>
            <li class="preview-list--item">SD</li>
          </ul>
          <div class="state">
            <span class="badge text-bg-primary">일반대사</span>
            <span class="badge text-bg-red">이지안</span><br />
            <span class="badge text-bg-pink">이벤트</span>
            <span class="text">시나리오 1장</span>
            <span class="text">챕터1</span>
            <span class="text">CUT 5</span>
          </div>
          <div v-if="i !== 1 && i !== 2" class="text-preview">
            안녕? 대사를 치면 여기에도 미리보기 노출이 될거에요 width는 작업해
            보고 잡을 예정이고 여긴 줄바꿈이 없어요 시나리오 1장 글시는 5차
            제한으로 ... 처리! 여긴 최대 4줄까지 출력 안녕? 대사를 치면 여기에도
            미리보기 노출이 될거에요 width는 작업해 보고 잡을 예정이고 여긴
            줄바꿈이 없어요 시나리오 1장 글시는 5차 제한으로 ... 처리! 여긴 최대
            4줄까지 출력
          </div>
          <div v-if="i === 1" class="text-preview">
            Q. 질문을하는데 1 <span class="dot"></span> 이지안+5<br />
            Q. 질문을하는데 1 <span class="dot"></span> 이지안+5<br />
            Q. 질문을하는데 1 <span class="dot"></span> 이지안+5
          </div>
          <div v-if="i === 2" class="text-preview">
            Q. 질문을하는데 1<br />
            <span class="red">+5</span> 이지안<br />
            <span class="blue">-5</span> 이지안
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
// SCENE_DATA
import { mapState, mapMutations } from 'vuex'
import ImageController from './ImageController.vue'
export default {
  components: {
    ImageController,
  },
  data() {
    return {
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
        slidesPerView: 16,
        slidesPerGroup: 16,
        spaceBetween: 5,
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
    }
  },
  computed: {
    ...mapState(['LOGIN', 'LOADING', 'SCENE_DATA', 'SCENE_CODE', 'ASSETS']),
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
    // this.$nextTick(() => {
    //   this.SCENE_DATA.forEach((e, i) => {
    //     e.chapters.forEach((v, k) => {
    //       console.log('=================', v)
    //     })
    //   })
    // })
    console.log(this.SCENE_CODE)
  },
  methods: {
    ...mapMutations(['MUTATIONS_SCENE_DATA', 'MUTATIONS_ASSETS_DATA_CR']),
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
  },
}
</script>

<style>
</style>
