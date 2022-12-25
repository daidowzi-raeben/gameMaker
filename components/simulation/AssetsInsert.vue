<template>
  <div class="insert">
    <div class="setting">
      <div>배경 / 인물 / 사운드</div>
      <div>
        <div>LIST</div>
      </div>
      <button type="button">모달열기</button>
    </div>
    <AssetsLocalUpload />
  </div>
</template>

<script>
import AssetsLocalUpload from '~/components/modal/AssetsLocalUpload'
export default {
  components: {
    AssetsLocalUpload,
  },
  data() {
    return {}
  },
}
</script>

<style></style>
