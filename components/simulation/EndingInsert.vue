<template>
  <div class="insert">
    <div v-if="!ENDING_CODE" class="insert-dim">엔딩 챕터를 선택하세요</div>
    <div class="setting">
      <transition name="el-fade-in-linear">
        <BackgroundAssets v-if="CONTENT_CODE === 1" :isEndign="'Y'" />
        <CharacterFirst v-if="CONTENT_CODE === 2" :isEndign="'Y'" />
        <CharacterSecond v-if="CONTENT_CODE === 3" :isEndign="'Y'" />
        <SoundAssets v-if="CONTENT_CODE === 4" :isEndign="'Y'" />
        <DialogueSetting v-if="CONTENT_CODE === 5" :isEndign="'Y'" />
      </transition>
    </div>
    <div class="right" :class="{ fold: rightContentShow === true }">
      <button
        type="button"
        class="btn-fold"
        :class="{ active: rightContentShow === true }"
        @click="onClickRightContentShow()"
      ></button>
    </div>
  </div>
</template>

<script>
// SCENE_DATA
import { mapState, mapMutations, mapActions } from 'vuex'
import BackgroundAssets from '~/components/simulation/cut/BackgroundAssets.vue'
import CharacterFirst from '~/components/simulation/cut/CharacterFirst.vue'
import CharacterSecond from '~/components/simulation/cut/CharacterSecond.vue'
import DialogueSetting from '~/components/simulation/cut/DialogueSetting.vue'
import SoundAssets from '~/components/simulation/cut/SoundAssets.vue'
import { kooLogin } from '~/config/util'
export default {
  components: {
    BackgroundAssets,
    CharacterFirst,
    CharacterSecond,
    DialogueSetting,
    SoundAssets,
  },
  data() {
    return {
      params: {},
      paramsPreview: {},
      paramsList: {},
      rightContentShow: false,
      settingType: 5,
      paramsInit: {},
    }
  },
  computed: {
    ...mapState([
      'LOGIN',
      'LOADING',
      'SCENE_DATA',
      'ENDING_CODE',
      'SCENE_INDEX',
      'CHAPTER_INDEX',
      'ASSETS',
      'SCENE_DATA_CHARACTER',
      'PREVIEW',
      'PROJECT_ID',
      'CUT_LIST',
      'cutType',
      'CUT_CODE',
      'CONTENT_CODE',
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

    if (this.SCENE_CODE) {
      this.paramsList.gc_timestamp = this.SCENE_CODE
      this.paramsList.type = 'cutList'
      this.paramsList.secretKey = this.PROJECT_ID
      this.paramsList.user_idx = kooLogin('user_idx')
      this.paramsList.apiKey = process.env.API_KEY
      console.log(this.SCENE_CODE)
    }
    this.$nextTick(() => {
      this.paramsInit.user_idx = kooLogin('user_idx')
      this.paramsInit.type = 'uiList'
      this.paramsInit.secretKey = this.PROJECT_ID
      this.paramsInit.apiKey = process.env.API_KEY
      this.ACTION_AXIOS_GET(this.paramsInit)
    })
  },
  methods: {
    ...mapActions(['ACTION_AXIOS_GET']),
    ...mapMutations(['MUTATIONS_CONTENT_CODE']),
    onClickRightContentShow() {
      this.rightContentShow = !this.rightContentShow
    },
  },
}
</script>

<style scoped>
.v-move {
  transition: all 1s;
}
</style>
