<template>
  <div class="setting-con setting-image">
    <div>
      <div class="setting-tit">
        등장인물
        <label class="input-check">
          <input
            type="checkbox"
            :checked="PREVIEW.data.effect === 'ani-vibration' ? true : false"
            @change="onClickEffect('ani-vibration')"
          />
          <span class="check-text">흔들림</span>
        </label>
        <label class="input-check">
          <input
            type="checkbox"
            :checked="PREVIEW.data.effect === 'ani-fade' ? true : false"
            @change="onClickEffect('ani-fade')"
          />
          <span class="check-text">서서히</span>
        </label>
        <label class="input-check">
          <input
            type="checkbox"
            :checked="PREVIEW.data.effect === 'ani-right' ? true : false"
            @change="onClickEffect('ani-right')"
          />
          <span class="check-text">오른쪽에서</span>
        </label>
        <label class="input-check">
          <input
            type="checkbox"
            :checked="PREVIEW.data.effect === 'ani-left' ? true : false"
            @change="onClickEffect('ani-left')"
          />
          <span class="check-text">왼쪽에서</span>
        </label>
        <label class="input-check">
          <input
            type="checkbox"
            :checked="PREVIEW.data.effect === 'ani-bottom' ? true : false"
            @change="onClickEffect('ani-bottom')"
          />
          <span class="check-text">아래에서</span>
        </label>
      </div>
      <div class="setting-info">
        첫번째 인물을 선택하세요! 에셋 관리에서 더 추가할 수 있어요.
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
            v-for="(v, i) in ASSETS.cr"
            :key="i"
            class="thumbnail-list--item"
            :class="{ active: PREVIEW.img.cr === v.path }"
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
                      :class="{ active: e.path === PREVIEW.img.cr }"
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
              <img
                slot="reference"
                :src="onLoadAssetsImage(v.path)"
                alt=""
                @click="onClickEmotionAssets(v.timestemp)"
              />
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
      'MUTATIONS_ASSETS_CR',
      'MUTATIONS_ASSETS_CR2',
      'MUTATIONS_ASSETS_EFFECT',
      'MUTATIONS_CONTENT_CODE',
    ]),
    onClickCrImage(e) {
      console.log(e)
      this.MUTATIONS_ASSETS_CR(e)
      // this.MUTATIONS_CONTENT_CODE(3)
    },
    onClickEffect(type) {
      this.PREVIEW.data.effect === type
        ? this.MUTATIONS_ASSETS_EFFECT('')
        : (this.PREVIEW.data.effect = type)
      switch (type) {
        case 'ani-vibration':
          this.MUTATIONS_ASSETS_EFFECT('ani-vibration')
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
      return `${process.env.VUE_APP_IMAGE}/cr/${v}`
    },
    onClickEmotionAssets(v) {
      console.log('onClickEmotionAssets', v)
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
