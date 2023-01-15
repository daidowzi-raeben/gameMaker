<template>
  <div class="insert">
    <el-scrollbar class="setting">
      <div class="setting bottom-none">
        <div class="setting-con setting-color">
          <div class="setting-tit">UI 설정</div>
          <div class="setting-info">나만의 설명</div>
          <div class="radio-wrap">
            <label class="input-radio">
              <input
                ref="isUiSettingTheme"
                type="radio"
                name="ui"
                @change="onChangeUiSetting"
              />
              <span class="check radio"></span>
              <span class="text">에셋 테마</span>
            </label>
            <label class="input-radio">
              <input
                ref="isUiSettingCustom"
                type="radio"
                name="ui"
                checked
                @change="onChangeUiSetting"
              />
              <span class="check radio"></span>
              <span class="text">커스터마이징</span>
            </label>
          </div>
          <div v-if="isUiSettingTab === false">
            <el-scrollbar class="ui-wrap h-550">
              <div>
                <ul class="theme-list">
                  <li v-for="(v, i) in 20" :key="i" class="theme-list--item">
                    <div class="img-wrap">
                      <!-- <img src="" alt="theme" /> -->
                    </div>
                    <div class="hash"><span>호러</span><span>블랙</span></div>
                  </li>
                </ul>
              </div>
            </el-scrollbar>
          </div>
          <div v-if="isUiSettingTab === true" class="ui-wrap">
            <div class="setting-tit sub">인트로 관리</div>
            <div class="input-select--list">
              <div class="input-wrap">
                <label class="input-label">딤 효과</label>
                <el-select v-model="introDimOptionValue" placeholder="선택안함">
                  <el-option
                    v-for="item in introDimOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    @click="onClickPreviewDim"
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
                <select class="input-select">
                  <option>중앙</option>
                  <option>대각선(로고가 위로)</option>
                  <option>대각선(버튼이 위로)</option>
                </select>
              </div>
              <div class="input-wrap">
                <label class="input-label">카피라이트</label>
                <select class="input-select">
                  <option>왼쪽</option>
                  <option>중앙</option>
                  <option>오른쪽</option>
                </select>
              </div>
            </div>

            <div class="setting-tit sub">메인색상 관리</div>
            <div class="color-select--list">
              <div class="color-select--wrap">
                <!-- <button
                  :style="
                    UISetting.mainColor && UISetting.mainColor.rgba
                      ? `background:rgba(${UISetting.mainColor.rgba.r},${UISetting.mainColor.rgba.g},${UISetting.mainColor.rgba.b},${UISetting.mainColor.rgba.a})`
                      : ''
                  "
                  type="button"
                  class="color"
                  @click="isShowColorPickerName = 'mainColor'"
                ></button> -->
                <el-color-picker
                  v-model="colorPicker.mainColor"
                  show-alpha
                ></el-color-picker>
                <label class="label">메인색상</label>
                <!-- <div
                  v-if="isShowColorPickerName === 'mainColor'"
                  v-click-outside="onBlurPickerClose"
                  class="color-select"
                >
                  <Chrome v-model="colorPicker.mainColor"></Chrome>
                </div> -->
              </div>
              <div class="color-select--wrap">
                <!-- <button
                  :style="
                    UISetting.mainFontColor && UISetting.mainFontColor.rgba
                      ? `background:rgba(${UISetting.mainFontColor.rgba.r},${UISetting.mainFontColor.rgba.g},${UISetting.mainFontColor.rgba.b},${UISetting.mainFontColor.rgba.a})`
                      : ''
                  "
                  type="button"
                  class="color"
                  @click="isShowColorPickerName = 'mainFontColor'"
                ></button> -->
                <el-color-picker
                  v-model="colorPicker.mainFontColor"
                  show-alpha
                ></el-color-picker>
                <label class="label">메인글씨색상</label>
                <!-- <div
                  v-if="isShowColorPickerName === 'mainFontColor'"
                  v-click-outside="onBlurPickerClose"
                  class="color-select"
                >
                  <Chrome v-model="colorPicker.mainFontColor"></Chrome>
                </div> -->
              </div>
            </div>

            <div class="setting-tit sub">대사창 색상 관리</div>
            <div class="color-select--list">
              <div class="color-select--wrap">
                <!-- <button
                  :style="
                    UISetting.windowColor && UISetting.windowColor.rgba
                      ? `background:rgba(${UISetting.windowColor.rgba.r},${UISetting.windowColor.rgba.g},${UISetting.windowColor.rgba.b},${UISetting.windowColor.rgba.a})`
                      : ''
                  "
                  type="button"
                  class="color"
                  @click="isShowColorPickerName = 'windowMainColor'"
                ></button> -->
                <el-color-picker
                  v-model="colorPicker.windowColor"
                  show-alpha
                ></el-color-picker>
                <label class="label">메인색상</label>
                <!-- <div
                  v-if="isShowColorPickerName === 'windowMainColor'"
                  v-click-outside="onBlurPickerClose"
                  class="color-select"
                >
                  <Chrome v-model="colorPicker.windowColor"></Chrome>
                </div> -->
              </div>
              <div class="color-select--wrap">
                <!-- <button
                  :style="
                    UISetting.fontColor && UISetting.fontColor.rgba
                      ? `background:rgba(${UISetting.fontColor.rgba.r},${UISetting.fontColor.rgba.g},${UISetting.fontColor.rgba.b},${UISetting.fontColor.rgba.a})`
                      : ''
                  "
                  type="button"
                  class="color"
                  @click="isShowColorPickerName = 'windowTextColor'"
                ></button> -->
                <el-color-picker
                  v-model="colorPicker.fontColor"
                  show-alpha
                ></el-color-picker>
                <label class="label">글자</label>
                <!-- <div
                  v-if="isShowColorPickerName === 'windowTextColor'"
                  v-click-outside="onBlurPickerClose"
                  class="color-select"
                >
                  <Chrome v-model="colorPicker.fontColor"></Chrome>
                </div> -->
              </div>
              <div class="color-select--wrap">
                <!-- <button
                  :style="
                    UISetting.strokeColor && UISetting.strokeColor.rgba
                      ? `background:rgba(${UISetting.strokeColor.rgba.r},${UISetting.strokeColor.rgba.g},${UISetting.strokeColor.rgba.b},${UISetting.strokeColor.rgba.a})`
                      : ''
                  "
                  type="button"
                  class="color"
                  @click="isShowColorPickerName = 'windowOutlineColor'"
                ></button> -->
                <el-color-picker
                  v-model="colorPicker.strokeColor"
                  show-alpha
                ></el-color-picker>
                <label class="label">외곽선</label>
                <!-- <div
                  v-if="isShowColorPickerName === 'windowOutlineColor'"
                  v-click-outside="onBlurPickerClose"
                  class="color-select"
                >
                  <Chrome v-model="colorPicker.strokeColor"></Chrome>
                </div> -->
              </div>
              <div class="color-select--wrap">
                <!-- <button
                  :style="
                    UISetting.shadowColor && UISetting.shadowColor.rgba
                      ? `background:rgba(${UISetting.shadowColor.rgba.r},${UISetting.shadowColor.rgba.g},${UISetting.shadowColor.rgba.b},${UISetting.shadowColor.rgba.a})`
                      : ''
                  "
                  type="button"
                  class="color"
                  @click="isShowColorPickerName = 'windowShadowColor'"
                ></button> -->
                <el-color-picker
                  v-model="colorPicker.shadowColor"
                  show-alpha
                ></el-color-picker>
                <label class="label">그림자</label>
                <!-- <div
                  v-if="isShowColorPickerName === 'windowShadowColor'"
                  v-click-outside="onBlurPickerClose"
                  class="color-select"
                >
                  <Chrome v-model="colorPicker.shadowColor"></Chrome>
                </div> -->
              </div>
            </div>

            <div class="setting-tit sub">디자인 관리</div>

            <div class="input-select--list">
              <div class="input-wrap">
                <label class="input-label">모서리</label>
                <select
                  class="input-select"
                  :value="colorPicker.round"
                  @change="onChangeThemeSet($event, 'round')"
                >
                  <option :value="0">선택안함</option>
                  <option :value="10">약간 둥글게</option>
                  <option :value="20">둥글게</option>
                  <option :value="40">더 둥글게</option>
                  <option :value="100">아주 둥글게</option>
                </select>
              </div>
              <div class="input-wrap">
                <label class="input-label">선굵기</label>
                <select
                  class="input-select"
                  :value="colorPicker.border"
                  @change="onChangeThemeSet($event, 'border')"
                >
                  <option :value="0">선택안함</option>
                  <option :value="1">더 얇게</option>
                  <option :value="2">얇게</option>
                  <option :value="4">굵게</option>
                  <option :value="10">아주 굵게</option>
                </select>
              </div>
            </div>
            <div class="input-select--list">
              <div class="input-wrap">
                <label class="input-label">그림자</label>
                <select
                  class="input-select"
                  :value="`${colorPicker.x}|${colorPicker.y}`"
                  @change="onChangeThemeSet($event, 'shadow')"
                >
                  <option :value="'0|0'">선택안함</option>
                  <option value="3|3">약간 멀리</option>
                  <option value="5|5">멀리</option>
                  <option value="8|8">더 멀리</option>
                  <option value="10|10">아주 멀리</option>
                </select>
              </div>
              <div class="input-wrap">
                <label class="input-label">아이콘</label>
                <select
                  class="input-select"
                  :value="colorPicker.icon"
                  @change="onChangeThemeSet($event, 'icon')"
                >
                  <option :value="''">기본</option>
                  <option value="icon1">아이콘1</option>
                  <option value="icon2">아이콘2</option>
                  <option value="icon3">아이콘3</option>
                </select>
              </div>
            </div>
            <div class="input-select--list mb-5">
              <div class="input-wrap">
                <label class="input-label">글씨체</label>
                <select
                  class="input-select"
                  :value="colorPicker.font"
                  @change="onChangeThemeSet($event, 'font')"
                >
                  <option v-for="(v, i) in fontStyle" :key="i" :value="v.value">
                    {{ v.name }}
                  </option>
                </select>
              </div>
              <div class="input-wrap">
                <label class="input-label">글씨크기</label>
                <select
                  class="input-select"
                  :value="colorPicker.fontSize"
                  @change="onChangeThemeSet($event, 'fontSize')"
                >
                  <option :value="''">기본</option>
                  <option value="font-sm">작게</option>
                  <option value="font-md">보통</option>
                  <option value="font-lg">크게</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div class="text-center mb-5">
          <button ype="button" class="button btn-primary md" @click="onSubmit">
            저장
          </button>
        </div>
      </div>
    </el-scrollbar>
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
      paramsInit: {},
      colorPicker: {
        mainColor: null,
        windowColor: null,
        strokeColor: null,
        shadowColor: null,
        fontColor: null,
        mainFontColor: null,
        font: '',
        round: 0,
        border: 0,
        x: 0,
        y: 0,
        icon: '',
        fontSize: '',
      },
      temp: true,
      isUiSettingTab: true,
      // isUiSettingCustom: false,
      isShowColorPickerName: '',
      fontStyle: [
        { name: '기본', value: '' },
        { name: '나눔스퀘어네오', value: 'font-nanumNeo' },
        { name: '마포꽃섬', value: 'font-mapo' },
        { name: 'Y콤퓨타체', value: 'font-ycomputer' },
        { name: '푸라닭 젠틀고딕', value: 'font-pura' },
        { name: '생거진천체', value: 'font-saenggeo' },
        { name: '한국기계연구원', value: 'font-kimm' },
        { name: '해피니스 산스', value: 'font-happiness' },
      ],
      introDimOption: [
        {
          value: 'introDimOption1',
          label: '밝게',
        },
        {
          value: 'introDimOption2',
          label: '어둡게',
        },
        {
          value: 'introDimOption3',
          label: '흐리게',
        },
      ],
      introDimOptionValue: '',
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
    IS_UI: {
      handler(value) {
        console.log('watch_IS_UI', value)
        if (this.UISetting) {
          this.colorPicker = this.UISetting
        }
      },
      immediate: true,
    },
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
    ...mapMutations([
      'MUTATIONS_COLOR_PICKER',
      'MUTATIONS_IN_APP_ICON',
      'MUTATIONS_LOADING_INIT',
    ]),
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
      this.MUTATIONS_LOADING_INIT()
      const frm = new FormData()
      frm.append('type', 'uiInsert')
      frm.append('secretKey', this.PROJECT_ID)
      frm.append('previewData', JSON.stringify(this.UISetting))
      frm.append('apiKey', process.env.API_KEY)
      frm.append('user_idx', kooLogin('user_idx'))
      this.ACTION_AXIOS_POST(frm)
      setTimeout(() => {
        this.onSave()
      }, 500)
    },
    onChangeUiSetting() {
      // if (this.$refs.isUiSettingTheme.checked) {
      //   this.isUiSettingTheme = true
      //   this.isUiSettingCustom = false
      // } else {
      //   this.isUiSettingTheme = false
      //   this.isUiSettingCustom = true
      // }
      this.isUiSettingTab === false
        ? (this.isUiSettingTab = true)
        : (this.isUiSettingTab = false)
    },
    onBlurPickerClose() {
      this.isShowColorPickerName = ''
    },
    onChangeThemeSet(e, type) {
      console.log(e.value)
      if (type === 'round') this.colorPicker.round = e.target.value
      if (type === 'font') this.colorPicker.font = e.target.value
      if (type === 'icon') this.colorPicker.icon = e.target.value
      if (type === 'border') this.colorPicker.border = e.target.value
      if (type === 'fontSize') this.colorPicker.fontSize = e.target.value
      if (type === 'shadow') {
        console.log(e)
        this.colorPicker.x = e.target.value.split('|')[0]
        this.colorPicker.y = e.target.value.split('|')[1]
      }
    },
    onSave() {
      const h = this.$createElement
      this.$notify({
        title: '저장되었습니다.',
        message: h('i', { style: 'color: teal' }, '멋진 UI를 만들어 보아요!'),
      })
    },
    onClickPreviewDim({ target }) {
      console.log(target)
    },
  },
}
</script>

<style lang="scss">
.radio-wrap {
  margin: 20px 0;
  .input-radio {
    margin-right: 20px;
  }
}
.theme-list {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 0;
  &--item {
    width: calc(33.3% - 17px);
    margin: 0 25px 20px 0;
    &:nth-child(3n) {
      margin-right: 0;
    }
    .img-wrap {
      width: 100%;
      height: 200px;
      background: #d9d9d9;
      border-radius: 5px;
    }
    .hash {
      margin: 8px 0;
      height: 35px;
      overflow: hidden;
      span {
        font-size: 1.2rem;
        color: $textCol2;
        margin-right: 3px;
        font-weight: 300;
        &:before {
          content: '#';
        }
      }
    }
    @media (max-width: 1600px) {
      width: calc(25% - 15px);
      margin: 0 20px 30px 0;
      &:nth-child(3n) {
        margin-right: 20px;
      }
      &:nth-child(4n) {
        margin-right: 0;
      }
    }
    @media (max-width: 1450px) {
      width: calc(33.3% - 14px);
      margin: 0 20px 30px 0;
      &:nth-child(3n) {
        margin-right: 0 !important;
      }
      &:nth-child(4n) {
        margin-right: 20px;
      }
    }
  }
}
.color-select {
  &--list {
    display: flex;
    .color-select--wrap {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-right: 35px;
    }
  }
  &--wrap {
    position: relative;
    margin: 20px 0 40px;
    .color {
      width: 70px;
      height: 70px;
      border: 1px solid #e3e3e3;
      background: #000;
      border-radius: 35px;
    }
    .label {
      text-align: center;
      margin: 15px 0 0;
      display: block;
      font-size: 1.4rem;
      color: $textCol2;
    }
    .color-select {
      position: absolute;
      left: 38px;
      top: 35px;
      z-index: 1;
    }
  }
}
.input-select--list {
  margin: 20px 0;
  display: flex;
  .input-wrap {
    margin-right: 30px;
    .input-label {
      width: 65px;
      color: $textCol2;
    }
    .input-select {
      width: 150px;
      height: 40px;
    }
  }
}
.ui-wrap.h-550 {
  height: 550px;
  background: #f4f5f7;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
}
</style>
