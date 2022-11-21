<template>
  <div id="gameMaker">
    <div class="maker-wrap">
      <div class="maker-left">
        <div class="preview">
          <div class="preview-tit">미리보기</div>
          <div class="preview-img">
            <img src="https://img.lovepik.com/background/20211102/medium/lovepik-banff-national-park-mobile-wallpaper-canada-background-image_400706001.jpg" alt="" class="background" />
            <img src="https://cdn.pixabay.com/photo/2013/07/12/13/27/man-147091_960_720.png" alt="" class="character" />
            <div class="dialogue">
              <span class="name">김채은</span>
              <p class="text">
                대사내용<br />
                대사내용<br />
                대사내용
              </p>
            </div>
            <img src="~/static/images/mockup.png" alt="" class="mockup" />
          </div>
        </div>
        <div class="asset">
          <div class="asset-tit">등록된 에셋</div>
          <div class="asset-wrap">
            <div class="asset-tab">
              <button type="button" class="asset-tab--tit" :class="{active:assetTab==1}" @click="assetTab=1">배경</button>
              <button type="button" class="asset-tab--tit" :class="{active:assetTab==2}" @click="assetTab=2">캐릭터</button>
              <button type="button" class="asset-tab--tit" :class="{active:assetTab==3}" @click="assetTab=3">사운드</button>
            </div>
            <div v-show="assetTab==1" class="asset-tab--con">
              배경에셋
            </div>
            <div v-show="assetTab==2" class="asset-tab--con" >
              캐릭터에셋
            </div>
            <div v-show="assetTab==3" class="asset-tab--con">
              사운드에셋
            </div>
          </div>
        </div>
      </div>
      <CutInsert />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'
import CutInsert from '~/components/simulation-maker/CutInsert.vue'
export default {
  components: {
    CutInsert,
  },
  layout: 'maker-layout',
  validate({ params }) {
    return params.id
  },
  asyncData({ params }) {
    return {
      idx: params.id,
    }
  },

  data() {
    return {
      params: {},
      assetTab: 1,
    }
  },
  computed: {
    ...mapState(['LOGIN', 'LOADING', 'SCENE']),
  },
  mounted() {
    this.params.type = 'projectDetail'
    this.params.apiKey = process.env.API_KEY
    console.log(this.idx)
    // this.ACTION_AXIOS_GET()
  },
  beforeDestroy() {},
  methods: {
    ...mapActions(['ACTION_AXIOS_GET']),
    ...mapMutations(['']),
  },
}
</script>

<style lang="scss"></style>
