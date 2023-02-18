<template>
  <div>
    <!-- <div class="header bg">
      <div class="header-wrap">
        <div class="left">
          <div class="header-logo">
            <nuxt-link to=""
              >PROJECT KOO<span class="maker">. MAKER</span></nuxt-link
            >
          </div>
          <ul class="header-menu">
            <li class="header-menu--item">
              <nuxt-link to="">프로젝트 Koo</nuxt-link>
            </li>
            <li class="header-menu--item"><nuxt-link to="">공유</nuxt-link></li>
            <li class="header-menu--item">
              <nuxt-link to="">이용방법</nuxt-link>
            </li>
            <li class="header-menu--item"><nuxt-link to="">금액</nuxt-link></li>
          </ul>
        </div>
        <div class="right">
          <nuxt-link to="" class="btn btn-login">로그인</nuxt-link>
          <nuxt-link to="" class="btn btn-primary">회원가입</nuxt-link>
        </div>
      </div>
    </div> -->

    <div class="main-section main-top">
      <div class="main-top--tit" data-aos="fade-up" data-aos-duration="1000">
        PROJECT KOO
        <p class="sub">내가 만드는 첫번째 어플리케이션</p>
      </div>
      <p class="main-top--sub" data-aos="fade-up" data-aos-duration="1000">
        프로젝트 Koo는 내가 상상하고 원하던 스토리를 쉽게 앱으로 제작하여 출시할
        수 있습니다.<br />
        다양한 경험을 지금 시작하세요.
      </p>
      <div class="main-top--app" data-aos="fade-up" data-aos-duration="1000">
        <button class="btn type-1">IOS</button>
        <button class="btn type-2">Android</button>
        <button class="btn type-3">Steam<br />(지원예정)</button>
      </div>
      <div class="main-top--shape" data-aos="fade" data-aos-duration="1500">
        <div class="circle-1"></div>
        <div class="circle-2"></div>
        <div class="circle-3"></div>
        <div class="line"></div>
      </div>
    </div>

    <div class="main-section">
      <div
        class="main-section--left"
        data-aos="fade-right"
        data-aos-duration="1000"
      >
        <div class="text-wrap">
          <div class="step">STEP 1</div>
          <div class="tit">
            내 마음대로, <br />
            취향대로 꾸미는 UI
          </div>
          <div class="con">
            나만의 어플리케이션을 위한 준비<br />
            디자인 고민 없이 내가 원하는 UI 디자인을 체험하세요
          </div>
        </div>
      </div>
      <div class="main-section--right" data-aos="fade" data-aos-duration="2000">
        <div class="img-wrap">
          <img src="../static/images/main_img4.png" alt="" />
        </div>
      </div>
    </div>

    <div class="main-section m-reverse">
      <div class="main-section--left">
        <div class="img-wrap images">
          <img
            src="../static/images/main_img2_1.png"
            alt=""
            data-aos="fade-right"
            data-aos-duration="1000"
            data-aos-delay="500"
          />
          <img
            src="../static/images/main_img2_2.png"
            alt=""
            data-aos="fade-up"
            data-aos-duration="1000"
          />
          <img
            src="../static/images/main_img2_3.png"
            alt=""
            data-aos="fade-left"
            data-aos-duration="1000"
            data-aos-delay="1000"
          />
        </div>
      </div>
      <div
        class="main-section--right"
        data-aos="fade-left"
        data-aos-duration="1000"
      >
        <div class="text-wrap">
          <div class="step">STEP 2</div>
          <div class="tit">
            다양한 에셋들로<br />
            한층 더 퀄리티 UP!
          </div>
          <div class="con">
            다양한 인물과 배경 에셋을 만나보세요<br />
            과연 오늘은 누가, 어디서 주인공이 될까요?
          </div>
        </div>
      </div>
    </div>

    <div class="main-section">
      <div
        class="main-section--left"
        data-aos="fade-right"
        data-aos-duration="1000"
      >
        <div class="text-wrap">
          <div class="step">STEP 3</div>
          <div class="tit">
            스토리를 만들어가고,<br />
            선택에 따른 엔딩까지
          </div>
          <div class="con">
            내가 생각했던 대사들을 넣어 스토리를 만들어 보세요<br />
            선택지에 따른 엔딩도 다양하게 설정할 수 있습니다.
          </div>
        </div>
      </div>
      <div class="main-section--right" data-aos="fade" data-aos-duration="2000">
        <div class="img-wrap">
          <img src="../static/images/main_img3.png" alt="" />
        </div>
      </div>
    </div>

    <div class="main-section">
      <div class="main-section--center">
        <div class="text-wrap" data-aos="fade-up" data-aos-duration="1000">
          <div class="tit">세상에서 가장 쉬운<br />나만의 스토리 만들기</div>
        </div>
        <div class="bottom">
          <div
            class="img-wrap play"
            data-aos="fade-right"
            data-aos-duration="1000"
          >
            <img v-if="isImageActive===1" src="../static/images/main_sample1.png" alt="" />
            <img v-else-if="isImageActive===2" src="../static/images/main_sample2.png" alt="" />
            <img v-else-if="isImageActive===3" src="../static/images/main_sample3.png" alt="" />
            <img v-else-if="isImageActive===4" src="../static/images/main_sample4.png" alt="" />
            <img v-else-if="isImageActive===5" src="../static/images/main_sample5.png" alt="" />
          </div>
          <div class="right" data-aos="fade-left" data-aos-duration="1000">
            <button
              type="button"
              class="btn tit active"
              @click="onClickTitActive"
            >
              1. 비주얼 노벨
            </button>
            <div class="con">
              상상만 하고 있던 매력적인 스토리,<br />
              이제 게임으로 만들어 보세요.
            </div>
            <button type="button" class="btn tit" @click="onClickTitActive">
              2. 어린이 학습용 문제집
            </button>
            <div class="con">
              객관식, 주관식 문제 풀이로<br />
              어린이 학습용 문제집을 비주얼 라이징 하게!
            </div>
            <button type="button" class="btn tit" @click="onClickTitActive">
              3. 지루할 틈 없는 방 탈출 게임
            </button>
            <div class="con">
              추리해서 문제를 풀고,<br />
              루트가 복잡한 방탈출 게임도 손쉽게!
            </div>
            <button type="button" class="btn tit" @click="onClickTitActive">
              4. 우리끼리 만드는 연애편지
            </button>
            <div class="con">
              글로만 적어서 보냈던 연애편지,<br />
              서로의 사진을 담아 조금 더 특별하게!
            </div>
            <button type="button" class="btn tit" @click="onClickTitActive">
              5. 성향을 파악하는 심리테스트
            </button>
            <div class="con">
              늘 해 보기만 했던 심리 테스트도<br />
              직접 만들어서 친구들에게 공유해요!
            </div>
            <div class="mt-5">
              <button type="button" class="button xlg btn-primary">
                지금 시작하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AOS from 'aos'
import 'aos/dist/aos.css'

export default {
  layout: 'index',
  data() {
    return {
      isImageActive: 1,
    }
  },
  mounted() {
    console.log(window.innerWidth)
    AOS.init({
      disable: function () {
        var desktop = 1000;
        return window.innerWidth < desktop;
      }
    })
  },
  methods: {
    onClickTitActive(e) {
      const nodes = [...e.target.parentElement.children]
      const index = nodes.indexOf(e.target)
      switch(index){
        case 0 :
          this.isImageActive = 1
        break
        case 2 :
          this.isImageActive = 2
        break
        case 4 :
          this.isImageActive = 3
        break
        case 6 :
          this.isImageActive = 4
        break
        case 8 :
          this.isImageActive = 5
        break
      }
      document.querySelector('.btn.tit.active').classList.remove('active')
      e.target.classList.add('active')
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
