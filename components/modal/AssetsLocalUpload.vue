<template>
  <div class="upload-wrap">
    <div class="upload-spot">
      <label class="input-file">
        <input type="file" @change="onChangeUploadPreview($event)" />
        <span>이곳을 클릭해서 에셋을 등록해 보세요</span>
        <div v-if="uploadPreview !== ''" class="image-wrap">
          <img :src="uploadPreview" alt="" />
        </div>
      </label>
    </div>
    <div class="upload-set">
      <div class="tit">마이 에셋 업로드</div>
      <label class="label">에셋 별칭</label>
      <input
        type="text"
        class="input-text"
        @keyup="onChangeContentAllCheck('text', $event)"
      />
      <div class="sub-tit">주의사항</div>
      <el-scrollbar class="scroll">
        <p>
          저작권자의 명시적 동의없이 타인의 저작물의 전부 또는 일부를 복제 ·
          배포 · 전송 등의 방법으로 이용하는 것은 저작권자의 권리를 침해하는
          행위임으로 복제 · 배포 · 전송 등의 방법으로 타인의 저작권을 침해하는
          게시물을 홈페이지에 게재 또는 등록하여서는 아니됩니다. 타인의 저작물을
          인용한 게시물인 경우 그 인용부분이 회원 개인의 의견을 뒷받침하기 위해
          일부 인용된 것이 아니라 게시물의 핵심적인 부분을 구성하고 있다면
          출처를 밝히더라도 저작권 침해에 해당됨으로 저작권자의 명시적 동의없이
          이러한 게시물을 홈페이지에 게재 또는 등록하여서는 아니됩니다.
          홈페이지에 게재 또는 등록된 회원의 게시물을 제3자가 사용하고자 할
          경우에는 반드시 해당회원의 명시적 동의를 얻은 뒤 사용하여야 합니다.
          회원이 서비스 이용과정에서 타인의 저작권, 상표권, 의장권 등
          지적재산권을 침해하는 경우 어떠한 책임도 부담하지 않습니다.
        </p>
      </el-scrollbar>
      <label class="input-check">
        <input
          type="checkbox"
          @change="onChangeContentAllCheck('check', $event)"
        />
        <span class="check checkbox"></span>
        <span class="text col-green"
          >주의사항을 확인했으며, 해당 에셋은 저작권 침해 컨텐츠가 아님을
          증명합니다.</span
        >
      </label>
      <button
        type="button"
        class="register-btn"
        :class="{ active: isContentAllCheck }"
      >
        등록하기
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    modalVisible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isOpen: false,
      jsonData: '',
      isContentAllCheck: false,
      uploadPreview: '',
      assetName: '',
      assetNoticeCheck: false,
    }
  },
  computed: {
    ...mapState(['LOGIN', 'LOADING', 'SCENE_DATA']),
  },
  watch: {
    modalVisible: {
      handler(value) {
        console.log(value)
        this.isOpen = value
      },
    },
  },

  mounted() {
    console.log(this.modalVisible)
  },
  methods: {
    beforeClose() {
      this.isOpen = false
    },
    onChangeUploadPreview(e) {
      const file = e.target.files[0]
      this.uploadPreview = URL.createObjectURL(file)
      this.onChangeContentAllCheck('file', e)
    },
    onChangeContentAllCheck(type, e) {
      if (type === 'text') {
        this.assetName = e.target.value
      }
      if (type === 'check') {
        this.assetNoticeCheck = e.target.checked
      }
      if (
        this.uploadPreview !== '' &&
        this.assetName !== '' &&
        this.assetNoticeCheck
      ) {
        this.isContentAllCheck = true
      } else {
        this.isContentAllCheck = false
      }
    },
  },
}
</script>

<style></style>
