<template>
  <div class="setting-con setting-image">
    <div>
      <div class="setting-tit">사운드</div>
      <div class="setting-info">설명</div>
      <ul v-if="ASSETS" class="thumbnail-list">
        <li class="thumbnail-list--item" @click="onClickSrData('')">
          <div class="none"></div>
        </li>
        <!-- v-for="(v, i) in ASSETS.sr" -->
        <li
          v-for="(v, i) in 10"
          :key="i"
          class="thumbnail-list--item"
          :class="{ active: PREVIEW.data.sr === v.path }"
        >
          <div class="sound">
            <span class="name" @click="onClickSrData(v.path)">웃음소리</span>
            <button type="button" class="btn">미리듣기</button>
            <!-- <img v-if="v.path" :src="v.path" alt="" /> -->
          </div>
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
      'MUTATIONS_ASSETS_SOUND',
      'MUTATIONS_ASSETS_CR',
      'MUTATIONS_CONTENT_CODE',
    ]),
    onClickSrData(e) {
      console.log(e)
      //   this.MUTATIONS_ASSETS_SOUND(e)
      //   this.MUTATIONS_CONTENT_CODE(4)
    },
  },
}
</script>

<style></style>
