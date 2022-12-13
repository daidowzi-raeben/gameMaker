<template>
  <div class="maker-left">
    <ul class="scenario-list">
      <li class="scenario-list--item active">
        <span class="scenario-tit"> UI설정 </span>
        <!-- {{ scen.chapters }} -->
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
