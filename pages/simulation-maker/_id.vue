<template>
  <div id="gameMaker">
    <CutInsert />
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'
import CutInsert from '~/components/simulation-maker/CutInsert.vue'
export default {
  components: {
    CutInsert,
  },
  layout: 'maker-layout',
  validate({ params }) {
    return params.id
  },
  asyncData({ params }) {
    return {
      idx: params.id,
    }
  },

  data() {
    return {
      params: {},
    }
  },
  computed: {
    ...mapState(['LOGIN', 'LOADING', 'SCENE']),
  },
  mounted() {
    this.params.type = 'projectDetail'
    this.params.apiKey = process.env.API_KEY
    console.log(this.idx)
    // this.ACTION_AXIOS_GET()
  },
  beforeDestroy() {},
  methods: {
    ...mapActions(['ACTION_AXIOS_GET']),
    ...mapMutations(['']),
  },
}
</script>

<style lang="scss"></style>
