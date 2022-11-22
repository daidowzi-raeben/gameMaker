<template>
  <div>
    <header class="maker-header">
      <nuxt-link to="">나가기</nuxt-link>
      <button v-b-modal.ScenarioInsert type="button">모달</button>
      <button v-b-modal.JsonDatapreview type="button">저장</button>
    </header>
    <Nuxt />
    <footer class="footer">
      <div class="footer-wrap">ⓒ project Koo</div>
    </footer>
    <ScenarioInsert @scenarioInsert="scenarioInsert" />
    <JsonDatapreview />
  </div>
</template>

<script>
import ScenarioInsert from '~/components/simulation-maker/ScenarioInsert'
import JsonDatapreview from '~/components/modal/JsonDatapreview'
export default {
  components: {
    ScenarioInsert,
    JsonDatapreview,
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
