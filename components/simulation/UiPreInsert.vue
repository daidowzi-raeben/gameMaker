<template>
  <div class="insert">
    <div v-bar>
      <div class="setting bottom-none">
        <div class="setting-con setting-color">
          <div class="setting-tit">메인 색상 설정</div>
          <Chrome v-model="colorPicker.mainColor"></Chrome>
        </div>
        <div class="setting-con setting-window">
          <div class="setting-tit">창 설정</div>
          <div class="input-wrap">
            <label class="input-label">창 색상</label>
            <Chrome v-model="colorPicker.windowColor"></Chrome>
          </div>
          <div class="input-wrap">
            <label class="input-label">모서리 둥글게</label>
            <input
              v-model="colorPicker.round"
              type="number"
              class="input-number"
              value="0"
            />
            <span class="text">px</span>
          </div>
          <div class="input-wrap">
            <label class="input-label">외곽선</label>
            <Chrome v-model="colorPicker.strokeColor"></Chrome>
          </div>
          <div class="input-wrap">
            <label class="input-label"></label>
            <input
              v-model="colorPicker.border"
              type="number"
              class="input-number"
              value="0"
            />
            <span class="text">px</span>
          </div>
          <div class="input-wrap">
            <label class="input-label">그림자</label>
            <Chrome v-model="colorPicker.shadowColor"></Chrome>
          </div>
          <div class="input-wrap">
            <label class="input-label"></label>
            <span class="text">X축</span>
            <input
              v-model="colorPicker.x"
              type="number"
              class="input-number"
              value="0"
            />
            <span class="text">Y축</span>
            <input
              v-model="colorPicker.y"
              type="number"
              class="input-number"
              value="0"
            />
          </div>
        </div>
        <div class="setting-con setting-icon">
          <div class="setting-tit">아이콘 설정</div>
          <select
            class="input-select"
            :value="IN_APP_ICON"
            @change="onChangeIconSetting"
          >
            <option :value="null">선택</option>
            <option>white line</option>
            <option>white fill</option>
            <option>black line</option>
            <option>black fill</option>
          </select>
        </div>
        <div>
          <button ype="button" class="button btn-primary lg" @click="onSubmit">
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
import { Chrome } from 'vue-color'
import { kooLogin } from '~/config/util'
export default {
  components: {
    Chrome,
  },
  data() {
    return {
      rightContentShow: false,
      paramsInit: {},
      colorPicker: {
        mainColor: {},
        windowColor: {},
        strokeColor: {},
        shadowColor: {},
        round: 0,
        border: 0,
        x: 0,
        y: 0,
      },
      temp: true,
    }
  },
  computed: {
    ...mapState(['UISetting', 'IN_APP_ICON', 'IS_UI', 'PROJECT_ID']),
  },
  watch: {
    colorPicker: {
      handler(value) {
        console.log('watch', value)
        this.MUTATIONS_COLOR_PICKER(value)
        if (this.UISetting) {
          this.colorPicker = this.UISetting
        }
      },
      immediate: false,
      deep: true,
    },
    // IS_UI: {
    //   handler(value) {
    //     console.log('watch_IS_UI', value)
    //     if (this.UISetting) {
    //       this.colorPicker = this.UISetting
    //     }
    //   },
    //   immediate: true,
    // },
  },
  mounted() {
    this.$nextTick(() => {
      this.paramsInit.user_idx = kooLogin('user_idx')
      this.paramsInit.type = 'uiList'
      this.paramsInit.secretKey = this.PROJECT_ID
      this.paramsInit.apiKey = process.env.API_KEY
      this.ACTION_AXIOS_GET(this.paramsInit)
    })
  },
  methods: {
    ...mapMutations(['MUTATIONS_COLOR_PICKER', 'MUTATIONS_IN_APP_ICON']),
    ...mapActions(['ACTION_AXIOS_GET', 'ACTION_AXIOS_POST']),
    updateColor() {
      console.log(this.mainColor)
    },
    onChangeIconSetting({ target }) {
      this.MUTATIONS_IN_APP_ICON(target.value)
    },
    test({ target }) {
      this.temp = false
      target.nextElementSibling.style = 'display:block'
    },
    onSubmit() {
      const frm = new FormData()
      frm.append('type', 'uiInsert')
      frm.append('secretKey', this.PROJECT_ID)
      frm.append('previewData', JSON.stringify(this.UISetting))
      frm.append('apiKey', process.env.API_KEY)
      frm.append('user_idx', kooLogin('user_idx'))
      this.ACTION_AXIOS_POST(frm)
    },
  },
}
</script>

<style>
</style>
