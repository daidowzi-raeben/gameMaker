<template>
  <div id="gameMaker">
    <div class="maker-wrap">
      <ScenarioList />
      <div class="maker-right">
        <PreviewApp />
        <CutInsert
          v-if="!MAKER_GNB || MAKER_GNB === 1"
          @myLoadBgImage="myLoadBgImage"
          @myLoadCrImage="myLoadCrImage"
          @myLoadCrName="myLoadCrName"
          @myLoadText="myLoadText"
          @myLoadFocus="myLoadFocus"
          @myLoadEffect="myLoadEffect"
        />
        <IntroInsert v-if="MAKER_GNB === 2" />
        <EndingInsert v-if="MAKER_GNB === 3" />
        <CharacterInsert v-if="MAKER_GNB === 4" />
        <UiPreInsert v-if="MAKER_GNB === 5" />
        <AssetsInsert v-if="MAKER_GNB === 6" />
        <SetupInsert v-if="MAKER_GNB === 7" />
      </div>
    </div>
    <!-- <div class="maker-wrap">
      <div class="maker-left">
        <div class="preview">
          <div class="preview-tit">미리보기 {{ cutCode }}</div>
          <div class="preview-img">
            <img :src="tempData.bg" alt="" class="background" />
            <img
              ref="characterImage"
              :src="tempData.cr"
              alt=""
              class="character"
            />
            <div class="dialogue">
              <span class="name">{{ tempData.crName }}</span>
              <p
                ref="myLoadText"
                class="text"
                style="white-space: pre-line"
              ></p>
            </div>
            <img src="~/static/images/mockup.png" alt="" class="mockup" />
          </div>
        </div>
        <div class="asset">
          <div class="asset-tit">등록된 에셋</div>
          <div class="asset-wrap">
            <div class="asset-tab">
              <button
                type="button"
                class="asset-tab--tit"
                :class="{ active: assetTab == 1 }"
                @click="assetTab = 1"
              >
                배경
              </button>
              <button
                type="button"
                class="asset-tab--tit"
                :class="{ active: assetTab == 2 }"
                @click="assetTab = 2"
              >
                캐릭터
              </button>
              <button
                type="button"
                class="asset-tab--tit"
                :class="{ active: assetTab == 3 }"
                @click="assetTab = 3"
              >
                사운드
              </button>
            </div>
            <div v-show="assetTab == 1" class="asset-tab--con">배경에셋</div>
            <div v-show="assetTab == 2" class="asset-tab--con">캐릭터에셋</div>
            <div v-show="assetTab == 3" class="asset-tab--con">사운드에셋</div>
          </div>
        </div>
      </div>
      <CutInsert
        @myLoadBgImage="myLoadBgImage"
        @myLoadCrImage="myLoadCrImage"
        @myLoadCrName="myLoadCrName"
        @myLoadText="myLoadText"
        @myLoadFocus="myLoadFocus"
        @myLoadEffect="myLoadEffect"
      />
    </div> -->
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'
import CutInsert from '~/components/simulation-maker/CutInsert.vue'
import ScenarioList from '~/components/simulation-maker/ScenarioList.vue'
import PreviewApp from '~/components/simulation-maker/PreviewApp.vue'
import IntroInsert from '~/components/simulation-maker/IntroInsert.vue'
import EndingInsert from '~/components/simulation-maker/EndingInsert.vue'
import CharacterInsert from '~/components/simulation-maker/CharacterInsert.vue'
import UiPreInsert from '~/components/simulation-maker/UiPreInsert.vue'
import AssetsInsert from '~/components/simulation-maker/AssetsInsert.vue'
import SetupInsert from '~/components/simulation-maker/SetupInsert.vue'
export default {
  components: {
    CutInsert,
    ScenarioList,
    PreviewApp,
    IntroInsert,
    EndingInsert,
    CharacterInsert,
    UiPreInsert,
    AssetsInsert,
    SetupInsert,
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
      enabled: true,
      dragging: false,
      assetTab: 1,
      queryIndex: '',
      tempData: {
        bg: 'https://img.lovepik.com/background/20211102/medium/lovepik-banff-national-park-mobile-wallpaper-canada-background-image_400706001.jpg',
        cr: 'https://cdn.pixabay.com/photo/2013/07/12/13/27/man-147091_960_720.png',
        crName: '',
        text: '',
        effect: '',
      },

      cutCode: '',
    }
  },
  computed: {
    ...mapState(['LOGIN', 'LOADING', 'SCENE', 'MAKER_GNB', 'SCENE_CODE']),
  },
  mounted() {
    this.queryIndex = this.idx
    this.params.type = 'projectDetail'
    this.params.apiKey = process.env.API_KEY
    console.log(this.idx)
    this.MUTATIONS_PROJECT(this.queryIndex)
    // this.ACTION_AXIOS_GET()
  },
  beforeDestroy() {},
  methods: {
    ...mapActions(['ACTION_AXIOS_GET']),
    ...mapMutations(['MUTATIONS_PROJECT']),

    myLoadBgImage(e) {
      console.log('myLoadBgImage', e)
      this.tempData.bg = e
    },
    myLoadCrName(e) {
      console.log('myLoadCrName', e)
      this.tempData.crName = e
    },
    myLoadCrImage(e) {
      console.log('myLoadCrImage', e)
      this.tempData.cr = e
    },
    myLoadText(e) {
      this.tempData.text = e
      this.$refs.myLoadText.innerText = e
    },
    myLoadFocus(e) {
      // console.log('myLoadFocus', e)
      this.cutCode = e
      // return e
    },
    myLoadEffect(e) {
      if (e === 'vibration') {
        this.$refs.characterImage.classList.add(e)
        setTimeout(() => {
          this.$refs.characterImage.classList.remove(e)
        }, 400)
      }
    },
  },
}
</script>

<style lang="scss"></style>
