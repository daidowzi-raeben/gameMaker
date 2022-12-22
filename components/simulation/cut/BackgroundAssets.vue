<template>
  <div class="setting-con setting-image">
    <div>
      <div class="setting-tit">배경화면</div>
      <div class="setting-info">
        배경을 선택하세요! 에셋 관리에서 더 추가할 수 있어요.
      </div>
      <ul v-if="ASSETS" class="thumbnail-list">
        <li class="thumbnail-list--item" @click="onClickBgImage('')">
          <div class="none"></div>
        </li>
        <li
          v-for="(v, i) in ASSETS.bg"
          :key="i"
          class="thumbnail-list--item background"
          :class="{ active: PREVIEW.img.bg === v.path }"
          @click="onClickBgImage(v.path)"
        >
          <img v-if="v.path" :src="v.path" alt="" />
        </li>
      </ul>
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
      'MUTATIONS_CONTENT_CODE',
    ]),
    onClickBgImage(e) {
      console.log(e)
      this.MUTATIONS_ASSETS_BG(e)
      this.MUTATIONS_CONTENT_CODE(2)
    },
  },
}
</script>

<style></style>
