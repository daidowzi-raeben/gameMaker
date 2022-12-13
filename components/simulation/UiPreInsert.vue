<template>
  <div class="insert">
    <div class="setting bottom-none">
      <div class="setting-color">
        <div class="setting-tit">메인 색상 설정</div>
        <Chrome :value="mainColor"></Chrome>
      </div>
      <div class="setting-window">
        <div class="setting-tit">창 설정</div>
        <div class="input-wrap">
          <label class="input-label">창 색상</label>
          <Chrome :value="windowColor"></Chrome>
        </div>
        <div class="input-wrap">
          <label class="input-label">모서리 둥글게</label>
          <input type="number" class="input-number" value="0" />
          <span class="text">px</span>
        </div>
        <div class="input-wrap">
          <label class="input-label">외곽선</label>
          <Chrome :value="strokeColor"></Chrome>
        </div>
        <div class="input-wrap">
          <label class="input-label"></label>
          <input type="number" class="input-number" value="0" />
          <span class="text">px</span>
        </div>
        <div class="input-wrap">
          <label class="input-label">그림자</label>
          <Chrome :value="shadowColor"></Chrome>
        </div>
        <div class="input-wrap">
          <label class="input-label"></label>
          <span class="text">X축</span>
          <input type="number" class="input-number" value="0" />
          <span class="text">Y축</span>
          <input type="number" class="input-number" value="0" />
        </div>
      </div>
      <div class="setting-icon">
        <div class="setting-tit">아이콘 설정</div>
        <select class="input-select">
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
import { Chrome } from 'vue-color'
export default {
  components: {
    Chrome
  },
  data () {
    return {
      mainColor: {
        hex: '#ffffff',
        hsl: { h: 150, s: 0, l: 100, a: 1 },
        hsv: { h: 150, s: 0, v: 100, a: 1 },
        rgba: { r: 255, g: 255, b: 255, a: 1 },
        a: 1
      },
      windowColor: {
        hex: '#ffffff',
        hsl: { h: 150, s: 0, l: 100, a: 1 },
        hsv: { h: 150, s: 0, v: 100, a: 1 },
        rgba: { r: 255, g: 255, b: 255, a: 1 },
        a: 1
      },
      strokeColor: {
        hex: '#ffffff',
        hsl: { h: 150, s: 0, l: 100, a: 1 },
        hsv: { h: 150, s: 0, v: 100, a: 1 },
        rgba: { r: 255, g: 255, b: 255, a: 1 },
        a: 1
      },
      shadowColor: {
        hex: '#000000',
        hsl: { h: 150, s: 0, l: 0, a: 0.5 },
        hsv: { h: 150, s: 0, v: 0, a: 0.5 },
        rgba: { r: 0, g: 0, b: 0, a: 0.5 },
        a: 0.5
      }
    }
  },
  methods: {
  },
}
</script>

<style>
</style>
