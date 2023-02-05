<template>
  <div>
    에셋 이름 : <input v-model="params.mainName" /> <br /><br />
    에셋 설명 : <input v-model="params.gas_discription" /> <br /><br />
    <input
      id="soundFile"
      type="file"
      @change="onChangeSoundUpload"
    /><br /><br />
    <button type="button" @click="onSubmit">업로드</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      params: {
        user_idx: 5,
        mainName: '',
      },
    }
  },
  methods: {
    onChangeSoundUpload({ target }) {
      //   console.log(target.files[0].)
    },
    onSubmit() {
      const soundFile = document.getElementById('soundFile').files[0]
      const frm = new FormData()
      //   console.log(Object.entries(this.$refs))
      frm.append('apiKey', process.env.API_KEY)
      frm.append('user_idx', this.params.user_idx)
      frm.append('gas_name', this.params.mainName)
      frm.append('gas_discription', this.params.gas_discription)
      frm.append(`fileName`, soundFile)
      frm.append(`type`, 'sound')

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

<style>
</style>
