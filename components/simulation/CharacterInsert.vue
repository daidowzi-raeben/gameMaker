<template>
  <div class="insert">
    <div class="setting">
      <!-- <button type="button" class="button btn-pink delete-btn">삭제</button> -->
      <ImageController />
      <div class="setting-con setting-profile">
        <div class="setting-tit">프로필 설정</div>
        <div class="input-wrap">
          <select ref="profilePosition" class="input-select">
            <option value="top">TOP</option>
            <option value="bottom">BOTTOM</option>
          </select>
          <input
            type="text"
            class="input-text"
            placeholder="인물의 이름을 입력하세요"
            :value="
              CHAPTER_DEATILE && CHAPTER_DEATILE_IDX ? CHAPTER_DEATILE.name : ''
            "
            @input="onInputName"
          />
        </div>
        <div class="textarea-wrap">
          <textarea
            rows="10"
            placeholder="인물의 프로필을 입력하세요"
            class="input-textarea"
            :value="
              CHAPTER_DEATILE && CHAPTER_DEATILE_IDX
                ? CHAPTER_DEATILE.profile.replaceAll('||n', '\n')
                : ''
            "
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
import ImageController from '~/components/simulation/ImageController.vue'
import ScenarioSelect from '~/components/modules/ScenarioSelect.vue'
import { kooLogin } from '~/config/util'
export default {
  components: {
    ImageController,
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
    ]),
  },
  mounted() {
    // console.log(time)
    this.$nextTick(() => {
      this.user_idx = kooLogin('user_idx')
      // this.paramsInit.type = 'scenarioDetail'
      // this.paramsInit.secretKey = this.PROJECT_ID
      // this.paramsInit.apiKey = process.env.API_KEY
      // this.ACTION_AXIOS_GET(this.paramsInit)
    })
  },
  methods: {
    ...mapMutations([
      'MUTATIONS_ASSETS_INIT',
      'MUTAIONS_SAVE',
      'MUTATIONS_LOADING_INIT',
      'MUTATIONS_LOADING',
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
    onInputProfile({ target }) {
      this.characterData.profile = target.value
    },
    onInputName({ target }) {
      this.characterData.name = target.value
      console.log(target.value)
    },
    onSubmit() {
      this.MUTATIONS_LOADING_INIT()
      if (this.SCENE_DATA_CHARACTER.jsonData) {
        this.characterLength = this.SCENE_DATA_CHARACTER.jsonData.length
      }
      if (this.CHAPTER_DEATILE_IDX) {
        this.paramsData.mode = 'update'
        this.paramsData.idx = this.CHAPTER_DEATILE_IDX
        if (!this.characterData?.profile) {
          this.characterData.profile = this.CHAPTER_DEATILE.profile
        }
        if (!this.characterData?.name) {
          this.characterData.name = this.CHAPTER_DEATILE.name
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
      this.characterData.position = this.$refs.profilePosition.value
      this.paramsData.type = 'characterInsert'
      this.paramsData.secretKey = this.PROJECT_ID
      this.paramsData.user_idx = this.user_idx
      this.paramsData.apiKey = process.env.API_KEY
      this.paramsData.previewData = JSON.stringify(this.characterData)
      this.paramsData.previewData = this.paramsData.previewData.replaceAll(
        '\n',
        '||n'
      )
      this.ACTION_AXIOS_GET(this.paramsData)
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
  },
}
</script>

<style></style>
