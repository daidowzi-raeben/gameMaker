<template>
  <div class="insert">
    <div v-if="!SCENE_CODE" class="insert-dim">챕터를 선택하세요</div>
    <div v-bar>
      <div class="setting">
        <BackgroundAssets v-if="CONTENT_CODE === 1" />
        <CharacterFirst v-else-if="CONTENT_CODE === 2" />
        <CharacterSecond v-else-if="CONTENT_CODE === 3" />
        <SoundAssets v-else-if="CONTENT_CODE === 4" />
        <DialogueSetting v-else-if="CONTENT_CODE === 5" />
      </div>
    </div>
    <div class="right" :class="{ fold: rightContentShow === true }">
      <button
        type="button"
        class="btn-fold"
        :class="{ active: rightContentShow === true }"
        @click="onClickRightContentShow()"
      ></button>
      <div>가이드</div>
      <div>
        <p>화면설정</p>
        <dl>
          <dt>흔들림</dt>
          <dd>흔들리는 효과</dd>
        </dl>
      </div>
    </div>
  </div>
</template>

<script>
// SCENE_DATA
import { mapState, mapMutations } from 'vuex'
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
    }
  },
  computed: {
    ...mapState([
      'LOGIN',
      'LOADING',
      'SCENE_DATA',
      'SCENE_CODE',
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
  },
  methods: {
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
