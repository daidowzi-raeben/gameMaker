<template>
  <div>
    <header class="maker-header">
      <nuxt-link to="">나가기</nuxt-link>
      <button v-b-modal.ScenarioInsert type="button">모달</button>
    </header>
    <Nuxt />
    <footer class="footer">
      <div class="footer-wrap">ⓒ project Koo</div>
    </footer>
    <ScenarioInsert @scenarioInsert="scenarioInsert" />
  </div>
</template>

<script>
import ScenarioInsert from '~/components/simulation-maker/ScenarioInsert'
export default {
  components: {
    ScenarioInsert,
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
