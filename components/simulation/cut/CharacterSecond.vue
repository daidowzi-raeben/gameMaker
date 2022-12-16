<template>
  <div class="setting-con setting-image">
    <div>
      <div class="setting-tit">등장인물2</div>
      <div class="setting-info">설명</div>
      <ul v-if="ASSETS" class="thumbnail-list">
        <li class="thumbnail-list--item" @click="onClickCrImage2('')">
          <div class="none"></div>
        </li>
        <li
          v-for="(v, i) in ASSETS.cr"
          :key="i"
          class="thumbnail-list--item"
          :class="{ active: PREVIEW.img.cr2 === v.path }"
          @click="onClickCrImage2(v.path)"
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
    onClickCrImage2(e) {
      console.log(e)
      this.MUTATIONS_ASSETS_CR2(e)
      this.MUTATIONS_CONTENT_CODE(4)
    },
  },
}
</script>

<style></style>
