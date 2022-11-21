<template>
  <div style="padding: 50px">
    <div>{{ files }}</div>
    <div v-if="!files.length">
      <div>
        <label for="file">일반 사진 등록 </label>
        <input
          id="file"
          ref="files"
          type="file"
          multiple
          @change="imageUpload"
        />
      </div>
    </div>
    <div v-else>
      <div class="">
        <div>
          <label for="file">추가 사진 등록</label>
          <input
            id="file"
            ref="files"
            type="file"
            multiple
            @change="imageAddUpload"
          />
        </div>
      </div>
      <div v-for="(file, index) in files" :key="index">
        <div :name="file.number" @click="fileDeleteButton">x</div>
        <img :src="file.preview" style="width: 100px" />
      </div>
    </div>
    <div>
      <button @click="onClickUpload">전송</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'
export default {
  //   layout: 'index',
  data() {
    return {
      params: {},
      files: [], // 업로드용 파일
      filesPreview: [],
      uploadImageIndex: 0, //  이미지 업로드를 위한 변수
    }
  },
  computed: {
    ...mapState(['LOGIN', 'LOADING', 'IS_POST']),
  },
  mounted() {
    this.params.type = 'assetInsert'
    this.params.apiKey = process.env.API_KEY
    // this.ACTION_AXIOS_GET()
  },
  methods: {
    ...mapActions(['ACTION_AXIOS_GET', 'ACTION_AXIOS_POST']),
    ...mapMutations(['']),
    async onClickUpload() {
      const frm = new FormData()
      frm.append('type', 'assetInsert')
      frm.append('user_id', 'asd')
      this.files.forEach((e, i) => {
        console.log(e.file)
        frm.append(`files[${i}]`, e.file)
      })
      this.ACTION_AXIOS_POST(frm)
      await console.log(this.IS_POST)
    },
    imageUpload() {
      console.log('imageUpload', this.$refs.files.files)

      //  this.files = [...this.files, this.$refs.files.files];
      // 하나의 배열로 넣기
      let num = -1
      for (let i = 0; i < this.$refs.files.files.length; i++) {
        this.files = [
          ...this.files,
          // 이미지 업로드
          {
            // 실제 파일
            file: this.$refs.files.files[i],
            // 이미지 프리뷰
            preview: URL.createObjectURL(this.$refs.files.files[i]),
            // 삭제및 관리를 위한 number
            number: i,
          },
        ]
        num = i
        // 이미지 업로드용 프리뷰
        //  this.filesPreview = [
        //    ...this.filesPreview,
        //    { file: URL.createObjectURL(this.$refs.files.files[i]), number: i }
        //  ];
      }
      this.uploadImageIndex = num + 1 // 이미지 index의 마지막 값 + 1 저장
      console.log(this.files)
      //  console.log(this.filesPreview);
    },

    imageAddUpload() {
      console.log(this.$refs.files.files)

      //  this.files = [...this.files, this.$refs.files.files];
      // 하나의 배열로 넣기c
      let num = -1
      for (let i = 0; i < this.$refs.files.files.length; i++) {
        console.log(this.uploadImageIndex)
        this.files = [
          ...this.files,
          // 이미지 업로드
          {
            // 실제 파일
            file: this.$refs.files.files[i],
            // 이미지 프리뷰
            preview: URL.createObjectURL(this.$refs.files.files[i]),
            // 삭제및 관리를 위한 number
            number: i + this.uploadImageIndex,
          },
        ]
        num = i
      }
      this.uploadImageIndex = this.uploadImageIndex + num + 1

      console.log(this.files)
      //  console.log(this.filesPreview);
    },
    fileDeleteButton(e) {
      const name = e.target.getAttribute('name')
      this.files = this.files.filter((data) => data.number !== Number(name))
      console.log(this.files)
    },
  },
}
</script>

<style></style>
