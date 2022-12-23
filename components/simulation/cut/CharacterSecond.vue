<template>
  <div class="setting-con setting-image">
    <div>
      <div class="setting-tit">
        등장인물2
        <label class="input-check">
          <input
            type="checkbox"
            :checked="PREVIEW.data.effect2 === 'ani-vibration' ? true : false"
            @change="onClickEffect('ani-vibration')"
          />
          <span class="check-text">흔들림</span>
        </label>
        <label class="input-check">
          <input
            type="checkbox"
            :checked="PREVIEW.data.effect2 === 'ani-fade' ? true : false"
            @change="onClickEffect('ani-fade')"
          />
          <span class="check-text">서서히</span>
        </label>
        <label class="input-check">
          <input
            type="checkbox"
            :checked="PREVIEW.data.effect2 === 'ani-right' ? true : false"
            @change="onClickEffect('ani-right')"
          />
          <span class="check-text">오른쪽에서</span>
        </label>
        <label class="input-check">
          <input
            type="checkbox"
            :checked="PREVIEW.data.effect2 === 'ani-left' ? true : false"
            @change="onClickEffect('ani-left')"
          />
          <span class="check-text">왼쪽에서</span>
        </label>
        <label class="input-check">
          <input
            type="checkbox"
            :checked="PREVIEW.data.effect2 === 'ani-bottom' ? true : false"
            @change="onClickEffect('ani-bottom')"
          />
          <span class="check-text">아래에서</span>
        </label>
      </div>
      <div class="setting-info">
        두번째 인물을 선택하세요! 에셋 관리에서 더 추가할 수 있어요.
      </div>
      <el-scrollbar class="thumbnail-list--wrap">
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
      'MUTATIONS_ASSETS_EFFECT2',
    ]),
    onClickCrImage2(e) {
      console.log(e)
      this.MUTATIONS_ASSETS_CR2(e)
      this.MUTATIONS_CONTENT_CODE(4)
    },
    onClickEffect(type) {
      this.PREVIEW.data.effect2 === type
        ? this.MUTATIONS_ASSETS_EFFECT2('')
        : (this.PREVIEW.data.effect2 = type)
      switch (type) {
        case 'ani-vibration':
          this.MUTATIONS_ASSETS_EFFECT2('ani-vibration')
          break
        case 'ani-fade':
          this.MUTATIONS_ASSETS_EFFECT2('ani-fade')
          break
        case 'ani-left':
          this.MUTATIONS_ASSETS_EFFECT2('ani-left')
          break
        case 'ani-right':
          this.MUTATIONS_ASSETS_EFFECT2('ani-right')
          break
        case 'ani-bottom':
          this.MUTATIONS_ASSETS_EFFECT2('ani-bottom')
          break
      }
    },
  },
}
</script>

<style></style>
