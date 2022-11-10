<template>
  <div id="gameMaker">
    <div class="d-flex maker">
      <div class="mobileDevice">
        <div class="mobileDevice-warp">
          <!-- 디바이스 미리보기 -->
        </div>
      </div>
      <div class="scene">
        <!-- 씬 -->
        <div>
          <ul>
            <li v-for="(v, i) in SCENE" :key="i">
              {{ v.title }} - {{ v.subTitle }}
              <ul>
                <li style="padding-left: 10px">asd</li>
              </ul>
            </li>
          </ul>
        </div>
        <div>
          <!-- 이벤트 -->
        </div>
      </div>
      <div class="">asd</div>
    </div>
    <div></div>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'
export default {
  layout: 'maker-layout',
  validate({ params }) {
    return params.id
  },
  asyncData({ params }) {
    return {
      idx: params.id,
    }
  },
  data() {
    return { params: {} }
  },
  computed: {
    ...mapState(['LOGIN', 'LOADING', 'SCENE']),
  },
  mounted() {
    this.params.type = 'projectDetail'
    this.params.apiKey = process.env.API_KEY
    console.log(this.idx)
    // this.ACTION_AXIOS_GET()
  },
  beforeDestroy() {},
  methods: {
    ...mapActions(['ACTION_AXIOS_GET']),
    ...mapMutations(['']),

    onChangeScene({ target }) {
      console.log(target.value)
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
