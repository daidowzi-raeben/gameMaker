<template>
  <div class="maker-left">
    <ul class="scenario-list">
      <li class="scenario-list--item active">
        <span class="scenario-tit"> 에셋관리 </span>
        <!-- {{ scen.chapters }} -->
        <ul class="asset-list">
          <li class="asset-list--item">
            <span class="tit">인물</span>
            <span class="num">
              {{ ASSETS.cr ? ASSETS.cr.length : 0 }}
            </span>
          </li>
          <li class="asset-list--item">
            <span class="tit">배경</span>
            <span class="num">{{ ASSETS.bg ? ASSETS.bg.length : 0 }}</span>
          </li>
          <li class="asset-list--item">
            <span class="tit">사운드</span>
            <span class="num">{{ ASSETS.sr ? ASSETS.sr.length : 0 }}</span>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['ASSETS']),
  },
}
</script>

<style lang="scss"></style>
