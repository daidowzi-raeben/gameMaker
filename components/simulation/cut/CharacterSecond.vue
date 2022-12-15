<template>
  <div class="setting-con setting-image">
    <div class="setting-tit">
      등장인물2
      <label class="input-check">
        <input type="checkbox" />
        <span class="check-text">흔들림</span>
      </label>
    </div>
    <div class="setting-info">인물을 선택하여 프리뷰에 등록할 수 있습니다.</div>
    <ul class="thumbnail-list">
      <li v-for="(v, i) in 20" :key="i" class="thumbnail-list--item" :class="{active : i === 0}">
        <div v-if="i === 0" class="none"></div>
        <img v-if="i !== 0" src="https://www.newsworks.co.kr/news/photo/202002/433057_327801_345.jpg" alt="" />
      </li>
    </ul>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
