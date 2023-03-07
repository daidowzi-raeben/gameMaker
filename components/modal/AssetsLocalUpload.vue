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
                  저작권자의 명시적 동의없이 타인의 저작물의 전부 또는 일부를
                  복제 · 배포 · 전송 등의 방법으로 이용하는 것은 저작권자의
                  권리를 침해하는 행위임으로 복제 · 배포 · 전송 등의 방법으로
                  타인의 저작권을 침해하는 게시물을 홈페이지에 게재 또는
                  등록하여서는 아니됩니다.<br />
                  타인의 저작물을 인용한 게시물인 경우 그 인용부분이 회원 개인의
                  의견을 뒷받침하기 위해 일부 인용된 것이 아니라 게시물의
                  핵심적인 부분을 구성하고 있다면 출처를 밝히더라도 저작권
                  침해에 해당됨으로 저작권자의 명시적 동의없이 이러한 게시물을
                  홈페이지에 게재 또는 등록하여서는 아니됩니다.<br />
                  홈페이지에 게재 또는 등록된 회원의 게시물을 제3자가 사용하고자
                  할 경우에는 반드시 해당회원의 명시적 동의를 얻은 뒤 사용하여야
                  합니다. <br />
                  회원이 서비스 이용과정에서 타인의 저작권, 상표권, 의장권 등
                  지적재산권을 침해하는 경우 당사는 어떠한 책임도 부담하지
                  않습니다.
                </p>
                <p>
                  당사의 플랫폼은 모든 사용자에게 안전하고 존중받는 환경을
                  제공하기 위해 최선을 다하고 있습니다. 이에 따라 사용자를 위한
                  가이드를 제공하며, 내용은 다음과 같습니다.<br />
                  1. 과도한 노출 및 성적인 콘텐츠 정책 <br />
                  노골적이거나 외설적이거나 불쾌감을 주는 모든 형태의 과도한
                  노출이나 성적인 콘텐츠의 공유를 엄격히 금지합니다. 여기에는
                  다음을 묘사하거나 장려하는 콘텐츠가 포함되며 이에 국한되지
                  않습니다.<br />
                  · 성기, 엉덩이, 가슴(여성 또는 남성)을 포함한 전체 또는 부분
                  누드 <br />
                  · 성행위 또는 성행위 시뮬레이션 <br />
                  · 노골적인 성적 언어 또는 대화 <br />
                  · 성희롱 또는 학대 <br />
                  · 합의되지 않은 성적 행위나 성폭력을 조장하거나 미화 <br />
                  · 자위 <br />
                  · 성기, 가슴, 엉덩이 애무 또는 더듬기 <br />
                  · 시청자에게 성적 만족감을 주기 위한 자위 도구 사용<br />
                  · 성적 만족을 위한 과도한 노출 또는 부분적인 노출 · 수간 또는
                  수간 조장 <br />
                  · 근친상간 또는 근친상간 조장 <br />
                  · 강제적인 성적 행위 또는 원하지 않는 성적 대상화 <br />
                  · 유명인 의상 노출 사고 또는 누드 사진 유출 <br />
                  · 성적 만족을 목적으로 하며 폭력적이거나 노골적이거나 수치심을
                  주는 페티시즘 콘텐츠 <br />
                  · 성적 만족을 위해 수집된 콘텐츠 <br />
                </p>
                <p>
                  2. 폭력적이거나 위험한 콘텐츠 정책 <br />
                  당사 플랫폼은 폭력을 조장, 미화 또는 선동하는 콘텐츠의 공유를
                  엄격히 금지합니다. 여기에는 다음을 묘사하거나 장려하는
                  콘텐츠가 포함되며 이에 국한되지 않습니다. <br />
                  · 개인 또는 집단에 대한 신체적 상해 또는 상해
                  <br />
                  · 테러 또는 극단주의 폭력 행위<br />
                  · 동물 학대 또는 학대 유해하거나 위험한 콘텐츠<br />
                  · 폭력적이거나 노골적인 묘사<br />
                  · 폭력 범죄 조직에 대한 콘텐츠<br />
                  · 증오심 표현에 대한 콘텐츠<br />
                  · 괴롭힘 및 사이버 폭력에 대한 콘텐츠<br />
                  · 위급한 신체적 상해의 위험이 있는 도전<br />
                  · 사람을 죽이거나 해치는 방법<br />
                  · 중독성 마약 흡입 또는 제조<br />
                  · 거식증이나 기타 섭식 장애를 칭송하거나, 미화하거나,
                  따라하도록 독려<br />
                  · 시청자에게 실물 상품을 훔치는 방법을 알려주거나 부정 행위를
                  조장<br />
                  · 사용자 인증 정보를 훔치거나, 개인 정보를 손상시키거나, 소셜
                  미디어 계정을 해킹하는 등 다른 사람에게 심각한 피해를 발생시킬
                  의도로 컴퓨터나 정보 기술을 사용하는 방법을 알려주는 내용<br />
                  · 일반적으로 요금 결제가 필요한 오디오 콘텐츠, 시청각 콘텐츠,
                  정식 버전의 비디오 게임, 소프트웨어
                </p>
                <p>
                  3. 아동 학대 콘텐츠 정책<br />
                  당사 플랫폼은 아동 학대를 조장, 미화 또는 선동하는 콘텐츠의
                  게시 또는 공유를 엄격히 금지합니다. 여기에는 다음을 묘사하거나
                  장려하는 콘텐츠가 포함되며 이에 국한되지 않습니다. <br />
                  · 미성년자가 나오는 음란물 및 미성년자를 성적으로 착취하는
                  콘텐츠<br />
                  · 미성년자와 가족을 대상으로 하지만 성적인 주제나 폭력을
                  포함하고 있는 콘텐츠<br />
                  · 미성년자가 위험한 행동에 가담하는 모습을 보여주거나
                  미성년자에게 위험한 행동을 독려하는 콘텐츠<br />
                  (위험한 스턴트, 도전, 장난을 비롯해 상해를 입힐 수 있는 유해한
                  상황 등)<br />
                  · 부모의 정신적 신체적 학대 상황을 가장히여 이를 노골적으로
                  표현<br />
                  · 미성년자에 대한 강요 또는 강압적 행위<br />
                  · 미성년자가 직간접적으로 연루된 사이버 폭력 및 괴롭힘<br />
                </p>
                <p>
                  4. 자살 및 자해에 대한 콘텐츠 정책 당사 플랫폼은 정신건강에
                  대한 인식과 이해의 중요성을 잘 알고 있습니다. 이 때문에
                  크리에이터들이 우울증, 자해 또는 기타 정신건강 문제에 대한
                  경험을 다룬 콘텐츠를 게시하는 등 자신의 이야기를 공유하도록
                  지원하고 있습니다.<br />
                  하지만 자살과 자해를 조장하거나 충격 또는 혐오감을
                  불러일으키려는 목적으로 제작되었거나 시청자에게 상당한 위험을
                  초래할 수 있는 콘텐츠는 허용되지 않습니다. 여기에는 다음을
                  묘사하거나 장려하는 콘텐츠가 포함되며 이에 국한되지 않습니다.
                  <br />
                  · 자살 또는 자해를 조장하거나 미화하는 콘텐츠 <br />
                  · 자살 또는 자해 방법에 대한 안내 <br />
                  · 미성년자를 대상으로 한 자살 또는 자해 관련 콘텐츠 <br />
                  · 노골적인 자해 이미지 <br />
                  · 완전히 알아볼 수 없도록 자살 희생자를 흐리게 처리하거나
                  가리지 않은 이미지 <br />
                  · 자살 방법을 알려주는 자세한 정보나 함께 사용된 흐리게 처리된
                  이미지 또는 그 밖의 콘텐츠<br />
                  · 자살에 이르는 과정 또는 자살 시도를 맥락없이 묘사하는
                  콘텐츠<br />
                  · 자살 및 자해 도전에 참여하거나 그 방법을 안내하는 콘텐츠
                  <br />
                  · 충분한 맥락이 없는 유서<br />
                  · 자살 또는 자해 방법 및 위치, 대표적인 자살 장소에 대한
                  자세한 설명 <br />
                  · 자해 또는 자살에 대한 노골적인 묘사<br />
                </p>
                <p>
                  다음 기준 중 하나 이상을 충족하는 경우 상기 콘텐츠를 삭제하는
                  대신 제한을 적용하는 경우도 있습니다. <br />
                  아래 목록은 일부에 불과하며 더 많은 대상이 포함될 수 있습니다.
                  <br />
                  · 교육 콘텐츠<br />
                  · 공익 콘텐츠 <br />
                  위와 같은 콘텐츠는 명확하게 표시되어야 하며 추후에 이 표시를
                  임의로 변경해서는 안됩니다.<br />
                  또한 관련 법률이나 규정을 위반해서는 안 됩니다. <br />
                  적용 범위는 범위는 텍스트, 이미지, 동영상, 오디오 모두
                  포함되며 당사는 단독 재량에 따라 부적절하다고 판단되는
                  사용자의 제작물을 사전 통보 없이 삭제처리 할 수 있음을
                  알려드립니다.<br />
                  이 정책에 대해 질문이나 우려 사항이 있는 경우 당사에
                  문의하십시오.
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
