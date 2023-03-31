<template>
  <div class="" style="padding: 30px 0">
    <div
      v-if="
        RAND_ASSETS_INT &&
        RAND_ASSETS_INT.assetsList &&
        RAND_ASSETS_INT.assetsList[0]
      "
      class="text-center text-guide"
    >
      <p>카드를 골라주세요!</p>
      남은횟수
      <strong>{{
        Number(RAND_ASSETS_INT.assetsList[0].event) -
        Number(RAND_ASSETS_INT.assetsList[0].event_end)
      }}</strong
      >회
    </div>
    <div style="margin-top: 20px">
      <ul v-if="RAND_ASSETS && RAND_ASSETS.assetsList" class="assetsList">
        <li v-for="(v, i) in RAND_ASSETS.assetsList" :key="i">
          <div
            class="flip"
            :class="{ active: v.is_buy }"
            @click="onClickIsFlib($event, i, v.path, v.kind, v.is_buy, v.idx)"
          >
            <div class="card">
              <!-- 앞면 -->
              <div class="front">
                <h1>{{ i + 1 }}</h1>
              </div>
              <!-- 뒷면 -->
              <div class="back">
                <img
                  v-if="v.is_buy"
                  :src="
                    v.kind === 'C'
                      ? 'https://api.school-os.net/game/upload/cr/400/' + v.path
                      : 'https://api.school-os.net/game/upload/bg/400/' + v.path
                  "
                />
                <img v-else src="" />
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import { kooLogin } from '~/config/util'
export default {
  layout: 'index',
  data() {
    return {
      paramsList: {},
      params: {},
      paramsInsert: {},
      display: {},
    }
  },
  watch: {
    display: {
      handler(value) {
        this.display = value
      },
    },
  },
  computed: {
    ...mapState(['RAND_ASSETS', 'RAND_ASSETS_INT']),
  },
  mounted() {
    this.paramsList.type = 'randAssets'
    this.paramsList.secretKey = this.PROJECT_ID
    this.paramsList.user_idx = kooLogin('user_idx')
    this.paramsList.apiKey = process.env.API_KEY
    this.ACTION_AXIOS_GET(this.paramsList)

    this.params.type = 'randAssetsInsert'
    this.params.secretKey = this.PROJECT_ID
    this.params.user_idx = kooLogin('user_idx')
    this.params.apiKey = process.env.API_KEY
    this.ACTION_AXIOS_GET(this.params)
  },
  methods: {
    ...mapActions(['ACTION_AXIOS_GET', 'ACTION_AXIOS_POST']),
    onClickIsFlib(v, i, path, kind, isBuy, assetIdx) {
      if (
        this.RAND_ASSETS_INT.assetsList[0].event ===
        this.RAND_ASSETS_INT.assetsList[0].event_end
      ) {
        return alert('사용가능한 횟수가 없습니다')
      }
      if (isBuy) {
        return
      }
      if (confirm('카드를 선택하시겠습니까?')) {
        let imgPath
        if (kind === 'C') {
          imgPath = 'https://api.school-os.net/game/upload/cr/400/' + path
        } else {
          imgPath = 'https://api.school-os.net/game/upload/bg/400/' + path
        }
        console.log(assetIdx)

        const targetClass = document.querySelectorAll('.flip')[i]
        document.querySelectorAll('.back img')[i].setAttribute('src', imgPath)
        targetClass.classList.add('active')

        this.paramsInsert.type = 'randAssetsInsert'
        this.paramsInsert.secretKey = this.PROJECT_ID
        this.paramsInsert.user_idx = kooLogin('user_idx')
        this.paramsInsert.idx = assetIdx
        this.paramsInsert.apiKey = process.env.API_KEY
        console.log('paramsInsert', this.paramsInsert)
        this.ACTION_AXIOS_GET(this.paramsInsert)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.assetsList {
  li {
    float: left;
  }
  &:after {
    content: '';
    clear: both;
    display: block;
  }
}
.flip {
  width: 263px;
  height: 320px;
  position: relative;
  perspective: 1100px;
  margin: 10px;
  @media (max-width:600px) {
    min-width: 150px;
    width: 95%;
    height: 250px;
  }
}

.card {
  width: 100%;
  height: 100%;
  position: relative;
  transition: 0.4s;
  transform-style: preserve-3d;
}

.front,
.back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  img {
    width: 263px;
    height: 320px;
  }
}

.front {
  background: #d1ebe8 !important;
  font-size: 20px;
  h1 {
    color: #66c7bb;
    font-size: 36px;
    font-weight: 600;
  }
}

.back {
  transform: rotateY(180deg);
}

.flip {
  cursor: pointer;

  .front {
    border-radius: 10px;
    &:hover {
      animation: bounce_top 1s infinite linear;
      @keyframes bounce_top {
        0% {
          top: 0;
        }

        20% {
          top: -5px;
        }

        50% {
          top: -10px;
        }

        70% {
          top: -5px;
        }

        100% {
          top: 0;
        }
      }
    }
  }
  &.active {
    .card {
      transform: rotateY(180deg);
    }
    .back {
      overflow: hidden;
      display: flex;
      align-items: flex-start;
      border-radius: 10px;
      border: 2px solid #66c7bb;
      img {
        width: 100% !important;
        height: auto !important;
      }
    }
  }
}

.text-guide {
  font-size: 20px;
  font-weight: 500;
  strong {
    color: #f66;
    font-size: 30px;
  }
  p {
    font-size: 16px;
    margin-bottom: 5px;
  }
}

.assetsList {
  margin-bottom: 30px;
}
</style>
