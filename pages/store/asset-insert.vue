<template>
  <div>
    <form @submit.prevent="onSubmit">
      <div>
        <div>
          <select v-model="params.user_idx" class="input-select">
            <option :value="5">쿠쿠쿠쿠쿠</option>
            <option v-for="(item, i) in selectName" :key="i" :value="i + 31">
              {{ item }}
            </option>
          </select>
          <select
            v-model="params.mode"
            class="input-select"
            @change="onChangeModa"
          >
            <option :value="'C'">인물</option>
            <option :value="'B'">배경</option>
          </select>
          <br />
          <br />
        </div>
        <div>가격 : <input v-model="params.price" /></div>
        <div>할인판매가격 : <input v-model="params.discount" /></div>
        <div>에셋 이름 : <input v-model="params.mainName" /></div>
        <div>에셋 표정 : <input v-model="params.mainDis" /></div>
        <div>
          에셋 설명 :<br />
          <textarea
            v-model="params.memo"
            style="height: 150px; border: 1px solid #000; width: 500px"
          ></textarea>
        </div>
        <div>에셋 태그 : <input v-model="params.tag" /></div>
        대표_2000 :
        <input ref="national_2000" type="file" @change="onChangeNational" />
        <br />
        <br />

        <div>
          preview
          <img
            v-if="preview.national"
            :src="preview.national"
            style="width: 50px"
          />
        </div>
        <br />
        <br />
      </div>
      <button type="button" @click="addImage++">ADD</button>
      <div v-for="(i, key) in addImage" :key="i">
        <div :ref="`addImage${key}`">
          이름 :
          <input :ref="`subName${key}`" type="text" :value="onValue(i)" /><br />
          <!-- :readonly="i < 4 ? true : false" -->
          업로드_2000 :
          <input :ref="`files_2000${key}`" type="file" />
          <button v-if="i > 4" @click="onChangeDel($event, key)">삭제</button>
          <br />
          <br />
          <br />
        </div>
      </div>
      <div>
        <button @submit.prevent="onSubmit">전송</button>
      </div>
    </form>
    <img id="preview" src="" />
    <img id="thumbnail" src="" />
    <canvas id="canvas"></canvas>
  </div>
</template>

<script>
import { createNamespacedHelpers, mapGetters } from 'vuex'
// import { kooLogin } from '~/config/util'
// import makerLayoutVue from '~/layouts/maker-layout.vue'
const commonHelpers = createNamespacedHelpers('assetsStore')
export default {
  layout: 'default-index',
  data() {
    return {
      preview: {
        national: '',
      },
      addImage: 3,
      files: [],
      lodingGetter: false,
      params: {
        mainName: '',
        subName: [],
        user_idx: 31,
        discount: 0,
        mode: 'C',
        memo: '',
        tag: '',
        mainDis: '무표정',
      },
      imgUrl: '',
      // 32 53
      selectName: [
        '푸슬',
        '팡',
        '유령선',
        '노넴',
        '물개말이',
        '킨',
        '북극산꽁치',
        'BUT/비유티',
        '예제',
        '신아',
        '말랑',
        '쟈몽',
        'Bbreaad',
        '김자반',
        '몰라',
        '진진자라',
        '이자기',
        '꽃깔콘',
        '모차',
        '웅녀',
        '성은이는 만극하지 않아요',
        '한결',
      ],
    }
  },
  computed: {
    ...mapGetters(['GETTER_LOADING_INIT']),
    ...commonHelpers.mapState(['CS_CUS_SEARCH_DATA']),
  },
  mounted() {
    this.lodingGetter = this.GETTER_LOADING_INIT
  },
  methods: {
    onChangeNational({ target }) {
      console.log(target.files, URL.createObjectURL(target.files[0]))
      this.preview.national = URL.createObjectURL(target.files[0])
    },
    onChangeDel(e, key) {
      console.log(this.$refs[`addImage${key}`][0].remove())
    },
    onValue(e) {
      if (e === 1) return '웃는표정'
      if (e === 2) return '화난표정'
      if (e === 3) return '슬픈표정'
    },
    onChangeModa({ target }) {
      if (target.value === 'C') this.params.mainDis = '무표정'
      if (target.value === 'B') this.params.mainDis = ''
    },
    onSubmit() {
      // URL.createObjectURL(target.files[0])
      const frm = new FormData()
      this.files = [...this.files, this.$refs]
      //   console.log(Object.entries(this.$refs))
      frm.append('apiKey', process.env.API_KEY)
      frm.append('user_idx', this.params.user_idx)
      frm.append('gas_name', this.params.mainName)
      frm.append('price', this.params.price)
      frm.append('memo', this.params.memo)
      frm.append('tag', this.params.tag)
      frm.append('mode', this.params.mode)
      frm.append('discount', this.params.discount)
      frm.append('mainDis', this.params.mainDis)

      frm.append('national_2000', this.$refs.national_2000.files[0])

      Object.entries(this.$refs).forEach((e, i) => {
        if (e[0].includes('files_2000') === true && e[1][0].files.length > 0) {
          console.log(e, i, `subFiles_2000[${i}]`, e[0], e[1][0].files[0])
          frm.append(`subFiles_2000[]`, e[1][0].files[0])
        }
      })

      Object.entries(this.$refs).forEach((e, i) => {
        if (e[0].includes('subName') === true && e[1][0].value) {
          console.log(e, i, e[1][0].value)
          frm.append(`subName[]`, e[1][0].value)
        }
      })
      this.$axios
        .post(process.env.VUE_APP_ASSETS_API, frm, {
          header: {
            'Context-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          console.log(res)
          alert('완료')
        })
        .catch((res) => {
          console.log('AXIOS FALSE', res)
        })
    },
  },
}
</script>

<style scoped>
input {
  border: 1px solid #000;
}
</style>
