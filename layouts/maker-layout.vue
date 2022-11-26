<template>
  <div>
    <header class="maker-header">
      <ul class="maker-header--menu">
        <li v-for="menu in 7" :key="menu" class="item" :class="{'active':activeManu==menu}">
          <button type="button" :class="`icon icon-${menu}`">
            <span v-if="menu==1" class="icon-txt">스토리</span>
            <span v-else-if="menu==2" class="icon-txt">인트로</span>
            <span v-else-if="menu==3" class="icon-txt">엔딩</span>
            <span v-else-if="menu==4" class="icon-txt">인물설정</span>
            <span v-else-if="menu==5" class="icon-txt">UI설정</span>
            <span v-else-if="menu==6" class="icon-txt">에셋관리</span>
            <span v-else-if="menu==7" class="icon-txt">프로젝트설정</span>
          </button>
        </li>
      </ul>
      <ul class="maker-header--menu right">
        <li class="item">
          <button type="button" class="icon icon-8">
            <span class="icon-txt">미리보기</span>
          </button>
        </li>
        <li class="item">
          <button type="button" class="icon icon-9">
            <span class="icon-txt">저장하기</span>
          </button>
        </li>
      </ul>
      <!-- <nuxt-link to="">나가기</nuxt-link>
      <button v-b-modal.ScenarioInsert type="button">모달</button> -->
    </header>
    <Nuxt />
    <ScenarioInsert @scenarioInsert="scenarioInsert" />
  </div>
</template>

<script>
import ScenarioInsert from '~/components/simulation-maker/ScenarioInsert'
export default {
  components: {
    ScenarioInsert,
  },
  data() {
    return {
      activeManu: 1,
    }
  },
  methods: {
    scenarioInsert(e) {
      console.log(e)
    },
  },
}
</script>

<style lang="scss">
@import '~/assets/maker.scss';
</style>
