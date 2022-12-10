<template>
  <div class="insert">
    <div class="setting">
      <ImageController />
      <div class="setting-terms">
        <div class="setting-tit">조건 설정</div>
        <div class="input-wrap">
          <select class="input-select">
            <option>이지안</option>
          </select>
          <span class="text red">호감도</span>
          <select class="input-select">
            <option>10</option>
          </select>
          <span class="text">이상</span>
          <span class="text blue">호감도</span>
          <select class="input-select">
            <option>10</option>
          </select>
          <span class="text">이하</span>
        </div>
      </div>
    </div>
    <div class="right" :class="{ fold: rightContentShow === true }">
      <button type="button" class="btn-fold" :class="{ active: rightContentShow === true }" @click="onClickRightContentShow()"></button>
    </div>
    <div class="cut" :class="{ fold: cutListShow === false }">
      <div class="cut-tit">
        <span class="scenario">엔딩 리스트</span>
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
        v-show-slide="cutListShow"
        :options="swiperOptionCutList"
        class="cut-list"
      >
        <swiper-slide v-for="(v, i) in 20" :key="i" class="cut-list--item type2">
          <span v-if="i === 0" class="active-sign"></span>
          <div class="image-list">
            <img src="https://lwi.nexon.com/maplestory/mobile/29E0ECE19C0FD827/media/thumb_03.jpg" alt="" />
            <div class="image-list--top">
              <strong class="name">이지안</strong>
              <span class="text">호감도 10 이상 10 이하</span>
            </div>
            <div class="image-list--con">
              안녕? 대사를 치면 여기에도 미리보기 노출이 될거에요 width는 작업해
              보고 잡을 예정이고 여긴 줄바꿈이 없어요 시나리오 1장 글시는 5차
              제한으로 ... 처리! 여긴 최대 4줄까지 출력 안녕? 대사를 치면 여기에도
              미리보기 노출이 될거에요 width는 작업해 보고 잡을 예정이고 여긴
              줄바꿈이 없어요 시나리오 1장 글시는 5차 제한으로 ... 처리! 여긴 최대
              4줄까지 출력
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
import ImageController from './ImageController.vue'
export default {
  components: {
    ImageController,
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
    }
  },
  methods: {
    onClickRightContentShow() {
      this.rightContentShow = !this.rightContentShow
    },
    onChangeFileInput(e){
      this.isFileInsert = true
      this.fileInsertName = e.target.files[0].name
    },
    onClickFileDelete(){
      this.isFileInsert = false
      this.fileInsertName = ''
      this.$refs.logoFile.value = ''
    }
  }
}
</script>

<style></style>
