<template>
  <div class="maker-left">
    <ul class="scenario-list">
      <li class="scenario-list--item active">
        <span class="scenario-tit"> 엔딩관리 </span>
        <!-- {{ scen.chapters }} -->
        <ul class="asset-list">
          <li class="asset-list--item">
            <span class="tit">ㅁㄴㅇ</span>
            <span class="num">▼5/▲10</span>
          </li>
        </ul>
      </li>
    </ul>
    <button v-b-modal.EndingAdd type="button" class="scenario-add"></button>
    <EndingAdd />
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import { kooLogin } from '~/config/util'
import EndingAdd from '~/components/modal/EndingAdd.vue'
export default {
  components: {
    EndingAdd,
  },
  data() {
    return {
      params: {},
    }
  },
  computed: {
    ...mapState(['LOGIN', 'LOADING', 'CUT_CODE']),
  },
  mounted() {
    // this.params.idxRow = JSON.stringify(this.rowIdx)
    //   this.params.secretKey = this.PROJECT_ID
    this.params.user_idx = kooLogin('user_idx')
    //   this.params.apiKey = process.env.API_KEY
    //   this.params.s_code = this.SCENE_CODE
    //   this.update()
    //   console.log('onSubmitCutData', this.params)
    //   this.ACTION_AXIOS_GET(this.params)
  },
  methods: {
    ...mapMutations([]),
    ...mapActions(['ACTION_AXIOS_GET', 'ACTION_AXIOS_POST']),
  },
}
</script>

<style lang="scss">
</style>
