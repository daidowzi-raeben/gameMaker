<template>
  <div class="insert">
    <div class="setting">
      <ImageController />
      <!-- <div class="setting-copy">
        <div class="setting-tit">버튼설정</div>
        <div class="d-flex">
          <div>
            <span>인물소개</span>
            <select class="input-select">
              <option>사용</option>
            </select>
          </div>
          <div>
            <span>asd</span>
            <select class="input-select">
              <option>TOP</option>
            </select>
          </div>
        </div>
      </div> -->
      <div class="setting-copy">
        <div class="setting-tit">저작권 설정</div>
        <input
          type="text"
          placeholder="2022 (C) 프로젝트이름"
          class="input-text"
        />
      </div>
      <div class="setting-logo">
        <div class="setting-tit">로고 등록</div>
        <div class="input-wrap">
          <select class="input-select">
            <option>TOP</option>
          </select>
          <input
            type="text"
            class="input-text"
            :value="fileInsertName"
            readonly
          />
          <label class="input-file">
            <input ref="logoFile" type="file" @change="onChangeFileInput" />
            <span v-if="isFileInsert === false" class="btn">이미지 등록</span>
          </label>
          <span
            v-if="isFileInsert === true"
            class="btn delete"
            @click="onClickFileDelete"
            >이미지 삭제</span
          >
        </div>
      </div>
      <div class="text-center">
        <button style="font-size: 20px" @click="onSubmit">저장</button>
      </div>
    </div>
    <div class="right" :class="{ fold: rightContentShow === true }">
      <button
        type="button"
        class="btn-fold"
        :class="{ active: rightContentShow === true }"
        @click="onClickRightContentShow()"
      ></button>
    </div>
  </div>
</template>

<script>
import ImageController from './ImageController.vue'
export default {
  components: {
    ImageController,
  },
  data() {
    return {
      rightContentShow: false,
      isFileInsert: false,
      fileInsertName: '',
      intro: {},
    }
  },
  methods: {
    onClickRightContentShow() {
      this.rightContentShow = !this.rightContentShow
    },
    onChangeFileInput(e) {
      this.isFileInsert = true
      this.fileInsertName = e.target.files[0].name
    },
    onClickFileDelete() {
      this.isFileInsert = false
      this.fileInsertName = ''
      this.$refs.logoFile.value = ''
    },
    onSubmit() {
      //      const frm = new FormData()
      //   frm.append('type', 'projectInsert')
      //   frm.append('title', e.title)
      //   frm.append('discription', e.discription)
      //   frm.append('user_idx', this.$cookies.get('user_idx'))
      //   frm.append('apiKey', process.env.API_KEY)
      //   this.ACTION_AXIOS_POST(frm, 'projectInsert')
    },
  },
}
</script>

<style></style>
