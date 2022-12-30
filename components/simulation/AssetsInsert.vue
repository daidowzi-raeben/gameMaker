<template>
  <div class="insert">
    <div class="setting">
      <div>배경 / 인물 / 사운드</div>
      <div>
        <div>LIST</div>
      </div>
      <button type="button" @click="popsModalVisible = true">모달열기</button>
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
    }
  },
  methods: {},
}
</script>

<style></style>
