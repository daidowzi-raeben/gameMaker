<template>
  <div class="preview-wrap" :class="{ bottomnone: MAKER_GNB === 5 }">
    <div v-if="MAKER_GNB === 1 && CUT_LIST.jsonData" class="preview-tit">
      시나리오 <span class="highlight"></span> 챕터
      <span class="highlight"></span> 컷
      <span class="highlight">{{ CUT_LIST.jsonData.length - CUT_CODE }}</span>
    </div>
    <div class="column-2">
      <div v-if="PREVIEW" class="preview">
        <!-- dim-light, dim-dark, dim-blur, diagonal, diagonal-r, copy-left, copy-right 클래스 추가로 구분. intro만있으면 기본 중앙정렬 -->
        <div
          v-if="MAKER_GNB === 2 || MAKER_GNB === 5"
          class="preview-con preview-intro dim-light"
        >
          <div class="preview-intro--background">
            <img :src="PREVIEW_INTRO.bg" alt="background" />
          </div>
          <div class="preview-intro--logo">
            <img v-if="!PREVIEW_INTRO.logo" src="~/static/images/logo.svg" />
            <img
              v-if="PREVIEW_INTRO.logo"
              :src="
                'https://api.school-os.net/game/upload/logo/' +
                PREVIEW_INTRO.logo
              "
            />
          </div>
          <div class="preview-intro--menu">
            <button
              type="button"
              class="btn"
              :class="UISetting.font"
              :style="`background:${UISetting.mainColor}; color:${UISetting.mainFontColor}; border-radius:${UISetting.round}px`"
              @click="onclickDisplayShow('displayGame')"
            >
              시작하기
            </button>
            <button
              type="button"
              class="btn"
              :class="UISetting.font"
              :style="`background:${UISetting.mainColor}; color:${UISetting.mainFontColor}; border-radius:${UISetting.round}px`"
            >
              불러오기
            </button>
            <button
              type="button"
              class="btn"
              :class="UISetting.font"
              :style="`background:${UISetting.mainColor}; color:${UISetting.mainFontColor}; border-radius:${UISetting.round}px`"
              @click="onclickDisplayShow('displayProfile')"
            >
              등장인물
            </button>
            <button
              type="button"
              class="btn"
              :class="UISetting.font"
              :style="`background:${UISetting.mainColor}; color:${UISetting.mainFontColor}; border-radius:${UISetting.round}px`"
            >
              갤러리
            </button>
          </div>
          <div class="preview-intro--copy">
            <!-- {{ PREVIEW_INTRO.copyright }} -->
            {{
              PREVIEW_INTRO.copyright ? PREVIEW_INTRO.copyright : 'ⓒproject koo'
            }}
          </div>
        </div>
        <div v-if="PREVIEW && MAKER_GNB === 1" class="preview-con preview-img">
          <img
            v-if="PREVIEW.img.bg"
            :src="PREVIEW.img.bg"
            alt=""
            class="background"
          />
          <div v-if="PREVIEW.img.cr && !PREVIEW.img.cr2" class="character-1">
            <img
              v-if="PREVIEW.img.cr"
              ref="characterImage"
              :src="PREVIEW.img.cr"
              alt=""
              class="character"
              :class="PREVIEW.data.effect"
            />
          </div>
          <div v-if="PREVIEW.img.cr2" class="character-2">
            <img
              v-if="PREVIEW.img.cr"
              ref="characterImage"
              :src="PREVIEW.img.cr"
              alt=""
              class="character"
              :class="PREVIEW.data.effect"
            />
            <img
              v-if="PREVIEW.img.cr2"
              ref="characterImage"
              :src="PREVIEW.img.cr2"
              alt=""
              class="character"
              :class="PREVIEW.data.effect2"
            />
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
          <div class="dialogue" :style="windowColor()">
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
              :style="
                UISetting.fontColor ? `color:rgba(${UISetting.fontColor}` : ''
              "
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
            :src="PREVIEW.img.bg"
            alt=""
            class="background"
            width="100%"
            height="100%"
          />
          <p class="name" :class="UISetting.font">
            {{ PREVIEW_PROFILE.name ? PREVIEW_PROFILE.name : '인물이름' }}
          </p>
          <div class="character">
            <img :src="PREVIEW.img.cr" alt="" />
          </div>
          <div class="profile">
            <p class="con" :class="UISetting.font">
              {{
                PREVIEW_PROFILE.discription
                  ? PREVIEW_PROFILE.discription.replaceAll('||n', '\n')
                  : '프로필을 입력하세요'
              }}
            </p>
          </div>
          <ul class="face-list">
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
          </ul>
        </div>
        <img src="~/static/images/mockup.png" alt="" class="preview-mockup" />
      </div>
      <div v-if="MAKER_GNB === 1" ref="buttonNav" class="buttons">
        <button
          type="button"
          class="btn icon3"
          :class="{ active: CONTENT_CODE === 1, done: PREVIEW.img.bg }"
          @click="onClickContent(1)"
        ></button>
        <button
          type="button"
          class="btn icon1"
          :class="{ active: CONTENT_CODE === 2, done: PREVIEW.img.cr }"
          @click="onClickContent(2)"
        ></button>
        <button
          type="button"
          class="btn icon2"
          :class="{ active: CONTENT_CODE === 3, done: PREVIEW.img.cr2 }"
          @click="onClickContent(3)"
        ></button>
        <button
          type="button"
          class="btn icon4"
          :class="{ active: CONTENT_CODE === 4, done: PREVIEW.data.sr }"
          @click="onClickContent(4)"
        ></button>
        <button
          type="button"
          class="btn icon5"
          :class="{ active: CONTENT_CODE === 5 }"
          @click="onClickContent(5)"
        ></button>
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
            this.$refs.characterImage.classList.remove('ani-vibration')
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
    ...mapMutations(['MUTATIONS_CONTENT_CODE']),
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
      console.log(style)
      return style
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
