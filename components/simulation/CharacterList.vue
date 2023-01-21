<template>
  <div class="maker-left">
    <ul class="scenario-list">
      <li
        v-for="(scenarioList, index) in SCENE_DATA_CHARACTER_temp"
        :key="index"
        :ref="`scenarioList${index}`"
        class="scenario-list--item"
        :class="{ active: scenarioList.active === true }"
        :title="scenarioList.tit"
      >
        <span :ref="`scenarioTitle${index}`" class="scenario-tit">
          {{ scenarioList.name }}
        </span>
        <!-- {{ scen.chapters }} -->
        <ul
          v-if="
            SCENE_DATA_CHARACTER &&
            SCENE_DATA_CHARACTER.jsonData &&
            SCENE_DATA_CHARACTER.idx
          "
          v-show-slide="scenarioList.fold"
          class="chapter-list"
        >
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
              v-for="(chapter, index2) in SCENE_DATA_CHARACTER.jsonData"
              :key="index2"
              :ref="`chapterList${index}_${index2}`"
              class="chapter-list--item"
            >
              <span class="chapter-tit">
                <label
                  @click="onClickChapterTo(SCENE_DATA_CHARACTER.idx[index2])"
                >
                  <input type="radio" name="chapterTitle" />
                  <span style="cursor: pointer">{{ chapter.name }}</span>
                </label>
                <button
                  type="button"
                  class="chapter-del"
                  @click="
                    onClickDeleteChapterList(SCENE_DATA_CHARACTER.idx[index2])
                  "
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
      SCENE_DATA_CHARACTER_temp: [
        {
          name: '인물 목록',
          fold: true,
          modi: false,
          active: false,
          chapters: [],
        },
      ],
      paramsDetail: {},
    }
  },
  computed: {
    ...mapState([
      'LOGIN',
      'LOADING',
      'SCENE_DATA_CHARACTER',
      'IS_POST',
      'PROJECT_ID',
      'SCENE_DATA_CHARACTER_INIT',
      'SCENE_CODE',
    ]),
    draggingInfo() {
      return this.dragging ? 'under drag' : ''
    },
  },
  watch: {
    SCENE_DATA_CHARACTER: {
      handler(value) {
        // if (
        //   value.length > 0 &&
        //   this.SCENE_DATA_CHARACTER_INIT !== this.SCENE_DATA_CHARACTER
        // ) {
        //   console.log('watch ==========>', value)
        //   this.scenarioLists = this.SCENE_DATA_CHARACTER
        //   this.params.type = 'scenarioInsert'
        //   this.params.data = JSON.stringify(value)
        //   this.params.secretKey = this.PROJECT_ID
        //   this.params.user_idx = this.user_idx
        //   this.params.apiKey = process.env.API_KEY
        //   this.ACTION_AXIOS_GET(this.params)
        // }
      },
      immediate: true,
    },
  },
  mounted() {
    // console.log(time)
    this.$nextTick(() => {
      this.user_idx = kooLogin('user_idx')
      //   this.paramsInit.type = 'characterList'
      //   this.paramsInit.user_idx = this.user_idx
      //   this.paramsInit.secretKey = this.PROJECT_ID
      //   this.paramsInit.apiKey = process.env.API_KEY
      //   this.ACTION_AXIOS_GET(this.paramsInit)
    })
  },
  methods: {
    ...mapActions(['ACTION_AXIOS_GET', 'ACTION_AXIOS_POST']),
    ...mapMutations([
      'MUTATIONS_SCENE_DATA_CHARACTER',
      'MUTATIONS_CHAPTER_DATA',
      'MUTATIONS_SCENE_DATA_CHARACTER_RELOAD',
      'MUTATIONS_SCENE_CODE',
      'MUTATIONS_SCENE_INDEX',
      'MUTATIONS_CHAPTER_INDEX',
      'MUTATIONS_CHAPTER_DEATILE_INIT',
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
    onClickChapterTo(e) {
      console.log(e)
      this.paramsDetail.type = 'characterDetail'
      this.paramsDetail.user_idx = this.user_idx
      this.paramsDetail.idx = e
      this.paramsDetail.secretKey = this.PROJECT_ID
      this.paramsDetail.apiKey = process.env.API_KEY
      this.ACTION_AXIOS_GET(this.paramsDetail)
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
      this.MUTATIONS_SCENE_DATA_CHARACTER_RELOAD(this.scenarioLists)
    },
    onClickScenarioAdd() {
      // user_idx: kooLogin('user_idx')
      console.log(kooLogin('user_idx'))
      Object.entries(document.getElementsByName('chapterTitle')).forEach(
        (e, i) => {
          console.log((e[1].checked = false))
        }
      )
      this.MUTATIONS_CHAPTER_DEATILE_INIT()
    },
    onClickChapterAdd(idx) {
      const time = Date.now()
      this.scenarioLists[idx].chapters = [
        ...this.scenarioLists[idx].chapters,
        {
          tit: '챕터제목',
          modi: false,
          timestamp: time,
        },
      ]
      this.MUTATIONS_SCENE_DATA_CHARACTER(this.scenarioLists)
    },
    onClickDeleteChapterList(e) {
      if (confirm('삭제하시겠습니까?')) {
        console.log(e)
        this.user_idx = kooLogin('user_idx')
        this.paramsInit.type = 'characterList'
        this.paramsInit.user_idx = this.user_idx
        this.paramsInit.idx = e
        this.paramsInit.mode = 'del'
        this.paramsInit.secretKey = this.PROJECT_ID
        this.paramsInit.apiKey = process.env.API_KEY
        this.ACTION_AXIOS_GET(this.paramsInit)
      }
    },
    onClickDeleteScenarioList(timestamp) {
      if (confirm('삭제하시겠습니까?')) {
        this.scenarioListsCopy = []
        console.log('SCENE_DATA_CHARACTER', this.SCENE_DATA_CHARACTER)
        this.$nextTick(() => {
          this.SCENE_DATA_CHARACTER.forEach((e, i) => {
            if (e.timestamp !== timestamp) {
              console.log(e)
              this.scenarioListsCopy[i] = this.SCENE_DATA_CHARACTER[i]
            }
          })
          this.MUTATIONS_SCENE_DATA_CHARACTER(this.scenarioListsCopy)
        })
      } else {
        return false
      }
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
