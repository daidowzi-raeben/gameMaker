<template>
  <div class="maker-left">
    <ul v-if="SCENE_DATA" class="scenario-list">
      <li
        v-for="(scenarioList, index) in SCENE_DATA"
        :key="index"
        :ref="`scenarioList${index}`"
        class="scenario-list--item"
        :class="{ active: scenarioList.active === true }"
        :title="scenarioList.tit"
      >
        <span :ref="`scenarioTitle${index}`" class="scenario-tit">
          <span class="text">{{ scenarioList.tit }}</span>
          <button
            type="button"
            class="scenario-modi"
            @click="onClickTitleModi(`${index}`)"
          ></button>
          <button
            type="button"
            class="chapter-add"
            @click="onClickChapterAdd(`${index}`)"
          >
            +
          </button>
          <button
            type="button"
            class="scenario-del"
            @click="onClickDeleteScenarioList(scenarioList.timestamp)"
          ></button>
        </span>
        <button
          class="scenario-list--toggle"
          :class="{ active: scenarioList.fold === true }"
          @click="onClickToggleScenario(`${index}`)"
        ></button>
        <input
          v-show="scenarioList.modi === true"
          :ref="`scenarioModiInput${index}`"
          v-model="scenarioList.tit"
          type="text"
          class="scenario-input"
          maxlength="15"
          @blur="onEnterTitleChange(`${index}`, $event)"
          @keyup.enter="onEnterTitleChange(`${index}`, $event)"
        />
        <!-- {{ scen.chapters }} -->
        <ul v-show-slide="scenarioList.fold" class="chapter-list">
          <draggable
            :list="scenarioList.chapters"
            :disabled="!enabled"
            class="list-group"
            ghost-class="ghost"
            :move="checkMove"
            @start="dragging = true"
            @end="dragging = false"
          >
            <li
              v-for="(chapter, index2) in scenarioList.chapters"
              :key="index2"
              :ref="`chapterList${index}_${index2}`"
              class="chapter-list--item"
            >
              <span class="chapter-tit">
                <button
                  type="button"
                  class="chapter-sound"
                  style="
                    opacity: 1;
                    position: absolute;
                    margin-left: -24px;
                    margin-top: -2px;
                  "
                ></button>
                <label
                  @click="onClickChapterTo(chapter.timestamp, index, index2)"
                >
                  <input type="radio" name="chapterTitle" />
                  <span>{{ chapter.tit }}</span>
                  <span class="arrow"></span>
                </label>
                <button
                  type="button"
                  class="chapter-modi"
                  @click="onClickTitleModi(`${index}`, `${index2}`)"
                ></button>
                <button
                  type="button"
                  class="chapter-sound"
                  @click="chapterShound(`${index}`, `${index2}`)"
                ></button>
                <button
                  type="button"
                  class="chapter-del"
                  @click="onClickDeleteChapterList(chapter.timestamp, index)"
                ></button>
              </span>
              <input
                v-show="chapter.modi === true"
                :ref="`chapterListModiInput${index}_${index2}`"
                v-model="chapter.tit"
                type="text"
                class="chapter-input"
                maxlength="15"
                @blur="onEnterTitleChange(`${index}`, $event, `${index2}`)"
                @keyup.enter="
                  onEnterTitleChange(`${index}`, $event, `${index2}`)
                "
              />
            </li>
          </draggable>
        </ul>
        {{ scenarioLists }}
      </li>
    </ul>
    <button
      type="button"
      class="scenario-add"
      @click="onClickScenarioAdd"
    ></button>
    <!-- <ChapterSoundUpload /> -->
    <el-dialog title="" width="800px" :visible.sync="popsModalVisible">
      <div>
        <form @submit.prevent="onSubmitChapterSound">
          <div class="upload-wrap">
            <div class="upload-spot">
              <label class="input-file">
                <input
                  type="file"
                  name="myAssetsFile"
                  required
                  @change="onChangeUploadPreview($event)"
                />
                <span>
                  {{
                    uploadPreview && assetsType === 'S'
                      ? uploadPreview
                      : '이곳을 클릭해서 에셋을 등록해 보세요'
                  }}
                </span>
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
              <div class="sub-tit">주의사항</div>
              <el-scrollbar class="scroll">
                <p>
                  저작권자의 명시적 동의없이 타인의 저작물의 전부 또는 일부를
                  복제 · 배포 · 전송 등의 방법으로 이용하는 것은 저작권자의
                  권리를 침해하는 행위임으로 복제 · 배포 · 전송 등의 방법으로
                  타인의 저작권을 침해하는 게시물을 홈페이지에 게재 또는
                  등록하여서는 아니됩니다. 타인의 저작물을 인용한 게시물인 경우
                  그 인용부분이 회원 개인의 의견을 뒷받침하기 위해 일부 인용된
                  것이 아니라 게시물의 핵심적인 부분을 구성하고 있다면 출처를
                  밝히더라도 저작권 침해에 해당됨으로 저작권자의 명시적 동의없이
                  이러한 게시물을 홈페이지에 게재 또는 등록하여서는 아니됩니다.
                  홈페이지에 게재 또는 등록된 회원의 게시물을 제3자가 사용하고자
                  할 경우에는 반드시 해당회원의 명시적 동의를 얻은 뒤 사용하여야
                  합니다. 회원이 서비스 이용과정에서 타인의 저작권, 상표권,
                  의장권 등 지적재산권을 침해하는 경우 어떠한 책임도 부담하지
                  않습니다.
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
                  >주의사항을 확인했으며, 해당 에셋은 저작권 침해 컨텐츠가
                  아님을 증명합니다.</span
                >
              </label>
              <button
                type="button"
                class="register-btn"
                :class="{ active: isContentAllCheck }"
                @click.prevent="onSubmitChapterSound"
              >
                등록하기
              </button>
            </div>
          </div>
        </form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations, mapGetters } from 'vuex'
import { kooLogin } from '~/config/util'
// import ChapterSoundUpload from '~/components/modal/ChapterSoundUpload.vue'
export default {
  components: {
    // ChapterSoundUpload,
  },
  data() {
    return {
      enabled: true,
      dragging: false,
      scenarioLists: [],
      chaptersListsCopy: [],
      scenarioListsCopy: [],
      test: [],
      params: {},
      paramsInit: {},
      paramsData: {},
      user_idx: '',
      popsModalVisible: false,
      isOpen: false,
      jsonData: '',
      isContentAllCheck: false,
      uploadPreview: '',
      assetName: '',
      assetNoticeCheck: false,
      assetsType: 'S',
      soundIndex: {
        s: null,
        c: null,
      },
      ext: '',
      soundParams: {},
      soundFile: null,
    }
  },
  computed: {
    ...mapGetters(['GETTER_LOADING']),
    ...mapState([
      'LOGIN',
      'LOADING',
      'SCENE_DATA',
      'IS_POST',
      'PROJECT_ID',
      'SCENE_DATA_INIT',
      'SCENE_CODE',
    ]),
    draggingInfo() {
      return this.dragging ? 'under drag' : ''
    },
  },
  watch: {
    SCENE_DATA: {
      handler(value) {
        if (value.length > 0 && this.SCENE_DATA_INIT !== this.SCENE_DATA) {
          console.log('watch ==========>', value)
          this.scenarioLists = this.SCENE_DATA
          this.params.type = 'scenarioInsert'
          this.params.data = JSON.stringify(value)
          this.params.secretKey = this.PROJECT_ID
          this.params.user_idx = this.user_idx
          this.params.apiKey = process.env.API_KEY
          this.ACTION_AXIOS_GET(this.params)
        }
      },
      immediate: false,
      deep: true,
    },
  },
  mounted() {
    // console.log(time)
    this.$nextTick(() => {
      this.user_idx = kooLogin('user_idx')
      this.paramsInit.type = 'scenarioDetail'
      this.paramsInit.secretKey = this.PROJECT_ID
      this.paramsInit.apiKey = process.env.API_KEY
      this.ACTION_AXIOS_GET(this.paramsInit)
    })
  },
  methods: {
    ...mapActions([
      'ACTION_AXIOS_GET',
      'ACTION_AXIOS_POST',
      'ACTION_AXIOS_POST_ASSETS',
    ]),
    ...mapMutations([
      'MUTATIONS_SCENE_DATA',
      'MUTATIONS_CHAPTER_DATA',
      'MUTATIONS_SCENE_DATA_RELOAD',
      'MUTATIONS_SCENE_CODE',
      'MUTATIONS_SCENE_INDEX',
      'MUTATIONS_CHAPTER_INDEX',
      'MUTATIONS_SAVE_DATETIME_INIT',
      'MUTATIONS_LOADING_INIT',
    ]),
    onSubmit() {
      // form 데이터 전달
      this.$emit('scenarioInsert', null)
    },
    // 드래그 데이터 갱신
    checkMove(e) {
      console.log('Future index: ' + e.draggedContext.futureIndex)
    },
    // 챕터 이동
    onClickChapterTo(e, i, i2) {
      this.MUTATIONS_LOADING_INIT()
      this.MUTATIONS_SAVE_DATETIME_INIT()
      this.MUTATIONS_SCENE_CODE(e)
      this.MUTATIONS_SCENE_INDEX(i)
      this.MUTATIONS_CHAPTER_INDEX(i2)
      //   this.scenarioLists = this.SCENE_DATA
      this.paramsData.type = 'cutList'
      // this.params.data = JSON.stringify(value)
      this.paramsData.secretKey = this.PROJECT_ID
      this.paramsData.user_idx = this.user_idx
      this.paramsData.apiKey = process.env.API_KEY
      this.paramsData.gc_timestamp = this.SCENE_CODE
      // this.paramsData.previewData = JSON.stringify(this.PREVIEW)
      this.ACTION_AXIOS_GET(this.paramsData)
    },
    onClickToggleScenario(idx) {
      this.scenarioLists[idx].fold = !this.scenarioLists[idx].fold
    },
    onClickTitleModi(idx, idx2) {
      if (typeof idx2 === 'undefined') {
        this.scenarioLists[idx].modi = true
        this.$nextTick(function () {
          this.$refs[`scenarioModiInput${idx}`][0].focus()
        })
      } else {
        this.scenarioLists[idx].chapters[idx2].modi = true
        this.$nextTick(function () {
          this.$refs[`chapterListModiInput${idx}_${idx2}`][0].focus()
        })
      }
    },
    onEnterTitleChange(idx, e, idx2) {
      if (typeof idx2 === 'undefined') {
        this.scenarioLists[idx].tit = e.target.value
        this.scenarioLists[idx].modi = false
      } else {
        this.scenarioLists[idx].chapters[idx2].tit = e.target.value
        this.scenarioLists[idx].chapters[idx2].modi = false
      }
      this.MUTATIONS_SCENE_DATA_RELOAD(this.scenarioLists)
    },
    onClickScenarioAdd() {
      const time = Date.now()
      // user_idx: kooLogin('user_idx')
      console.log(kooLogin('user_idx'))
      this.scenarioLists = [
        ...this.scenarioLists,
        {
          tit: '추가된 시나리오',
          timestamp: time,
          fold: true,
          modi: false,
          active: false,
          chapters: [],
        },
      ]

      this.MUTATIONS_SCENE_DATA(this.scenarioLists)
    },
    onClickChapterAdd(idx) {
      const time = Date.now()
      this.scenarioLists[idx].chapters = [
        ...this.scenarioLists[idx].chapters,
        {
          tit: '추가된 챕터',
          modi: false,
          timestamp: time,
        },
      ]
      this.MUTATIONS_SCENE_DATA(this.scenarioLists)
    },
    onClickDeleteChapterList(timestamp, index) {
      if (confirm('삭제하시겠습니까?')) {
        console.log(timestamp, index)
        this.scenarioListsCopy = []
        this.$nextTick(() => {
          this.SCENE_DATA[index]?.chapters.forEach((e, i) => {
            if (e.timestamp !== timestamp) {
              console.log(e)
              this.scenarioListsCopy[i] = this.SCENE_DATA[index]?.chapters[i]
            }
          })
          this.chaptersListsCopy.chapters = this.scenarioListsCopy
          this.chaptersListsCopy.arrIndex = index
          console.log(this.chaptersListsCopy)
          this.MUTATIONS_CHAPTER_DATA(this.chaptersListsCopy)
        })
      } else {
        return false
      }
    },
    onClickDeleteScenarioList(timestamp) {
      if (confirm('삭제하시겠습니까?')) {
        this.scenarioListsCopy = []
        console.log('SCENE_DATA', this.SCENE_DATA)
        this.$nextTick(() => {
          this.SCENE_DATA.forEach((e, i) => {
            if (e.timestamp !== timestamp) {
              console.log(e)
              this.scenarioListsCopy[i] = this.SCENE_DATA[i]
            }
          })
          this.MUTATIONS_SCENE_DATA(this.scenarioListsCopy)
        })
      } else {
        return false
      }
    },
    updateList() {
      this.scenarioLists = this.SCENE_DATA
      this.params.type = 'scenarioInsert'
      this.params.data = JSON.stringify(this.scenarioLists)
      this.params.secretKey = this.PROJECT_ID
      this.params.user_idx = this.user_idx
      this.params.apiKey = process.env.API_KEY
      this.MUTATIONS_LOADING_INIT()
      this.ACTION_AXIOS_GET(this.params)
    },
    beforeClose() {
      this.isOpen = false
    },
    onChangeUploadPreview(e) {
      const mp = e.target.files[0].name.split('.')
      this.soundFile = e.target.files[0]
      // e.target.files[0].name.substr(0,mp)
      console.log(mp[mp.length - 1], e.target.files[0].name)
      this.ext = mp[mp.length - 1]
      if (this.ext !== 'mp3') {
        e.target.files = null
        return alert('mp3 확장자만 업로드가 가능합니다')
      }
      // this.isContentAllCheck = true
      return (this.uploadPreview = e.target.files[0].name)
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
    chapterShound(s, c) {
      console.log(s, c)
      this.soundIndex.s = Number(s)
      this.soundIndex.c = Number(c)
      this.popsModalVisible = true
    },
    onSubmitChapterSound() {
      // this.MUTATIONS_LOADING_INIT()
      const fileName =
        this.PROJECT_ID + this.soundIndex.s + this.soundIndex.c + '.' + this.ext

      console.log(fileName, this.scenarioLists)
      this.scenarioLists[this.soundIndex.s].chapters[this.soundIndex.c].bgm =
        fileName

      const frm = new FormData()

      frm.append('apiKey', process.env.API_KEY)
      frm.append('user_idx', kooLogin('user_idx'))
      frm.append('secretKey', this.PROJECT_ID)
      frm.append('gas_name', this.soundParams.gas_name)
      frm.append('filsName', fileName)
      frm.append('files', this.soundFile)
      frm.append('gas_discription', this.soundParams.gas_discription)
      frm.append('scenarioLists', JSON.stringify(this.scenarioLists))
      frm.append('type', 'chapterSound')

      this.$axios
        .post(process.env.VUE_APP_ASSETS_API, frm, {
          header: {
            'Context-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          console.log(res)
          alert('등록되었습니다.')
          this.popsModalVisible = false
          this.soundParams = {}
          this.isContentAllCheck = false
        })
        .catch((res) => {
          console.log('AXIOS FALSE', res)
          alert('등록에 실패하였습니다. 관리자에게 문의해 주세요.')
        })
    },
  },
}
</script>

<style lang="scss">
input[name='chapterTitle'] {
  display: none;
  + span {
    color: #fff;
  }
  &:checked {
    + span {
      color: #efdc2c;
      + div {
        display: block !important;
        color: #fff;
      }
    }
  }
}
</style>
