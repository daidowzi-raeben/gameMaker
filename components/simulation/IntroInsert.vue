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
              >
                <el-popover
                  v-model="visible[i]"
                  placement="right"
                  trigger="click"
                >
                  <div class="character-face">
                    <el-scrollbar>
                      <ul
                        v-if="ASSETS_EMOTION && ASSETS_EMOTION.emotion"
                        class="character-face--list"
                      >
                        <li
                          v-for="(e, p) in ASSETS_EMOTION.emotion"
                          :key="p"
                          class="item"
                          :class="{ active: e.path === PREVIEW.img.bg }"
                          @click="onClickBgImage(e.path)"
                        >
                          {{ e.gas_discription }}
                        </li>
                      </ul>
                    </el-scrollbar>
                    <button
                      type="button"
                      class="button sm btn-grey"
                      @click="visible = []"
                    >
                      닫기
                    </button>
                  </div>
                  <div class="img-wrap" slot="reference">
                    <img
                      :src="onLoadAssetsImage(v.path)"
                      alt=""
                      @click="onClickEmotionAssets(v.timestemp, v.path)"
                    />
                  </div>
                </el-popover>
                <!-- <img v-if="v.path" :src="onLoadAssetsImage(v.path)" alt="" /> -->
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
                accept="image/png"
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
          <div class="setting-tit">배경음 등록</div>
          <div class="input-wrap">
            <input
              type="text"
              class="input-text"
              :value="fileInsertName2"
              readonly
            />
            <label class="input-file">
              <input
                id="bgmFile"
                ref="bgmFile"
                type="file"
                accept="sound/mp3"
                @change="onChangeFileInput2"
              />
              <span v-if="isFileInsert2 === false" class="btn"
                >배경음 등록</span
              >
            </label>
            <span
              v-if="fileInsertName2 === true"
              class="btn delete"
              @click="onClickFileDelete2"
              >배경음 삭제</span
            >
          </div>
        </div>

        <div class="setting-tit">디자인 관리</div>
        <div class="input-select--list">
          <div class="input-wrap">
            <label class="input-label">딤 효과</label>
            <el-select
              v-model="intro.dim"
              placeholder="선택안함"
              @change="onClickPreviewDim"
            >
              <el-option
                v-for="item in introDimOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <!-- <select class="input-select">
                <option>밝게</option>
                <option>어둡게</option>
                <option>흐릿하게</option>
              </select> -->
          </div>
        </div>
        <div class="input-select--list">
          <div class="input-wrap">
            <label class="input-label">로고&버튼</label>
            <el-select
              v-model="intro.position"
              placeholder="선택안함"
              @change="onClickPreviewPosition"
            >
              <el-option
                v-for="item in introPositionOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div class="input-wrap">
            <label class="input-label">카피라이트</label>
            <el-select
              v-model="intro.copyrightPosition"
              placeholder="선택안함"
              @change="onClickPreviewCopyrightPosition"
            >
              <el-option
                v-for="item in introCopyrightPositionOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="text-center mt-5">
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
      isFileInsert2: false,
      fileInsertName2: '',
      intro: {},
      paramsInit: {},
      params: {},
      introDimOption: [
        {
          value: '',
          label: '없음',
        },
        {
          value: 'dim-light',
          label: '밝게',
        },
        {
          value: 'dim-dark',
          label: '어둡게',
        },
        {
          value: 'dim-blur',
          label: '흐리게',
        },
      ],
      introPositionValue: 'center',
      introPositionOption: [
        {
          value: '',
          label: '중앙',
        },
        {
          value: 'diagonal',
          label: '버튼 우측 하단',
        },
        {
          value: 'diagonal-r',
          label: '버튼 상단',
        },
      ],
      introCopyrightPositionOption: [
        {
          value: '',
          label: '중앙',
        },
        {
          value: 'copy-left',
          label: '왼쪽',
        },
        {
          value: 'copy-right',
          label: '오른쪽',
        },
      ],
      introDimOptionValue: '',
      paramsUI: {},
      visible: [],
      paramsEmotion: {},
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
      'ASSETS_EMOTION',
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
    PREVIEW_INTRO: {
      handler(value) {
        this.intro = value
        this.fileInsertName = value.logo
        this.fileInsertName2 = value.bgm
      },
      immediate: true,
    },
  },
  mounted() {
    this.MUTATIONS_LOGO_IMG('')
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
    this.$nextTick(() => {
      this.paramsUI.user_idx = kooLogin('user_idx')
      this.paramsUI.type = 'uiList'
      this.paramsUI.secretKey = this.PROJECT_ID
      this.paramsUI.apiKey = process.env.API_KEY
      this.ACTION_AXIOS_GET(this.paramsUI)
    })
  },
  methods: {
    ...mapMutations([
      'MUTATIONS_ASSETS_INIT',
      'MUTATIONS_AXIOS_POST_INIT',
      'MUTATIONS_INTRO',
      'MUTATIONS_LOGO_IMG',
      'MUTATIONS_INTRO_COPYRIGHT',
      'MUTATIONS_ASSETS_BG',
      'MUTATIONS_CONTENT_CODE',
      'MUTATIONS_INTRO_DIM',
      'MUTATIONS_INTRO_POSITION',
      'MUTATIONS_INTRO_COPYRIGHT_POSITION',
      'MUTATIONS_LOGO_IMG',
    ]),
    ...mapActions(['ACTION_AXIOS_GET', 'ACTION_AXIOS_POST']),
    onClickRightContentShow() {
      this.rightContentShow = !this.rightContentShow
    },
    onChangeFileInput(e) {
      const mp = e.target.files[0].name.split('.')
      this.soundFile = e.target.files[0]
      // e.target.files[0].name.substr(0,mp)
      console.log(mp[mp.length - 1], e.target.files[0].name)
      this.ext = mp[mp.length - 1]
      if (this.ext !== 'png') {
        e.target.files = null
        return alert('png 확장자만 업로드가 가능합니다')
      }
      this.isFileInsert = true
      this.fileInsertName = e.target.files[0].name
      this.MUTATIONS_LOGO_IMG(URL.createObjectURL(e.target.files[0]))

      console.log(URL.createObjectURL(e.target.files[0]))
    },
    onChangeFileInput2(e) {
      const mp = e.target.files[0].name.split('.')
      this.soundFile = e.target.files[0]
      // e.target.files[0].name.substr(0,mp)
      console.log(mp[mp.length - 1], e.target.files[0].name)
      this.ext = mp[mp.length - 1]
      if (this.ext !== 'mp3') {
        e.target.files = null
        return alert('mp3 확장자만 업로드가 가능합니다')
      }
      this.isFileInsert2 = true
      this.fileInsertName2 = e.target.files[0].name

      console.log(URL.createObjectURL(e.target.files[0]))
    },
    onClickFileDelete() {
      this.isFileInsert = false
      this.fileInsertName = ''
      this.$refs.logoFile.value = ''
      this.MUTATIONS_LOGO_IMG('')
    },
    onClickFileDelete2() {
      this.isFileInsert2 = false
      this.fileInsertName2 = ''
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
      this.intro = this.PREVIEW_INTRO
      // this.intro.bg = this.PREVIEW_INTRO.bg
      // this.intro.copyright = this.PREVIEW_INTRO.copyright
      // this.intro.position = this.PREVIEW.img.position
      // this.MUTATIONS_INTRO(this.intro)
      const frm = new FormData()
      const photoFile = document.getElementById('logoFile')
      frm.append('logoFile', photoFile.files[0])
      const bgmFile = document.getElementById('bgmFile')
      frm.append('bgmFile', bgmFile.files[0])
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
    onClickPreviewDim() {
      this.MUTATIONS_INTRO_DIM(this.intro.dim)
    },
    onClickPreviewPosition() {
      this.MUTATIONS_INTRO_POSITION(this.intro.position)
    },
    onClickPreviewCopyrightPosition() {
      this.MUTATIONS_INTRO_COPYRIGHT_POSITION(this.intro.copyrightPosition)
    },
    onLoadAssetsImage(v) {
      return `${process.env.VUE_APP_IMAGE}/bg/${v}`
    },
    onClickEmotionAssets(v, path) {
      console.log('onClickEmotionAssets', v)
      this.MUTATIONS_ASSETS_BG(path)
      this.paramsEmotion.type = 'assetsProjectEmotion'
      this.paramsEmotion.user_idx = kooLogin('user_idx')
      this.paramsEmotion.secretKey = this.PROJECT_ID
      this.paramsEmotion.apiKey = process.env.API_KEY
      this.paramsEmotion.timestemp = v
      this.ACTION_AXIOS_GET(this.paramsEmotion)
    },
  },
}
</script>

<style></style>
