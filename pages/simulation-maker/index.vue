<template>
  <div id="gameMaker">
    <div class="maker-wrap">
      <ScenarioList v-if="MAKER_GNB === 1" />
      <EndingList v-if="MAKER_GNB === 3" />
      <IntroList v-if="MAKER_GNB === 10" />
      <CharacterList v-if="MAKER_GNB === 4" />
      <UIList v-if="MAKER_GNB === 5" />
      <AssetsList v-if="MAKER_GNB === 6" />
      <SettingList v-if="MAKER_GNB === 7" />
      <div class="maker-right">
        <CutList v-if="MAKER_GNB === 1 || MAKER_GNB === 3" />
        <PreviewApp :cropImage="cropImage" />
        <CutInsert
          v-if="!MAKER_GNB || MAKER_GNB === 1"
          @myLoadBgImage="myLoadBgImage"
          @myLoadCrImage="myLoadCrImage"
          @myLoadCrName="myLoadCrName"
          @myLoadText="myLoadText"
          @myLoadFocus="myLoadFocus"
          @myLoadEffect="myLoadEffect"
        />
        <IntroInsert v-if="MAKER_GNB === 10" />
        <EndingInsert v-if="MAKER_GNB === 3" />
        <CharacterInsert
          v-if="MAKER_GNB === 4"
          @onChangeCropImage="onChangeCropImage"
        />
        <UiPreInsert v-if="MAKER_GNB === 5" />
        <AssetsInsert v-if="MAKER_GNB === 6" />
        <SetupInsert v-if="MAKER_GNB === 7" />
      </div>

      <div class="maker-left--capacity">
        <p class="num">ver <strong>0.1</strong></p>
        <!-- <p class="num">
          <strong>18.5MB</strong>
          / 50MB
        </p>
        <div class="bar-wrap">
          <span class="bar" style="width: 20%"></span>
        </div> -->
      </div>
    </div>
    <!-- <div class="maker-wrap">
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
import { kooLogin } from '~/config/util'
import ScenarioList from '~/components/simulation/ScenarioList.vue'
import CutList from '~/components/simulation/CutList.vue'
import EndingList from '~/components/simulation/EndingList.vue'
import AssetsList from '~/components/simulation/AssetsList.vue'
import IntroList from '~/components/simulation/IntroList.vue'
import SettingList from '~/components/simulation/SettingList.vue'
import UIList from '~/components/simulation/UIList.vue'
import CharacterList from '~/components/simulation/CharacterList.vue'
import CutInsert from '~/components/simulation/CutInsert.vue'
import PreviewApp from '~/components/simulation/PreviewApp.vue'
import IntroInsert from '~/components/simulation/IntroInsert.vue'
import EndingInsert from '~/components/simulation/EndingInsert.vue'
import CharacterInsert from '~/components/simulation/CharacterInsert.vue'
import UiPreInsert from '~/components/simulation/UiPreInsert.vue'
import AssetsInsert from '~/components/simulation/AssetsInsert.vue'
import SetupInsert from '~/components/simulation/SetupInsert.vue'
export default {
  name: 'SimulationMakerMain',
  components: {
    ScenarioList,
    CutList,
    EndingList,
    IntroList,
    SettingList,
    AssetsList,
    UIList,
    CharacterList,
    CutInsert,
    PreviewApp,
    IntroInsert,
    EndingInsert,
    CharacterInsert,
    UiPreInsert,
    AssetsInsert,
    SetupInsert,
  },
  layout: 'maker-layout',
  // validate({ params }) {
  //   return params.id
  // },
  // asyncData({ params }) {
  //   return {
  //     idx: params.id,
  //   }
  // },
  data() {
    return {
      params: {},
      enabled: true,
      dragging: false,
      assetTab: 1,
      queryIndex: '',
      cropImage: '',
      tempData: {
        bg: 'https://img.lovepik.com/background/20211102/medium/lovepik-banff-national-park-mobile-wallpaper-canada-background-image_400706001.jpg',
        cr: 'https://cdn.pixabay.com/photo/2013/07/12/13/27/man-147091_960_720.png',
        crName: '',
        text: '',
        effect: '',
      },

      cutCode: '',
      paramsCharacter: {},
    }
  },
  computed: {
    ...mapState(['LOGIN', 'LOADING', 'SCENE', 'MAKER_GNB', 'SCENE_CODE']),
  },
  mounted() {
    this.queryIndex = this.$route.query.projectKey
    this.params.type = 'projectDetail'
    this.params.apiKey = process.env.API_KEY
    console.log(this.$route.query.projectKey)
    this.MUTATIONS_PROJECT(this.queryIndex)

    this.user_idx = kooLogin('user_idx')
    this.paramsCharacter.type = 'characterList'
    this.paramsCharacter.user_idx = this.user_idx
    this.paramsCharacter.secretKey = this.$route.query.projectKey
    this.paramsCharacter.apiKey = process.env.API_KEY
    this.ACTION_AXIOS_GET(this.paramsCharacter)
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
      if (e === 'ani-vibration') {
        this.$refs.characterImage.classList.add(e)
        setTimeout(() => {
          this.$refs.characterImage.classList.remove(e)
        }, 400)
      } else if (e === 'ani-fade') {
        this.$refs.characterImage.classList.add(e)
        setTimeout(() => {
          this.$refs.characterImage.classList.remove(e)
        }, 400)
      } else if (e === 'ani-left') {
        this.$refs.characterImage.classList.add(e)
        setTimeout(() => {
          this.$refs.characterImage.classList.remove(e)
        }, 400)
      } else if (e === 'ani-right') {
        this.$refs.characterImage.classList.add(e)
        setTimeout(() => {
          this.$refs.characterImage.classList.remove(e)
        }, 400)
      } else if (e === 'ani-bottom') {
        this.$refs.characterImage.classList.add(e)
        setTimeout(() => {
          this.$refs.characterImage.classList.remove(e)
        }, 400)
      }
    },
    onChangeCropImage(value) {
      console.log('onChangeCropImage', value)
      this.cropImage = value
    },
  },
}
</script>

<style lang="scss"></style>
