<template>
  <div class="setting-con setting-image">
    <div>
      <div class="setting-tit">사운드</div>
      <div class="setting-info">
        효과음 또는 음성을 넣어 생생한 시나리오를 구성하세요.
      </div>
      <el-scrollbar class="thumbnail-list--wrap">
        <ul v-if="ASSETS" class="thumbnail-list">
          <li
            class="thumbnail-list--item"
            :class="{ active: PREVIEW.data.sr === '' }"
            @click="onClickSrData('')"
          >
            <div class="none"></div>
          </li>
          <!-- v-for="(v, i) in ASSETS.sr" -->
          <li
            v-for="(v, i) in ASSETS.sr"
            :key="i"
            class="thumbnail-list--item"
            :class="{ active: PREVIEW.data.sr === v.path }"
          >
            <div class="sound">
              <span class="name" @click="onClickSrData(v.path)">{{
                v.gas_name
              }}</span>
              <button
                type="button"
                class="btn"
                @click="onClickSrPlay(v.path, i)"
              >
                미리듣기
              </button>
              <!-- <img v-if="v.path" :src="v.path" alt="" /> -->
            </div>
          </li>
        </ul>
      </el-scrollbar>
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
      soundPlay: [],
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
      this.MUTATIONS_ASSETS_SOUND(e)
      // this.MUTATIONS_CONTENT_CODE(5)
      if (!e) {
        this.soundPlay.forEach((element) => {
          console.log(element.pause())
        })
      }
    },
    onClickSrPlay(e, i) {
      console.log(e)
      if (e) {
        this.soundPlay.forEach((element) => {
          console.log(element.pause())
        })
        this.soundPlay[i] = new Audio(`${process.env.VUE_APP_IMAGE}/sr/${e}`)
        this.soundPlay[i].play()
      } else {
        this.soundPlay.forEach((element) => {
          console.log(element.pause())
        })
      }
    },
    onLoadAssetsSr(v) {
      return `${process.env.VUE_APP_IMAGE}/sr/${v}`
    },
  },
}
</script>

<style></style>
