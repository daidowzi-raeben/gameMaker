<template>
  <div
    v-if="MAKER_GNB !== 6"
    class="preview-wrap"
    :class="{ bottomnone: MAKER_GNB === 5 }"
  >
    <div v-if="MAKER_GNB === 1 && CUT_LIST.jsonData" class="preview-tit">
      시나리오 <span class="highlight"> {{ SCENE_INDEX + 1 }}</span> 챕터
      <span class="highlight">{{ CHAPTER_INDEX + 1 }}</span> 컷
      <span class="highlight">{{ CUT_LIST.jsonData.length - CUT_CODE }}</span>
      <button
        v-if="CUT_CODE !== 0"
        type="button"
        class="button btn-pink delete-btn"
        @click="onClickCutDelete(CUT_CODE)"
      >
        삭제
      </button>
      <span class="guide" v-if="CUT_CODE === 0">
        직전 수정된 컷과 맨 마지막 컷은 삭제할 수 없어요!
      </span>
    </div>
    <div class="column-2">
      <div v-if="PREVIEW" class="preview">
        <!-- dim-light, dim-dark, dim-blur, diagonal, diagonal-r, copy-left, copy-right 클래스 추가로 구분. intro만있으면 기본 중앙정렬 -->
        <div
          v-if="MAKER_GNB === 2 || MAKER_GNB === 5"
          class="preview-con preview-intro"
          :class="[
            PREVIEW_INTRO.dim,
            PREVIEW_INTRO.copyrightPosition,
            PREVIEW_INTRO.position,
          ]"
        >
          <div class="preview-intro--background">
            <img
              :src="onLoadAssetsImage(PREVIEW_INTRO.bg, 'bg')"
              alt="background"
            />
          </div>
          <div class="preview-intro--logo">
            <img v-if="!PREVIEW_INTRO.logo" src="~/static/images/logo.svg" />
            <img
              v-if="PREVIEW_INTRO.logo"
              :src="onLoadAssetsImage(PREVIEW_INTRO.logo, 'logo')"
            />
          </div>
          <div class="preview-intro--menu">
            <button
              type="button"
              class="btn"
              :class="UISetting.font"
              :style="`box-shadow: ${UISetting.button.x}px ${UISetting.button.y}px 0 ${UISetting.button.shadowColor}; outline : ${UISetting.button.border}px solid ${UISetting.button.strokeColor}; background:${UISetting.mainColor}; color:${UISetting.mainFontColor}; border-radius:${UISetting.button.round}px`"
              @click="onclickDisplayShow('displayGame')"
            >
              시작하기
            </button>
            <button
              type="button"
              class="btn"
              :class="UISetting.font"
              :style="`box-shadow: ${UISetting.button.x}px ${UISetting.button.y}px 0 ${UISetting.button.shadowColor}; outline : ${UISetting.button.border}px solid ${UISetting.button.strokeColor}; background:${UISetting.mainColor}; color:${UISetting.mainFontColor}; border-radius:${UISetting.button.round}px`"
            >
              불러오기
            </button>
            <button
              type="button"
              class="btn"
              :class="UISetting.font"
              :style="`box-shadow: ${UISetting.button.x}px ${UISetting.button.y}px 0 ${UISetting.button.shadowColor}; outline : ${UISetting.button.border}px solid ${UISetting.button.strokeColor}; background:${UISetting.mainColor}; color:${UISetting.mainFontColor}; border-radius:${UISetting.button.round}px`"
              @click="onclickDisplayShow('displayProfile')"
            >
              등장인물
            </button>
            <button
              type="button"
              class="btn"
              :class="UISetting.font"
              :style="`box-shadow: ${UISetting.button.x}px ${UISetting.button.y}px 0 ${UISetting.button.shadowColor}; outline : ${UISetting.button.border}px solid ${UISetting.button.strokeColor}; background:${UISetting.mainColor}; color:${UISetting.mainFontColor}; border-radius:${UISetting.button.round}px`"
            >
              갤러리
            </button>
          </div>
          <div
            class="preview-intro--copy"
            :class="PREVIEW_INTRO.copyrightPosition"
          >
            <!-- {{ PREVIEW_INTRO.copyright }} -->
            {{
              PREVIEW_INTRO.copyright ? PREVIEW_INTRO.copyright : 'ⓒproject koo'
            }}
          </div>
        </div>
        <div v-if="PREVIEW && MAKER_GNB === 1" class="preview-con preview-img">
          <img
            v-if="PREVIEW.img.bg"
            :src="onLoadAssetsImage(PREVIEW.img.bg, 'bg')"
            alt=""
            class="background"
          />
          <div v-if="PREVIEW.img.cr && !PREVIEW.img.cr2" class="character-1">
            <img
              v-if="PREVIEW.img.cr"
              ref="characterImage"
              :src="onLoadAssetsImage(PREVIEW.img.cr, 'cr')"
              alt=""
              class="character"
              :class="PREVIEW.data.effect"
            />
          </div>
          <div v-if="PREVIEW.img.cr2" class="character-2">
            <img
              v-if="PREVIEW.img.cr"
              ref="characterImage"
              :src="onLoadAssetsImage(PREVIEW.img.cr, 'cr')"
              alt=""
              class="character"
              :class="PREVIEW.data.effect"
            />
            <img
              v-if="PREVIEW.img.cr2"
              ref="characterImage2"
              :src="onLoadAssetsImage(PREVIEW.img.cr2, 'cr')"
              alt=""
              class="character"
              :class="PREVIEW.data.effect2"
            />
          </div>
          <div v-if="cutType === 3" class="answer answer-multiple">
            <button
              type="button"
              class="btn"
              :style="
                UISetting.fontColor
                  ? `${windowColor()}; color:${UISetting.fontColor}`
                  : windowColor()
              "
            >
              {{ PREVIEW.data.questions.text_1 }}
            </button>
            <button
              type="button"
              class="btn"
              :style="
                UISetting.fontColor
                  ? `${windowColor()}; color:${UISetting.fontColor}`
                  : windowColor()
              "
            >
              {{ PREVIEW.data.questions.text_2 }}
            </button>
            <button
              type="button"
              class="btn"
              :style="
                UISetting.fontColor
                  ? `${windowColor()}; color:${UISetting.fontColor}`
                  : windowColor()
              "
            >
              {{ PREVIEW.data.questions.text_3 }}
            </button>
          </div>
          <div v-if="cutType === 4" class="answer answer-subjective">
            <div
              class="text"
              :style="
                UISetting.fontColor
                  ? `${windowColor()}; color:${UISetting.fontColor}`
                  : windowColor()
              "
            >
              {{ PREVIEW.data.subjectiveQuestion }}
            </div>
            <input
              type="text"
              class="input-text"
              placeholder="주관식 답변을 입력해주세요"
              :value="PREVIEW.data.answer"
              :style="windowColor()"
            />
          </div>
          <div v-if="cutType < 3" class="dialogue" :style="windowColor()">
            <span
              v-if="PREVIEW.data.cr"
              class="name"
              :class="UISetting.font"
              :style="
                UISetting.mainColor
                  ? `background:${UISetting.mainColor};color:${UISetting.mainFontColor}`
                  : ''
              "
              >{{ PREVIEW.data.cr }}</span
            >
            <!-- prettier-ignore-start -->
            <p
              v-if="cutType === 1"
              ref="myLoadText"
              class="text"
              :class="UISetting.font"
              :style="UISetting.fontColor ? `color:${UISetting.fontColor}` : ''"
            >
              {{ PREVIEW.data.text }}
            </p>
            <p
              v-if="cutType === 2"
              ref="myLoadText"
              class="text"
              :class="UISetting.font"
              :style="UISetting.fontColor ? `color:${UISetting.fontColor}` : ''"
            >
              {{ PREVIEW.data.narration }}
            </p>
            <!-- prettier-ignore-end -->
          </div>
        </div>
        <div v-if="PREVIEW && MAKER_GNB === 5" class="preview-con preview-img">
          <div class="dialogue" :style="windowColor()">
            <span
              class="name"
              :class="UISetting.font"
              :style="
                UISetting.mainColor
                  ? `background:${UISetting.mainColor};color:${UISetting.mainFontColor}`
                  : ''
              "
              >메인 색상</span
            >
            <p
              class="text"
              :class="UISetting.font"
              :style="UISetting.fontColor ? `color:${UISetting.fontColor}` : ''"
            >
              창 색상
            </p>
          </div>
        </div>
        <div
          v-show="MAKER_GNB === 4"
          ref="displayProfileDetail"
          class="preview-con preview-profile detail"
          :style="
            PREVIEW_PROFILE.background
              ? `background: ${PREVIEW_PROFILE.background}`
              : ''
          "
        >
          <!-- 배경 넣어주세요 -->
          <img
            v-if="PREVIEW.img.bg"
            :src="onLoadAssetsImage(PREVIEW.img.bg, 'bg')"
            alt=""
            class="background"
            width="100%"
            height="100%"
          />
          <p class="name" :class="UISetting.font">
            {{ PREVIEW_PROFILE.name ? PREVIEW_PROFILE.name : '인물이름' }}
          </p>
          <div class="character">
            <img :src="onLoadAssetsImage(PREVIEW.img.cr, 'cr')" alt="" />
          </div>
          <div class="character head">
            <img :src="onLoadAssetsImage(PREVIEW.img.cr, 'cr')" alt="" />
          </div>
          <div class="profile">
            <p class="con" :class="UISetting.font">
              {{
                PREVIEW_PROFILE.discription
                  ? PREVIEW_PROFILE.discription.replaceAll('||n', '\n')
                  : '인물소개'
              }}
            </p>
          </div>
          <!-- <ul class="face-list">
            <li class="face-list--item">
              <img src="https://i.imgur.com/TNnVehQ.png" alt="" />
            </li>
            <li class="face-list--item">
              <img src="https://i.imgur.com/Fya1jHk.png" alt="" />
            </li>
            <li class="face-list--item">
              <img src="https://i.imgur.com/W6z9by0.png" alt="" />
            </li>
            <li class="face-list--item">
              <img src="https://i.imgur.com/m14VXCI.png" alt="" />
            </li>
          </ul> -->
        </div>
        <img src="~/static/images/mockup.png" alt="" class="preview-mockup" />
      </div>
      <div v-if="MAKER_GNB === 1" ref="buttonNav" class="buttons">
        <el-tooltip class="item" effect="dark" content="배경" placement="top">
          <button
            type="button"
            class="btn icon3"
            :class="{ active: CONTENT_CODE === 1, done: PREVIEW.img.bg }"
            @click="onClickContent(1)"
          ></button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="인물" placement="top">
          <button
            type="button"
            class="btn icon1"
            :class="{ active: CONTENT_CODE === 2, done: PREVIEW.img.cr }"
            @click="onClickContent(2)"
          ></button>
        </el-tooltip>
        <el-tooltip
          class="item"
          effect="dark"
          content="두번째 인물"
          placement="top"
        >
          <button
            type="button"
            class="btn icon2"
            :class="{ active: CONTENT_CODE === 3, done: PREVIEW.img.cr2 }"
            @click="onClickContent(3)"
          ></button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="사운드" placement="top">
          <button
            type="button"
            class="btn icon4"
            :class="{ active: CONTENT_CODE === 4, done: PREVIEW.data.sr }"
            @click="onClickContent(4)"
          ></button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="대사" placement="top">
          <button
            type="button"
            class="btn icon5"
            :class="{ active: CONTENT_CODE === 5 }"
            @click="onClickContent(5)"
          ></button>
        </el-tooltip>
      </div>
    </div>
    <div class="preview-save" :class="{ left: MAKER_GNB === 1 }">
      마지막 저장
      <span v-if="SAVE_DATETIME" class="time">{{
        SAVE_DATETIME | moment('YY.MM.DD HH:mm:ss')
      }}</span>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import { kooLogin } from '~/config/util'
export default {
  data() {
    return {
      sceneData: [],
      params: {},
      paramsDelete: {},
    }
  },
  computed: {
    ...mapState([
      'SCENE_CODE',
      'PREVIEW',
      'cutType',
      'SAVE_DATETIME',
      'CUT_LIST',
      'CUT_CODE',
      'MAKER_GNB',
      'UISetting',
      'CONTENT_CODE',
      'PREVIEW_PROFILE',
      'PREVIEW_INTRO',
      'PROJECT_ID',
      'CHAPTER_INDEX',
      'SCENE_INDEX',
    ]),
  },
  watch: {
    'PREVIEW.data.effect': {
      handler(value) {
        if (value) {
          setTimeout(() => {
            this.$refs.characterImage.classList.remove('ani-vibration')
          }, 400)
        }
      },
    },
    'PREVIEW.data.effect2': {
      handler(value) {
        if (value) {
          setTimeout(() => {
            this.$refs.characterImage2.classList.remove('ani-vibration')
          }, 400)
        }
      },
    },
    // PREVIEW: {
    //   handler(value) {
    //     // chaterInsert
    //     console.log(value)
    //   },
    // },
    // SCENE_CODE: {
    //   handler(value) {
    //     if (value) {

    //     }
    //   },
    //   immediate: true,
    // },
  },
  mounted() {
    this.$nextTick(() => {
      this.user_idx = kooLogin('user_idx')
    })
  },
  methods: {
    ...mapMutations(['MUTATIONS_CONTENT_CODE', 'MUTATIONS_LOADING_INIT']),
    ...mapActions(['ACTION_AXIOS_GET', 'ACTION_AXIOS_POST']),
    onClickContent(e) {
      // const bn = this.$refs.buttonNav.children
      // for (let i = 0; i < bn.length; i++) {
      //   bn[i].classList.remove('active')
      // }
      // bn[e - 1].classList.add('active')
      this.MUTATIONS_CONTENT_CODE(e)
    },
    windowColor() {
      let style = ''
      if (this.UISetting.windowColor) {
        style += `background:${this.UISetting.windowColor};`
      }
      if (this.UISetting.strokeColor) {
        style += `outline : ${this.UISetting.border}px solid ${this.UISetting.strokeColor};`
      }
      if (this.UISetting.round) {
        style += `border-radius:${this.UISetting.round}px;`
      }
      if (this.UISetting.shadowColor) {
        style += `box-shadow: ${this.UISetting.x}px ${this.UISetting.y}px 0 ${this.UISetting.shadowColor};`
      }
      // style += `box-shadow:
      // ${this.UISetting.round ? this.UISetting.round : 0}
      // ${this.UISetting.round ? this.UISetting.round : 0}
      // ${this.UISetting.round ? this.UISetting.round : 0}
      // ${this.UISetting.round ? this.UISetting.round : 0}
      //  #ff0, 10px 10px 10px 10px #f00`
      console.log(style)
      return style
    },
    onLoadAssetsImage(v, f) {
      return `${process.env.VUE_APP_IMAGE}/${f}/${v}`
    },
    onClickCutDelete(v) {
      this.MUTATIONS_LOADING_INIT()
      this.paramsDelete.type = 'cutDelete'
      this.paramsDelete.idx = this.CUT_LIST.idx[this.CUT_CODE]
      this.paramsDelete.secretKey = this.PROJECT_ID
      this.paramsDelete.user_idx = kooLogin('user_idx')
      this.paramsDelete.apiKey = process.env.API_KEY
      this.paramsDelete.s_code = this.SCENE_CODE
      console.log(this.paramsDelete)
      this.ACTION_AXIOS_GET(this.paramsDelete)
    },
  },
}
</script>

<style lang="scss">
.ani-vibration {
  animation: vibration 0.1s infinite;
  -webkit-animation: vibration 0.1s infinite;
}
.ani-fade {
  animation: fade 0.5s forwards;
  -webkit-animation: fade 0.5s forwards;
}
.ani-left {
  animation: left 0.5s forwards;
  -webkit-animation: left 0.5s forwards;
}
.ani-right {
  animation: right 0.5s forwards;
  -webkit-animation: right 0.5s forwards;
}
.ani-bottom {
  animation: bottom 0.5s forwards;
  -webkit-animation: bottom 0.5s forwards;
}
@keyframes vibration {
  from {
    transform: rotate(1deg);
  }
  to {
    transform: rotate(-1deg);
  }
}
@keyframes fade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes left {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}
@keyframes right {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}
@keyframes bottom {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}
</style>
