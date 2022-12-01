<template>
  <div class="maker-right">
    <div class="preview">
      <div class="preview-img">
        <img :src="tempData.bg" alt="" class="background" />
        <img ref="characterImage" :src="tempData.cr" alt="" class="character" />
        <div class="dialogue">
          <span class="name">{{ tempData.crName }}</span>
          <p ref="myLoadText" class="text" style="white-space: pre-line"></p>
        </div>
        <img src="~/static/images/mockup.png" alt="" class="mockup" />
      </div>
      <div class="preview-save">
        마지막 저장 <span class="time">22.11.22 17:20:20</span>
      </div>
    </div>
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
          v-if="cutType === 1"
          :options="swiperOptionSelectCharacter"
          class="tab-list type2"
        >
          <swiper-slide v-for="(v, i) in 20" :key="i" class="tab-list--item">
            <label class="radio">
              <input type="radio" name="character" />
              <span>주인공</span>
            </label>
          </swiper-slide>
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
              <select class="input-select">
                <option>이지안</option>
                <option>하린</option>
                <option>안보나</option>
                <option>권시아</option>
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
              <select class="input-select">
                <option>시나리오1</option>
                <option>시나리오2</option>
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
    <div class="right"></div>
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
  <!-- <div class="maker-right">
    {{ sceneData }}
    <div
      v-for="(cut, idx) in cuts"
      :ref="`cut${idx}`"
      :key="idx"
      class="cutinsert-wrap"
      @click="onClickFocus(idx)"
    >
      <div>CUT CODE : CUT {{ idx }} (컷 코드는 차후 생성 예정)</div>
      <div class="cutinsert-top">
        <label class="input-radio" @click="cut.type = cut.index + '_1'">
          <input
            type="radio"
            :name="`type${idx}`"
            :checked="`${cut.type}` === `${cut.index}_1`"
          />
          <span class="check radio"></span>
          <span class="text">일반 대사</span>
        </label>
        <label class="input-radio" @click="cut.type = cut.index + '_2'">
          <input
            type="radio"
            :name="`type${idx}`"
            :checked="`${cut.type}` === `${cut.index}_2`"
          />
          <span class="check radio"></span>
          <span class="text">객관식 선택지</span>
        </label>
        <label class="input-radio" @click="cut.type = cut.index + '_3'">
          <input
            type="radio"
            :name="`type${idx}`"
            :checked="`${cut.type}` === `${cut.index}_3`"
          />
          <span class="check radio"></span>
          <span class="text">주관식 선택지</span>
        </label>
      </div>
      <div v-if="`${cut.type}` === `${cut.index}` + '_1'" class="cutinsert-con">
        <div class="input-wrap">
          <label class="input-label">배경이미지</label>
          <div class="input-con">
            <select
              class="input-select"
              @change="onChangePreviewBg"
              @blur="onBlurUpdate(idx)"
            >
              <option v-for="(v, i) in tempData.bg" :key="i" :value="v.path">
                {{ v.name }}
              </option>
            </select>
          </div>
        </div>
        <div class="input-wrap">
          <label class="input-label">캐릭터이미지</label>
          <div class="input-con">
            <select
              class="input-select"
              @change="onChangePreviewCr"
              @blur="onBlurUpdate(idx)"
            >
              <option v-for="(v, i) in tempData.cr" :key="i" :value="v.path">
                {{ v.name }}
              </option>
            </select>
          </div>
        </div>
        <div class="input-wrap">
          <label class="input-label">캐릭터애니메이션</label>
          <div class="input-con">
            <select
              class="input-select"
              @change="onChangePreviewEffect"
              @blur="onBlurUpdate(idx)"
            >
              <option
                v-for="(v, i) in tempData.effect"
                :key="i"
                :value="v.effect"
              >
                {{ v.text }}
              </option>
            </select>
          </div>
        </div>
        <div class="input-wrap">
          <label class="input-label">사운드</label>
          <div class="input-con">
            <select class="input-select" @blur="onBlurUpdate(idx)">
              <option>선택</option>
              <option>선택</option>
              <option>선택</option>
            </select>
          </div>
        </div>
        <div class="input-wrap">
          <label class="input-label">대사</label>
          <div class="input-con">
            <textarea
              class="input-textarea"
              rows="2"
              @input="onChangePreviewText"
              @blur="onBlurUpdate(idx)"
            ></textarea>
          </div>
        </div>
      </div>
      <div v-if="`${cut.type}` === `${cut.index}` + '_2'" class="cutinsert-con">
        <div class="input-wrap">
          <label class="input-label">배경이미지</label>
          <div class="input-con">
            <select class="input-select">
              <option>선택</option>
              <option>선택</option>
              <option>선택</option>
            </select>
          </div>
        </div>
        <div class="input-wrap">
          <label class="input-label">캐릭터이미지</label>
          <div class="input-con">
            <select class="input-select">
              <option>선택</option>
              <option>선택</option>
              <option>선택</option>
            </select>
          </div>
        </div>
        <div class="input-wrap">
          <label class="input-label">캐릭터애니메이션</label>
          <div class="input-con">
            <select class="input-select">
              <option>선택</option>
              <option>선택</option>
              <option>선택</option>
            </select>
          </div>
        </div>
        <div class="input-wrap">
          <label class="input-label">사운드</label>
          <div class="input-con">
            <select class="input-select">
              <option>선택</option>
              <option>선택</option>
              <option>선택</option>
            </select>
          </div>
        </div>
        <div class="input-wrap">
          <label class="input-label">항목</label>
          <div class="input-con">
            <div class="line">
              <input type="text" class="input-text" />
            </div>
            <div class="line">
              <select class="input-select">
                <option>캐릭터선택</option>
                <option>선택</option>
                <option>선택</option>
              </select>
              <label class="input-label">호감도변화</label>
              <input type="number" class="input-number" value="0" />
            </div>
          </div>
          <div class="input-con">
            <div class="line">
              <input type="text" class="input-text" />
            </div>
            <div class="line">
              <select class="input-select">
                <option>캐릭터선택</option>
                <option>선택</option>
                <option>선택</option>
              </select>
              <label class="input-label">호감도변화</label>
              <input type="number" class="input-number" value="0" />
            </div>
          </div>
          <div class="input-con">
            <div class="line">
              <input type="text" class="input-text" />
            </div>
            <div class="line">
              <select class="input-select">
                <option>캐릭터선택</option>
                <option>선택</option>
                <option>선택</option>
              </select>
              <label class="input-label">호감도변화</label>
              <input type="number" class="input-number" value="0" />
            </div>
          </div>
        </div>
      </div>
      <div v-if="`${cut.type}` === `${cut.index}` + '_3'" class="cutinsert-con">
        <div class="input-wrap">
          <label class="input-label">배경이미지</label>
          <div class="input-con">
            <select class="input-select">
              <option>선택</option>
              <option>선택</option>
              <option>선택</option>
            </select>
          </div>
        </div>
        <div class="input-wrap">
          <label class="input-label">캐릭터이미지</label>
          <div class="input-con">
            <select class="input-select">
              <option>선택</option>
              <option>선택</option>
              <option>선택</option>
            </select>
          </div>
        </div>
        <div class="input-wrap">
          <label class="input-label">캐릭터애니메이션</label>
          <div class="input-con">
            <select class="input-select">
              <option>선택</option>
              <option>선택</option>
              <option>선택</option>
            </select>
          </div>
        </div>
        <div class="input-wrap">
          <label class="input-label">사운드</label>
          <div class="input-con">
            <select class="input-select">
              <option>선택</option>
              <option>선택</option>
              <option>선택</option>
            </select>
          </div>
        </div>
        <div class="input-wrap">
          <label class="input-label">질문</label>
          <div class="input-con">
            <input type="text" class="input-text" />
          </div>
        </div>
        <div class="input-wrap">
          <label class="input-label">답</label>
          <div class="input-con">
            <input type="text" class="input-text" />
          </div>
        </div>
        <div class="input-wrap">
          <label class="input-label">정답호감도</label>
          <div class="input-con">
            <select class="input-select">
              <option>캐릭터선택</option>
              <option>선택</option>
              <option>선택</option>
            </select>
            <input type="number" class="input-number" value="0" />
          </div>
        </div>
        <div class="input-wrap">
          <label class="input-label">오답호감도</label>
          <div class="input-con">
            <select class="input-select">
              <option>캐릭터선택</option>
              <option>선택</option>
              <option>선택</option>
            </select>
            <input type="number" class="input-number" value="0" />
          </div>
        </div>
      </div>
      <button type="button" class="btn-delete" @click="cutDelete(idx)">
        삭제
      </button>
    </div>
    <button type="button" class="btn-add" @click="onClickCutAdd()">
      + 컷 추가하기
    </button>
  </div> -->
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
      tempData: {
        bg: [],
        cr: [],
        crName: [],
        text: '',
        effect: [
          {
            effect: '',
            text: '없음',
          },
          {
            effect: 'vibration',
            text: '흔들림',
          },
        ],
      },
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
        loop: false,
        slidesPerView: 16,
        slidesPerGroup: 16,
        spaceBetween: 5,
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
    }
  },
  computed: {
    ...mapState(['LOGIN', 'LOADING', 'SCENE_DATA']),
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
    for (let i = 1; i < 19; i++) {
      this.tempData.bg = [
        ...this.tempData.bg,
        {
          name: `이미지${i}`,
          path: `${process.env.VUE_APP_IMAGE}/bg/${i}.jpg`,
        },
      ]
      this.tempData.cr = [
        ...this.tempData.cr,
        {
          name: `이미지${i}`,
          path: `${process.env.VUE_APP_IMAGE}/cr/${i}.png`,
        },
      ]
    }
    this.sceneData = [...this.sceneData]
    // this.tempInputData = [...this.tempInputData]
  },
  methods: {
    ...mapMutations(['MUTATIONS_SCENE_DATA']),
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
    // 배경 전송
    onChangePreviewBg({ target }) {
      console.log(target.value)
      this.$emit('myLoadBgImage', target.value)
      this.tempInputData.bg[this.cutCode] = target.value
      console.log('tempInputData', this.tempInputData)
    },
    // 캐릭터 이미지 전송
    onChangePreviewCr({ target }) {
      console.log(target.value)
      console.log(target.options[target.selectedIndex].text)
      this.tempInputData.cr[this.cutCode] = target.value
      this.tempInputData.crName[this.cutCode] =
        target.options[target.selectedIndex].text
      this.$emit('myLoadCrImage', target.value)
      this.$emit('myLoadCrName', target.options[target.selectedIndex].text)
      console.log('tempInputData', this.tempInputData)
    },
    // 대사 전송
    onChangePreviewText({ target }) {
      console.log(target.value)
      this.tempInputData.text[this.cutCode] = target.value
      this.$emit('myLoadText', target.value)
      console.log('tempInputData', this.tempInputData)
    },
    // 효과 전송
    onChangePreviewEffect({ target }) {
      console.log(target.value)
      this.tempInputData.effect[this.cutCode] = target.value
      this.$emit('myLoadEffect', target.value)
      console.log('tempInputData', this.tempInputData)
    },
    onBlurUpdate(e) {
      console.log('onBlurPreview')
      this.sceneData[e] = {
        bg: '',
        cr: '',
        text: '',
        effect: '',
      }
      console.log(this.sceneData)
      this.MUTATIONS_SCENE_DATA(this.tempInputData)
    },
    // 컷 활성화
    onClickFocus(e) {
      console.log(e)
      // cutCode 갱신
      this.cutCode = e

      // 컷 데이터 갱신
      this.$emit(
        'myLoadBgImage',
        this.tempInputData.bg[this.cutCode] === undefined
          ? (this.tempInputData.bg[this.cutCode] = null)
          : this.tempInputData.bg[this.cutCode]
      )
      this.$emit(
        'myLoadCrImage',
        this.tempInputData.cr[this.cutCode] === undefined
          ? (this.tempInputData.cr[this.cutCode] = null)
          : this.tempInputData.cr[this.cutCode]
      )
      this.$emit(
        'myLoadCrNameImage',
        this.tempInputData.crName[this.cutCode] === undefined
          ? (this.tempInputData.crName[this.cutCode] = null)
          : this.tempInputData.crName[this.cutCode]
      )
      this.$emit(
        'myLoadText',
        this.tempInputData.text[this.cutCode] === undefined
          ? (this.tempInputData.text[this.cutCode] = null)
          : this.tempInputData.text[this.cutCode]
      )
      this.$emit(
        'myLoadEffect',
        this.tempInputData.effect[this.cutCode] === undefined
          ? (this.tempInputData.effect[this.cutCode] = null)
          : this.tempInputData.effect[this.cutCode]
      )

      // 포커스 이동 시 저장

      //   컷 코드 전송
      this.$emit('myLoadFocus', `CUT CODE : ${e}`)

      //   active border remove
      Object.entries(this.$refs).forEach((v, i) => {
        if (v[0].includes('cut') === true) {
          this.$refs[v[0]][0].style = 'border: unset'
        }
      })
      this.$refs[`cut${e}`][0].style = 'border:1px solid red'
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
  },
}
</script>

<style>
.vibration {
  animation: vibration 0.1s infinite;
  -webkit-animation: vibration 0.1s infinite;
}
@keyframes vibration {
  from {
    transform: rotate(1deg);
  }
  to {
    transform: rotate(-1deg);
  }
}
</style>
