<template>
  <div class="setting-scen">
    <div class="setting-tit">
      화면 설정
      <label class="input-check">
        <input type="checkbox" />
        <span class="check-text">흔들림</span>
      </label>
    </div>
    <div v-if="ASSETS" class="setting-scen--list">
      <label class="label">배경</label>
      <swiper :options="swiperOptionSelectImage" class="list">
        <swiper-slide v-for="(v, i) in ASSETS.bg" :key="i" class="list-item">
          <img :src="v.path" width="50" />
        </swiper-slide>
        <div slot="button-prev" class="swiper-button-prev"></div>
        <div slot="button-next" class="swiper-button-next"></div>
      </swiper>
    </div>
    <div class="setting-scen--list">
      <label class="label">인물</label>
      <swiper :options="swiperOptionSelectImage" class="list">
        <swiper-slide v-for="(v, i) in ASSETS.cr" :key="i" class="list-item top">
          <img :src="v.path" width="50" />
        </swiper-slide>
        <div slot="button-prev" class="swiper-button-prev"></div>
        <div slot="button-next" class="swiper-button-next"></div>
      </swiper>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'
import { kooLogin } from '~/config/util'
export default {
  data() {
    return {
      params: {},
      swiperOptionSelectImage: {
        loop: false,
        slidesPerView: 13,
        slidesPerGroup: 13,
        spaceBetween: 7,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      },
      temp: [
        { a: 1 },
        { a: 2 },
        { a: 3 },
        { a: 4 },
        { a: 5 },
        { a: 6 },
        { a: 7 },
        { a: 8 },
        { a: 9 },
        { a: 10 },
        { a: 11 },
        { a: 12 },
        { a: 13 },
        { a: 14 },
        { a: 15 },
        { a: 16 },
      ],
    }
  },
  computed: {
    ...mapState(['LOGIN', 'LOADING', 'IS_POST', 'ASSETS', 'PROJECT_ID']),
  },
  mounted() {
    this.$nextTick(() => {
      this.params.type = 'assetsProject'
      this.params.user_idx = kooLogin('user_idx')
      this.params.secretKey = this.PROJECT_ID
      this.params.apiKey = process.env.API_KEY
      this.ACTION_AXIOS_GET(this.params)
    })
  },
  methods: {
    ...mapActions(['ACTION_AXIOS_GET', 'ACTION_AXIOS_POST']),
    ...mapMutations(['']),
  },
}
</script>

<style></style>
