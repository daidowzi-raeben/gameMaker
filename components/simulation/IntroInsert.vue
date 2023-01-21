<template>
  <div class="insert">
    <div class="setting">
      <div class="setting-con">
        <div class="setting-tit">배경화면 설정</div>

        <el-scrollbar>
          <div class="thumbnail-list--wrap type2">
            <ul class="thumbnail-list">
              <li class="thumbnail-list--item" @click="onClickBgImage('')">
                <div class="none"></div>
              </li>
              <li
                v-for="(v, i) in ASSETS.bg"
                :key="i"
                class="thumbnail-list--item"
                :class="{ active: PREVIEW.img.bg === v.path }"
                @click="onClickBgImage(v.path)"
              >
                <img v-if="v.path" :src="v.path" alt="" />
              </li>
            </ul>
          </div>
        </el-scrollbar>
        <div class="setting-copy">
          <div class="setting-tit">저작권 설정</div>
          <input
            type="text"
            placeholder="2022 (C) 프로젝트이름"
            class="input-text"
            :value="PREVIEW_INTRO.copyright"
            @input="onIntroData('copyright', $event)"
          />
        </div>
        <div class="setting-logo">
          <div class="setting-tit">로고 등록</div>
          <div class="input-wrap">
            <!-- <select
              class="input-select"
              :value="PREVIEW_INTRO.position"
              @change="onIntroData('position', $event)"
            >
              <option :value="null">CENTER</option>
              <option value="TOP">TOP</option>
              <option value="BOTTOM">BOTTOM</option>
              <option value="LEFT">LEFT</option>
              <option value="RIGHT">RIGHT</option>
            </select> -->
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
          <button type="button" class="button md btn-primary" @click="onSubmit">
            저장
          </button>
        </div>
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
import { kooLogin } from '~/config/util'
export default {
  components: {},
  data() {
    return {
      rightContentShow: false,
      isFileInsert: false,
      fileInsertName: '',
      intro: {
        copyright: '',
        logo: '',
        position: '',
        bg: '',
        ver: '',
      },
      paramsInit: {},
      params: {},
    }
  },
  computed: {
    ...mapState([
      'SCENE_CODE',
      'PREVIEW',
      'PROJECT_ID',
      'IS_POST',
      'PREVIEW_INTRO',
      'ASSETS',
    ]),
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
    this.$nextTick(() => {
      this.params.type = 'assetsProject'
      this.params.user_idx = kooLogin('user_idx')
      this.params.secretKey = this.PROJECT_ID
      this.params.apiKey = process.env.API_KEY
      this.ACTION_AXIOS_GET(this.params)
    })
  },
  methods: {
    ...mapMutations([
      'MUTATIONS_ASSETS_INIT',
      'MUTATIONS_AXIOS_POST_INIT',
      'MUTATIONS_INTRO',
      'MUTATIONS_INTRO_COPYRIGHT',
      'MUTATIONS_ASSETS_BG',
      'MUTATIONS_CONTENT_CODE',
    ]),
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
    onIntroData(v, e) {
      if (v === 'copyright') {
        this.MUTATIONS_INTRO_COPYRIGHT(e.target.value)
        // this.intro.copyright = e.value
      }
      if (v === 'position') {
        this.MUTATIONS_INTRO_POSITION(e.target.value)
        // this.intro.position = e.value
      }
    },
    onSubmit() {
      this.intro.bg = this.PREVIEW_INTRO.bg
      this.intro.copyright = this.PREVIEW_INTRO.copyright
      this.intro.position = this.PREVIEW.img.position
      // this.MUTATIONS_INTRO(this.intro)
      const frm = new FormData()
      const photoFile = document.getElementById('logoFile')
      frm.append('logoFile', photoFile.files[0])
      frm.append('type', 'introInsert')
      frm.append('secretKey', this.PROJECT_ID)
      frm.append('previewData', JSON.stringify(this.intro))
      frm.append('apiKey', process.env.API_KEY)
      frm.append('user_idx', kooLogin('user_idx'))
      this.ACTION_AXIOS_POST(frm)
      this.onSave()
    },
    onClickBgImage(e) {
      console.log(e)
      this.MUTATIONS_ASSETS_BG(e)
      this.MUTATIONS_CONTENT_CODE(2)
    },
    onSave() {
      const h = this.$createElement
      this.$notify({
        title: '저장되었습니다.',
        message: h(
          'i',
          { style: 'color: teal' },
          '인트로는 어플리케이션의 얼굴이에요!'
        ),
      })
    },
  },
}
</script>

<style></style>
