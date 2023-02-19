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
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  // layout: 'index',
  data() {
    return {
      img: '',
    }
  },
  mounted() {
    // console.log(this.getDataUrl(this.img))
    console.log(this.test())
  },
  methods: {
    change({ coordinates, canvas }) {
      console.log(coordinates, canvas)
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