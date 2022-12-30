<template>
  <div>
    <div ref="content">
      <div
        v-for="item in 5"
        :key="item"
        style="height: 500px; background: #eee; margin-bottom: 20px"
      ></div>
    </div>
    <div ref="gnb" style="position: fixed; right: 0; top: 0; background: #000">
      <p v-for="item in 5" :key="item" style="color: #fff">asd</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EXScroll',
  unmounted() {
    document.removeEventListener('scroll', this.scrollHandler)
  },
  mounted() {
    console.log(this.$refs.gnb.children)
    document.addEventListener('scroll', this.scrollHandler)
  },
  methods: {
    scrollHandler() {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
      const scrollTo = window.scrollY
      const gnbList = this.$refs.gnb.children
      const contentList = this.$refs.content.children
      for (let i = 0; i < contentList.length; i++) {
        if (
          contentList[i].offsetTop <= scrollTo &&
          contentList[i].offsetTop + contentList[i].clientHeight >= scrollTo
        ) {
          gnbList[i].classList.add('class')
        } else {
          gnbList[i].classList.remove('class')
        }
      }
    },
  },
}
</script>

<style>
.class {
  background: red !important;
}
</style>
