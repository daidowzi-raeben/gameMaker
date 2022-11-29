<template>
  <div id="projectManager">
    <div class="project-wrap">
      <div class="card-wrap">
        <div class="card-tit"><nuxt-link to="">Visual Novel</nuxt-link></div>
        <swiper :options="swiperOptionCol4" class="card-list project-list">
          <swiper-slide v-for="(v, i) in 4" :key="i" class="card-list--item project-list--item">
            <nuxt-link to="">
              <div class="top">
                <span class="date">최근 수정일<span class="num">22.12.12</span></span>
                <div class="badge-wrap">
                  <span class="badge red">인트로</span>
                  <span class="badge blue">엔딩</span>
                  <span class="badge green">배포완료</span>
                </div>
              </div>
              <div class="tit">나의 첫 프로젝트 프로젝트명은 두줄까지만 지원합니다 두줄이 넘어가면 말줄임으로 표시될거예요</div>
              <div class="info">프로젝트 설명이 들어갑니다. 프로젝트 설명은 세줄까지만 지원합니다. 세줄이 넘어가면 말줄임으로 표시될거예요 세줄 세줄 세줄 세줄 세줄 세줄 세줄 세줄 세줄</div>
              <ul class="state-list">
                <li class="state-list--item">
                  <label class="label">인물</label>
                  <span class="num">3</span>
                </li>
                <li class="state-list--item">
                  <label class="label">에셋</label>
                  <span class="num">10,904</span>
                </li>
                <li class="state-list--item">
                  <label class="label">스토리</label>
                  <span class="num">20-30</span>
                </li>
              </ul>
            </nuxt-link>
          </swiper-slide>
          <swiper-slide class="card-list--item project-list--item">
            <nuxt-link to="">
              <div class="top">
                <span class="date">최근 수정일<span class="num">22.12.12</span></span>
                <div class="badge-wrap">
                  <span class="badge red">인트로</span>
                  <span class="badge">엔딩</span>
                  <span class="badge">배포전</span>
                </div>
              </div>
              <div class="tit">나의 첫 프로젝트</div>
              <div class="info">프로젝트 설명이 들어갑니다.</div>
              <ul class="state-list">
                <li class="state-list--item">
                  <label class="label">인물</label>
                  <span class="num">3</span>
                </li>
                <li class="state-list--item">
                  <label class="label">에셋</label>
                  <span class="num">10,904</span>
                </li>
                <li class="state-list--item">
                  <label class="label">스토리</label>
                  <span class="num">20-30</span>
                </li>
              </ul>
            </nuxt-link>
          </swiper-slide>
          <swiper-slide class="card-list--item project-list--item add">
            <button type="button" class="add-btn">
              새로운 프로젝트를<br />추가해 보세요
            </button>
          </swiper-slide>
        </swiper>
      </div>
      <div class="card-wrap">
        <div class="card-tit"><nuxt-link to="">Asset Store</nuxt-link></div>
        <swiper :options="swiperOptionCol7" class="card-list">
          <swiper-slide v-for="(v, i) in 10" :key="i" class="card-list--item">
            <nuxt-link to=""></nuxt-link>
          </swiper-slide>
        </swiper>
      </div>
      <div class="card-wrap type2">
        <div class="left">
          <div class="card-tit"><nuxt-link to="">Notice</nuxt-link></div>
          <ul class="tit-list">
            <li v-for="(v, i) in 5" :key="i" class="tit-list--item">
              <nuxt-link to="">
                <span class="tit">title</span>
                <span class="date">22.11.11</span>
              </nuxt-link>
            </li>
          </ul>
        </div>
        <div class="right">
          <div class="card-tit"><nuxt-link to="">Notice</nuxt-link></div>
          <ul class="tit-list">
            <li v-for="(v, i) in 2" :key="i" class="tit-list--item">
              <nuxt-link to="">
                <span class="tit">title</span>
                <span class="date">22.11.11</span>
              </nuxt-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <ProjectCreate @dataReload="dataReload" />
  </div>
  <!-- <div id="projectManager">
    {{ IS_POST }}
    <div class="project">
      <div class="project-create">
        <button @click="onClickProjectCreate">생성</button>
      </div>
      <div class="project-list">
        <div v-if="PROJECT_MANAGER && PROJECT_MANAGER.projectList">
          <div
            v-for="(v, i) in PROJECT_MANAGER.projectList"
            :key="i"
            class="item"
            @click="onClickGotoProject(v.secret_code)"
          >
            <h3>{{ v.title }}</h3>
            <p>{{ v.discription }}</p>
          </div>
        </div>
        <div v-else>첫 프로젝트를 등록해 보세요</div>
      </div>
    </div>
    <ProjectCreate @dataReload="dataReload" />
  </div> -->
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'
import ProjectCreate from '~/components/modal/ProjectCreate'
export default {
  components: {
    ProjectCreate,
  },
  layout: 'default-index',
  data() {
    return {
      params: {},
      swiperOptionCol4: {
        loop: false,
        slidesPerView: 4,
        slidesPerGroup: 4,
        spaceBetween:20,
      },
      swiperOptionCol7: {
        loop: false,
        slidesPerView: 7,
        slidesPerGroup: 7,
        spaceBetween:15,
      },
      temp: [1,2,3,4,5,6,7,8,9],
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
