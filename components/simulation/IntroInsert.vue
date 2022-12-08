<template>
  <div class="insert">
    <div class="setting">
      <ImageController />
      <!-- <div class="setting-copy">
        <div class="setting-tit">버튼설정</div>
        <div class="d-flex">
          <div>
            <span>인물소개</span>
            <select class="input-select">
              <option>사용</option>
            </select>
          </div>
          <div>
            <span>asd</span>
            <select class="input-select">
              <option>TOP</option>
            </select>
          </div>
        </div>
      </div> -->
      <div class="setting-copy">
        <div class="setting-tit">저작권 설정</div>
        <input
          v-model="intro.copy"
          type="text"
          placeholder="2022 (C) 프로젝트이름"
          class="input-text"
        />
      </div>
      <div class="setting-logo">
        <div class="setting-tit">로고 등록</div>
        <div class="input-wrap">
          <select v-model="intro.position" class="input-select">
            <option>TOP</option>
          </select>
          <input
            type="text"
            class="input-text"
            :value="fileInsertName"
            readonly
          />
          <label class="input-file">
            <input
              id="logoFile"
              ref="logoFile"
              type="file"
              @change="onChangeFileInput"
            />
            <span v-if="isFileInsert === false" class="btn">이미지 등록</span>
          </label>
          <span
            v-if="isFileInsert === true"
            class="btn delete"
            @click="onClickFileDelete"
            >이미지 삭제</span
          >
        </div>
      </div>
      <div class="text-center">
        <button style="font-size: 20px" @click="onSubmit">저장</button>
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
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import ImageController from './ImageController.vue'
import { kooLogin } from '~/config/util'
export default {
  components: {
    ImageController,
  },
  data() {
    return {
      rightContentShow: false,
      isFileInsert: false,
      fileInsertName: '',
      intro: {},
      paramsInit: {},
    }
  },
  computed: {
    ...mapState(['SCENE_CODE', 'PREVIEW', 'PROJECT_ID', 'IS_POST']),
  },
  watch: {
    IS_POST: {
      handler(value) {
        console.log('watch', value)
        this.MUTATIONS_AXIOS_POST_INIT()
      },
      immediate: false,
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.paramsInit.user_idx = kooLogin('user_idx')
      this.paramsInit.type = 'introList'
      this.paramsInit.secretKey = this.PROJECT_ID
      this.paramsInit.apiKey = process.env.API_KEY
      this.ACTION_AXIOS_GET(this.paramsInit)
    })
  },
  methods: {
    ...mapMutations(['MUTATIONS_ASSETS_INIT', 'MUTATIONS_AXIOS_POST_INIT']),
    ...mapActions(['ACTION_AXIOS_GET', 'ACTION_AXIOS_POST']),
    onClickRightContentShow() {
      this.rightContentShow = !this.rightContentShow
    },
    onChangeFileInput(e) {
      this.isFileInsert = true
      this.fileInsertName = e.target.files[0].name
    },
    onClickFileDelete() {
      this.isFileInsert = false
      this.fileInsertName = ''
      this.$refs.logoFile.value = ''
    },
    onSubmit() {
      this.intro.bg = this.PREVIEW.img.bg
      const frm = new FormData()
      const photoFile = document.getElementById('logoFile')
      frm.append('logoFile', photoFile.files[0])
      frm.append('type', 'introInsert')
      frm.append('secretKey', this.PROJECT_ID)
      frm.append('previewData', JSON.stringify(this.intro))
      frm.append('apiKey', process.env.API_KEY)
      frm.append('user_idx', kooLogin('user_idx'))
      this.ACTION_AXIOS_POST(frm)
    },
  },
}
</script>

<style></style>
