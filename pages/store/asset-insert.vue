<template>
  <div>
    <form @submit.prevent="onSubmit">
      <div>
        <div>에셋 이름 : <input v-model="params.mainName" /></div>
        대표_2000 :
        <input ref="national_2000" type="file" @change="onChangeNational" />
        대표_1200 :
        <input ref="national_1200" type="file" />
        대표_800 :
        <input ref="national_800" type="file" />
        대표_400 :
        <input ref="national_400" type="file" />
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
          <input
            :ref="`subName${key}`"
            type="text"
            :readonly="i < 4 ? true : false"
            :value="onValue(i)"
          /><br />
          업로드_2000 :
          <input :ref="`files_2000${key}`" type="file" />
          업로드_1200 :
          <input :ref="`files_1200${key}`" type="file" />
          업로드_800 :
          <input :ref="`files_800${key}`" type="file" />
          업로드_400 :
          <input :ref="`files_400${key}`" type="file" />
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
import { kooLogin } from '~/config/util'
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
      },
      imgUrl: '',
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
      if (e === 1) return '웃는'
      if (e === 2) return '화내는'
      if (e === 3) return '슬픈'
      if (e === 4) return '당황'
    },
    onSubmit() {
      // URL.createObjectURL(target.files[0])
      const frm = new FormData()
      this.files = [...this.files, this.$refs]
      //   console.log(Object.entries(this.$refs))
      frm.append('apiKey', process.env.API_KEY)
      frm.append('user_idx', kooLogin('user_idx'))
      frm.append('gas_name', this.params.mainName)

      frm.append('national_2000', this.$refs.national_2000.files[0])
      frm.append('national_1200', this.$refs.national_1200.files[0])
      frm.append('national_800', this.$refs.national_800.files[0])
      frm.append('national_400', this.$refs.national_400.files[0])

      Object.entries(this.$refs).forEach((e, i) => {
        if (e[0].includes('files_2000') === true && e[1][0].files.length > 0) {
          console.log(e, i, `subFiles_2000[${i}]`, e[0], e[1][0].files[0])
          frm.append(`subFiles_2000[]`, e[1][0].files[0])
        }
        if (e[0].includes('files_1200') === true && e[1][0].files.length > 0) {
          console.log(e, i, `subFiles_1200[${i}]`, e[0], e[1][0].files[0])
          frm.append(`subFiles_1200[]`, e[1][0].files[0])
        }
        if (e[0].includes('files_800') === true && e[1][0].files.length > 0) {
          console.log(e, i, `subFiles_800[${i}]`, e[0], e[1][0].files[0])
          frm.append(`subFiles_800[]`, e[1][0].files[0])
        }
        if (e[0].includes('files_400') === true && e[1][0].files.length > 0) {
          console.log(e, i, `subFiles_400[${i}]`, e[0], e[1][0].files[0])
          frm.append(`subFiles_400[]`, e[1][0].files[0])
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
