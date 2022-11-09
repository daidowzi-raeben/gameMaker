<template>
  <div id="projectManager">
    <div class="project">
      <div class="project-create">
        <button @click="onClickProjectCreate">생성</button>
      </div>
      <div class="project-list">
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
    </div>
    <ProjectCreate @dataReload="dataReload" />
  </div>
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
    ...mapState(['LOGIN', 'LOADING', 'PROJECT_MANAGER']),
  },
  mounted() {
    this.params.type = 'project'
    this.params.apiKey = process.env.API_KEY
    this.params.user_idx = this.LOGIN.user_idx
    this.ACTION_AXIOS_GET(this.params)
  },
  beforeDestroy() {},
  methods: {
    // ------------------------ INIT
    ...mapActions(['ACTION_AXIOS_GET']),
    ...mapMutations(['']),

    // ------------------------ EVENT
    onChangeScene({ target }) {
      console.log(target.value)
    },
    // 프로젝트 이동
    onClickGotoProject(e) {
      this.$router.push(`/game-maker/${e}`)
    },
    // 프로젝트 생성
    onClickProjectCreate() {
      this.$bvModal.show('ProjectCreate')
    },
    dataReload(e) {
      console.log(e)
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
