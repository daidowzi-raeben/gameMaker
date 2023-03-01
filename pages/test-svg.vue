<template>
  <div>
    <div class="svg-button">
      <svg id="img" width="100%" height="150">
        <rect
          width="90%"
          height="120"
          x="10"
          y="10"
          fill="rgba(255, 255, 255, 0.86)"
          rx="10"
          stroke="rgba(255, 255, 255, 0.5)"
          stroke-width="0"
        ></rect>
        <defs>
          <mask id="Mask3">
            <rect width="100%" height="100%" fill="white"></rect>
            <rect
              x="0"
              y="0"
              width="calc(90% + 10px)"
              height="130"
              fill="black"
              rx="10"
            ></rect>
          </mask>
        </defs>
        <rect
          width="90%"
          height="120"
          x="14"
          y="14"
          fill="rgba(16, 16, 16, 0.3)"
          rx="10"
          mask="url(#Mask3)"
        ></rect>
      </svg>
    </div>
    <div style="margin-top: 100px" @click="download">다운</div>
  </div>
</template>

<script>
export default {
  methods: {
    download() {
      const svg = document.querySelector('#img')

      const svgData = new XMLSerializer().serializeToString(svg)

      const canvas = document.createElement('canvas')

      const svgSize = svg.getBoundingClientRect()

      canvas.width = svgSize.width

      canvas.height = svgSize.height

      const ctx = canvas.getContext('2d')

      const img = document.createElement('img')

      img.setAttribute(
        'src',
        'data:image/svg+xml;base64,' +
          btoa(unescape(encodeURIComponent(svgData)))
      )
      console.log(img)

      img.onload = (e) => {
        // svg 그려주기
        ctx.drawImage(e.target, 0, 0)

        // 다운로드
        const $link = document.createElement('a')

        $link.download = 'image.png'
        $link.href = canvas.toDataURL('image/png')

        $link.click()
      }
    },
  },
}
</script>

<style></style>
