<template>
  <div>
    <form @submit.prevent="onSubmit">
      <div class="upload-wrap">
        <div class="upload-spot">
          <label class="input-file">
            <input
              type="file"
              name="myAssetsFile"
              required
              accept="image/png"
              @change="onChangeUploadPreview($event)"
            />
            <span v-if="uploadPreview && assetsType === 'S'">
              {{ uploadPreview }}
            </span>
            <span v-else class="text-center" style="line-height: 20px"
              >이곳을 클릭해서 에셋을 등록해 보세요<br />
              <span v-if="assetsType === 'S'">
                mp3 확장자만 <br />
                업로드 가능합니다
              </span>
              <span v-else>
                이미지는 2000*4000 의<br />
                사이즈가 가장 적합합니다
              </span></span
            >
            <div
              v-if="uploadPreview !== '' && assetsType !== 'S'"
              class="image-wrap"
            >
              <img v-if="assetsType !== 'S'" :src="uploadPreview" alt="" />
            </div>
          </label>
        </div>
        <div class="upload-set">
          <div class="tit">마이 에셋 업로드</div>
          <label class="label">에셋 제목</label>
          <input
            v-model="params.gas_name"
            type="text"
            class="input-text"
            required
            :placeholder="
              assetsType === 'S'
                ? ''
                : assetsType === 'B'
                ? '에셋 제목'
                : '에셋 제목'
            "
            @keyup="onChangeContentAllCheck('text', $event)"
          />
          <label class="label">
            {{ assetsType === 'C' ? '에셋 표정' : '에셋 설명' }}
          </label>
          <input
            v-model="params.gas_discription"
            type="text"
            class="input-text"
            required
            :placeholder="
              assetsType === 'S'
                ? ''
                : assetsType === 'B'
                ? '에셋 설명'
                : '무표정'
            "
            @keyup="onChangeContentAllCheck('text', $event)"
          />
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
            :disabled="isDisabled"
            @click="onSubmit"
          >
            등록하기
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
import { kooLogin } from '~/config/util'
export default {
  props: {
    modalVisible: {
      type: Boolean,
      default: false,
    },
    assetsType: {
      type: String,
      default: '',
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
      params: {},
      isDisabled: false,
    }
  },
  computed: {
    ...mapState(['LOGIN', 'LOADING', 'SCENE_DATA', 'PROJECT_ID']),
    ...mapGetters(['GETTER_LOADING', 'GETTER_LOADING_INIT']),
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
    ...mapMutations(['MUTATIONS_LOADING_INIT', 'MUTATIONS_LOADING']),
    beforeClose() {
      this.isOpen = false
    },
    onChangeUploadPreview(e) {
      const limitSize = 1024 * 1024 * 10
      if (limitSize < e.target.files[0].size / 1024 / 1024) {
        return alert('이미지는 10MB 이하로 올릴 수 있습니다')
      }
      const mp = e.target.files[0].name.split('.')
      this.soundFile = e.target.files[0]
      // e.target.files[0].name.substr(0,mp)
      console.log(mp[mp.length - 1], e.target.files[0].name)
      this.ext = mp[mp.length - 1]
      if (this.ext !== 'png') {
        e.target.files = null
        return alert('png 확장자만 업로드가 가능합니다')
      }

      if (this.assetsType === 'S') {
        console.log(e.target.files[0].name)
        return (this.uploadPreview = e.target.files[0].name)
      }
      if (e.target.value) {
        const file = e.target.files[0]
        this.uploadPreview = URL.createObjectURL(file)
        // this.onChangeContentAllCheck('file', e)
      }
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
    onSubmit() {
      this.MUTATIONS_LOADING_INIT()
      if (!this.params.gas_name) {
        return alert('에셋 이름을 작성해 주세요')
      }
      if (!this.params.gas_discription && this.assetsType === 'C') {
        return alert('에셋 표정 이름을 작성해 주세요')
      }
      if (!this.isContentAllCheck) {
        return alert('약관에 동의해 주세요')
      }
      if (!document.getElementsByName('myAssetsFile')[0].files[0]) {
        return alert('파일을 업로드 해주세요')
      }
      this.isDisabled = true
      this.params.loadingInit = this.GETTER_LOADING
      // URL.createObjectURL(target.files[0])
      const frm = new FormData()
      frm.append('apiKey', process.env.API_KEY)
      frm.append('user_idx', kooLogin('user_idx'))
      frm.append('secretKey', this.PROJECT_ID)
      frm.append('gas_name', this.params.gas_name)
      frm.append('gas_discription', this.params.gas_discription)
      if (this.assetsType === 'S') {
        frm.append('type', 'mySound')
      } else {
        frm.append('type', 'my')
      }
      frm.append('mode', this.assetsType)
      frm.append(
        'national_2000',
        document.getElementsByName('myAssetsFile')[0].files[0]
      )
      this.$axios
        .post(process.env.VUE_APP_ASSETS_API, frm, {
          header: {
            'Context-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          console.log(res)
          this.params.loadingInit = this.GETTER_LOADING_INIT
          setTimeout(() => {
            console.log(1)
          }, 10000)
          if (res.data === 'OK') {
            alert('등록되었습니다.')
            this.isOpen = false
            this.params = {}
            this.uploadPreview = ''
            this.$emit('assetsInsertIsClose', false)
            this.isDisabled = false
          }
          this.MUTATIONS_LOADING()
        })
        .catch((res) => {
          console.log('AXIOS FALSE', res)
          alert('등록에 실패하였습니다. 관리자에게 문의해 주세요.')
        })
    },
  },
}
</script>

<style></style>
