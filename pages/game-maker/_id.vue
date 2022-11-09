<template>
  <div>asd</div>
</template>
<script>
import { mapActions, mapState, mapMutations } from 'vuex'
export default {
  layout: 'maker-layout',
  data() {
    return { params: {} }
  },
  computed: {
    ...mapState(['LOGIN', 'LOADING', 'SCENE']),
  },
  mounted() {
    this.params.type = 'user'
    this.params.apiKey = process.env.API_KEY
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
