<template>
  <div class="store">
    <div class="store-wrap">
      <!-- <div v-if="ASSETS_STORE.detail.detail" style="margin-top: 150px">
      에셋명 : {{ ASSETS_STORE.detail.detail.gas_name }} <br />
      설명 : {{ ASSETS_STORE.detail.detail.gas_discription }} <br />
      구분 : {{ ASSETS_STORE.detail.detail.kind }} <br />
      경로 : {{ ASSETS_STORE.detail.detail.path }} <br />
      최근업데이트 : {{ ASSETS_STORE.detail.detail.m_datetime }} <br />
      좋아요 :
      {{
        !ASSETS_STORE.detail.detail.like ? 0 : ASSETS_STORE.detail.detail.like
      }}
      <br />
    </div>
    <div>
      <div
        v-if="
          ASSETS_STORE.detail.is_assets && ASSETS_STORE.detail.is_assets.idx
        "
      >
        // 구매 후
        <button type="button" class="button btn-grey" disabled>
          구매하기안됨
        </button>
      </div>
      <div v-else>
        // 구매 전
        <button
          type="button"
          class="button btn-primary"
          @click="onClickBuyAssets"
        >
          구매하기
        </button>
        <button type="button" class="button btn-primary">장바구니</button>
      </div>
    </div> -->
      <div class="store-top">
        <div class="store-top--left">
          <div class="img-wrap">
            <img
              v-if="!previewImage"
              :src="
                onLoadAssetsImage(
                  ASSETS_STORE.detailMain.path,
                  400,
                  ASSETS_STORE.detailMain.kind
                )
              "
              alt=""
            />
            <img
              v-else
              :src="
                onLoadAssetsImage(
                  previewImage,
                  400,
                  ASSETS_STORE.detailMain.kind
                )
              "
              alt=""
            />
          </div>
          <el-scrollbar>
            <ul class="img-list">
              <li
                v-for="(v, i) in ASSETS_STORE.detail"
                :key="i"
                class="img-list--item"
              >
                <button
                  type="button"
                  class="btn"
                  :class="{ active: i === 1 }"
                  @click="onClickActivePreview(v.path)"
                >
                  <img :src="onLoadAssetsImage(v.path, 400, v.kind)" alt="" />
                </button>
              </li>
            </ul>
          </el-scrollbar>
        </div>
        <div class="store-top--right">
          <div v-if="ASSETS_STORE.detail" class="category">
            <span class="badge">판타지</span>
            <span class="badge">서양</span>
          </div>
          <div v-if="ASSETS_STORE.detail && ASSETS_STORE.detail[0]" class="tit">
            {{ ASSETS_STORE.detailMain.gas_name }}
          </div>
          <div class="price">
            <div
              v-if="
                ASSETS_STORE.detailMain.price === 'F' ||
                ASSETS_STORE.detailMain.price === '0'
              "
              class="top"
            >
              0원
            </div>
            <div v-else class="top">
              {{ ASSETS_STORE.detailMain.price | comma }}원
            </div>
            <div class="bottom">
              <span
                v-if="
                  ASSETS_STORE.detailMain.price !== 'F' &&
                  ASSETS_STORE.detailMain.price !== '0'
                "
                class="per"
              >
                {{
                  100 -
                  (ASSETS_STORE.detailMain.discount /
                    ASSETS_STORE.detailMain.price) *
                    100
                }}
                %</span
              >
              <span v-else class="per">무료</span>
              <span v-if="ASSETS_STORE.detailMain.price === 'F'" class="num"
                >0</span
              >
              <span v-else class="num">{{
                ASSETS_STORE.detailMain.discount | comma
              }}</span>
              <span class="won">원</span>
            </div>
          </div>
          <ul class="info-list">
            <li class="info-list--item">
              <label class="label">제작자</label>
              <span class="text">{{ ASSETS_STORE.detailMain.maker_name }}</span>
            </li>
            <li class="info-list--item">
              <label class="label">구성</label>
              <span class="text">
                <span v-for="(v, i) in ASSETS_STORE.detail" :key="i">
                  {{ v.gas_discription }}
                </span>
              </span>
            </li>
            <li class="info-list--item">
              <label class="label">해시태그</label>
              <div class="hash">
                <span class="text">
                  {{ ASSETS_STORE.detailMain.tag }}
                </span>
              </div>
            </li>
          </ul>
          <div class="intro">
            <label class="label">에셋 설명</label>
            <div class="text">
              {{
                ASSETS_STORE.detailMain.memo
                  ? ASSETS_STORE.detailMain.memo
                  : '작성된 설명이 없습니다.'
              }}
            </div>
          </div>
          <div class="button-wrap">
            <button
              v-if="ASSETS_STORE.is_assets && ASSETS_STORE.is_assets.idx"
              type="button"
              class="btn btn-blue"
              disabled
            >
              이미 구매된 에셋
            </button>
            <button
              v-else
              type="button"
              class="btn btn-blue"
              @click="onClickBuyAssets"
            >
              {{
                ASSETS_STORE.detailMain.price === 'F' ||
                ASSETS_STORE.detailMain.price === '0'
                  ? '추가하기'
                  : '장바구니 담기'
              }}
            </button>
            <button
              v-if="ASSETS_STORE.like && ASSETS_STORE.like.idx"
              type="button"
              class="btn like active"
              @click="onClickLikeHit"
            ></button>
            <button
              v-else
              type="button"
              class="btn like"
              @click="onClickLikeHit"
            ></button>
          </div>
        </div>
      </div>
      <div class="store-con">
        <div class="store-con--menu">
          <button type="button" class="btn active">상품정보</button>
          <button type="button" class="btn">제작자 컨텐츠</button>
          <button type="button" class="btn">관련에셋</button>
          <button type="button" class="btn">응원글</button>
          <button type="button" class="btn">추가요청</button>
        </div>
        <div class="store-con--section">
          <div class="images">
            <div
              v-for="(v, i) in ASSETS_STORE.detail"
              :key="i"
              class="img-wrap"
            >
              <img :src="onLoadAssetsImage(v.path, 400, v.kind)" alt="" />
            </div>
          </div>
        </div>
        <div class="store-con--section">제작자컨텐츠</div>
        <div class="store-con--section">관련에셋</div>
        <div class="store-con--section">
          <div class="comment">
            <div class="left">
              <div class="star">
                <strong class="num">4.1</strong>
              </div>
            </div>
            <div class="right">
              <el-rate v-model="value1"></el-rate>
              <div class="comment-write">
                <textarea class="input-textarea" rows="3"></textarea>
                <button type="button" class="btn btn-blue">작성하기</button>
              </div>
            </div>
          </div>
          <ul class="comment-list">
            <li v-for="i in 5" :key="i" class="comment-list--item">
              <div class="left">
                <div class="img-wrap">
                  <img src="" alt="" />
                </div>
                <div class="name">진진자라</div>
              </div>
              <div class="right">
                <el-rate v-model="value2" disabled></el-rate>
                <div class="text">
                  예쁜 분홍색이 머리색 얘기가 아니라 옷 얘기였구나
                </div>
                <div v-if="i === 2" class="re">
                  <div class="top">쟈몽님의 답변</div>
                  <div class="text">답변 내용입니다.</div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="store-con--section">
          <div class="guide">
            쟈몽님에게 추가 표정 및 에셋을 요청할 수 있습니다.
          </div>
          <div class="comment-write">
            <textarea class="input-textarea" rows="3"></textarea>
            <button type="button" class="btn btn-blue">작성하기</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'
export default {
  name: 'StoreDetail',
  layout: 'index',
  data() {
    return {
      preview: {
        national: '',
      },
      addImage: 4,
      files: [],
      params: {},
      value1: null,
      value2: 4,
      previewImage: '',
    }
  },
  computed: {
    ...mapState([
      'LOGIN',
      'LOADING',
      'PROJECT_MANAGER',
      'IS_POST',
      'ASSETS_STORE',
    ]),
  },
  mounted() {
    this.params.type = 'assetsDetail'
    this.params.apiKey = process.env.API_KEY
    this.params.asId = this.$route.query.asId
    this.params.user_idx = this.$cookies.get('user_idx')
    this.ACTION_AXIOS_GET(this.params)
  },
  methods: {
    // ------------------------ INIT
    ...mapActions(['ACTION_AXIOS_GET', 'ACTION_AXIOS_POST']),
    ...mapMutations(['MUTATIONS_AXIOS_POST_INIT']),
    onChangeNational({ target }) {
      console.log(target.files, URL.createObjectURL(target.files[0]))
      this.preview.national = URL.createObjectURL(target.files[0])
    },
    onChangeDel(e, key) {
      console.log(this.$refs[`addImage${key}`][0].remove())
    },
    onClickBuyAssets() {
      if (
        this.$cookies.get('user_idx') ===
        'ef2d127de37b942baad06145e54b0c619a1f22327b2ebbcfbec78f5564afe39d'
      ) {
        if (confirm('관리자용 에셋을 추가하시겠습니까?')) {
          this.params.type = 'assetsBuy'
          this.params.apiKey = process.env.API_KEY
          this.params.asId = this.$route.query.asId
          this.params.user_idx = this.$cookies.get('user_idx')
          this.ACTION_AXIOS_GET(this.params)
          return
        }
      }
      if (!this.$cookies.get('user_idx')) {
        return alert('로그인 후 이용 가능합니다')
      }
      if (
        this.ASSETS_STORE.detailMain.price === 'F' ||
        this.ASSETS_STORE.detailMain.price === '0'
      ) {
        if (confirm('무료에셋을 추가하시겠습니까?')) {
          this.params.type = 'assetsBuy'
          this.params.apiKey = process.env.API_KEY
          this.params.asId = this.$route.query.asId
          this.params.user_idx = this.$cookies.get('user_idx')
          this.ACTION_AXIOS_GET(this.params)
        }
      } else {
        return alert('정식오픈 후 구매가 가능합니다')
      }
      // if (confirm('장바구니에 추가 하시겠습니까?')) {
      //   return
      //   // this.params.type = 'assetsBuy'
      //   // this.params.apiKey = process.env.API_KEY
      //   // this.params.asId = this.$route.query.asId
      //   // this.params.user_idx = this.$cookies.get('user_idx')
      //   // this.ACTION_AXIOS_GET(this.params)
      // }
    },
    onLoadAssetsImage(v, size, mode) {
      if (mode === 'C') {
        return `${process.env.VUE_APP_IMAGE}/cr/${size}/${v}`
      } else {
        return `${process.env.VUE_APP_IMAGE}/bg/${size}/${v}`
      }
    },
    onClickActivePreview(v) {
      this.previewImage = v
    },
    onClickLikeHit() {
      if (!this.$cookies.get('user_idx')) {
        return alert('로그인 후 이용 가능합니다')
      }
      this.params.type = 'assetsLikeHit'
      this.params.apiKey = process.env.API_KEY
      this.params.asId = this.$route.query.asId
      this.params.user_idx = this.$cookies.get('user_idx')
      this.ACTION_AXIOS_GET(this.params)
    },
  },
}
</script>

<style></style>
