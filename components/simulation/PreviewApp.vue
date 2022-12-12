<template>
  <div class="preview">
    <div v-if="MAKER_GNB === 1" class="preview-tit">{{(CUT_LIST.jsonData.length - CUT_CODE)}} CUT</div>
    <div v-if="PREVIEW" class="preview-img">
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
        <span v-if="PREVIEW.data.cr" class="name">{{ PREVIEW.data.cr }}</span>
        <!-- prettier-ignore-start -->
        <p v-if="cutType === 1" ref="myLoadText" class="text">
          {{ PREVIEW.data.text }}
        </p>
        <p v-if="cutType === 2" ref="myLoadText" class="text">
          {{ PREVIEW.data.narration }}
        </p>
        <!-- prettier-ignore-end -->
      </div>
      <img src="~/static/images/mockup.png" alt="" class="mockup" />
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
import { mapState, mapActions } from 'vuex'
import { kooLogin } from '~/config/util'
export default {
  data() {
    return {
      sceneData: [],
      params: {},
    }
  },
  computed: {
    ...mapState(['SCENE_CODE', 'PREVIEW', 'cutType', 'SAVE_DATETIME', 'CUT_LIST', 'CUT_CODE', 'MAKER_GNB']),
  },
  watch: {
    'PREVIEW.data.effect': {
      handler(value) {
        setTimeout(() => {
          this.$refs.characterImage.classList.remove('vibration')
        }, 400)
      },
    },
    PREVIEW: {
      handler(value) {
        // chaterInsert
        console.log(value)
      },
    },
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
  method: {
    ...mapActions(['ACTION_AXIOS_GET', 'ACTION_AXIOS_POST']),
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
    transform:translateX(-100%);
  }
  to {
    transform:translateX(0);
  }
}
@keyframes right {
  from {
    transform:translateX(100%);
  }
  to {
    transform:translateX(0);
  }
}
@keyframes bottom {
  from {
    transform:translateY(100%);
  }
  to {
    transform:translateY(0);
  }
}
</style>
