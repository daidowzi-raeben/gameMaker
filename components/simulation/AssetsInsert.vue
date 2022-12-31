<template>
  <div class="insert">
    <div class="setting">
      <button type="button" class="button md btn-primary right-top" @click="popsModalVisible = true">에셋 불러오기</button>
      <div class="setting-con setting-image">
        <div class="setting-tit">배경화면</div>
        <div class="setting-info">
          나만의 에셋을 등록할 수 있습니다.
        </div>
        <el-scrollbar class="thumbnail-list--wrap">
          <ul class="thumbnail-list asset">
            <li class="thumbnail-list--item upload">
              <label class="label">
                <input type="file" />
              </label>
            </li>
            <li
              v-for="(v, i) in 10"
              :key="i"
              class="thumbnail-list--item background"
            >
              <img src="https://lwi.nexon.com/maplestory/mobile/29E0ECE19C0FD827/media/thumb_03.jpg" alt="" />
              <div class="btn-wrap">
                <button type="button" class="btn">삭제하기</button>
                <button v-if="i===1" type="button" class="btn">미리듣기</button>
              </div>

            </li>
          </ul>
        </el-scrollbar>
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
    <el-dialog title="" :visible.sync="popsModalVisible">
      <AssetsLocalUpload />
    </el-dialog>
  </div>
</template>

<script>
import AssetsLocalUpload from '~/components/modal/AssetsLocalUpload'
export default {
  components: {
    AssetsLocalUpload,
  },
  data() {
    return {
      popsModalVisible: false,
      rightContentShow: false,
    }
  },
  methods: {
    onClickRightContentShow() {
      this.rightContentShow = !this.rightContentShow
    },
  },
}
</script>

<style></style>
