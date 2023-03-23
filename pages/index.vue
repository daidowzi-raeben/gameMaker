<template>
  <div class="main-wrap">
    <div class="dot-circle"></div>
    <div class="main-top" :class="{ center: isMainPageActive === 1 }">
      <transition name="el-fade-in">
        <div v-show="isMainPageActive === 1" class="main-top--con">
          <p class="tit">MAKER KOO</p>
          <p class="text">
            나만의 스토리를 <br class="m-block" />손쉽게 게임으로 만들어 보세요
          </p>
        </div>
      </transition>
      <transition name="el-fade-in">
        <div v-show="isMainPageActive === 2" class="main-top--con">
          <p class="tit">VISUAL NOVEL</p>
          <p class="text">취향껏 나만의 소설 만들기</p>
        </div>
      </transition>
      <transition name="el-fade-in">
        <div v-show="isMainPageActive === 3" class="main-top--con">
          <p class="tit">EDUCATION</p>
          <p class="text">우리 아이를 위한 학습지</p>
        </div>
      </transition>
      <transition name="el-fade-in">
        <div v-show="isMainPageActive === 4" class="main-top--con">
          <p class="tit">ROOM ESCAPE</p>
          <p class="text">예측과 추리로 시작하는 심리게임</p>
        </div>
      </transition>
      <transition name="el-fade-in">
        <div v-show="isMainPageActive === 5" class="main-top--con">
          <p class="tit">LETTER</p>
          <p class="text">연인에게 더욱 특별한 편지를!</p>
        </div>
      </transition>
    </div>
    <div class="main-image--mobile">
      <img src="../static/images/main_sample1.png" alt="" />
      <img src="../static/images/main_sample2.png" alt="" />
      <img src="../static/images/main_sample3.png" alt="" />
      <img src="../static/images/main_sample4.png" alt="" />
    </div>
    <swiper
      class="main-image--list"
      :class="{ inactive: isMainPageActive === 1 }"
      :options="swiperOption"
    >
      <swiper-slide class="main-image">
        <img src="../static/images/main_sample1.png" alt="" />
      </swiper-slide>
      <swiper-slide class="main-image">
        <img src="../static/images/main_sample2.png" alt="" />
      </swiper-slide>
      <swiper-slide class="main-image">
        <img src="../static/images/main_sample3.png" alt="" />
      </swiper-slide>
      <swiper-slide class="main-image">
        <img src="../static/images/main_sample4.png" alt="" />
      </swiper-slide>
    </swiper>
    <div class="right-menu">
      <button
        type="button"
        class="btn"
        :class="{ active: isMainPageActive === 1 }"
        @click="onChangeMainPage(1)"
      >
        M<span class="full">AKER KOO</span>
      </button>
      <button
        type="button"
        class="btn"
        :class="{ active: isMainPageActive === 2 }"
        @click="onChangeMainPage(2)"
      >
        V<span class="full">ISUAL NOVEL</span>
      </button>
      <button
        type="button"
        class="btn"
        :class="{ active: isMainPageActive === 3 }"
        @click="onChangeMainPage(3)"
      >
        E<span class="full">DUCATION</span>
      </button>
      <button
        type="button"
        class="btn"
        :class="{ active: isMainPageActive === 4 }"
        @click="onChangeMainPage(4)"
      >
        R<span class="full">OOM ESCAPE</span>
      </button>
      <button
        type="button"
        class="btn"
        :class="{ active: isMainPageActive === 5 }"
        @click="onChangeMainPage(5)"
      >
        L<span class="full">ETTER</span>
      </button>
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
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'IndexPage',
  layout: 'index',
  data() {
    return {
      swiperOption: {
        loop: true,
        slidesPerView: 4,
        spaceBetween: 20,
        allowTouchMove: false,
      },
      isMainPageActive: 1,
    }
  },
  computed: {
    ...mapGetters(['GETTER_LOADING_INIT']),
  },
  mounted() {
    let timer
    const funcs = (e) => {
      if (!timer) {
        timer = setTimeout(() => {
          timer = null
          this.onMouseWheelEvent(e)
        }, 200)
      }
      // if (debouncer) clearTimeout(debouncer)
      // debouncer = setTimeout(()=> {
      //   this.onMouseWheelEvent(e)
      //   debouncer = null
      // }, 100)
    }
    // setTimeout(() => {
    //   this.$nextTick(() => {
    //     this.MUTATIONS_LOADING()
    //     console.log('index')
    //   })
    // }, 500)

    document.addEventListener('wheel', (e) => funcs(e))
    document.querySelector('#__layout').style.backgroundColor = '#e7f0fa'
    document.querySelector('.header').style.backgroundColor = 'transparent'
  },
  beforeDestroy() {
    document.querySelector('#__layout').style.backgroundColor = ''
    document.removeEventListener('wheel', this.onMouseWheelEvent)
    document.querySelector('.header').style.backgroundColor = ''
  },
  methods: {
    ...mapMutations(['MUTATIONS_LOADING']),
    onMouseWheelEvent(e) {
      if (e.deltaY > 0) {
        if (this.isMainPageActive < 5) this.isMainPageActive++
        this.onChangeMainPage(this.isMainPageActive)
        return false
      } else {
        if (this.isMainPageActive > 1) this.isMainPageActive--
        this.onChangeMainPage(this.isMainPageActive)
        return false
      }
    },
    onChangeMainPage(page) {
      const changeBackground = document.querySelector('#__layout')
      if(document.querySelector('.main-image--list') !== null){
        const swiper = document.querySelector('.main-image--list').swiper
        switch (page) {
          case 1:
            changeBackground.style.backgroundColor = '#e7f0fa'
            swiper.slideTo(page + 3)
            break
          case 2:
            changeBackground.style.backgroundColor = '#dff1ec'
            swiper.slideTo(page + 2)
            break
          case 3:
            changeBackground.style.backgroundColor = '#fef3c9'
            swiper.slideTo(page + 2)
            break
          case 4:
            changeBackground.style.backgroundColor = '#fce3df'
            swiper.slideTo(page + 2)
            break
          case 5:
            changeBackground.style.backgroundColor = '#f5f0ff'
            swiper.slideTo(page + 2)
            break
        }
        this.isMainPageActive = page
      }
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
