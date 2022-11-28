<template>
  <div id="gameMaker">
    <div class="maker-wrap">
      <div class="maker-left">
        <ul class="scenario-list">
          <li
            v-for="(scenarioList, index) in scenarioLists"
            :key="index"
            :ref="`scenarioList${index}`"
            class="scenario-list--item"
            :class="{ active: scenarioList.active === true }"
          >
            <span class="scenario-tit">
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
              <button type="button" class="scenario-del" @click="onClickDeleteList(index)"></button>
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
                    {{ chapter.tit }}
                    <button
                      type="button"
                      class="chapter-modi"
                      @click="onClickTitleModi(`${index}`, `${index2}`)"
                    ></button>
                    <button type="button" class="chapter-del" @click="onClickDeleteList(index, index2)"></button>
                  </span>
                  <input
                    v-show="chapter.modi === true"
                    :ref="`chapterListModiInput${index}_${index2}`"
                    v-model="chapter.tit"
                    type="text"
                    class="chapter-input"
                    maxlength="15"
                    @blur="onEnterTitleChange(`${index}`, $event, `${index2}`)"
                    @keyup.enter="onEnterTitleChange(`${index}`, $event, `${index2}`)"
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
      <CutInsert
        @myLoadBgImage="myLoadBgImage"
        @myLoadCrImage="myLoadCrImage"
        @myLoadCrName="myLoadCrName"
        @myLoadText="myLoadText"
        @myLoadFocus="myLoadFocus"
        @myLoadEffect="myLoadEffect"
      />
    </div>
    <!-- <div class="maker-wrap">
      <div class="maker-left">
        <div class="preview">
          <div class="preview-tit">미리보기 {{ cutCode }}</div>
          <div class="preview-img">
            <img :src="tempData.bg" alt="" class="background" />
            <img
              ref="characterImage"
              :src="tempData.cr"
              alt=""
              class="character"
            />
            <div class="dialogue">
              <span class="name">{{ tempData.crName }}</span>
              <p
                ref="myLoadText"
                class="text"
                style="white-space: pre-line"
              ></p>
            </div>
            <img src="~/static/images/mockup.png" alt="" class="mockup" />
          </div>
        </div>
        <div class="asset">
          <div class="asset-tit">등록된 에셋</div>
          <div class="asset-wrap">
            <div class="asset-tab">
              <button
                type="button"
                class="asset-tab--tit"
                :class="{ active: assetTab == 1 }"
                @click="assetTab = 1"
              >
                배경
              </button>
              <button
                type="button"
                class="asset-tab--tit"
                :class="{ active: assetTab == 2 }"
                @click="assetTab = 2"
              >
                캐릭터
              </button>
              <button
                type="button"
                class="asset-tab--tit"
                :class="{ active: assetTab == 3 }"
                @click="assetTab = 3"
              >
                사운드
              </button>
            </div>
            <div v-show="assetTab == 1" class="asset-tab--con">배경에셋</div>
            <div v-show="assetTab == 2" class="asset-tab--con">캐릭터에셋</div>
            <div v-show="assetTab == 3" class="asset-tab--con">사운드에셋</div>
          </div>
        </div>
      </div>
      <CutInsert
        @myLoadBgImage="myLoadBgImage"
        @myLoadCrImage="myLoadCrImage"
        @myLoadCrName="myLoadCrName"
        @myLoadText="myLoadText"
        @myLoadFocus="myLoadFocus"
        @myLoadEffect="myLoadEffect"
      />
    </div> -->
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'
import CutInsert from '~/components/simulation-maker/CutInsert.vue'
export default {
  components: {
    CutInsert,
  },
  layout: 'maker-layout',
  validate({ params }) {
    return params.id
  },
  asyncData({ params }) {
    return {
      idx: params.id,
    }
  },
  data() {
    return {
      params: {},
      enabled: true,
      dragging: false,
      assetTab: 1,
      tempData: {
        bg: 'https://img.lovepik.com/background/20211102/medium/lovepik-banff-national-park-mobile-wallpaper-canada-background-image_400706001.jpg',
        cr: 'https://cdn.pixabay.com/photo/2013/07/12/13/27/man-147091_960_720.png',
        crName: '',
        text: '',
        effect: '',
      },
      scenarioLists: [
        {
          tit: '시나리오제목1',
          fold: true,
          modi: false,
          active: true,
          chapters: [
            {
              tit: '챕터제목1',
              modi: false,
            },
            {
              tit: '챕터제목2',
              modi: false,
            },
          ],
        },
        {
          tit: '시나리오제목2',
          fold: false,
          modi: false,
          active: false,
          chapters: [
            {
              tit: '챕터제목1',
              modi: false,
            },
            {
              tit: '챕터제목2',
              modi: false,
            },
            {
              tit: '챕터제목3',
              modi: false,
            },
          ],
        },
      ],
      cutCode: '',
    }
  },
  computed: {
    ...mapState(['LOGIN', 'LOADING', 'SCENE']),
    draggingInfo() {
      return this.dragging ? 'under drag' : ''
    },
  },
  mounted() {
    this.params.type = 'projectDetail'
    this.params.apiKey = process.env.API_KEY
    console.log(this.idx)
    // this.ACTION_AXIOS_GET()
  },
  beforeDestroy() {},
  methods: {
    ...mapActions(['ACTION_AXIOS_GET']),
    ...mapMutations(['']),
    // 드래그 데이터 갱신
    checkMove(e) {
      console.log('Future index: ' + e.draggedContext.futureIndex)
    },

    myLoadBgImage(e) {
      console.log('myLoadBgImage', e)
      this.tempData.bg = e
    },
    myLoadCrName(e) {
      console.log('myLoadCrName', e)
      this.tempData.crName = e
    },
    myLoadCrImage(e) {
      console.log('myLoadCrImage', e)
      this.tempData.cr = e
    },
    myLoadText(e) {
      this.tempData.text = e
      this.$refs.myLoadText.innerText = e
    },
    myLoadFocus(e) {
      // console.log('myLoadFocus', e)
      this.cutCode = e
      // return e
    },
    myLoadEffect(e) {
      if (e === 'vibration') {
        this.$refs.characterImage.classList.add(e)
        setTimeout(() => {
          this.$refs.characterImage.classList.remove(e)
        }, 400)
      }
    },
    onClickToggleScenario(idx) {
      this.scenarioLists[idx].fold = !this.scenarioLists[idx].fold
    },
    onClickTitleModi(idx, idx2) {
        if(typeof idx2 === 'undefined'){
          this.scenarioLists[idx].modi = true
          this.$nextTick(function() {
            this.$refs[`scenarioModiInput${idx}`][0].focus()
          });
        }
        else{
          this.scenarioLists[idx].chapters[idx2].modi = true
          this.$nextTick(function() {
            this.$refs[`chapterListModiInput${idx}_${idx2}`][0].focus()
          });
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
    },
    onClickScenarioAdd() {
      this.scenarioLists.push({
        tit: '시나리오제목',
        fold: true,
        modi: false,
        active: false,
        chapters: [],
      })
    },
    onClickChapterAdd(idx) {
      this.scenarioLists[idx].chapters.push({
        tit: '챕터제목',
        modi: false,
      })
    },
    onClickDeleteList(idx, idx2) {
      typeof idx2 === 'undefined'
        ? (this.$refs[`scenarioList${idx}`][0].remove())
        : (this.$refs[`chapterList${idx}_${idx2}`][0].remove())
    },
  },
}
</script>

<style lang="scss"></style>
