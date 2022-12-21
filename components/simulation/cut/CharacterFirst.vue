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
        첫번째 인물을 선택하세요! 에셋관리에서 더 추가할 수 있어요.
      </div>
      <ul v-if="ASSETS" class="thumbnail-list">
        <li class="thumbnail-list--item" @click="onClickCrImage('')">
          <div class="none"></div>
        </li>
        <li
          v-for="(v, i) in ASSETS.cr"
          :key="i"
          class="thumbnail-list--item"
          :class="{ active: PREVIEW.img.cr === v.path }"
          @click="onClickCrImage(v.path)"
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
    onClickCrImage(e) {
      console.log(e)
      this.MUTATIONS_ASSETS_CR(e)
      this.MUTATIONS_CONTENT_CODE(3)
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
  },
}
</script>

<style></style>
