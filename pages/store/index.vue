<template>
  <div>
    <div class="project-wrap">
      <div class="top-search">
        <div class="top-search--tit">Asset Store</div>
        <div class="search-wrap">
          <input
            v-model="params.str"
            type="text"
            class="input"
            placeholder="에셋을 검색해 보세요"
            @keyup.enter="onLoad(params.str)"
          />
          <button
            type="button"
            class="search-btn"
            @click="onLoad(params.str)"
          ></button>
        </div>
        <ul class="hash-list">
          <li class="hash-list--item">
            <a href="" @click.prevent="onLoad('학원')">학원 </a>
          </li>
          <li class="hash-list--item">
            <a href="" @click.prevent="onLoad('일상물')">일상물 </a>
          </li>
          <li class="hash-list--item">
            <a href="" @click.prevent="onLoad('동양')">동양 </a>
          </li>
          <li class="hash-list--item">
            <a href="" @click.prevent="onLoad('서양')">서양 </a>
          </li>
        </ul>
      </div>
      <div class="card-wrap">
        <!-- <div class="card-tit"><nuxt-link to="">무료 에셋</nuxt-link></div> -->
        <div class="card-tit"><nuxt-link to=""> 캐릭터 에셋</nuxt-link></div>
        <!-- <swiper :options="swiperOptionCol7" class="card-list asset">
          <swiper-slide
            v-for="(v, i) in ASSETS_STORE.crList"
            :key="i"
            class="card-list--item character"
          >
            <div @click="onClickAssetsDetail(v.code)">
              <img :src="onImageLoad(v.path)" alt="" />
              <label class="like">
                <input type="checkbox" :checked="i === 1" />
                <span class="icon"></span>
              </label>
              <div class="info">
                <div class="category">
                  {{ v.kind === 'C' ? 'CHARACTER' : 'BACKGROUND' }}
                </div>
                <div class="text">{{ v.gas_name }}</div>
                <div class="bottom">
                  <span v-if="v.price !== 'F'" class="price">12,300</span>
                  <span v-else class="price free">FREE</span>
                  <label class="cart">
                    <input type="checkbox" :checked="i === 1" />
                    <span class="icon"></span>
                  </label>
                </div>
              </div>
            </div>
          </swiper-slide>
        </swiper> -->
        <div class="card-list asset temp-type">
          <div
            v-for="(v, i) in ASSETS_STORE.crList"
            :key="i"
            class="card-list--item character"
          >
            <div>
              <img
                :src="onImageLoad(v.path)"
                alt=""
                @click="onClickAssetsDetail(v.code)"
              />
              <label class="like">
                <input type="checkbox" :checked="v.is_like ? true : false" />
                <span class="icon" @click="onClickLike(v.code)"></span>
              </label>
              <div class="info" @click="onClickAssetsDetail(v.code)">
                <div class="category">
                  {{ v.kind === 'C' ? 'CHARACTER' : 'BACKGROUND' }}
                </div>
                <div class="text">{{ v.gas_name }}</div>
                <div class="bottom">
                  <span v-if="v.price !== 'F' && v.price !== '0'" class="price">
                    {{
                      v.discount && v.discount !== '0'
                        ? v.discount
                        : v.price | comma
                    }}
                  </span>
                  <span v-else class="price free">FREE</span>
                  <!-- <label class="cart">
                    <input type="checkbox" :checked="i === 1" />
                    <span class="icon"></span>
                  </label> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card-wrap">
        <!-- <div class="card-tit"><nuxt-link to="">무료 에셋</nuxt-link></div> -->
        <div class="card-tit"><nuxt-link to=""> 배경 에셋</nuxt-link></div>
        <!-- <swiper :options="swiperOptionCol7" class="card-list asset">
          <swiper-slide
            v-for="(v, i) in ASSETS_STORE.crList"
            :key="i"
            class="card-list--item character"
          >
            <div @click="onClickAssetsDetail(v.code)">
              <img :src="onImageLoad(v.path)" alt="" />
              <label class="like">
                <input type="checkbox" :checked="i === 1" />
                <span class="icon"></span>
              </label>
              <div class="info">
                <div class="category">
                  {{ v.kind === 'C' ? 'CHARACTER' : 'BACKGROUND' }}
                </div>
                <div class="text">{{ v.gas_name }}</div>
                <div class="bottom">
                  <span v-if="v.price !== 'F'" class="price">12,300</span>
                  <span v-else class="price free">FREE</span>
                  <label class="cart">
                    <input type="checkbox" :checked="i === 1" />
                    <span class="icon"></span>
                  </label>
                </div>
              </div>
            </div>
          </swiper-slide>
        </swiper> -->
        <div class="card-list asset temp-type">
          <div
            v-for="(v, i) in ASSETS_STORE.bgList"
            :key="i"
            class="card-list--item"
          >
            <div>
              <img
                :src="onImageLoadBg(v.path)"
                alt=""
                @click="onClickAssetsDetail(v.code)"
              />
              <label class="like">
                <input type="checkbox" :checked="v.is_like ? true : false" />
                <span class="icon" @click="onClickLike(v.code)"></span>
              </label>
              <div class="info" @click="onClickAssetsDetail(v.code)">
                <div class="category">
                  {{ v.kind === 'C' ? 'CHARACTER' : 'BACKGROUND' }}
                </div>
                <div class="text">{{ v.gas_name }}</div>
                <div class="bottom">
                  <span v-if="v.price !== 'F' && v.price !== '0'" class="price">
                    {{
                      v.discount && v.discount !== '0'
                        ? v.discount
                        : v.price | comma
                    }}
                  </span>
                  <span v-else class="price free">FREE</span>
                  <!-- <label class="cart">
                    <input type="checkbox" :checked="i === 1" />
                    <span class="icon"></span>
                  </label> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="card-wrap">
        <div class="card-tit"><nuxt-link to="">테마 에셋</nuxt-link></div>
        <swiper :options="swiperOptionCol5" class="card-list theme">
          <swiper-slide v-for="(v, i) in 10" :key="i" class="card-list--item">
            <nuxt-link to="">배경</nuxt-link>
          </swiper-slide>
        </swiper>
      </div> -->
    </div>
    <!-- <ProjectCreate @dataReload="dataReload" /> -->
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'
// import ProjectCreate from '~/components/modal/ProjectCreate'
export default {
  name: 'StoreIndex',
  components: {
    // ProjectCreate,
  },
  layout: 'index',
  data() {
    return {
      paramsLike: {},
      params: {},
      swiperOptionCol5: {
        loop: false,
        slidesPerView: 5,
        slidesPerGroup: 5,
        spaceBetween: 20,
      },
      swiperOptionCol7: {
        loop: false,
        slidesPerView: 7,
        slidesPerGroup: 7,
        spaceBetween: 15,
      },
    }
  },
  computed: {
    ...mapState([
      'LOGIN',
      'LOADING',
      'PROJECT_MANAGER',
      'IS_POST',
      'ASSETS_STORE',
    ]),
  },
  watch: {
    IS_POST: {
      handler(value) {
        console.log(value)
        if (value === true) {
          this.ACTION_AXIOS_GET(this.params)
          this.MUTATIONS_AXIOS_POST_INIT()
        }
      },
      immediate: true,
    },
  },
  mounted() {
    this.MUTATIONS_AXIOS_POST_INIT()
    this.onLoad()
  },
  beforeDestroy() {},
  methods: {
    // ------------------------ INIT
    ...mapActions(['ACTION_AXIOS_GET', 'ACTION_AXIOS_POST']),
    ...mapMutations(['MUTATIONS_AXIOS_POST_INIT']),

    // ------------------------ EVENT
    onImageLoad(v) {
      return `${process.env.VUE_APP_IMAGE}/cr/${v}`
    },
    onImageLoadBg(v) {
      return `${process.env.VUE_APP_IMAGE}/bg/${v}`
    },
    onChangeScene({ target }) {
      console.log(target.value)
    },
    // 프로젝트 이동
    onClickGotoProject(e) {
      this.$router.push(`/simulation-maker/${e}`)
    },
    // 프로젝트 생성
    onClickProjectCreate() {
      this.$bvModal.show('ProjectCreate')
    },
    dataReload(e) {
      const frm = new FormData()
      frm.append('type', 'projectInsert')
      frm.append('title', e.title)
      frm.append('discription', e.discription)
      frm.append('user_idx', this.$cookies.get('user_idx'))
      frm.append('apiKey', process.env.API_KEY)
      this.ACTION_AXIOS_POST(frm, 'projectInsert')
      //   모달 닫고 데이터 리로드
      this.$bvModal.hide('ProjectCreate')
    },
    onClickAssetsDetail(e) {
      console.log(e)
      this.$router.push(`/store/detail?asId=${e}`)
    },
    onLoad(v) {
      if (this.$cookies.get('user_idx')) {
        this.params.user_idx = this.$cookies.get('user_idx')
      }
      this.params.type = 'assetsList'
      this.params.mode = 'cr'
      this.params.apiKey = process.env.API_KEY
      if (v) {
        this.params.str = v
      }
      // this.params.user_idx = this.$cookies.get('user_idx')
      this.ACTION_AXIOS_GET(this.params)
    },
    onClickLike(v) {
      if (!this.$cookies.get('user_idx')) {
        return alert('로그인 후 이용 가능합니다')
      }
      this.paramsLike.asId = v
      this.paramsLike.type = 'assetsLikeHitList'
      this.paramsLike.mode = 'cr'
      this.paramsLike.apiKey = process.env.API_KEY
      this.paramsLike.user_idx = this.$cookies.get('user_idx')
      // this.params.user_idx = this.$cookies.get('user_idx')
      console.log('paramsLike', this.paramsLike)
      this.ACTION_AXIOS_GET(this.paramsLike)
    },
  },
}
</script>

<style lang="scss">
</style>
