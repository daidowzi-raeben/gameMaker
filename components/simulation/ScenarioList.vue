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
          {{ scenarioList.tit }}
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
                <label
                  @click="onClickChapterTo(chapter.timestamp, index, index2)"
                >
                  <input type="radio" name="chapterTitle" />
                  <span style="cursor: pointer">{{ chapter.tit }}</span>
                </label>
                <button
                  type="button"
                  class="chapter-modi"
                  @click="onClickTitleModi(`${index}`, `${index2}`)"
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
      @click="onClickScenarioAdd"
    ></button>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'
import { kooLogin } from '~/config/util'
export default {
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
    }
  },
  computed: {
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
    ...mapActions(['ACTION_AXIOS_GET', 'ACTION_AXIOS_POST']),
    ...mapMutations([
      'MUTATIONS_SCENE_DATA',
      'MUTATIONS_CHAPTER_DATA',
      'MUTATIONS_SCENE_DATA_RELOAD',
      'MUTATIONS_SCENE_CODE',
      'MUTATIONS_SCENE_INDEX',
      'MUTATIONS_CHAPTER_INDEX',
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
      this.ACTION_AXIOS_GET(this.params)
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
    }
  }
}
</style>
