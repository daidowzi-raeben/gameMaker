<template>
  <b-modal id="ProjectCreate" size="lg" hide-footer title="프로젝트 생성">
    <form>
      프로젝트명<input v-model="formData.title" /><br />
      설명<input v-model="formData.discription" /><br />
    </form>
    <button @click="onSubmit">생성</button>
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
      this.$emit('dataReload', this.formData)
      this.formData = {}
    },
  },
}
</script>

<style></style>
