<template>
  <div class="header type2">
    <div class="header-wrap">
      <div class="left">
        <div class="header-logo"><a href="#"></a></div>
        <button type="button" class="menu-btn">
          <i class="fa-solid fa-bars"></i>
        </button>
        <button type="button" class="close-btn">&times;</button>
        <div class="dim"></div>
        <div class="header-search">
          <input
            type="text"
            class="input"
            placeholder="프로젝트명을 검색할 수 있습니다"
          />
          <button type="button" class="search-btn"></button>
        </div>
      </div>
      <ul class="header-menu">
        <li class="header-menu--item"><nuxt-link to="">처음으로</nuxt-link></li>
        <li class="header-menu--item">
          <nuxt-link to="">Visual Novel</nuxt-link>
        </li>
        <li class="header-menu--item">
          <nuxt-link to="">Asset Store</nuxt-link>
        </li>
        <li class="header-menu--item"><nuxt-link to="">크레딧</nuxt-link></li>
      </ul>
    </div>
    <Nuxt />
    <!-- 로딩 -->
    <LoadingContent v-if="LOADING === true" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import LoadingContent from '~/components/modules/LoadingContent.vue'
export default {
  name: 'DefaultLayout',
  components: {
    LoadingContent,
  },
  computed: {
    ...mapState(['LOADING']),
  },
}
</script>

<style></style>
