<template>
  <div>
    <Nuxt />
    <!-- 로딩 -->
    <LoadingContent v-if="LOADING === true" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import LoadingContent from '~/components/modules/LoadingContent.vue'
export default {
  name: 'DefaultLayout',
  components: {
    LoadingContent,
  },
  computed: {
    ...mapState(['LOADING']),
  },
}
</script>

<style></style>
