<template>
  <div>
    <div class="radio-wrap mt-0">
      <label class="input-radio">
        <input
          type="radio"
          name="asset"
          checked
          @change="onChangeAssetType"
        />
        <span class="check radio"></span>
        <span class="text">구매한 에셋 불러오기</span>
      </label>
      <label class="input-radio">
        <input
          type="radio"
          name="asset"
          @change="onChangeAssetType"
        />
        <span class="check radio"></span>
        <span class="text">에셋 직접 등록하기</span>
      </label>
    </div>
    <div v-show="!isAssetDirect">
      <el-scrollbar>
        <div class="thumbnail-list--wrap type4">
          <ul class="thumbnail-list">
            <li
              v-for="(v, i) in 30"
              :key="i"
              class="thumbnail-list--item"
            >
              <label class="thumbnail-check">
                <input type="checkbox" />
                <span class="box"></span>
                <span class="text">웃음소리</span>
              </label>
              <div class="btn-wrap">
                <button type="button" class="btn">
                  미리듣기
                </button>
              </div>
            </li>
          </ul>
        </div>
      </el-scrollbar>
    </div>
    <div v-show="isAssetDirect" class="upload-wrap type2">
      <div class="upload-set">
        <div class="tit">마이 에셋 업로드</div>
        <label class="label">에셋 제목</label>
        <input
          type="text"
          class="input-text"
          required
        />
        <label class="label">파일 업로드</label>
        <div class="input-wrap">
          <input type="text" readonly="readonly" class="input-text">
          <label class="input-file">
            <input id="logoFile" type="file"> <span class="btn">파일 업로드</span>
          </label>
        </div>
        <div class="sub-tit">주의사항</div>
        <el-scrollbar class="scroll">
          <p>
            저작권자의 명시적 동의없이 타인의 저작물의 전부 또는 일부를 복제 ·
            배포 · 전송 등의 방법으로 이용하는 것은 저작권자의 권리를 침해하는
            행위임으로 복제 · 배포 · 전송 등의 방법으로 타인의 저작권을
            침해하는 게시물을 홈페이지에 게재 또는 등록하여서는 아니됩니다.
            타인의 저작물을 인용한 게시물인 경우 그 인용부분이 회원 개인의
            의견을 뒷받침하기 위해 일부 인용된 것이 아니라 게시물의 핵심적인
            부분을 구성하고 있다면 출처를 밝히더라도 저작권 침해에 해당됨으로
            저작권자의 명시적 동의없이 이러한 게시물을 홈페이지에 게재 또는
            등록하여서는 아니됩니다. 홈페이지에 게재 또는 등록된 회원의
            게시물을 제3자가 사용하고자 할 경우에는 반드시 해당회원의 명시적
            동의를 얻은 뒤 사용하여야 합니다. 회원이 서비스 이용과정에서
            타인의 저작권, 상표권, 의장권 등 지적재산권을 침해하는 경우 어떠한
            책임도 부담하지 않습니다.
          </p>
        </el-scrollbar>
        <label class="input-check">
          <input
            type="checkbox"
            required
          />
          <span class="check checkbox"></span>
          <span class="text col-green"
            >주의사항을 확인했으며, 해당 에셋은 저작권 침해 컨텐츠가 아님을
            증명합니다.</span
          >
        </label>
      </div>
    </div>
    <div class="upload-set">
      <button
        type="button"
        class="register-btn"
      >
        등록하기
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      jsonData: '',
      isAssetDirect: false,
    }
  },
  computed: {
    ...mapState(['LOGIN', 'LOADING', 'SCENE_DATA']),
  },
  mounted() {},
  methods: {
    onSubmit() {
      // form 데이터 전달
      this.$emit('ChapterSoundUpload', null)
    },
    onChangeAssetType(){
      this.isAssetDirect === false
        ? (this.isAssetDirect = true)
        : (this.isAssetDirect = false)
    }
  },
}
</script>

<style></style>
