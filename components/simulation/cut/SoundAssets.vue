<template>
  <div class="setting-con setting-image">
    <div class="setting-tit">
      사운드
    </div>
    <div class="setting-info">설명</div>
    <ul class="thumbnail-list">
      <li v-for="(v, i) in 20" :key="i" class="thumbnail-list--item" :class="{active : i === 0}">
        <div v-if="i === 0" class="none"></div>
        <div v-if="i !== 0" class="sound">
          <span class="name">웃음소리</span>
          <button type="button" class="btn">미리듣기</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
