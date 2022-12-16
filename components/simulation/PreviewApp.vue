<template>
  <div class="preview-wrap" :class="{ bottomnone: MAKER_GNB === 5 }">
    <div v-if="MAKER_GNB === 1 && CUT_LIST.jsonData" class="preview-tit">
      시나리오 <span class="highlight"></span> 챕터
      <span class="highlight"></span> 컷
      <span class="highlight">{{ CUT_LIST.jsonData.length - CUT_CODE }}</span>
    </div>
    <div class="column-2">
      <div v-if="PREVIEW" class="preview">
        <div v-if="PREVIEW && MAKER_GNB !== 5" class="preview-con preview-img">
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
          <div class="dialogue">
            <span v-if="PREVIEW.data.cr" class="name">{{
              PREVIEW.data.cr
            }}</span>
            <!-- prettier-ignore-start -->
            <p v-if="cutType === 1" ref="myLoadText" class="text">
              {{ PREVIEW.data.text }}
            </p>
            <p v-if="cutType === 2" ref="myLoadText" class="text">
              {{ PREVIEW.data.narration }}
            </p>
            <!-- prettier-ignore-end -->
          </div>
        </div>
        <div v-if="PREVIEW && MAKER_GNB === 5" class="preview-con preview-img">
          <div
            class="dialogue"
            :style="
              UISetting.windowColor
                ? `background:${UISetting.windowColor.hex}`
                : ''
            "
          >
            <span
              class="name"
              :style="
                UISetting.mainColor
                  ? `background:${UISetting.mainColor.hex}`
                  : ''
              "
              >메인 색상</span
            >
            <p class="text">창 색상</p>
          </div>
        </div>
        <img src="~/static/images/mockup.png" alt="" class="preview-mockup" />
      </div>
      <div ref="buttonNav" class="buttons">
        <button
          type="button"
          class="btn icon3 done"
          :class="{ active: CONTENT_CODE === 1 }"
          @click="onClickContent(1)"
        ></button>
        <button
          type="button"
          class="btn icon1"
          :class="{ active: CONTENT_CODE === 2 }"
          @click="onClickContent(2)"
        ></button>
        <button
          type="button"
          class="btn icon2"
          :class="{ active: CONTENT_CODE === 3 }"
          @click="onClickContent(3)"
        ></button>
        <button
          type="button"
          class="btn icon4"
          :class="{ active: CONTENT_CODE === 4 }"
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
    <div class="preview-save">
      마지막 저장
      <span v-if="SAVE_DATETIME" class="time">{{
        SAVE_DATETIME | moment('YY.MM.DD h:mm:ss')
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
    ]),
  },
  watch: {
    'PREVIEW.data.effect': {
      handler(value) {
        if (value) {
          setTimeout(() => {
            this.$refs.characterImage.classList.remove('vibration')
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
  },
}
</script>

<style lang="scss">
.vibration {
  animation: vibration 0.1s infinite;
  -webkit-animation: vibration 0.1s infinite;
}
.fade {
  animation: fade 0.5s forwards;
  -webkit-animation: fade 0.5s forwards;
}
.left {
  animation: left 0.5s forwards;
  -webkit-animation: left 0.5s forwards;
}
.right {
  animation: right 0.5s forwards;
  -webkit-animation: right 0.5s forwards;
}
.bottom {
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
