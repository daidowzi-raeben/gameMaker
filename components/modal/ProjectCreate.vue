<template>
  <b-modal id="ProjectCreate" size="lg" hide-footer hide-header>
    <form>
      프로젝트명<input /><br />
      설명<input /><br />
    </form>
    <button @click="onSubmit">TEST</button>
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
      this.$emit('dataReload', 'dataReload')
    },
  },
}
</script>

<style></style>
