<template>
  <div id="projectManager">
    <div class="project"></div>
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
    return { params: {} }
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
#gameMaker {
  min-width: 1200px;
  width: 1200px;
  margin: 0 auto;
}
.mobileDevice {
  width: 360px;
  height: 640px;
  border: 2px solid #ccc;
  border-radius: 20px;
  overflow: hidden;
  &-warp {
  }
}
/* 360 * 640 */
</style>
