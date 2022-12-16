<template>
  <b-modal id="AssetsLocalUpload" size="lg" hide-footer title="타이틀">
    <div>asdsd</div>
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
  methods: {},
}
</script>

<style></style>
