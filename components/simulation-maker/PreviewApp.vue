<template>
  <div class="preview">
    <div class="preview-img">
      <img :src="tempData.bg" alt="" class="background" />
      <img ref="characterImage" :src="tempData.cr" alt="" class="character" />
      <div class="dialogue">
        <span class="name">{{ tempData.crName }}</span>
        <p ref="myLoadText" class="text" style="white-space: pre-line"></p>
      </div>
      <img src="~/static/images/mockup.png" alt="" class="mockup" />
    </div>
    <div class="preview-save">
      마지막 저장 <span class="time">{{ SCENE_CODE }}</span>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      sceneData: [],
      tempData: {
        bg: [],
        cr: [],
        crName: [],
        text: '',
        effect: [
          {
            effect: '',
            text: '없음',
          },
          {
            effect: 'vibration',
            text: '흔들림',
          },
        ],
      },
    }
  },
  computed: {
    ...mapState(['SCENE_CODE']),
  },
  watch: {
    SCENE_CODE: {
      handler(value) {
        console.log('SCENE_CODE 변경 === ', value)
        //   console.log('watch ==========>', value)
        //   this.scenarioLists = this.SCENE_DATA
        //   this.params.type = 'scenarioInsert'
        //   this.params.data = JSON.stringify(value)
        //   this.params.secretKey = this.PROJECT_ID
        //   this.params.user_idx = this.user_idx
        //   this.params.apiKey = process.env.API_KEY
        //   this.ACTION_AXIOS_GET(this.params)
      },
      immediate: true,
    },
  },
  mounted() {
    for (let i = 1; i < 19; i++) {
      this.tempData.bg = [
        ...this.tempData.bg,
        {
          name: `이미지${i}`,
          path: `${process.env.VUE_APP_IMAGE}/bg/${i}.jpg`,
        },
      ]
      this.tempData.cr = [
        ...this.tempData.cr,
        {
          name: `이미지${i}`,
          path: `${process.env.VUE_APP_IMAGE}/cr/${i}.png`,
        },
      ]
    }
    this.sceneData = [...this.sceneData]
    // this.tempInputData = [...this.tempInputData]
  },
}
</script>

<style>
</style>