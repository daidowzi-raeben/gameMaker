<template>
  <div id="gameMaker">
    <div class="d-flex maker">
      <div class="mobileDevice">
        <div class="mobileDevice-warp">
          <!-- 디바이스 미리보기 -->
        </div>
      </div>
      <div class="scene d-flex">
        <!-- 씬 -->
        <div class="scene-scenario box">
          <div
            v-for="(v, i) in SCENE"
            :key="i"
            class="item"
            @click="onClickScenario"
          >
            {{ v.title }} - {{ v.subTitle }}
          </div>
          <div>
            <div v-if="isBtn === false" @click="isBtn = true">
              <button>추가 +</button>
            </div>
            <div v-else>
              <div>
                <input v-model="insert.title" placeholder="제목 ex) 제 1장" />
              </div>
              <div>
                <input2270
                  v-model="insert.subTitle"
                  placeholder="부제 ex) 흔들리는 꽃들 속에서"
                />
              </div>
              <div>
                <button @click="isBtn = false">저장</button>
                <button @click="isBtn = false">X</button>
              </div>
            </div>
          </div>
        </div>
        <div class="scene-round box">
          <div v-for="(v, i) in SCENE" :key="i" class="item">
            {{ v.title }} - {{ v.subTitle }}
          </div>
        </div>
        <div>
          <!-- 이벤트 -->
        </div>
      </div>
      <div class="">asd</div>
    </div>
    <div></div>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'
export default {
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
    return { params: {}, insert: {}, isBtn: false }
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

    onChangeScene({ target }) {
      console.log(target.value)
    },
    onClickScenario() {},
  },
}
</script>

<style lang="scss">
input {
  border: 1px solid #ddd;
}
#gameMaker {
  min-width: 1200px;
  width: 1200px;
  margin: 0 auto;
}
.mobileDevice {
  width: 360px;
  height: 640px;
  border: 2px solid #ccc;
  border-radius: 20px;
  overflow: hidden;
  &-warp {
  }
}
.scene {
  margin-left: 10px;
  .box {
    border: 1px solid #ccc;
    margin-right: 10px;
    width: 200px;
  }
}
/* 360 * 640 */
</style>
