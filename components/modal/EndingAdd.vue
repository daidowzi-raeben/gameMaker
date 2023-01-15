<template>
  <b-modal id="EndingAdd" size="lg" hide-footer centered>
    <div>
      <!-- <div>엔딩 등록</div>
      <div v-if="SCENE_DATA_CHARACTER">
        <select class="input-select" @change="onChangeEndingCr">
          <option :value="''">기본엔딩</option>
          <option
            v-for="(v, i) in SCENE_DATA_CHARACTER.jsonData"
            :key="i"
            :value="SCENE_DATA_CHARACTER.idx[i]"
          >
            {{ v.name }}
          </option>
        </select>
        <span class="text red">포인트</span>
        <input type="number" @input="onInputUpPoint" />
        <span class="text">이상</span>
        <span class="text blue">포인트</span>
        <input type="number" @input="onInputDownPoint" />
        <span class="text">이하</span>
      </div> -->
    </div>
  </b-modal>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      parmas: {},
    }
  },
  computed: {
    ...mapState(['LOGIN', 'LOADING', 'SCENE_DATA_CHARACTER']),
  },
  mounted() {},
  methods: {
    onChangeEndingCr({ target }) {
      this.parmas.name = target.value
    },
    onInputUpPoint({ target }) {
      this.parmas.upPoint = target.value
    },
    onInputDownPoint({ target }) {
      this.parmas.downUnit = target.value
    },
  },
}
</script>

<style></style>
