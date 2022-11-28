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
      <div class="setting-scen">
        <div class="setting-tit">화면 설정</div>
        <div class="setting-scen--list">
          <label class="label">배경</label>
          <ul class="list">
            <li class="list-item"></li>
            <li class="list-item"></li>
          </ul>
        </div>
        <div class="setting-scen--list">
          <label class="label">인물</label>
          <ul class="list">
            <li class="list-item"></li>
            <li class="list-item"></li>
          </ul>
        </div>
      </div>
      <div class="setting-talk">
        <div class="setting-tit">대화 설정</div>
        <div class="tab-list">
          <button type="button" class="tab-list--btn active">대사</button>
          <button type="button" class="tab-list--btn">나레이션</button>
          <button type="button" class="tab-list--btn">객관식</button>
          <button type="button" class="tab-list--btn">주관식</button>
        </div>
        <div class="tab-con">
          <div class="tab-list type2">
            <button type="button" class="tab-list--btn active">주인공</button>
            <button type="button" class="tab-list--btn">이지안</button>
          </div>
          <div class="insert-wrap">
            <textarea
              placeholder="TAB 키를 눌러 대사를 바로 추가할 수 있습니다.
인물의 대화를 입력해 주세요"
              rows="5"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
    <div class="right"></div>
    <div class="cut">
      <div class="cut-tit">
        <span class="scenario">시나리오 1장</span>
        <span class="chapter">챕터 1</span>
        <button type="button" class="fold-btn">접기</button>
      </div>
      <ul class="cut-list">
        <li class="cut-list--item">
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
          <div class="text-preview">
            안녕? 대사를 치면 여기에도 미리보기 노출이 될거에요 width는 작업해
            보고 잡을 예정이고 여긴 줄바꿈이 없어요 시나리오 1장 글시는 5차
            제한으로 ... 처리! 여긴 최대 4줄까지 출력 안녕? 대사를 치면 여기에도
            미리보기 노출이 될거에요 width는 작업해 보고 잡을 예정이고 여긴
            줄바꿈이 없어요 시나리오 1장 글시는 5차 제한으로 ... 처리! 여긴 최대
            4줄까지 출력
          </div>
        </li>
      </ul>
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
export default {
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
