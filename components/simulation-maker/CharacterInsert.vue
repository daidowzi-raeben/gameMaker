<template>
  <div class="insert">
    <div class="setting">
      <ImageController />
      <div class="setting-profile">
        <div class="setting-tit">프로필 설정</div>
        <div class="input-wrap">
          <select class="input-select">
            <option>TOP</option>
          </select>
          <input type="text" class="input-text" placeholder="인물의 이름을 입력하세요" />
        </div>
        <div class="textarea-wrap">
          <textarea rows="10" placeholder="인물의 프로필을 입력하세요" class="input-textarea"></textarea>
          <div class="insert-set">
            <button type="button" class="btn sound">사운드 설정</button>
            <div class="set sound-set"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="right" :class="{ fold: rightContentShow === true }">
      <button type="button" class="btn-fold" :class="{ active: rightContentShow === true }" @click="onClickRightContentShow()"></button>
    </div>
    <div class="cut" :class="{ fold: cutListShow === false }">
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
        v-show-slide="cutListShow"
        :options="swiperOptionCutList"
        class="cut-list"
      >
        <swiper-slide v-for="(v, i) in 20" :key="i" class="cut-list--item type2">
          <span v-if="i === 0" class="active-sign"></span>
          <div class="image-list">
            <img src="https://thumb.ac-illust.com/57/57343bb539c05219a995feb43195acf2_w.jpeg" alt="" class="top" />
            <div class="image-list--top">
              <strong class="name">이지안</strong>
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
