<template>
  <div class="insert">
    <div class="setting">
      <!-- <button type="button" class="button btn-pink delete-btn">삭제</button> -->
      <div class="setting-con setting-profile" style="position: unset">
        <div class="setting-tit">인물 이미지</div>
        <el-scrollbar>
          <div class="thumbnail-list--wrap type2">
            <ul v-if="ASSETS" class="thumbnail-list">
              <li class="thumbnail-list--item" @click="onClickCrImage('')">
                <div class="none"></div>
              </li>
              <li
                v-for="(v, i) in ASSETS.cr"
                :key="i"
                class="thumbnail-list--item"
                :class="{ active: PREVIEW.img.cr === v.path }"
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
                          :class="{ active: e.path === PREVIEW.img.cr }"
                          @click="onClickCrImage(e.path)"
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

        <div class="setting-tit mt-5">배경 이미지</div>
        <el-scrollbar>
          <div class="thumbnail-list--wrap type2">
            <ul v-if="ASSETS" class="thumbnail-list">
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
                  v-model="visibleBg[i]"
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
                      @click="visibleBg = []"
                    >
                      닫기
                    </button>
                  </div>
                  <div class="img-wrap" slot="reference">
                    <img
                      :src="onLoadAssetsImageBg(v.path)"
                      alt=""
                      @click="onClickEmotionAssetsBg(v.timestemp, v.path)"
                    />
                  </div>
                </el-popover>
                <!-- <img v-if="v.path" :src="onLoadAssetsImage(v.path)" alt="" /> -->
              </li>
            </ul>
          </div>
        </el-scrollbar>

        <div class="color-select--list">
          <div class="color-select--wrap">
            <el-color-picker
              v-model="colorPicker"
              show-alpha
              @active-change="onChangeColorPicker"
            ></el-color-picker>
            <label class="label mt-2">배경색상</label>
          </div>
        </div>

        <div class="setting-tit mt-3">상세 정보</div>
        <div class="input-wrap mt-3">
          <!-- <select ref="profilePosition" class="input-select">
            <option value="top">TOP</option>
            <option value="bottom">BOTTOM</option>
          </select> -->
          <el-popover
            placement="right"
            width="400"
            trigger="click"
            class="mr-1"
          >
            <cropper
              class="cropper"
              :src="img"
              :stencil-props="{
                handlers: {},
                aspectRatio: 10 / 10,
                resizable: false,
              }"
              :stencil-size="{
                width: 150,
                height: 150,
              }"
              @change="onChangeCropImage"
            ></cropper>
            <el-button
              slot="reference"
              class="btn-blue"
              :disabled="PREVIEW.img.cr ? false : true"
              @click="onClickThumb(PREVIEW.img.cr)"
              >대표 이미지 만들기</el-button
            >
          </el-popover>
          <input
            type="text"
            class="input-text"
            placeholder="이름은 최대 5글자까지 입력 가능해요"
            :value="PREVIEW_PROFILE.name"
            @input="onInputName"
            :maxlength="5"
          />
        </div>
        <!-- 프로필등장 버튼 주석, 스타일 임시 -->
        <div class="textarea-wrap" style="padding-bottom: 10px">
          <textarea
            rows="10"
            placeholder="인물의 소개를 입력하세요! 길어지면 스크롤 처리돼요"
            class="input-textarea"
            :value="PREVIEW_PROFILE.discription.replaceAll('||n', '\n')"
            @input="onInputProfile"
          ></textarea>
          <ScenarioSelect />
        </div>
        <div class="text-center mt-5">
          <button
            class="button md btn-primary"
            :class="{ red: CHAPTER_DEATILE_IDX === true }"
            @click="onSubmit"
          >
            {{ CHAPTER_DEATILE_IDX ? '수정하기' : '추가하기' }}
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
      <!-- <div>가이드</div> -->
    </div>
    <div v-show="false" class="cut" :class="{ fold: cutListShow === false }">
      <div class="cut-tit">
        <span class="scenario">인물 리스트</span>
        <button
          type="button"
          class="fold-btn"
          @click="cutListShow = !cutListShow"
        >
          <span v-if="cutListShow" class="text">접기</span>
          <span v-else class="text">펼치기</span>
        </button>
      </div>
      <swiper
        v-if="SCENE_DATA_CHARACTER && SCENE_DATA_CHARACTER.jsonData"
        v-show-slide="cutListShow"
        :options="swiperOptionCutList"
        class="cut-list"
      >
        <swiper-slide
          v-for="(v, i) in SCENE_DATA_CHARACTER.jsonData"
          :key="i"
          class="cut-list--item type2"
        >
          <span
            v-if="
              CHAPTER_DEATILE_IDX &&
              SCENE_DATA_CHARACTER.idx[i] === CHAPTER_DEATILE_IDX
            "
            class="active-sign"
          ></span>
          <div class="image-list">
            <img v-if="v.cr" :src="v.cr" alt="" class="top" />
            <div class="image-list--top">
              <strong class="name">{{ v.name }}</strong>
            </div>
            <div class="image-list--con">
              {{ v.profile }}
            </div>
          </div>
        </swiper-slide>
        <div slot="button-prev" class="swiper-button-prev"></div>
        <div slot="button-next" class="swiper-button-next"></div>
      </swiper>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import ScenarioSelect from '~/components/modules/ScenarioSelect.vue'
import { kooLogin } from '~/config/util'
export default {
  components: {
    ScenarioSelect,
  },
  data() {
    return {
      rightContentShow: false,
      isFileInsert: false,
      fileInsertName: '',
      cutListShow: false,
      swiperOptionCutList: {
        loop: false,
        slidesPerView: 4,
        slidesPerGroup: 4,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      },
      characterData: {},
      user_idx: '',
      paramsData: {},
      paramsInit: {},
      characterLength: 0,
      colorPicker: null,
      params: {},
      img: '',
      thumb: '',
      visible: [],
      visibleBg: [],
      paramsEmotion: {},
    }
  },
  PREVIEW: {
    handler(value) {
      // chaterInsert
      console.log('CharacterInsert', value)
    },
  },
  computed: {
    ...mapState([
      'SCENE_CODE',
      'PREVIEW',
      'ASSETS',
      'PROJECT_ID',
      'CHAPTER_DEATILE_IDX',
      'CHAPTER_DEATILE',
      'SCENE_DATA',
      'SCENE_DATA_CHARACTER',
      'PREVIEW_PROFILE',
      'CROP_IMAGE',
      'ASSETS_EMOTION',
    ]),
  },
  watch: {
    'PREVIEW_PROFILE.background': {
      handler(value) {
        console.log('watch=============', value)
        this.colorPicker = value
      },
      immediate: true,
    },
    SCENE_DATA_CHARACTER: {
      handler(value) {
        this.params.type = 'assetsProject'
        this.params.user_idx = kooLogin('user_idx')
        this.params.secretKey = this.PROJECT_ID
        this.params.apiKey = process.env.API_KEY
        this.ACTION_AXIOS_GET(this.params)
      },
    },
    colorPicker: {
      handler(value) {
        console.log('watch', value)
        this.MUTATIONS_PROFILE_COLOR_PICKER(value)
      },
      immediate: false,
      deep: true,
    },
  },
  mounted() {
    // console.log(time)
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
      'MUTAIONS_SAVE',
      'MUTATIONS_LOADING_INIT',
      'MUTATIONS_LOADING',
      'MUTATIONS_ASSETS_CR',
      'MUTATIONS_PROFILE_NAME',
      'MUTATIONS_PROFILE_DISCRIPTION',
      'MUTATIONS_ASSETS_BG',
      'MUTATIONS_CONTENT_CODE',
      'MUTATIONS_PROFILE_COLOR_PICKER',
      'MUTATIONS_CROP_IMAGE',
    ]),
    ...mapActions([
      'ACTION_AXIOS_GET',
      'ACTION_AXIOS_POST_PROFILE',
      'ACTION_AXIOS_POST_PROFILE2',
    ]),

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
    onInputProfile({ target }) {
      this.characterData.profile = target.value
      this.MUTATIONS_PROFILE_DISCRIPTION(target.value)
    },
    onInputName({ target }) {
      this.characterData.name = target.value
      console.log(target.value)
      this.MUTATIONS_PROFILE_NAME(target.value)
    },
    onSubmit() {
      if (!this.PREVIEW_PROFILE.discription && !this.PREVIEW_PROFILE.name) {
        if (!this.characterData.name || !this.characterData.profile) {
          return alert('이름과 소개를 입력해 주세요')
        }
      }
      if (!this.PREVIEW_PROFILE.discription && !this.characterData.profile) {
        return alert('소개를 입력해 주세요')
      }
      this.MUTATIONS_LOADING_INIT()
      const frm = new FormData()
      if (this.SCENE_DATA_CHARACTER.jsonData) {
        this.characterLength = this.SCENE_DATA_CHARACTER.jsonData.length
      }
      if (this.CHAPTER_DEATILE_IDX) {
        frm.append('mode', 'update')
        frm.append('idx', this.CHAPTER_DEATILE_IDX)
        this.characterData.profile = ''
        this.characterData.name = ''
        if (!this.characterData?.profile) {
          // frm.append('profile', this.CHAPTER_DEATILE.profile)
          this.characterData.profile = this.PREVIEW_PROFILE.discription
        }
        if (!this.characterData?.name) {
          this.characterData.name = this.PREVIEW_PROFILE.name
        }
      } else {
        for (let i = 0; i < this.characterLength; i++) {
          if (
            this.SCENE_DATA_CHARACTER.jsonData[i].name ===
            this.characterData.name
          ) {
            this.onErrorMsg()
            return this.MUTATIONS_LOADING()
          }
        }
      }

      this.characterData.bg = this.PREVIEW.img.bg
      this.characterData.cr = this.PREVIEW.img.cr
      this.characterData.background = this.colorPicker
      // this.paramsData.crHead = this.thumb.replaceAll(
      //   'data:image/png;base64,',
      //   ''
      // )
      // this.characterData.position = this.$refs.profilePosition.value
      this.paramsData.type = 'characterInsert'
      this.paramsData.secretKey = this.PROJECT_ID
      this.paramsData.user_idx = kooLogin('user_idx')
      this.paramsData.apiKey = process.env.API_KEY
      this.characterData.profile = this.characterData.profile.replaceAll(
        '\n',
        '||n'
      )

      // return
      frm.append('bg', this.PREVIEW.img.bg)
      frm.append('cr', this.PREVIEW.img.cr)
      if (this.thumb) {
        frm.append('crHead', this.thumb)
      }

      frm.append('type', 'characterInsert')
      frm.append('secretKey', this.PROJECT_ID)
      frm.append('user_idx', kooLogin('user_idx'))
      frm.append('apiKey', process.env.API_KEY)
      frm.append('previewData', JSON.stringify(this.characterData))
      frm.append(
        'profile',
        this.characterData.profile
          ? this.characterData.profile.replaceAll('\n', '||n')
          : ''
      )
      // this.paramsData.previewData = this.paramsData.previewData.replaceAll(
      //   '\n',
      //   '||n'
      // )
      if (this.CHAPTER_DEATILE_IDX) {
        this.ACTION_AXIOS_POST_PROFILE2(frm)
      } else {
        this.ACTION_AXIOS_POST_PROFILE(frm)
      }
      this.onSave()

      // this.MUTATIONS_ASSETS_INIT()
      // 리스트 초기화
      // await this.$nextTick(() => {
      //   this.user_idx = kooLogin('user_idx')
      //   this.paramsInit.type = 'characterList'
      //   this.paramsInit.user_idx = this.user_idx
      //   this.paramsInit.secretKey = this.PROJECT_ID
      //   this.paramsInit.apiKey = process.env.API_KEY
      //   this.ACTION_AXIOS_GET(this.paramsInit)
      //   this.MUTAIONS_SAVE()
      // })
    },
    onClickBgImage(e) {
      console.log(e)
      this.characterData.bg = e
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
          '다양한 인물을 소개해 주세요!'
        ),
      })
    },
    onErrorMsg() {
      const h = this.$createElement
      this.$notify({
        title: '이름이 중복되었습니다.',
        message: h(
          'i',
          { style: 'color: teal' },
          '인물의 이름은 중복으로 사용할 수 없어요'
        ),
      })
    },
    onClickCrImage(e) {
      this.MUTATIONS_ASSETS_CR(e)
    },
    onLoadAssetsImage(v) {
      return `${process.env.VUE_APP_IMAGE}/cr/${v}`
    },
    onLoadAssetsImageBg(v) {
      return `${process.env.VUE_APP_IMAGE}/bg/${v}`
    },
    onChangeColorPicker(value) {
      console.log('onChangeColorPicker', value)
      this.colorPicker = value
    },
    onChangeCropImage({ coordinates, canvas }) {
      // this.coordinates = coordinatesx
      // You able to do different manipulations at a canvas
      // but there we just get a cropped image, that can be used
      // as src for <img/> to preview result
      // this.$emit('onChangeCropImage', canvas.toDataURL())
      this.thumb = canvas.toDataURL()
      this.MUTATIONS_CROP_IMAGE(this.thumb)
    },
    onClickThumb(v) {
      fetch(
        'http://api.school-os.net/game/assets.php?type=assetsImage&file=' + v
      )
        .then((response) => response.text())
        .then((text) => {
          console.log('========', text)
          this.img = text
        })
    },
    onClickEmotionAssets(v, path) {
      console.log('onClickEmotionAssets', v)
      this.MUTATIONS_ASSETS_CR(path)
      this.paramsEmotion.type = 'assetsProjectEmotion'
      this.paramsEmotion.user_idx = kooLogin('user_idx')
      this.paramsEmotion.secretKey = this.PROJECT_ID
      this.paramsEmotion.apiKey = process.env.API_KEY
      this.paramsEmotion.timestemp = v
      this.ACTION_AXIOS_GET(this.paramsEmotion)
    },
    onClickEmotionAssetsBg(v, path) {
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

<style>
.cropper {
  height: 600px;
  background: #ddd;
}
</style>
