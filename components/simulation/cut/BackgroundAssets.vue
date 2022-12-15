<template>
  <div class="setting-con setting-image">
    <div class="setting-tit">
      배경화면
    </div>
    <div class="setting-info">설명</div>
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
