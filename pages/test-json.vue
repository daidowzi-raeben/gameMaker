<template>
  <div>
    <cropper
      class="cropper"
      :src="img"
      :stencil-props="{
        aspectRatio: 10 / 10,
      }"
      @change="change"
    ></cropper>
    <div style="width: 640px; height: 640px; background: red">
      <img :src="image" width="100%" />
    </div>
    {{ coordinates }}
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  // layout: 'index',
  data() {
    return {
      img: '',
      coordinates: {
        width: 0,
        height: 0,
        left: 0,
        top: 0,
      },
    }
  },
  mounted() {
    // console.log(this.getDataUrl(this.img))
    console.log(this.test())
  },
  methods: {
    change({ coordinates, canvas }) {
      this.coordinates = coordinates
      // You able to do different manipulations at a canvas
      // but there we just get a cropped image, that can be used
      // as src for <img/> to preview result
      this.image = canvas.toDataURL()
      console.log(this.image)
    },
    test() {
      fetch('http://api.school-os.net/game/assets.php?type=assetsImage')
        .then((response) => response.text())
        .then((text) => {
          console.log('========', text)
          this.img = text
        })
    },
  },
}
</script>

<style>
.cropper {
  height: 600px;
  background: #ddd;
}
</style>
