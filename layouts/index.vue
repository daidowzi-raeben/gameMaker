<template>
  <div
    v-loading="LOADING"
    :element-loading-text="loadingText()"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <!-- <div class="commingSoon">
      <img src="~/static/images/soon.png" />
    </div> -->
    <div v-if="false">
      <Nuxt />
    </div>
    <div class="header">
      <div class="header-wrap">
        <button
          type="button"
          class="menu-btn"
          :class="{ active: isMenuActive }"
          @click="onMenuActive"
        ></button>
        <button type="button" class="close-btn" @click="onMenuActive">
          &times;
        </button>
        <div class="dim"></div>
        <div class="left">
          <div class="header-logo" @click="onMenuActive">
            <nuxt-link to="/">MAKER KOO</nuxt-link>
          </div>
          <ul class="header-menu">
            <li class="header-menu--item" @click="onMenuActive">
              <nuxt-link to="/">메이커 쿠</nuxt-link>
            </li>
            <li class="header-menu--item" @click="onMenuActive">
              <nuxt-link to="/info-page">소개</nuxt-link>
            </li>
            <li class="header-menu--item" @click="onMenuActive">
              <nuxt-link to="/store">스토어</nuxt-link>
            </li>
            <li class="header-menu--item">
              <a
                href="https://project-koo.tistory.com/4"
                target="_blank"
                @click="isMenuActive = false"
                >이용방법</a
              >
            </li>
            <li class="header-menu--item">
              <button type="button" class="btn" onclick="alert('준비중입니다')">
                금액
              </button>
            </li>
          </ul>
        </div>
        <div v-if="!isLogin" class="right">
          <nuxt-link to="/sign-in" class="btn btn-login">로그인</nuxt-link>
          <nuxt-link to="/join" class="btn btn-primary">회원가입</nuxt-link>
        </div>
        <div v-if="isLogin" class="right">
          <!-- 베이직 ~ 23.04.01 -->
          <a
            href="#_self"
            class="btn btn-login"
            @click.prevent="isGiftOpen = true"
            >선물신청</a
          >
          <a href="#_self" class="btn btn-login" @click.prevent="onClickLogout"
            >로그아웃</a
          >
          <!-- <nuxt-link to="/mypage/cart-detail" class="btn btn-login"
            >장바구니</nuxt-link
          > -->
          <nuxt-link to="/project-manager" class="btn btn-primary"
            >내 프로젝트</nuxt-link
          >
        </div>
      </div>
    </div>
    <div class="wrap">
      <Nuxt />
    </div>
    <div class="footer">
      <div class="footer-wrap">
        <div class="left">
          <!-- <div class="name">하나피아</div>
          <div class="info">
            <span>02-1234-5678</span>
            <span>projectkoo@projectkoo.com</span>
          </div>
          <div class="info">
            <span>서울시 중구 한강대로 416, 서울스퀘어 14층 [04637]</span>
          </div>
          <div class="info">
            <span>189-87-00172</span>
            <span>제2019-서울영등포-0298호</span>
          </div> -->
          <nuxt-link to="/mypage/term-use" class="term">이용약관</nuxt-link>
          <nuxt-link to="/mypage/term-personal" class="term"
            >개인정보</nuxt-link
          >
          <div class="mail">Mail : project.koo.2023@gmail.com</div>
          <div class="copy">
            Copyright (c) 2023 TEAM Project Koo Allrights reseved.
          </div>
        </div>
        <div class="right">
          <a
            href="http://project-koo.tistory.com"
            target="_blank"
            class="btn sns-1"
          ></a>
          <a
            href="https://twitter.com/2023_koo"
            target="_blank"
            class="btn sns-2"
          ></a>
          <a
            href="https://instagram.com/project_koo"
            target="_blank"
            class="btn sns-3"
          ></a>
        </div>
      </div>
    </div>
    <div>
      <!-- <el-dialog title="" width="800px" :visible.sync="popsModalVisible"> -->
      <div class="modal-request">
        <el-dialog title="" :visible.sync="isGiftOpen">
          <div class="modal-container">
            <div class="tit">
              <h2>텀블벅 후원 선물 신청</h2>
            </div>
            <div class="main">
              <span class="main-tit">후원자 이름</span>
              <input
                v-model="gift.name"
                type="text"
                placeholder="후원 시 닉네임을 입력해 주세요"
                class="input"
              />
            </div>
            <div class="main">
              <span class="main-tit">선물 선택</span>
              <el-select v-model="gift.value" placeholder="선택안함">
                <el-option
                  v-for="(v, i) in gift.list"
                  :key="i"
                  :label="`${v.price
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원 - ${v.name}`"
                  :value="v.idx"
                ></el-option>
              </el-select>
            </div>
            <div class="text-center btn-modal">
              <button class="button md btn-primary" @click="onClickGiftSubmit">
                선물 신청하기
              </button>
            </div>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
// MUTATIONS_LOGIN
import { mapState, mapMutations, mapActions } from 'vuex'
import { kooLogin } from '~/config/util'
export default {
  name: 'IndexLayout',
  data() {
    return {
      isMenuActive: false,
      isGiftOpen: false,
      isLogin: '',
      gift: {
        name: '',
        value: 1,
        list: [
          {
            idx: 1,
            price: 3000,
            name: '랜덤에셋 1개',
          },
          {
            idx: 2,
            price: 5000,
            name: '선택에셋 1개',
          },
          {
            idx: 3,
            price: 10000,
            name: '랜덤에셋 1개, 선택에셋 1개',
          },
          {
            idx: 4,
            price: 20000,
            name: '랜덤에셋 2개, 선택에셋 2개, 베이직 1달',
          },
          {
            idx: 5,
            price: 30000,
            name: '랜덤에셋 3개, 선택에셋 3개, 베이직 2달',
          },
          {
            idx: 6,
            price: 50000,
            name: '랜덤에셋 3개, 선택에셋 5개, 베이직 3달',
          },
          {
            idx: 7,
            price: 80000,
            name: '선택에셋 10개, 프로 1달',
          },
          {
            idx: 8,
            price: 300000,
            name: '에셋제작권, 선택에셋 5개, 프로 2달',
          },
          {
            idx: 9,
            price: 500000,
            name: '에셋제작권 2개, 선택에셋 10개, 프로 3달',
          },
        ],
      },
      params: {},
    }
  },
  computed: {
    ...mapState(['LOGIN', 'LOADING']),
  },
  watch: {
    LOGIN: {
      handler(value) {
        console.log(value.result)
        this.MUTATIONS_LOADING(false)
        if (value.result === 'TRUE') {
          this.isLogin = value.login
        }
      },
    },
  },
  mounted() {
    this.MUTATIONS_LOADING(false)
    this.isLogin = kooLogin('user_idx')
    // setTimeout(() => {
    //   this.MUTATIONS_LOADING(false)
    //   console.log('layout')
    // }, 2000)
  },
  methods: {
    ...mapMutations(['MUTATIONS_LOADING']),
    ...mapActions(['ACTION_AXIOS_GET', 'ACTION_AXIOS_POST']),
    onMenuActive() {
      this.isMenuActive === true
        ? (this.isMenuActive = false)
        : (this.isMenuActive = true)
    },
    onClickLogout() {
      document.cookie = 'user_name=; expires=Thu, 01 Jan 1999 00:00:10 GMT;'
      document.cookie = 'user_idx=; expires=Thu, 01 Jan 1999 00:00:10 GMT;'
      this.$cookies.set('user_name', '', 0)
      this.$cookies.set('user_idx', '', 0)
      this.isLogin = ''
      this.$router.push('/sign-in')
    },

    loadingText() {
      let text = []
      if (this.activeMenu === 6) {
        text = ['노력하는 중', '노력하는 중', '노력하는 중', '노력하는 중']
      } else {
        // text = [
        //   '시나리오 펼치는중',
        //   '챕터 펼치는중',
        //   '컷을 불러오는 중',
        //   '노력하는 중',
        // ]
        text = ['노력하는 중', '노력하는 중', '노력하는 중', '노력하는 중']
      }
      return text[Math.floor(Math.random() * 4)] + '...'
    },
    onClickGiftSubmit() {
      if (!this.gift.name) {
        return alert('후원자의 이름을 입력하세요')
      }
      this.params.name = this.gift.name
      this.params.gift = this.gift.list[this.gift.value - 1].idx
      this.params.type = 'giftApply'
      this.params.secretKey = this.PROJECT_ID
      this.params.user_idx = kooLogin('user_idx')
      this.params.apiKey = process.env.API_KEY
      this.ACTION_AXIOS_GET(this.params)
    },
  },
}
</script>

<style lang="scss">
.commingSoon {
  position: fixed;
  top: 0;
  left: 0;
  background: #66c7bb;
  width: 100%;
  height: 100%;
  text-align: center;
  > img {
    width: 475px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    max-width: 90%;
  }
}
</style>
