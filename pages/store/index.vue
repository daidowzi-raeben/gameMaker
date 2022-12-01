<template>
  <div>
    <div class="project-wrap">
      <div class="top-search">
        <div class="top-search--tit">Asset Store</div>
        <div class="search-wrap">
          <input type="text" class="input" placeholder="에셋을 검색해 보세요" />
          <button type="button" class="search-btn"></button>
        </div>
        <ul class="hash-list">
          <li v-for="(v, i) in 5" :key="i" class="hash-list--item">
            <nuxt-link to="">인물</nuxt-link>
          </li>
        </ul>
      </div>
      <div class="card-wrap">
        <div class="card-tit"><nuxt-link to="">무료 에셋</nuxt-link></div>
        <swiper :options="swiperOptionCol7" class="card-list asset">
          <swiper-slide v-for="(v, i) in 10" :key="i" class="card-list--item">
            <img src="https://lwi.nexon.com/maplestory/mobile/29E0ECE19C0FD827/media/thumb_03.jpg" alt="" />
            <label class="like">
              <input type="checkbox" :checked="i===1" />
              <span class="icon"></span>
            </label>
            <div class="info">
              <div class="category">BACKGROUND</div>
              <div class="text">배경을 만들어보았어요 설명은 두줄까지 노출이 됩니다</div>
              <div class="bottom">
                <span v-if="i===1" class="price">12,300</span>
                <span v-else class="price free">FREE</span>
                <label class="cart">
                  <input type="checkbox" :checked="i===1" />
                  <span class="icon"></span>
                </label>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
      <div class="card-wrap">
        <div class="card-tit"><nuxt-link to="">테마 에셋</nuxt-link></div>
        <swiper :options="swiperOptionCol5" class="card-list theme">
          <swiper-slide v-for="(v, i) in 10" :key="i" class="card-list--item">
            <nuxt-link to="">배경</nuxt-link>
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <ProjectCreate @dataReload="dataReload" />
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'
import ProjectCreate from '~/components/modal/ProjectCreate'
export default {
  name: 'StoreIndex',
  components: {
    ProjectCreate,
  },
  layout: 'default-index',
  data() {
    return {
      params: {},
      swiperOptionCol5: {
        loop: false,
        slidesPerView: 5,
        slidesPerGroup: 5,
        spaceBetween:20,
      },
      swiperOptionCol7: {
        loop: false,
        slidesPerView: 7,
        slidesPerGroup: 7,
        spaceBetween:15,
      },
    }
  },
  computed: {
    ...mapState(['LOGIN', 'LOADING', 'PROJECT_MANAGER', 'IS_POST']),
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
    this.params.type = 'project'
    this.params.apiKey = process.env.API_KEY
    this.params.user_idx = this.$cookies.get('user_idx')
    this.ACTION_AXIOS_GET(this.params)
  },
  beforeDestroy() {},
  methods: {
    // ------------------------ INIT
    ...mapActions(['ACTION_AXIOS_GET', 'ACTION_AXIOS_POST']),
    ...mapMutations(['MUTATIONS_AXIOS_POST_INIT']),

    // ------------------------ EVENT
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
  },
}
</script>

<style lang="scss">
</style>
