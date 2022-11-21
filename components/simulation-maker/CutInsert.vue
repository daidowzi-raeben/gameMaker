<template>
  <div class="maker-right">
    <div v-for="(cut, idx) in cuts" :key="idx" class="cutinsert-wrap" >
      <div class="cutinsert-top">
        <label class="input-radio" @click="cut.type=cut.index+'_1'">
          <input type="radio" :name="`type${idx}`" :checked="`${cut.type}`==`${cut.index}`+'_1'" />
          <span class="check radio"></span>
          <span class="text">일반 대사</span>
        </label>
        <label class="input-radio" @click="cut.type=cut.index+'_2'">
          <input type="radio" :name="`type${idx}`" :checked="`${cut.type}`==`${cut.index}`+'_2'" />
          <span class="check radio"></span>
          <span class="text">객관식 선택지</span>
        </label>
        <label class="input-radio" @click="cut.type=cut.index+'_3'">
          <input type="radio" :name="`type${idx}`" :checked="`${cut.type}`==`${cut.index}`+'_3'" />
          <span class="check radio"></span>
          <span class="text">주관식 선택지</span>
        </label>
      </div>
      <div v-if="`${cut.type}`==`${cut.index}`+'_1'" class="cutinsert-con">
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
          <label class="input-label">대사</label>
          <div class="input-con">
            <textarea class="input-textarea" rows="2"></textarea>
          </div>
        </div>
      </div>
      <div v-if="`${cut.type}`==`${cut.index}`+'_2'" class="cutinsert-con">
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
      <div v-if="`${cut.type}`==`${cut.index}`+'_3'" class="cutinsert-con">
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
      <button type="button" class="btn-delete" @click="cutDelete(idx)">삭제</button>
    </div>
    <button type="button" class="btn-add" @click="cutAdd()">+ 컷 추가하기</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cutIndex: 0,
      cuts: [{
            index: 0,
            type: '0_1',
        },
      ],
    }
  },
  methods: {
    cutAdd(){
      this.cutIndex++
      this.cuts.push({
        index: this.cutIndex,
        type: this.cutIndex + '_1'
      });
    },
    cutDelete(idx){
      this.cuts.splice(idx, 1);
    },
  },
}
</script>

<style></style>
