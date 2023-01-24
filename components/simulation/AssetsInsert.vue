<template>
  <div class="insert">
    <el-scrollbar class="setting">
      <div class="setting-con">
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
              @click="onClickIsOpen('C')"
            >
              에셋 등록하기
            </button>
          </div>
        </div>
        <div class="setting-info">나만의 인물 에셋을 등록할 수 있습니다.</div>
        <div v-if="ASSETS && ASSETS.cr" class="thumbnail-list--wrap type3">
          <ul class="thumbnail-list asset">
            <li
              v-for="(v, i) in ASSETS.cr"
              :key="i"
              class="thumbnail-list--item"
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
        </div>
        <div class="assets-none" v-else>
          <i class="el-timeline-item__icon el-icon-more"></i>
          프로젝트에 등록된 에셋이 없습니다.
        </div>

        <div class="setting-tit mt-5">
          배경
          <div class="right">
            <button
              type="button"
              class="button md btn-blue"
              @click="onClickLoadAssets('bg')"
            >
              에셋 불러오기
            </button>
            <button
              type="button"
              class="button md btn-primary"
              @click="onClickIsOpen('B')"
            >
              에셋 등록하기
            </button>
          </div>
        </div>
        <div class="setting-info">나만의 배경 에셋을 등록할 수 있습니다.</div>
        <div v-if="ASSETS && ASSETS.bg" class="thumbnail-list--wrap type3">
          <ul class="thumbnail-list asset">
            <li
              v-for="(v, i) in ASSETS.bg"
              :key="i"
              class="thumbnail-list--item background"
            >
              <img :src="onLoadAssetsImageBg(v.path)" alt="" />
              <div class="btn-wrap">
                <button type="button" class="btn">삭제하기</button>
              </div>
            </li>
          </ul>
        </div>
        <div class="assets-none" v-else>
          <i class="el-timeline-item__icon el-icon-more"></i>
          프로젝트에 등록된 에셋이 없습니다.
        </div>

        <div class="setting-tit mt-5">
          사운드
          <div class="right">
            <button
              type="button"
              class="button md btn-blue"
              @click="onClickLoadAssets('sr')"
            >
              에셋 불러오기
            </button>
            <button
              type="button"
              class="button md btn-primary"
              @click="onClickIsOpen('S')"
            >
              에셋 등록하기
            </button>
          </div>
        </div>
        <div class="setting-info">나만의 사운드 에셋을 등록할 수 있습니다.</div>
        <div v-if="!ASSETS && ASSETS.sr" class="thumbnail-list--wrap type3">
          <ul class="thumbnail-list asset">
            <li
              v-for="(v, i) in ASSETS.sr"
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
        </div>
        <div class="assets-none" v-else>
          <i class="el-timeline-item__icon el-icon-more"></i>
          프로젝트에 등록된 에셋이 없습니다.
        </div>
      </div>
    </el-scrollbar>

    <div class="right" :class="{ fold: rightContentShow === true }">
      <button
        type="button"
        class="btn-fold"
        :class="{ active: rightContentShow === true }"
        @click="onClickRightContentShow()"
      ></button>
    </div>
    <el-dialog title="" width="800px" :visible.sync="popsModalVisible">
      <AssetsLocalUpload
        :assetsType="assetsType"
        @assetsInsertIsClose="assetsInsertIsClose"
      />
    </el-dialog>
    <el-dialog title="" :visible.sync="popsModalVisibleLoadAssets">
      <el-scrollbar>
        <div class="thumbnail-list--wrap type2">
          <ul
            v-if="ASSETSMY && ASSETSMY.cr && params.mode === 'cr'"
            class="thumbnail-list"
          >
            <li
              v-for="(v, i) in ASSETSMY.cr"
              :key="i"
              class="thumbnail-list--item"
            >
              <label class="thumbnail-check">
                <input type="checkbox" name="assetsImage[]" :value="v.idx" />
                <span class="box"></span>
                <img :src="onLoadAssetsImage(v.path)" />
              </label>
            </li>
          </ul>
          <ul
            v-else-if="ASSETSMY && ASSETSMY.cr && params.mode === 'bg'"
            class="thumbnail-list"
          >
            <li
              v-for="(v, i) in ASSETSMY.bg"
              :key="i"
              class="thumbnail-list--item"
            >
              <label class="thumbnail-check">
                <input type="checkbox" name="assetsImage[]" :value="v.idx" />
                <span class="box"></span>
                <img :src="onLoadAssetsImage(v.path)" />
              </label>
            </li>
          </ul>
          <ul
            v-else-if="ASSETSMY && ASSETSMY.cr && params.mode === 'sr'"
            class="thumbnail-list"
          >
            <li
              v-for="(v, i) in ASSETSMY.sr"
              :key="i"
              class="thumbnail-list--item"
            >
              <label class="thumbnail-check">
                <input type="checkbox" name="assetsImage[]" :value="v.idx" />
                <span class="box"></span>
                <img :src="onLoadAssetsImage(v.path)" />
              </label>
            </li>
          </ul>
          <div class="assets-none" v-else>
            <i class="el-timeline-item__icon el-icon-more"></i>
            구매한 에셋이 없습니다.
          </div>
        </div>
      </el-scrollbar>
      <div class="text-center mt-5">
        <button type="button" class="button md btn-primary" @click="onSubmitCr">
          등록하기
        </button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
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
      assetsType: 'C',
    }
  },
  computed: {
    ...mapState(['PROJECT_ID', 'ASSETS', 'ASSETS_STORE', 'ASSETSMY']),
    ...mapGetters(['GETTER_LOADING', 'GETTER_TEST']),
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
      this.params.loading = this.GETTER_LOADING
      this.params.mode = type
      this.params.type = 'assetsMyList'
      this.params.apiKey = process.env.API_KEY
      // this.params.user_idx = this.$cookies.get('user_idx')
      this.ACTION_AXIOS_GET(this.params)
      this.popsModalVisibleLoadAssets = true
    },
    onLoadAssetsImage(v) {
      return `${process.env.VUE_APP_IMAGE}/cr/${v}`
    },
    onLoadAssetsImageBg(v) {
      return `${process.env.VUE_APP_IMAGE}/bg/${v}`
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
    assetsInsertIsClose() {
      console.log('=================')
      this.$nextTick(() => {
        this.params.type = 'assetsProject'
        this.params.user_idx = kooLogin('user_idx')
        this.params.secretKey = this.PROJECT_ID
        this.params.apiKey = process.env.API_KEY
        this.ACTION_AXIOS_GET(this.params)
      })
      this.popsModalVisible = false
    },
    onClickIsOpen(v) {
      this.popsModalVisible = true
      this.assetsType = v
    },
  },
}
</script>

<style>
</style>
