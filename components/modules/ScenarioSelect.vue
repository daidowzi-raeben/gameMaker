<template>
  <div class="insert-set">
    <button
      v-show="!scenarioSettingShow"
      type="button"
      class="btn scenario"
      @click="onClickScenarioSetting('set')"
    >
      프로필 등장
    </button>
    <div v-show="scenarioSettingShow" class="set scenario-set">
      <select v-if="SCENE_DATA" class="input-select">
        <option
          v-for="(v, i) in SCENE_DATA"
          :key="i"
          :value="v.timestamp"
          @change="onChangeScenarioData"
        >
          {{ v.tit }}
        </option>
      </select>
      <select v-else disabled class="input-select">
        <option>시나리오 없음</option>
      </select>
      <select class="input-select">
        <option>챕터2</option>
        <option>챕터2</option>
      </select>
      <button
        type="button"
        class="save"
        @click="onClickScenarioSetting('save')"
      >
        저장
      </button>
    </div>
    <button type="button" class="btn sound">사운드 설정</button>
    <div class="set sound-set"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      scenarioSettingShow: false,
    }
  },
  computed: {
    ...mapState(['SCENE_DATA']),
  },
  methods: {
    onClickPointSetting(type) {
      this.pointSettingShow = true
      this.scenarioSettingShow = false
      if (type === 'save') this.pointSettingShow = false
    },
    onClickScenarioSetting(type) {
      this.pointSettingShow = false
      this.scenarioSettingShow = true
      if (type === 'save') this.scenarioSettingShow = false
    },
    onChangeScenarioData({ target }) {
      console.log(target.value)
    },
  },
}
</script>

<style></style>
