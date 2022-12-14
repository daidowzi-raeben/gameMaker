<template>
  <div class="insert">
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
          <input type="number" class="input-number" value="0" />
          <span class="text">px</span>
        </div>
        <div class="input-wrap">
          <label class="input-label">외곽선</label>
          <Chrome v-model="colorPicker.strokeColor"></Chrome>
        </div>
        <div class="input-wrap">
          <label class="input-label"></label>
          <input type="number" class="input-number" value="0" />
          <span class="text">px</span>
        </div>
        <div class="input-wrap">
          <label class="input-label">그림자</label>
          <Chrome v-model="colorPicker.shadowColor"></Chrome>
        </div>
        <div class="input-wrap">
          <label class="input-label"></label>
          <span class="text">X축</span>
          <input type="number" class="input-number" value="0" />
          <span class="text">Y축</span>
          <input type="number" class="input-number" value="0" />
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
import { mapState, mapMutations } from 'vuex'
import { Chrome } from 'vue-color'
export default {
  components: {
    Chrome,
  },
  data() {
    return {
      rightContentShow: false,
      colorPicker: {
        mainColor: {},
        windowColor: {},
        strokeColor: {},
        shadowColor: {},
      },
    temp:true
    }
  },
  computed: {
    ...mapState(['UISetting', 'IN_APP_ICON']),
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
  },
  methods: {
    ...mapMutations(['MUTATIONS_COLOR_PICKER', 'MUTATIONS_IN_APP_ICON']),

    updateColor() {
      console.log(this.mainColor)
    },
    onChangeIconSetting({ target }) {
      this.MUTATIONS_IN_APP_ICON(target.value)
    },
    test({target}) {
      this.temp = false
      target.nextElementSibling.style = 'display:block'
    }
  },
}
</script>

<style>
</style>
