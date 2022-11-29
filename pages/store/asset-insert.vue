<template>
  <div>
    <div>
      대표 :
      <input ref="national" type="file" @change="onChangeNational" />
      <div>
        preview
        <img
          v-if="preview.national"
          :src="preview.national"
          style="width: 50px"
        />
      </div>
    </div>
    <button @click="addImage++">ADD</button>
    <div v-for="(i, key) in addImage" :key="i">
      <div :ref="`addImage${key}`">
        이름 : <input type="text" /> 업로드 :
        <input :ref="`files${key}`" type="file" />
        <button @click="onChangeDel($event, key)">삭제</button>
      </div>
    </div>
    <div>
      <button @click="onSubmit">전송</button>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'default-index',
  data() {
    return {
      preview: {
        national: '',
      },
      addImage: 4,
      files: [],
    }
  },
  methods: {
    onChangeNational({ target }) {
      console.log(target.files, URL.createObjectURL(target.files[0]))
      this.preview.national = URL.createObjectURL(target.files[0])
    },
    onChangeDel(e, key) {
      console.log(this.$refs[`addImage${key}`][0].remove())
    },
    onSubmit() {
      this.files = [...this.files, this.$refs]
      //   console.log(Object.entries(this.$refs))
      Object.entries(this.$refs).forEach((e, i) => {
        if (e[0].includes('files') === true && e[1][0].files.length > 0) {
          console.log(e[0], e[1][0].files)
        }
      })
      //    str.includes('Hello')
    },
  },
}
</script>

<style></style>
