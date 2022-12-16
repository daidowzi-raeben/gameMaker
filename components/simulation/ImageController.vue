<template>
  <div class="setting-con setting-scen">
    <div class="setting-tit">
      화면 설정
      <label v-if="MAKER_GNB === 1 || MAKER_GNB === 3" class="input-check">
        <input
          type="checkbox"
          :checked="PREVIEW.data.effect === 'ani-vibration' ? true : false"
          @change="onClickEffect('ani-vibration')"
        />
        <span class="check-text">흔들림</span>
      </label>
      <label v-if="MAKER_GNB === 1 || MAKER_GNB === 3" class="input-check">
        <input
          type="checkbox"
          :checked="PREVIEW.data.effect === 'ani-fade' ? true : false"
          @change="onClickEffect('ani-fade')"
        />
        <span class="check-text">서서히</span>
      </label>
      <label v-if="MAKER_GNB === 1 || MAKER_GNB === 3" class="input-check">
        <input
          type="checkbox"
          :checked="PREVIEW.data.effect === 'ani-right' ? true : false"
          @change="onClickEffect('ani-right')"
        />
        <span class="check-text">오른쪽에서</span>
      </label>
      <label v-if="MAKER_GNB === 1 || MAKER_GNB === 3" class="input-check">
        <input
          type="checkbox"
          :checked="PREVIEW.data.effect === 'ani-left' ? true : false"
          @change="onClickEffect('ani-left')"
        />
        <span class="check-text">왼쪽에서</span>
      </label>
      <label v-if="MAKER_GNB === 1 || MAKER_GNB === 3" class="input-check">
        <input
          type="checkbox"
          :checked="PREVIEW.data.effect === 'ani-bottom' ? true : false"
          @change="onClickEffect('ani-bottom')"
        />
        <span class="check-text">아래에서</span>
      </label>
    </div>
    <div v-if="ASSETS" class="setting-scen--list">
      <label class="label">배경</label>
      <swiper :options="swiperOptionSelectImage" class="list">
        <swiper-slide class="list-item">
          <label class="label top">
            <input
              type="radio"
              name="bgCheck"
              :checked="PREVIEW.img.bg === '' ? true : false"
              @change="onClickBgImage('')"
            />
            <span class="img-wrap no-image"></span>
          </label>
        </swiper-slide>
        <swiper-slide v-for="(v, i) in ASSETS.bg" :key="i" class="list-item">
          <label class="label" @change="onClickBgImage(v.path)">
            <input
              type="radio"
              name="bgCheck"
              :checked="PREVIEW.img.bg === v.path ? true : false"
            />
            <span class="img-wrap">
              <img :src="v.path" />
            </span>
          </label>
        </swiper-slide>
        <div slot="button-prev" class="swiper-button-prev"></div>
        <div slot="button-next" class="swiper-button-next"></div>
      </swiper>
    </div>
    <div v-if="MAKER_GNB === 1 || MAKER_GNB === 4" class="setting-scen--list">
      <label class="label">인물</label>
      <swiper :options="swiperOptionSelectImage" class="list">
        <swiper-slide class="list-item">
          <label class="label top">
            <input
              type="radio"
              name="crCheck"
              :checked="PREVIEW.img.cr === '' ? true : false"
              @change="onClickCrImage('')"
            />
            <span class="img-wrap no-image"></span>
          </label>
        </swiper-slide>
        <swiper-slide v-for="(v, i) in ASSETS.cr" :key="i" class="list-item">
          <label class="label top">
            <input
              type="radio"
              name="crCheck"
              :checked="PREVIEW.img.cr === v.path ? true : false"
              @change="onClickCrImage(v.path)"
            />
            <span class="img-wrap">
              <img :src="v.path" />
            </span>
          </label>
        </swiper-slide>
        <div slot="button-prev" class="swiper-button-prev"></div>
        <div slot="button-next" class="swiper-button-next"></div>
      </swiper>
    </div>
    <div v-if="MAKER_GNB === 1" class="setting-scen--list">
      <label class="label">인물2</label>
      <swiper :options="swiperOptionSelectImage" class="list">
        <swiper-slide class="list-item">
          <label class="label top">
            <input
              type="radio"
              name="crCheck2"
              :checked="PREVIEW.img.cr2 === '' ? true : false"
              @change="onClickCrImage2('')"
            />
            <span class="img-wrap no-image"></span>
          </label>
        </swiper-slide>
        <swiper-slide v-for="(v, i) in ASSETS.cr" :key="i" class="list-item">
          <label class="label top">
            <input
              type="radio"
              name="crCheck2"
              :checked="PREVIEW.img.cr2 === v.path ? true : false"
              @change="onClickCrImage2(v.path)"
            />
            <span class="img-wrap">
              <img :src="v.path" />
            </span>
          </label>
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
        allowTouchMove: false,
        loop: false,
        slidesPerView: 8,
        slidesPerGroup: 8,
        spaceBetween: 10,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        breakpoints: {
          1600: {
            slidesPerView: 10,
            slidesPerGroup: 10,
          },
          1500: {
            slidesPerView: 8,
            slidesPerGroup: 8,
          },
          1400: {
            slidesPerView: 6,
            slidesPerGroup: 6,
          },
        }
      },
    }
  },
  computed: {
    ...mapState([
      'LOGIN',
      'LOADING',
      'IS_POST',
      'ASSETS',
      'PROJECT_ID',
      'PREVIEW',
      'MAKER_GNB',
    ]),
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
    ...mapMutations([
      'MUTATIONS_ASSETS_BG',
      'MUTATIONS_ASSETS_CR',
      'MUTATIONS_ASSETS_CR2',
      'MUTATIONS_ASSETS_EFFECT',
    ]),
    onClickBgImage(e) {
      this.MUTATIONS_ASSETS_BG(e)
    },
    onClickCrImage(e) {
      this.MUTATIONS_ASSETS_CR(e)
    },
    onClickCrImage2(e) {
      this.MUTATIONS_ASSETS_CR2(e)
    },
    onClickEffect(type) {
      this.PREVIEW.data.effect === type
        ? this.MUTATIONS_ASSETS_EFFECT('')
        : (this.PREVIEW.data.effect = type)
      switch (type) {
        case 'ani-vibration':
          this.MUTATIONS_ASSETS_EFFECT('ani-vibration')
          break
        case 'ani-fade':
          this.MUTATIONS_ASSETS_EFFECT('ani-fade')
          break
        case 'ani-left':
          this.MUTATIONS_ASSETS_EFFECT('ani-left')
          break
        case 'ani-right':
          this.MUTATIONS_ASSETS_EFFECT('ani-right')
          break
        case 'ani-bottom':
          this.MUTATIONS_ASSETS_EFFECT('ani-bottom')
          break
      }
    },
  },
}
</script>

<style></style>
