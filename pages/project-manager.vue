<template>
  <div id="projectManager">
    <div class="project-wrap">
      <div class="card-wrap">
        <div class="card-tit">
          <nuxt-link to="">내 프로젝트</nuxt-link>
          <button
            type="button"
            class="button btn-primary md btn-add"
            @click="popsModalVisible = true"
          >
            추가하기
          </button>
        </div>
        <!-- <swiper
          v-if="PROJECT_MANAGER"
          :options="swiperOptionCol4"
          class="card-list project-list"
        > -->
        <div
          v-if="PROJECT_MANAGER"
          :options="swiperOptionCol4"
          class="card-list project-list type-temp"
        >
          <!-- <swiper-slide
            v-for="(v, i) in PROJECT_MANAGER.projectList"
            :key="i"
            class="card-list--item project-list--item"
          > -->
          <div
            v-for="(v, i) in PROJECT_MANAGER.projectList"
            :key="i"
            class="card-list--item project-list--item"
          >
            <nuxt-link :to="`/simulation-maker?projectKey=${v.secret_code}`">
              <div class="logo">
                <img v-if="v.logo" :src="onLoadAssetsImage(v.logo)" />
                <img v-else src="~/static/images/logo.svg" />
              </div>
              <div class="top">
                <span class="date"
                  >최근 수정일<span class="num">{{
                    v.datetime | moment('YY.MM.DD')
                  }}</span></span
                >
                <!-- <div class="badge-wrap">
                  <span class="badge red">인트로</span>
                  <span class="badge blue">엔딩</span>
                  <span class="badge green">배포완료</span>
                </div> -->
              </div>
              <div class="tit">
                {{ v.title }}
              </div>
              <div class="info">
                {{ v.discription }}
              </div>
              <ul class="state-list">
                <li class="state-list--item">
                  <label class="label">시나리오</label>
                  <span class="num">{{ onLoadStory(v.json_data, 'S') }}</span>
                </li>
                <li class="state-list--item">
                  <label class="label">챕터</label>
                  <span class="num">{{ onLoadStory(v.json_data, 'C') }}</span>
                </li>
                <!-- <li class="state-list--item">
                  <label class="label">스토리</label>
                  <span class="num">20-30</span>
                </li> -->
              </ul>
            </nuxt-link>
          </div>
          <!-- <swiper-slide class="card-list--item project-list--item">
            <nuxt-link to="">
              <div class="top">
                <span class="date"
                  >최근 수정일<span class="num">22.12.12</span></span
                >
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
          </swiper-slide> -->
          <!-- <swiper-slide class="card-list--item project-list--item add">
            <button
              type="button"
              class="add-btn"
              @click="popsModalVisible = true"
            >
              새로운 프로젝트를<br />추가해 보세요
            </button>
          </swiper-slide> -->
          <!-- <div slot="button-prev" class="swiper-button-prev"></div>
          <div slot="button-next" class="swiper-button-next"></div> -->
        </div>
      </div>
      <!-- <div class="card-wrap">
        <div class="card-tit"><nuxt-link to="">Asset Store</nuxt-link></div>
        <swiper :options="swiperOptionCol7" class="card-list">
          <swiper-slide v-for="(v, i) in 10" :key="i" class="card-list--item">
            <nuxt-link to=""></nuxt-link>
          </swiper-slide>
          <div slot="button-prev" class="swiper-button-prev"></div>
          <div slot="button-next" class="swiper-button-next"></div>
        </swiper>
      </div> -->
      <!-- <div class="card-wrap type2">
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
      </div> -->
    </div>

    <el-dialog title="" width="500px" :visible.sync="popsModalVisible">
      <form class="mt-3" @submit.prevent="onClickMakerProject">
        <div class="input-wrap">
          <label class="input-label">프로젝트 이름</label>
          <input v-model="makerProject.subject" class="input-text" />
        </div>
        <div class="input-wrap mt-2">
          <label class="input-label">프로젝트 설명</label>
          <input v-model="makerProject.discription" class="input-text" />
        </div>
        <div class="text-center mt-3">
          <button
            type="button"
            class="button md btn-primary"
            @click.prevent="onClickMakerProject"
          >
            프로젝트 생성
          </button>
        </div>
      </form>
    </el-dialog>
    <!-- <ProjectCreate @dataReload="dataReload" /> -->
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
// import ProjectCreate from '~/components/modal/ProjectCreate'
export default {
  components: {
    // ProjectCreate,
  },
  layout: 'index',
  data() {
    return {
      params: {},
      swiperOptionCol4: {
        loop: false,
        slidesPerView: 4,
        slidesPerGroup: 4,
        spaceBetween: 20,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      },
      swiperOptionCol7: {
        loop: false,
        slidesPerView: 7,
        slidesPerGroup: 7,
        spaceBetween: 15,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      },
      temp: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      makerProject: {
        subject: '',
        discription: '',
      },
      popsModalVisible: false,
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
      this.$router.push(`/simulation-maker?projectKey=${e}`)
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
    onClickMakerProject() {
      this.popsModalVisible = false
      const frm = new FormData()
      frm.append('type', 'projectInsert')
      frm.append('title', this.makerProject.subject)
      frm.append('discription', this.makerProject.discription)
      frm.append('user_idx', this.$cookies.get('user_idx'))
      frm.append('apiKey', process.env.API_KEY)
      this.ACTION_AXIOS_POST(frm, 'projectInsert')
    },
    onLoadAssetsImage(v) {
      return `${process.env.VUE_APP_IMAGE}/logo/${v}`
    },
    onLoadStory(v, t) {
      let count = 0
      console.log(JSON.parse(v), t)
      if (t === 'S') {
        return v ? JSON.parse(v).length : 0
      }
      if (t === 'C') {
        if (v) {
          JSON.parse(v).forEach((element) => {
            if (element.chapters) {
              count += element.chapters.length
            }
          })
        }
        return count
      }

      return 0
    },
  },
}
</script>

<style lang="scss"></style>
