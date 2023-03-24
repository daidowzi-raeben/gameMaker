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
          <span class="text ending-list">
            <span class="ending-list--tit">
              {{ scenarioList.tit }}
            </span>
            <span class="ending-list--cr">[ {{ scenarioList.cr }} ]</span>
            <span class="ending-list--pt">
              포인트
              <span class="red">{{ scenarioList.pu }}</span
              >이상 <span class="blue">{{ scenarioList.pd }}</span
              >이하
            </span>
          </span>
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
                  v-if="chapter.bgm"
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
      </li>
    </ul>
    <button
      type="button"
      class="scenario-add"
      @click="onClickAddEnding"
    ></button>

    <el-dialog title="" width="800px" :visible.sync="endingAdd">
      <div class="ending-input">
        <div class="ending-input--row">
          <label class="input-label">엔딩 제목</label>
          <input
            v-model="endingTitle.title"
            maxlength="20"
            class="input-text wd-100"
          />
        </div>

        <div class="ending-input--row">
          <label class="input-label">인물</label>
          <el-select v-model="endingTitle.cr" placeholder="선택안함">
            <el-option
              v-for="(d, s) in SCENE_DATA_CHARACTER.jsonData"
              :key="s"
              :value="d.name"
              :label="d.name"
            ></el-option>
          </el-select>
        </div>

        <div class="ending-input--row num">
          <label class="input-label">포인트 설정</label>
          <el-input-number
            v-model="endingTitle.pu"
            :min="1"
            :max="100"
          ></el-input-number>
          <span class="text">포인트 이상</span>
          <el-input-number
            v-model="endingTitle.pd"
            :min="1"
            :max="100"
          ></el-input-number>
          <span class="text">포인트 이하</span>
        </div>
      </div>
      <div class="text-center mt-5">
        <button
          type="button"
          class="button md btn-primary"
          @click="onClickScenarioAdd"
        >
          생성
        </button>
      </div>
    </el-dialog>
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
      endingAdd: false,
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
      endingTitle: {
        title: '',
        cr: '',
        pu: '',
        pd: '',
      },
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
      'ENDING_CODE',
      'SCENE_DATA_CHARACTER',
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
          this.params.ending = 'Y'
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
      this.paramsInit.ending = 'Y'
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
      'MUTATIONS_ENDING_CODE',
      'MUTATIONS_ENDING_INDEX',
      'MUTATIONS_CHAPTER_INDEX',
      'MUTATIONS_SAVE_DATETIME_INIT',
      'MUTATIONS_LOADING_INIT',
      'MUTATIONS_CUT_LIST_CUT_CODE',
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
      this.MUTATIONS_CUT_LIST_CUT_CODE(0)
      this.MUTATIONS_ENDING_CODE(e)
      this.MUTATIONS_ENDING_INDEX(i)
      this.MUTATIONS_CHAPTER_INDEX(i2)
      //   this.scenarioLists = this.SCENE_DATA
      this.paramsData.type = 'cutList'
      // this.params.data = JSON.stringify(value)
      this.paramsData.secretKey = this.PROJECT_ID
      this.paramsData.user_idx = this.user_idx
      this.paramsData.ending = 'Y'
      this.paramsData.apiKey = process.env.API_KEY
      this.paramsData.gc_timestamp = this.ENDING_CODE
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
      if (
        !this.endingTitle.title ||
        !this.endingTitle.cr ||
        !this.endingTitle.pu ||
        !this.endingTitle.pd
      ) {
        return alert('모든 정보를 입력해 주세요')
      }
      if (this.endingTitle.pd < this.endingTitle.pu) {
        return alert('우측 포인트는 좌측 포인트보다 높을 수 없습니다.')
      }
      const time = Date.now()
      // user_idx: kooLogin('user_idx')
      console.log(kooLogin('user_idx'))
      this.scenarioLists = [
        ...this.scenarioLists,
        {
          timestamp: time,
          tit: this.endingTitle.title,
          pu: this.endingTitle.pu,
          pd: this.endingTitle.pd,
          cr: this.endingTitle.cr,
          fold: true,
          modi: false,
          active: false,
          chapters: [],
        },
      ]
      this.endingTitle = {
        title: '',
        cr: '',
        pu: '',
        pd: '',
      }
      this.endingAdd = false
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
      frm.append('ending', 'Y')
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
          this.uploadPreview = null
        })
        .catch((res) => {
          console.log('AXIOS FALSE', res)
          alert('등록에 실패하였습니다. 관리자에게 문의해 주세요.')
        })
    },
    onClickAddEnding() {
      this.endingAdd = true
      console.log('asdasd')
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
