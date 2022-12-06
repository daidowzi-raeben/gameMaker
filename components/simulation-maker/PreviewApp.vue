<template>
  <div class="preview">
    <div v-if="PREVIEW" class="preview-img">
      <img
        v-if="PREVIEW.img.bg"
        :src="PREVIEW.img.bg"
        alt=""
        class="background"
      />
      <div v-if="PREVIEW.img.cr" class="character-1">
        <img
          v-if="PREVIEW.img.cr"
          ref="characterImage"
          :src="PREVIEW.img.cr"
          alt=""
          class="character"
          :class="PREVIEW.data.effect"
        />
      </div>
      <div v-else-if="!PREVIEW.img.cr" class="character-2">
        <img
          v-if="PREVIEW.img.cr"
          ref="characterImage"
          :src="PREVIEW.img.cr"
          alt=""
          class="character"
          :class="PREVIEW.data.effect"
        />
        <img
          v-if="PREVIEW.img.cr"
          ref="characterImage"
          :src="PREVIEW.img.cr"
          alt=""
          class="character"
          :class="PREVIEW.data.effect"
        />
      </div>
      <div class="dialogue">
        <span v-if="PREVIEW.data.cr" class="name">{{ PREVIEW.data.cr }}</span>
        <p ref="myLoadText" class="text">
          {{ PREVIEW.data.text }}
        </p>
      </div>
      <img src="~/static/images/mockup.png" alt="" class="mockup" />
    </div>
    <div class="preview-save">
      마지막 저장 <span class="time">{{ SCENE_CODE }}</span>
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
    ...mapState(['SCENE_CODE', 'PREVIEW']),
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
@keyframes vibration {
  from {
    transform: rotate(1deg);
  }
  to {
    transform: rotate(-1deg);
  }
}
</style>
