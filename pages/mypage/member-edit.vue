<template>
  <div class="mypage-wrap store">
    <div class="tab">
      <div class="tab-list">
        <button
          type="button"
          class="tab-list--btn"
          :class="{ active: activeTab === 0 }"
          @click="activeTab = 0"
        >
          이용약관
        </button>
        <button
          type="button"
          class="tab-list--btn"
          :class="{ active: activeTab === 1 }"
          @click="activeTab = 1"
        >
          개인정보
        </button>
      </div>
      <div class="tab-con el-scrollbar">
        <div
          v-show="activeTab === 0"
          class="detail el-scrollbar__wrap el-scrollbar__wrap--hidden-default"
        >
          <p>111서비스 이용약관</p>
        </div>
        <div
          v-show="activeTab === 1"
          class="detail el-scrollbar__wrap el-scrollbar__wrap--hidden-default"
          style="display: none;"
        >
          <div class="tui-editor-contents">
            <p>222개인정보처리방침</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'index',
  data() {
    return {
      activeTab: 0,
    }
  },
}
</script>

<style lang="scss"></style>
