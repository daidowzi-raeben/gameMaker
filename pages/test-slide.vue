<template>
  <swiper :options="swiperOption">
    <swiper-slide v-for="(v, i) in temp" :key="i">
      {{ v.a }}
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
    <div class="swiper-button-prev" slot="button-prev"></div>
    <div class="swiper-button-next" slot="button-next"></div>
  </swiper>
</template>

<script>
export default {
  data() {
    return {
      swiperOption: {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      },
      temp: [{ a: 1 }, { a: 2 }, { a: 3 }, { a: 4 }],
    }
  },
}
</script>

<style></style>
