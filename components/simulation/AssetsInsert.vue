<template>
  <div class="insert">
    <div class="setting">
      <div class="setting-con setting-image">
        <div class="setting-tit">
          인물
          <div class="right">
            <button
              type="button"
              class="button md btn-blue"
              @click="onClickLoadAssets('cr')"
            >
              에셋 불러오기
            </button>
            <button
              type="button"
              class="button md btn-primary"
              @click="popsModalVisible = true"
            >
              에셋 등록하기
            </button>
          </div>
        </div>
        <div class="setting-info">나만의 에셋을 등록할 수 있습니다.</div>
        <el-scrollbar v-if="ASSETS && ASSETS.cr" class="thumbnail-list--wrap">
          <ul class="thumbnail-list asset">
            <!-- <li class="thumbnail-list--item upload">
              <label class="label">
                <input type="file" />
              </label>
            </li> -->
            <li
              v-for="(v, i) in ASSETS.cr"
              :key="i"
              class="thumbnail-list--item background"
            >
              <img :src="onLoadAssetsImage(v.path)" alt="" />
              <div class="btn-wrap">
                <button type="button" class="btn">삭제하기</button>
                <button v-if="i === 1" type="button" class="btn">
                  미리듣기
                </button>
              </div>
            </li>
          </ul>
        </el-scrollbar>
        <div v-else>프로젝트에 등록된 에셋이 없습니다.</div>
      </div>
    </div>
    <div class="right" :class="{ fold: rightContentShow === true }">
      <button
        type="button"
        class="btn-fold"
        :class="{ active: rightContentShow === true }"
        @click="onClickRightContentShow()"
      ></button>
    </div>
    <el-dialog title="" :visible.sync="popsModalVisible">
      <AssetsLocalUpload />
    </el-dialog>
    <el-dialog title="" :visible.sync="popsModalVisibleLoadAssets">
      <div>
        <ul v-if="ASSETSMY && ASSETSMY.cr">
          <li v-for="(v, i) in ASSETSMY.cr" :key="i" style="float: left">
            <input type="checkbox" name="assetsImage[]" :value="v.idx" />
            <img :src="onLoadAssetsImage(v.path)" height="300" />
          </li>
        </ul>
        <div style="clear: both"></div>
        <div>
          <button type="button" @click="onSubmitCr">등록하기</button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import AssetsLocalUpload from '~/components/modal/AssetsLocalUpload'
import { kooLogin } from '~/config/util'
export default {
  components: {
    AssetsLocalUpload,
  },
  data() {
    return {
      popsModalVisible: false,
      popsModalVisibleLoadAssets: false,
      rightContentShow: false,
      params: {},
      paramsAddAssets: {
        list: [],
      },
    }
  },
  computed: {
    ...mapState(['PROJECT_ID', 'ASSETS', 'ASSETS_STORE', 'ASSETSMY']),
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
    ...mapMutations([]),
    ...mapActions(['ACTION_AXIOS_GET']),
    onClickRightContentShow() {
      this.rightContentShow = !this.rightContentShow
    },
    onClickLoadAssets(type) {
      if (type === 'cr') {
        console.log('asd')
        this.params.type = 'assetsMyList'
        this.params.mode = 'cr'
        this.params.apiKey = process.env.API_KEY
        // this.params.user_idx = this.$cookies.get('user_idx')
        this.ACTION_AXIOS_GET(this.params)
      }
      this.popsModalVisibleLoadAssets = true
    },
    onLoadAssetsImage(v) {
      return `${process.env.VUE_APP_IMAGE}/cr/${v}`
    },
    onSubmitCr() {
      let k = 0
      const list = document.getElementsByName('assetsImage[]')
      list.forEach((v, i) => {
        if (v.checked === true) {
          console.log(v.checked, v.value, i)
          k++
          this.paramsAddAssets.list.push(v.value)
        }
      })
      if (k === 0) {
        return alert('에셋을 선택하세요')
      }
      this.paramsAddAssets.type = 'assetsProjectAdd'
      this.paramsAddAssets.user_idx = kooLogin('user_idx')
      this.paramsAddAssets.secretKey = this.PROJECT_ID
      this.paramsAddAssets.apiKey = process.env.API_KEY

      console.log(this.paramsAddAssets)
      this.ACTION_AXIOS_GET(this.paramsAddAssets)
      this.paramsAddAssets.list = []
      this.popsModalVisibleLoadAssets = false
    },
  },
}
</script>

<style></style>
