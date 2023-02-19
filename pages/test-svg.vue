<template>
  <div>
    <div class="svg-button">
      <svg id="img">
        <svg width="200" height="60">
          <rect
            width="180"
            height="46"
            x="0"
            y="0"
            rx="10"
            stroke-width="0"
            fill="rgba(255, 200, 35, 1)"
            stroke="rgba(251, 251, 251, 1)"
          ></rect>
          <text
            text-anchor="middle"
            alignment-baseline="middle"
            transform="translate(100, 35)"
            font-size="16px"
            class="font-nanumNeo"
          >
            시작하기
          </text>
        </svg>
        <svg>
          <defs>
            <mask id="Mask">
              <rect width="100%" height="100%" fill="white"></rect>
              <rect
                x="-5"
                y="-5"
                width="185"
                height="51"
                fill="black"
                rx="10"
              ></rect>
            </mask>
          </defs>
          <rect
            width="180"
            height="46"
            x="5"
            y="5"
            rx="10"
            mask="url(#Mask)"
            fill="red"
          ></rect>
        </svg>
      </svg>
    </div>
    <div style="margin-top: 100px" @click="download">다운</div>
  </div>
</template>

<script>
export default {
  methods: {
    download() {
      const svg = document.getElementById('img')

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

<style>
</style>