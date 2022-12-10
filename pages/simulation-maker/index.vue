<template>
  <div id="gameMaker">
    <div class="maker-wrap">
      <ScenarioList v-if="MAKER_GNB === 1" />
      <IntroList v-if="MAKER_GNB === 2" />
      <CharacterList v-if="MAKER_GNB === 4" />
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
import IntroList from '~/components/simulation/IntroList.vue'
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
    IntroList,
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
      if (e === 'vibration') {
        this.$refs.characterImage.classList.add(e)
        setTimeout(() => {
          this.$refs.characterImage.classList.remove(e)
        }, 400)
      }
      else if (e === 'fade') {
        this.$refs.characterImage.classList.add(e)
        setTimeout(() => {
          this.$refs.characterImage.classList.remove(e)
        }, 400)
      }
      else if (e === 'left') {
        this.$refs.characterImage.classList.add(e)
        setTimeout(() => {
          this.$refs.characterImage.classList.remove(e)
        }, 400)
      }
      else if (e === 'right') {
        this.$refs.characterImage.classList.add(e)
        setTimeout(() => {
          this.$refs.characterImage.classList.remove(e)
        }, 400)
      }
      else if (e === 'bottom') {
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
