<template>
  <div>
    <div>레이아웃</div>
    <Nuxt />
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'AssetsAdminLayOut',
  components: {},
  computed: {
    ...mapState(['LOADING']),
  },
}
</script>

<style></style>
