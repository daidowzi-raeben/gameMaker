<template>
  <b-modal id="ScenarioInsert" size="lg" hide-footer title="시나리오 추가">
    시나리오 추가하기
  </b-modal>
</template>

<script>
export default {
  data() {
    return {
      formData: {},
    }
  },
  methods: {
    onSubmit() {
      // form 데이터 전달
      this.$emit('scenarioInsert', null)
    },
  },
}
</script>

<style></style>
