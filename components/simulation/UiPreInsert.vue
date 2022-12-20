<template>
  <div class="insert">
    <div v-bar class="setting">
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
                checked
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
                @change="onChangeUiSetting"
              />
              <span class="check radio"></span>
              <span class="text">커스터마이징</span>
            </label>
          </div>
          <div v-if="isUiSettingTheme" class="ui-wrap">
            <ul class="theme-list">
              <li v-for="(v, i) in 20" :key="i" class="theme-list--item">
                <div class="img-wrap">
                  <!-- <img src="" alt="theme" /> -->
                </div>
                <div class="hash"><span>호러</span><span>블랙</span></div>
              </li>
            </ul>
          </div>
          <div v-if="isUiSettingCustom" class="ui-wrap">
            <div class="setting-tit sub">메인색상 관리</div>
            <div class="color-select--wrap">
              <button
                ref="mainColor"
                :style="
                  UISetting.mainColor && UISetting.mainColor.rgba
                    ? `background:rgba(${UISetting.mainColor.rgba.r},${UISetting.mainColor.rgba.g},${UISetting.mainColor.rgba.b},${UISetting.mainColor.rgba.a})`
                    : ''
                "
                type="button"
                class="color"
                @click="onClickActiveToggle($event)"
              ></button>
              <label class="label">메인색상</label>
              <div class="color-select">
                <Chrome v-model="colorPicker.mainColor"></Chrome>
              </div>
            </div>

            <div class="setting-tit sub">대사창 색상 관리</div>
            <div class="color-select--list">
              <div class="color-select--wrap">
                <button
                  ref="windowMainColor"
                  :style="
                    UISetting.windowColor && UISetting.windowColor.rgba
                      ? `background:rgba(${UISetting.windowColor.rgba.r},${UISetting.windowColor.rgba.g},${UISetting.windowColor.rgba.b},${UISetting.windowColor.rgba.a})`
                      : ''
                  "
                  type="button"
                  class="color"
                  @click="onClickActiveToggle($event)"
                ></button>
                <label class="label">메인색상</label>
                <div v-click-outside="onBlurPickerClose" class="color-select">
                  <Chrome v-model="colorPicker.windowColor"></Chrome>
                </div>
              </div>
              <div class="color-select--wrap">
                <button
                  ref="windowTextColor"
                  :style="
                    UISetting.fontColor && UISetting.fontColor.rgba
                      ? `background:rgba(${UISetting.fontColor.rgba.r},${UISetting.fontColor.rgba.g},${UISetting.fontColor.rgba.b},${UISetting.fontColor.rgba.a})`
                      : ''
                  "
                  type="button"
                  class="color"
                  @click="onClickActiveToggle($event)"
                ></button>
                <label class="label">글자</label>
                <div class="color-select">
                  <Chrome v-model="colorPicker.fontColor"></Chrome>
                </div>
              </div>
              <div class="color-select--wrap">
                <button
                  ref="windowOutlineColor"
                  :style="
                    UISetting.strokeColor && UISetting.strokeColor.rgba
                      ? `background:rgba(${UISetting.strokeColor.rgba.r},${UISetting.strokeColor.rgba.g},${UISetting.strokeColor.rgba.b},${UISetting.strokeColor.rgba.a})`
                      : ''
                  "
                  type="button"
                  class="color"
                  @click="onClickActiveToggle($event)"
                ></button>
                <label class="label">외곽선</label>
                <div class="color-select">
                  <Chrome v-model="colorPicker.strokeColor"></Chrome>
                </div>
              </div>
              <div class="color-select--wrap">
                <button
                  ref="windowShadowColor"
                  :style="
                    UISetting.shadowColor && UISetting.shadowColor.rgba
                      ? `background:rgba(${UISetting.shadowColor.rgba.r},${UISetting.shadowColor.rgba.g},${UISetting.shadowColor.rgba.b},${UISetting.shadowColor.rgba.a})`
                      : ''
                  "
                  type="button"
                  class="color"
                  @click="onClickActiveToggle($event)"
                ></button>
                <label class="label">그림자</label>
                <div class="color-select">
                  <Chrome v-model="colorPicker.shadowColor"></Chrome>
                </div>
              </div>
            </div>

            <div class="setting-tit sub">디자인 관리</div>

            <div class="input-select--list">
              <div class="input-wrap">
                <label class="input-label">모서리</label>
                <select class="input-select">
                  <option :value="null">선택안함</option>
                  <option>약간 둥글게</option>
                  <option>둥글게</option>
                  <option>더 둥글게</option>
                  <option>아주 둥글게</option>
                </select>
              </div>
              <div class="input-wrap">
                <label class="input-label">그림자</label>
                <select class="input-select">
                  <option :value="null">선택안함</option>
                  <option>약간 멀리</option>
                  <option>멀리</option>
                  <option>더 멀리</option>
                  <option>아주 멀리</option>
                </select>
              </div>
            </div>
            <div class="input-select--list mb-5">
              <div class="input-wrap">
                <label class="input-label">아이콘</label>
                <select class="input-select">
                  <option :value="null">기본</option>
                  <option>아이콘1</option>
                  <option>아이콘2</option>
                  <option>아이콘3</option>
                </select>
              </div>
              <div class="input-wrap">
                <label class="input-label">폰트</label>
                <select class="input-select">
                  <option :value="null">기본</option>
                  <option>폰트1</option>
                  <option>폰트2</option>
                  <option>폰트3</option>
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
        fontColor: {},
        round: 0,
        border: 0,
        x: 0,
        y: 0,
      },
      temp: true,
      isUiSettingTheme: true,
      isUiSettingCustom: false,
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
    onChangeUiSetting() {
      if (this.$refs.isUiSettingTheme.checked) {
        this.isUiSettingTheme = true
        this.isUiSettingCustom = false
      } else {
        this.isUiSettingTheme = false
        this.isUiSettingCustom = true
      }
    },
    onClickActiveToggle(e) {
      e.target.classList.add('active')
    },
    onBlurPickerClose() {
      this.$refs.mainColor.classList.remove('active')
      this.$refs.windowMainColor.classList.remove('active')
      this.$refs.windowTextColor.classList.remove('active')
      this.$refs.windowOutlineColor.classList.remove('active')
      this.$refs.windowShadowColor.classList.remove('active')
    },
  },
}
</script>

<style lang="scss">
.radio-wrap {
  margin: 40px 0 30px;
  .input-radio {
    margin-right: 20px;
  }
}
.theme-list {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 0;
  &--item {
    width: calc(25% - 25px);
    margin: 0 25px 20px 0;
    &:nth-child(4n) {
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
    @media (max-width: 1400px) {
      width: calc(33.3% - 20px);
      margin: 0 20px 30px 0;
      &:nth-child(3n) {
        margin-right: 0;
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
      &.active ~ .color-select {
        display: block;
      }
    }
    .label {
      width: 70px;
      text-align: center;
      margin: 5px 0;
      display: block;
      font-size: 1.6rem;
      color: $textCol2;
    }
    .color-select {
      position: absolute;
      left: 38px;
      top: 35px;
      z-index: 1;
      display: none;
    }
  }
}
.input-select--list {
  margin: 28px 0;
  display: flex;
  .input-wrap {
    margin-right: 40px;
    .input-label {
      width: 40px;
      color: $textCol2;
    }
    .input-select {
      width: 125px;
      height: 40px;
    }
  }
}
</style>
