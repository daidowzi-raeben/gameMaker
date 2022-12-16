<template>
  <div class="maker-left">
    <ul class="scenario-list">
      <li class="scenario-list--item active">
        <span class="scenario-tit"> 에셋관리 </span>
        <!-- {{ scen.chapters }} -->
        <ul class="asset-list">
          <li class="asset-list--item">
            <span class="tit">인물</span>
            <span class="num">5</span>
          </li>
          <li class="asset-list--item">
            <span class="tit">배경</span>
            <span class="num">15</span>
          </li>
          <li class="asset-list--item">
            <span class="tit">사운드</span>
            <span class="num">1,000</span>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
input[name='chapterTitle'] {
  display: none;
  + span {
    color: #fff;
  }
  &:checked {
    + span {
      color: #efdc2c;
    }
  }
}
</style>
