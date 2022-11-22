<template>
  <div class="maker-right">
    <div
      v-for="(cut, idx) in cuts"
      :ref="`cut${idx}`"
      :key="idx"
      class="cutinsert-wrap"
      @click="onClickFocus(idx)"
    >
      <div>CUT CODE : CUT {{ idx }} (컷 코드는 차후 생성 예정)</div>
      <div class="cutinsert-top">
        <label class="input-radio" @click="cut.type = cut.index + '_1'">
          <input
            type="radio"
            :name="`type${idx}`"
            :checked="`${cut.type}` === `${cut.index}_1`"
          />
          <span class="check radio"></span>
          <span class="text">일반 대사</span>
        </label>
        <label class="input-radio" @click="cut.type = cut.index + '_2'">
          <input
            type="radio"
            :name="`type${idx}`"
            :checked="`${cut.type}` === `${cut.index}_2`"
          />
          <span class="check radio"></span>
          <span class="text">객관식 선택지</span>
        </label>
        <label class="input-radio" @click="cut.type = cut.index + '_3'">
          <input
            type="radio"
            :name="`type${idx}`"
            :checked="`${cut.type}` === `${cut.index}_3`"
          />
          <span class="check radio"></span>
          <span class="text">주관식 선택지</span>
        </label>
      </div>
      <div v-if="`${cut.type}` === `${cut.index}` + '_1'" class="cutinsert-con">
        <div class="input-wrap">
          <label class="input-label">배경이미지</label>
          <div class="input-con">
            <select class="input-select" @change="onChangePreviewBg">
              <option v-for="(v, i) in tempData.bg" :key="i" :value="v.path">
                {{ v.name }}
              </option>
            </select>
          </div>
        </div>
        <div class="input-wrap">
          <label class="input-label">캐릭터이미지</label>
          <div class="input-con">
            <select class="input-select" @change="onChangePreviewCr">
              <option v-for="(v, i) in tempData.cr" :key="i" :value="v.path">
                {{ v.name }}
              </option>
            </select>
          </div>
        </div>
        <div class="input-wrap">
          <label class="input-label">캐릭터애니메이션</label>
          <div class="input-con">
            <select class="input-select">
              <option>선택</option>
              <option>선택</option>
              <option>선택</option>
            </select>
          </div>
        </div>
        <div class="input-wrap">
          <label class="input-label">사운드</label>
          <div class="input-con">
            <select class="input-select">
              <option>선택</option>
              <option>선택</option>
              <option>선택</option>
            </select>
          </div>
        </div>
        <div class="input-wrap">
          <label class="input-label">대사</label>
          <div class="input-con">
            <textarea
              class="input-textarea"
              rows="2"
              @input="onChangePreviewText"
            ></textarea>
          </div>
        </div>
      </div>
      <div v-if="`${cut.type}` === `${cut.index}` + '_2'" class="cutinsert-con">
        <div class="input-wrap">
          <label class="input-label">배경이미지</label>
          <div class="input-con">
            <select class="input-select">
              <option>선택</option>
              <option>선택</option>
              <option>선택</option>
            </select>
          </div>
        </div>
        <div class="input-wrap">
          <label class="input-label">캐릭터이미지</label>
          <div class="input-con">
            <select class="input-select">
              <option>선택</option>
              <option>선택</option>
              <option>선택</option>
            </select>
          </div>
        </div>
        <div class="input-wrap">
          <label class="input-label">캐릭터애니메이션</label>
          <div class="input-con">
            <select class="input-select">
              <option>선택</option>
              <option>선택</option>
              <option>선택</option>
            </select>
          </div>
        </div>
        <div class="input-wrap">
          <label class="input-label">사운드</label>
          <div class="input-con">
            <select class="input-select">
              <option>선택</option>
              <option>선택</option>
              <option>선택</option>
            </select>
          </div>
        </div>
        <div class="input-wrap">
          <label class="input-label">항목</label>
          <div class="input-con">
            <div class="line">
              <input type="text" class="input-text" />
            </div>
            <div class="line">
              <select class="input-select">
                <option>캐릭터선택</option>
                <option>선택</option>
                <option>선택</option>
              </select>
              <label class="input-label">호감도변화</label>
              <input type="number" class="input-number" value="0" />
            </div>
          </div>
          <div class="input-con">
            <div class="line">
              <input type="text" class="input-text" />
            </div>
            <div class="line">
              <select class="input-select">
                <option>캐릭터선택</option>
                <option>선택</option>
                <option>선택</option>
              </select>
              <label class="input-label">호감도변화</label>
              <input type="number" class="input-number" value="0" />
            </div>
          </div>
          <div class="input-con">
            <div class="line">
              <input type="text" class="input-text" />
            </div>
            <div class="line">
              <select class="input-select">
                <option>캐릭터선택</option>
                <option>선택</option>
                <option>선택</option>
              </select>
              <label class="input-label">호감도변화</label>
              <input type="number" class="input-number" value="0" />
            </div>
          </div>
        </div>
      </div>
      <div v-if="`${cut.type}` === `${cut.index}` + '_3'" class="cutinsert-con">
        <div class="input-wrap">
          <label class="input-label">배경이미지</label>
          <div class="input-con">
            <select class="input-select">
              <option>선택</option>
              <option>선택</option>
              <option>선택</option>
            </select>
          </div>
        </div>
        <div class="input-wrap">
          <label class="input-label">캐릭터이미지</label>
          <div class="input-con">
            <select class="input-select">
              <option>선택</option>
              <option>선택</option>
              <option>선택</option>
            </select>
          </div>
        </div>
        <div class="input-wrap">
          <label class="input-label">캐릭터애니메이션</label>
          <div class="input-con">
            <select class="input-select">
              <option>선택</option>
              <option>선택</option>
              <option>선택</option>
            </select>
          </div>
        </div>
        <div class="input-wrap">
          <label class="input-label">사운드</label>
          <div class="input-con">
            <select class="input-select">
              <option>선택</option>
              <option>선택</option>
              <option>선택</option>
            </select>
          </div>
        </div>
        <div class="input-wrap">
          <label class="input-label">질문</label>
          <div class="input-con">
            <input type="text" class="input-text" />
          </div>
        </div>
        <div class="input-wrap">
          <label class="input-label">답</label>
          <div class="input-con">
            <input type="text" class="input-text" />
          </div>
        </div>
        <div class="input-wrap">
          <label class="input-label">정답호감도</label>
          <div class="input-con">
            <select class="input-select">
              <option>캐릭터선택</option>
              <option>선택</option>
              <option>선택</option>
            </select>
            <input type="number" class="input-number" value="0" />
          </div>
        </div>
        <div class="input-wrap">
          <label class="input-label">오답호감도</label>
          <div class="input-con">
            <select class="input-select">
              <option>캐릭터선택</option>
              <option>선택</option>
              <option>선택</option>
            </select>
            <input type="number" class="input-number" value="0" />
          </div>
        </div>
      </div>
      <button type="button" class="btn-delete" @click="cutDelete(idx)">
        삭제
      </button>
    </div>
    <button type="button" class="btn-add" @click="onClickCutAdd()">
      + 컷 추가하기
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cutIndex: 0,
      cuts: [
        {
          index: 0,
          type: '0_1',
        },
      ],
      tempData: {
        bg: [],
        cr: [],
        text: '',
      },
    }
  },
  mounted() {
    for (let i = 1; i < 19; i++) {
      this.tempData.bg = [
        ...this.tempData.bg,
        {
          name: `이미지${i}`,
          path: `${process.env.VUE_APP_IMAGE}/bg/${i}.jpg`,
        },
      ]
      this.tempData.cr = [
        ...this.tempData.cr,
        {
          name: `이미지${i}`,
          path: `${process.env.VUE_APP_IMAGE}/cr/${i}.png`,
        },
      ]
    }
  },
  methods: {
    onClickCutAdd() {
      this.cutIndex++
      this.cuts.push({
        index: this.cutIndex,
        type: this.cutIndex + '_1',
      })
      this.$emit(
        'myLoadBgImage',
        'https://img.lovepik.com/background/20211102/medium/lovepik-banff-national-park-mobile-wallpaper-canada-background-image_400706001.jpg'
      )
      this.$emit(
        'myLoadCrImage',
        'https://cdn.pixabay.com/photo/2013/07/12/13/27/man-147091_960_720.png'
      )
      this.$emit('myLoadText', '')
      this.$emit('myLoadFocus', `CUT CODE : ${this.cutIndex}`)
      console.log(this.cutIndex)
    },
    cutDelete(idx) {
      //   this.cuts.splice(idx, 1)
      console.log(idx)
      this.$refs[`cut${idx}`][0].remove()
    },
    // 배경 전송
    onChangePreviewBg({ target }) {
      console.log(target.value)
      this.$emit('myLoadBgImage', target.value)
    },
    // 캐릭터 이미지 전송
    onChangePreviewCr({ target }) {
      console.log(target.value)
      this.$emit('myLoadCrImage', target.value)
    },
    // 대사 전송
    onChangePreviewText({ target }) {
      console.log(target.value)
      this.$emit('myLoadText', target.value)
    },
    // 컷 활성화
    onClickFocus(e) {
      console.log(e)

      // 포커스 이동 시 저장

      //   컷 코드 전송
      this.$emit('myLoadFocus', `CUT CODE : ${e}`)

      //   active border remove
      Object.entries(this.$refs).forEach((v, i) => {
        // if (v[0].includes('cut') === true) {
        this.$refs[v[0]][0].style = 'border: unset'
        // }
      })
      this.$refs[`cut${e}`][0].style = 'border:1px solid red'
    },
  },
}
</script>

<style></style>
