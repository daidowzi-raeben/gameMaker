<template>
  <div>
    <div v-if="ASSETS_STORE.detail.detail" style="margin-top: 150px">
      에셋명 : {{ ASSETS_STORE.detail.detail.gas_name }} <br />
      설명 : {{ ASSETS_STORE.detail.detail.gas_discription }} <br />
      구분 : {{ ASSETS_STORE.detail.detail.kind }} <br />
      경로 : {{ ASSETS_STORE.detail.detail.path }} <br />
      최근업데이트 : {{ ASSETS_STORE.detail.detail.m_datetime }} <br />
      좋아요 :
      {{
        !ASSETS_STORE.detail.detail.like ? 0 : ASSETS_STORE.detail.detail.like
      }}
      <br />
    </div>
    <div>
      <div
        v-if="
          ASSETS_STORE.detail.is_assets && ASSETS_STORE.detail.is_assets.idx
        "
      >
        <!-- 구매 후 -->
        <button type="button" class="button btn-grey" disabled>
          구매하기안됨
        </button>
      </div>
      <div v-else>
        <!-- 구매 전 -->
        <button
          type="button"
          class="button btn-primary"
          @click="onClickButAssets"
        >
          구매하기
        </button>
        <button type="button" class="button btn-primary">장바구니</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'
export default {
  name: 'StoreDetail',
  layout: 'default-index',
  data() {
    return {
      preview: {
        national: '',
      },
      addImage: 4,
      files: [],
      params: {},
    }
  },
  computed: {
    ...mapState([
      'LOGIN',
      'LOADING',
      'PROJECT_MANAGER',
      'IS_POST',
      'ASSETS_STORE',
    ]),
  },
  mounted() {
    this.params.type = 'assetsDetail'
    this.params.apiKey = process.env.API_KEY
    this.params.asId = this.$route.query.asId
    this.params.user_idx = this.$cookies.get('user_idx')
    this.ACTION_AXIOS_GET(this.params)
  },
  methods: {
    // ------------------------ INIT
    ...mapActions(['ACTION_AXIOS_GET', 'ACTION_AXIOS_POST']),
    ...mapMutations(['MUTATIONS_AXIOS_POST_INIT']),
    onChangeNational({ target }) {
      console.log(target.files, URL.createObjectURL(target.files[0]))
      this.preview.national = URL.createObjectURL(target.files[0])
    },
    onChangeDel(e, key) {
      console.log(this.$refs[`addImage${key}`][0].remove())
    },
    onClickButAssets() {
      if (!this.$cookies.get('user_idx')) {
        return alert('로그인 후 이용 가능합니다')
      }
      console.log('구매하기')
      this.params.type = 'assetsBuy'
      this.params.apiKey = process.env.API_KEY
      this.params.asId = this.$route.query.asId
      this.params.user_idx = this.$cookies.get('user_idx')
      this.ACTION_AXIOS_GET(this.params)
    },
  },
}
</script>

<style></style>
