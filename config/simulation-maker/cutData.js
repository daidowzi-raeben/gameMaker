
// 배경
export const cutDataBg = ((target) => {
    console.log(target.value)
    this.$emit('myLoadBgImage', target.value)
    this.tempInputData.bg[this.cutCode] = target.value
    console.log('tempInputData', this.tempInputData)
})