<template>
  <div class="setting-con setting-image">
    <div>
      <div class="setting-tit">배경화면</div>
      <div class="setting-info">
        배경을 선택하세요! 에셋 관리에서 더 추가할 수 있어요.
      </div>
      <el-scrollbar class="thumbnail-list--wrap">
        <ul v-if="ASSETS" class="thumbnail-list">
          <li class="thumbnail-list--item" @click="onClickCrImage('')">
            <div class="none"></div>
          </li>
          <!-- <li class="thumbnail-list--item">
            <el-popover placement="right" trigger="click">
              <div class="character-face">
                <el-scrollbar>
                  <ul class="character-face--list">
                    <li v-for="i in 20" :key="i" class="item">웃는표정</li>
                  </ul>
                </el-scrollbar>
                <button
                  type="button"
                  class="button sm btn-grey"
                  @click="visible = false"
                >
                  닫기
                </button>
              </div>
              <img
                slot="reference"
                src="https://pbs.twimg.com/profile_images/883006072843153408/DGb3iOy5_400x400.jpg"
                alt=""
              />
            </el-popover>
          </li> -->
          <li
            v-for="(v, i) in ASSETS.bg"
            :key="i"
            class="thumbnail-list--item"
            :class="{ active: PREVIEW.img.bg === v.path }"
          >
            <el-popover v-model="visible[i]" placement="right" trigger="click">
              <div class="character-face">
                <el-scrollbar>
                  <ul
                    v-if="ASSETS_EMOTION && ASSETS_EMOTION.emotion"
                    class="character-face--list"
                  >
                    <li
                      v-for="(e, p) in ASSETS_EMOTION.emotion"
                      :key="p"
                      class="item"
                      :class="{ active: e.path === PREVIEW.img.bg }"
                      @click="onClickCrImage(e.path)"
                    >
                      {{ e.gas_discription }}
                    </li>
                  </ul>
                </el-scrollbar>
                <button
                  type="button"
                  class="button sm btn-grey"
                  @click="visible = []"
                >
                  닫기
                </button>
              </div>
              <div class="img-wrap" slot="reference">
                <img
                  :src="onLoadAssetsImage(v.path)"
                  alt=""
                  @click="onClickEmotionAssets(v.timestemp, v.path)"
                />
              </div>
            </el-popover>
            <!-- <img v-if="v.path" :src="onLoadAssetsImage(v.path)" alt="" /> -->
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
      paramsEmotion: {},
      visible: [],
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
      'ASSETS_EMOTION',
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
      'MUTATIONS_ASSETS_BG',
      'MUTATIONS_ASSETS_BG2',
      'MUTATIONS_ASSETS_EFFECT',
      'MUTATIONS_CONTENT_CODE',
    ]),
    onClickCrImage(e) {
      console.log(e)
      this.MUTATIONS_ASSETS_BG(e)
      // this.MUTATIONS_CONTENT_CODE(3)
    },
    onClickEffect(type) {
      if (type !== 'app-vibration') {
        this.PREVIEW.data.effect === type
          ? this.MUTATIONS_ASSETS_EFFECT('')
          : (this.PREVIEW.data.effect = type)
      }
      switch (type) {
        case 'ani-vibration':
          this.MUTATIONS_ASSETS_EFFECT('ani-vibration')
          break
        case 'app-vibration':
          this.MUTATIONS_ASSETS_EFFECT('app-vibration')
          break
        case 'ani-fade':
          this.MUTATIONS_ASSETS_EFFECT('ani-fade')
          break
        case 'ani-left':
          this.MUTATIONS_ASSETS_EFFECT('ani-left')
          break
        case 'ani-right':
          this.MUTATIONS_ASSETS_EFFECT('ani-right')
          break
        case 'ani-bottom':
          this.MUTATIONS_ASSETS_EFFECT('ani-bottom')
          break
      }
    },
    onLoadAssetsImage(v) {
      return `${process.env.VUE_APP_IMAGE}/bg/${v}`
    },
    onClickEmotionAssets(v, path) {
      console.log('onClickEmotionAssets', v)
      this.MUTATIONS_ASSETS_BG(path)
      this.paramsEmotion.type = 'assetsProjectEmotion'
      this.paramsEmotion.user_idx = kooLogin('user_idx')
      this.paramsEmotion.secretKey = this.PROJECT_ID
      this.paramsEmotion.apiKey = process.env.API_KEY
      this.paramsEmotion.timestemp = v
      this.ACTION_AXIOS_GET(this.paramsEmotion)
    },
  },
}
</script>

<style></style>
