<template>
  <div class="main-wrap">
    <div class="dot-circle"></div>
    <div class="main-top" :class="{center : isMainPageActive === 1}">
      <transition name="el-fade-in">
        <div v-show="isMainPageActive===1" class="main-top--con">
          <p class="tit">MAKER KOO</p>
          <p class="text">나만의 스토리를 손쉽게 게임으로 만들어 보세요</p>
        </div>
      </transition>
      <transition name="el-fade-in">
        <div v-show="isMainPageActive===2" class="main-top--con">
        <p class="tit">VISUAL NOVEL</p>
        <p class="text">당신의 오타쿠력을 뽐내 보세요</p>
      </div>
      </transition>
      <transition name="el-fade-in">
        <div v-show="isMainPageActive===3" class="main-top--con">
          <p class="tit">EDUCATION</p>
          <p class="text">교육용 게임도 만들어요</p>
        </div>
      </transition>
      <transition name="el-fade-in">
        <div v-show="isMainPageActive===4" class="main-top--con">
          <p class="tit">ROOM ESCAPE</p>
          <p class="text">방탈출은 무슨 집탈출도 힘들어요</p>
        </div>
      </transition>
      <transition name="el-fade-in">
        <div v-show="isMainPageActive===5" class="main-top--con">
          <p class="tit">LETTER</p>
          <p class="text">수빈이 사진 들어갈곳</p>
        </div>
      </transition>
    </div>
    <swiper class="main-image--list" :class="{inactive : isMainPageActive === 1}" :options="swiperOption">
      <swiper-slide class="main-image">
        <img src="https://i.imgur.com/ZXjdvvp.png" alt="" />
      </swiper-slide>
      <swiper-slide class="main-image">
        <img src="https://i.imgur.com/FGCCmkp.png" alt="" />
      </swiper-slide>
      <swiper-slide class="main-image">
        <img src="https://i.imgur.com/fz9P6qJ.png" alt="" />
      </swiper-slide>
      <swiper-slide class="main-image">
        <img src="https://i.imgur.com/WG7TzZv.png" alt="" />
      </swiper-slide>
    </swiper>
    <div class="right-menu">
      <button type="button" class="btn" :class="{active : isMainPageActive === 1}" @click="onChangeMainPage(1)">M<span class="full">AKER KOO</span></button>
      <button type="button" class="btn" :class="{active : isMainPageActive === 2}" @click="onChangeMainPage(2)">V<span class="full">ISUAL NOVEL</span></button>
      <button type="button" class="btn" :class="{active : isMainPageActive === 3}" @click="onChangeMainPage(3)">E<span class="full">DUCATION</span></button>
      <button type="button" class="btn" :class="{active : isMainPageActive === 4}" @click="onChangeMainPage(4)">R<span class="full">OOM ESCAPE</span></button>
      <button type="button" class="btn" :class="{active : isMainPageActive === 5}" @click="onChangeMainPage(5)">L<span class="full">ETTER</span></button>
    </div>
    <!-- <div class="main-section main-top">
      <div class="main-top--tit">
        PROJECT KOO
        <p class="sub">우리의 망상이 현실이 되는 공간</p>
      </div>
      <p class="main-top--sub">
        프로젝트 Koo는 내가 상상하고 원하던 스토리를 쉽게 앱으로 제작하여 출시할 수 있습니다.<br />
        다양한 경험을 지금 시작하세요.NanumSquareNeo
      </p>
      <button type="button" class="main-top--button">GET START</button>
      <div class="main-top--shape">
        <div class="circle-1"></div>
        <div class="circle-2"></div>
        <div class="circle-3"></div>
        <div class="line"></div>
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  layout: 'index',
  data() {
    return {
      swiperOption: {
        loop: true,
        slidesPerView: 4,
        spaceBetween: 20,
        allowTouchMove:false,
      },
      isMainPageActive:1,
    }
  },
  unmounted() {
    document.removeEventListener("wheel", this.onMouseWheelEvent)
  },
  mounted() {
    document.addEventListener("wheel", this.onMouseWheelEvent)
  },
  methods: {
    onMouseWheelEvent(e){
      if(e.deltaY > 0){
        if(this.isMainPageActive < 5) this.isMainPageActive++
        this.onChangeMainPage(this.isMainPageActive)
        return false
      }
      else{
        if(this.isMainPageActive > 1) this.isMainPageActive--
        this.onChangeMainPage(this.isMainPageActive)
        return false
      }
    },
    onChangeMainPage(page){
      const changeBackground = document.querySelector("#__layout")
      const swiper = document.querySelector(".main-image--list").swiper
      switch(page) {
        case 1:
          changeBackground.style.backgroundColor = '#e7f0fa'
          swiper.slideTo(page+3)
        break
        case 2:
          changeBackground.style.backgroundColor = '#dff1ec'
          swiper.slideTo(page+2)
        break
        case 3:
          changeBackground.style.backgroundColor = '#fef3c9'
          swiper.slideTo(page+2)
        break
        case 4:
          changeBackground.style.backgroundColor = '#fce3df'
          swiper.slideTo(page+2)
        break
        case 5:
          changeBackground.style.backgroundColor = '#feede0'
          swiper.slideTo(page+2)
        break
      }
      this.isMainPageActive = page
    }
  },
}
</script>

<style lang="scss">
#__layout{
  background-color:#e7f0fa;
}
</style>
