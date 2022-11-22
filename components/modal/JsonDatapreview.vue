<template>
  <b-modal id="JsonDatapreview" size="lg" hide-footer title="Json 미리보기">
    {{ JSON.stringify(SCENE_DATA) }}
  </b-modal>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      jsonData: '',
    }
  },
  computed: {
    ...mapState(['LOGIN', 'LOADING', 'SCENE_DATA']),
  },
  mounted() {},
  methods: {
    onSubmit() {
      // form 데이터 전달
      this.$emit('JsonDatapreview', null)
    },
  },
}
</script>

<style></style>
