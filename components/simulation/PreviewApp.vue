<template>
  <div
    v-if="MAKER_GNB !== 6"
    class="preview-wrap"
    :class="{ bottomnone: MAKER_GNB === 5 }"
  >
    <div
      v-if="(MAKER_GNB === 1 || MAKER_GNB === 3) && CUT_LIST.jsonData"
      class="preview-tit"
    >
      시나리오 <span class="highlight"> {{ SCENE_INDEX + 1 }}</span> 챕터
      <span class="highlight">{{ CHAPTER_INDEX + 1 }}</span> 컷
      <span class="highlight">{{ CUT_LIST.jsonData.length - CUT_CODE }}</span>
      <button
        v-if="CUT_CODE !== 0"
        type="button"
        class="button btn-pink delete-btn sm"
        @click="onClickCutDelete(CUT_CODE)"
      >
        삭제
      </button>
      <span class="guide" v-if="CUT_CODE === 0">
        직전 수정된 컷과 맨 마지막 컷은<br />삭제할 수 없어요!
      </span>
    </div>
    <div class="column-2">
      <div v-if="PREVIEW" class="preview">
        <div v-if="MAKER_GNB === 7" class="setting-box" :style="windowColor()">
          <div class="setting-box--row">
            <label
              class="label"
              :class="UISetting.font"
              :style="`color:${UISetting.fontColor}`"
              >배경음</label
            >
            <el-slider v-model="rangeValue1" :show-tooltip="false"></el-slider>
          </div>
          <div class="setting-box--row">
            <label
              class="label"
              :class="UISetting.font"
              :style="`color:${UISetting.fontColor}`"
              >효과음</label
            >
            <el-slider v-model="rangeValue2" :show-tooltip="false"></el-slider>
          </div>
          <div
            class="setting-box--row btns"
            :class="UISetting.font"
            :style="`color:${UISetting.fontColor}`"
          >
            <button type="button" class="button underline">도움주신분</button>
            <button type="button" class="button underline">데이터초기화</button>
            <button type="button" class="button underline">로그인</button>
          </div>
          <div class="setting-box--row bottom">
            <button
              type="button"
              class="button md"
              :class="UISetting.font"
              :style="
                UISetting.mainColor
                  ? `background:${UISetting.mainColor};color:${
                      UISetting.mainFontColor
                    };border-radius:${Math.round(
                      Number(UISetting.button.round) / 2
                    )}px;
                    border:${UISetting.button.border}px solid ${
                      UISetting.button.strokeColor
                    }`
                  : 'background:#000;color:#fff'
              "
            >
              확인
            </button>
          </div>
        </div>
        <!-- dim-light, dim-dark, dim-blur, diagonal, diagonal-r, copy-left, copy-right 클래스 추가로 구분. intro만있으면 기본 중앙정렬 -->
        <div
          v-if="MAKER_GNB === 10 || MAKER_GNB === 5"
          class="preview-con preview-intro"
          :class="[
            PREVIEW_INTRO.dim,
            PREVIEW_INTRO.copyrightPosition,
            PREVIEW_INTRO.position,
          ]"
        >
          <div class="preview-intro--background">
            <img
              :src="onLoadAssetsImage(PREVIEW_INTRO.bg, 'bg')"
              alt="background"
            />
          </div>
          <div v-if="MAKER_GNB === 10" class="preview-intro--logo">
            <img
              v-if="!PREVIEW_INTRO.logo && !LOGO_IMG"
              src="~/static/images/logo.svg"
            />
            <img v-if="LOGO_IMG" :src="LOGO_IMG" />
            <img
              v-if="PREVIEW_INTRO.logo && !LOGO_IMG"
              :src="onLoadAssetsImage(PREVIEW_INTRO.logo, 'logo')"
            />
          </div>
          <div class="preview-intro--menu">
            <div v-if="MAKER_GNB === 5" class="svg-button">
              <svg width="220" height="80">
                <rect
                  width="180"
                  height="46"
                  x="10"
                  y="10"
                  :fill="UISetting.mainColor ? UISetting.mainColor : '#eee'"
                  :rx="UISetting.button.round ? UISetting.button.round : '#eee'"
                  :stroke="
                    UISetting.button.strokeColor
                      ? UISetting.button.strokeColor
                      : '#eee'
                  "
                  :stroke-width="UISetting.button.border"
                />

                <defs>
                  <mask id="Mask">
                    <rect width="100%" height="100%" fill="white" />
                    <rect
                      :x="Number(UISetting.button.border) / 2 + 5"
                      :y="Number(UISetting.button.border) / 2 + 5"
                      width="185"
                      height="51"
                      fill="black"
                      :rx="
                        Number(UISetting.button.round) +
                        Number(UISetting.button.border) / 2
                      "
                    />
                  </mask>
                </defs>
                <rect
                  width="180"
                  height="46"
                  :x="
                    Number(UISetting.button.x) +
                    Number(UISetting.button.border) / 2 +
                    9
                  "
                  :y="
                    Number(UISetting.button.y) +
                    Number(UISetting.button.border) / 2 +
                    9
                  "
                  :fill="
                    UISetting.button.shadowColor
                      ? UISetting.button.shadowColor
                      : '#eee'
                  "
                  :rx="UISetting.button.round"
                  mask="url(#Mask)"
                />
              </svg>
              <div
                :class="`text ${UISetting.font}`"
                :style="`color:${UISetting.mainFontColor}`"
              >
                버튼 미리보기
              </div>
            </div>
            <template v-if="MAKER_GNB === 10">
              <div v-for="i in 4" :key="`button${i}`" class="svg-button">
                <svg width="220" height="80">
                  <rect
                    width="180"
                    height="46"
                    x="10"
                    y="10"
                    :fill="UISetting.mainColor ? UISetting.mainColor : '#eee'"
                    :rx="UISetting.button.round"
                    :stroke="UISetting.button.strokeColor"
                    :stroke-width="UISetting.button.border"
                  />

                  <defs>
                    <mask id="Mask1_1">
                      <rect width="100%" height="100%" fill="white" />
                      <rect
                        :x="Number(UISetting.button.border) / 2 + 5"
                        :y="Number(UISetting.button.border) / 2 + 5"
                        width="185"
                        height="51"
                        fill="black"
                        :rx="
                          Number(UISetting.button.round) +
                          Number(UISetting.button.border) / 2
                        "
                      />
                    </mask>
                  </defs>
                  <rect
                    width="180"
                    height="46"
                    :x="
                      Number(UISetting.button.x) +
                      Number(UISetting.button.border) / 2 +
                      9
                    "
                    :y="
                      Number(UISetting.button.y) +
                      Number(UISetting.button.border) / 2 +
                      9
                    "
                    :fill="UISetting.button.shadowColor"
                    :rx="UISetting.button.round"
                    mask="url(#Mask1_1)"
                  />
                </svg>
                <div
                  :class="`text ${UISetting.font}`"
                  :style="`color:${UISetting.mainFontColor}`"
                >
                  <template v-if="i === 1">시작하기</template>
                  <template v-if="i === 2">불러오기</template>
                  <template v-if="i === 3">등장인물</template>
                  <template v-if="i === 4">갤러리</template>
                </div>
              </div>
            </template>
            <!-- <button
              type="button"
              class="btn"
              :class="UISetting.font"
              :style="`box-shadow: ${UISetting.button.x}px ${UISetting.button.y}px 0 ${UISetting.button.shadowColor}; outline : ${UISetting.button.border}px solid ${UISetting.button.strokeColor}; background:${UISetting.mainColor}; color:${UISetting.mainFontColor}; border-radius:${UISetting.button.round}px`"
              @click="onclickDisplayShow('displayGame')"
            >
              시작하기
            </button>
            <button
              type="button"
              class="btn"
              :class="UISetting.font"
              :style="`box-shadow: ${UISetting.button.x}px ${UISetting.button.y}px 0 ${UISetting.button.shadowColor}; outline : ${UISetting.button.border}px solid ${UISetting.button.strokeColor}; background:${UISetting.mainColor}; color:${UISetting.mainFontColor}; border-radius:${UISetting.button.round}px`"
            >
              불러오기
            </button>
            <button
              type="button"
              class="btn"
              :class="UISetting.font"
              :style="`box-shadow: ${UISetting.button.x}px ${UISetting.button.y}px 0 ${UISetting.button.shadowColor}; outline : ${UISetting.button.border}px solid ${UISetting.button.strokeColor}; background:${UISetting.mainColor}; color:${UISetting.mainFontColor}; border-radius:${UISetting.button.round}px`"
              @click="onclickDisplayShow('displayProfile')"
            >
              등장인물
            </button>
            <button
              type="button"
              class="btn"
              :class="UISetting.font"
              :style="`box-shadow: ${UISetting.button.x}px ${UISetting.button.y}px 0 ${UISetting.button.shadowColor}; outline : ${UISetting.button.border}px solid ${UISetting.button.strokeColor}; background:${UISetting.mainColor}; color:${UISetting.mainFontColor}; border-radius:${UISetting.button.round}px`"
            >
              갤러리
            </button> -->
          </div>

          <div v-if="MAKER_GNB === 5" class="answer answer-multiple svg-window">
            <svg width="100%" height="80">
              <rect
                width="90%"
                height="50"
                x="10"
                y="10"
                :fill="UISetting.windowColor ? UISetting.windowColor : '#eee'"
                :rx="Number(UISetting.round) / 2"
                :stroke="UISetting.strokeColor"
                :stroke-width="UISetting.border"
              />

              <defs>
                <mask id="Mask2">
                  <rect width="100%" height="100%" fill="white" />
                  <rect
                    :x="Number(UISetting.border) / 2"
                    :y="Number(UISetting.border) / 2"
                    width="calc(90% + 10px)"
                    height="60"
                    fill="black"
                    :rx="
                      Number(UISetting.round) / 2 + Number(UISetting.border) / 2
                    "
                  />
                </mask>
              </defs>
              <rect
                width="90%"
                height="50"
                :x="Number(UISetting.x) + Number(UISetting.border) / 2 + 9"
                :y="Number(UISetting.y) + Number(UISetting.border) / 2 + 9"
                :fill="UISetting.shadowColor ? UISetting.shadowColor : '#eee'"
                :rx="Number(UISetting.round) / 2"
                mask="url(#Mask2)"
              />
            </svg>
            <div
              :class="`text ${UISetting.font}`"
              :style="`color:${UISetting.fontColor}`"
            >
              객/주관식 창 미리보기
            </div>
          </div>

          <!-- <div v-if="MAKER_GNB === 5" class="answer answer-multiple">
            <button
              type="button"
              class="btn"
              :class="UISetting.font"
              :style="
                UISetting.fontColor
                  ? `${windowColor()}; color:${UISetting.fontColor}`
                  : windowColor()
              "
            >
              객/주관식 창 미리보기
            </button>
          </div> -->
          <div
            v-if="MAKER_GNB !== 5"
            class="preview-intro--copy"
            :class="PREVIEW_INTRO.copyrightPosition"
          >
            <!-- {{ PREVIEW_INTRO.copyright }} -->
            {{
              PREVIEW_INTRO.copyright ? PREVIEW_INTRO.copyright : 'ⓒproject koo'
            }}
          </div>
        </div>
        <div
          v-if="
            MAKER_GNB === 1 ||
            MAKER_GNB === 4 ||
            MAKER_GNB === 5 ||
            MAKER_GNB === 3
          "
          class="preview-con icon"
          :style="`background:${UISetting.mainColor};border:${UISetting.button.border}px solid ${UISetting.button.strokeColor}`"
        >
          <button
            type="button"
            class="btn back"
            :class="{ wh: UISetting.icon === 'icon1' }"
          ></button>
          <button
            type="button"
            class="btn camera"
            :class="{ wh: UISetting.icon === 'icon1' }"
          ></button>
        </div>
        <div
          v-if="PREVIEW && (MAKER_GNB === 1 || MAKER_GNB === 3)"
          class="preview-con preview-img"
        >
          <!-- <div class="input-name" :class="UISetting.font">
            플레이어의 이름을 입력해주세요.
            <input type="text" class="input-text" />
            <button type="button" class="button sm" :style="`background:${UISetting.mainColor};border:${UISetting.button.border}px solid ${UISetting.button.strokeColor}`">확인</button>
          </div> -->
          <img
            v-if="PREVIEW.img.bg"
            :src="onLoadAssetsImage(PREVIEW.img.bg, 'bg')"
            alt=""
            class="background"
          />
          <div v-if="PREVIEW.img.cr && !PREVIEW.img.cr2" class="character-1">
            <img
              v-if="PREVIEW.img.cr"
              ref="characterImage"
              :src="onLoadAssetsImage(PREVIEW.img.cr, 'cr')"
              alt=""
              class="character"
              :class="PREVIEW.data.effect"
            />
          </div>
          <div v-if="PREVIEW.img.cr2" class="character-2">
            <img
              v-if="PREVIEW.img.cr"
              ref="characterImage"
              :src="onLoadAssetsImage(PREVIEW.img.cr, 'cr')"
              alt=""
              class="character"
              :class="PREVIEW.data.effect"
            />
            <img
              v-if="PREVIEW.img.cr2"
              ref="characterImage2"
              :src="onLoadAssetsImage(PREVIEW.img.cr2, 'cr')"
              alt=""
              class="character"
              :class="PREVIEW.data.effect2"
            />
          </div>
          <div v-if="cutType === 3" class="answer answer-multiple">
            <button
              type="button"
              class="btn"
              :class="UISetting.font"
              :style="
                UISetting.fontColor
                  ? `${windowColor()}; color:${UISetting.fontColor}`
                  : windowColor()
              "
            >
              {{ PREVIEW.data.questions.text_1 }}
            </button>
            <button
              type="button"
              class="btn"
              :class="UISetting.font"
              :style="
                UISetting.fontColor
                  ? `${windowColor()}; color:${UISetting.fontColor}`
                  : windowColor()
              "
            >
              {{ PREVIEW.data.questions.text_2 }}
            </button>
            <button
              type="button"
              class="btn"
              :class="UISetting.font"
              :style="
                UISetting.fontColor
                  ? `${windowColor()}; color:${UISetting.fontColor}`
                  : windowColor()
              "
            >
              {{ PREVIEW.data.questions.text_3 }}
            </button>
          </div>
          <div v-if="cutType === 4" class="answer answer-subjective">
            <div
              class="text"
              :class="UISetting.font"
              :style="
                UISetting.fontColor
                  ? `${windowColor()}; color:${UISetting.fontColor}`
                  : windowColor()
              "
            >
              {{ PREVIEW.data.subjectiveQuestion }}
            </div>
            <input
              type="text"
              class="input-text"
              :class="UISetting.font"
              placeholder="주관식 답변을 입력해주세요"
              :value="PREVIEW.data.answer"
              :style="`${windowColor()}; color:${UISetting.fontColor}`"
              readonly
            />
          </div>
          <div v-if="cutType < 3" class="dialogue" :style="windowColor()">
            <span
              v-if="PREVIEW.data.cr"
              class="name"
              :class="UISetting.font"
              :style="
                UISetting.mainColor
                  ? `background:${UISetting.mainColor};color:${
                      UISetting.mainFontColor
                    };border-radius:${Math.round(
                      Number(UISetting.button.round) / 2
                    )}px;
                    border:${UISetting.button.border}px solid ${
                      UISetting.button.strokeColor
                    }`
                  : 'background:#000;color:#fff'
              "
              >{{ PREVIEW.data.cr }}</span
            >
            <!-- prettier-ignore-start -->
            <p
              v-if="cutType === 1"
              ref="myLoadText"
              class="text"
              :class="UISetting.font"
              :style="UISetting.fontColor ? `color:${UISetting.fontColor}` : ''"
            >
              {{ PREVIEW.data.text }}
            </p>
            <p
              v-if="cutType === 2"
              ref="myLoadText"
              class="text"
              :class="UISetting.font"
              :style="UISetting.fontColor ? `color:${UISetting.fontColor}` : ''"
            >
              {{ PREVIEW.data.narration }}
            </p>
            <!-- prettier-ignore-end -->
          </div>
        </div>
        <div v-if="PREVIEW && MAKER_GNB === 5" class="preview-con preview-img">
          <div v-if="MAKER_GNB === 5" class="dialogue svg-window">
            <svg width="100%" height="150">
              <rect
                width="90%"
                height="120"
                x="10"
                y="10"
                :fill="UISetting.windowColor ? UISetting.windowColor : '#eee'"
                :rx="Number(UISetting.round) / 2"
                :stroke="UISetting.strokeColor"
                :stroke-width="UISetting.border"
              />

              <defs>
                <mask id="Mask3">
                  <rect width="100%" height="100%" fill="white" />
                  <rect
                    :x="Number(UISetting.border) / 2"
                    :y="Number(UISetting.border) / 2"
                    width="calc(90% + 10px)"
                    height="130"
                    fill="black"
                    :rx="
                      Number(UISetting.round) / 2 + Number(UISetting.border) / 2
                    "
                  />
                </mask>
              </defs>
              <rect
                width="90%"
                height="120"
                :x="Number(UISetting.x) + Number(UISetting.border) + 9"
                :y="Number(UISetting.y) + Number(UISetting.border) + 9"
                :fill="UISetting.shadowColor"
                :rx="Number(UISetting.round) / 2"
                mask="url(#Mask3)"
              />
            </svg>
            <div
              :class="`text ${UISetting.font}`"
              :style="`color:${UISetting.fontColor}`"
            >
              대사창 미리보기
            </div>
            <span
              class="name"
              :class="UISetting.font"
              :style="
                UISetting.mainColor
                  ? `background:${UISetting.mainColor};color:${
                      UISetting.mainFontColor
                    };border-radius:${Math.round(
                      Number(UISetting.button.round) / 2
                    )}px;
                    border:${UISetting.button.border}px solid ${
                      UISetting.button.strokeColor
                    }`
                  : 'background:#000;color:#fff'
              "
              >이름</span
            >
            <!-- <svg class="name" width="120" height="55">
              <rect
                width="100"
                height="35"
                x="10"
                y="10"
                :fill="UISetting.mainColor"
                :rx="UISetting.button.round"
                :stroke="UISetting.button.strokeColor"
                :stroke-width="UISetting.button.border"
              />
            </svg>
            <div
              :class="`text name ${UISetting.font}`"
              :style="`color:${UISetting.mainFontColor}`"
            >
              이름
            </div> -->
          </div>
          <div v-else class="dialogue" :style="windowColor()">
            <span
              class="name"
              :class="UISetting.font"
              :style="
                UISetting.mainColor
                  ? `background:${UISetting.mainColor};color:${
                      UISetting.mainFontColor
                    };border-radius:${Math.round(
                      Number(UISetting.button.round) / 2
                    )}px`
                  : 'background:#eee;color:#fff'
              "
              >이름</span
            >
            <p
              class="text"
              :class="UISetting.font"
              :style="UISetting.fontColor ? `color:${UISetting.fontColor}` : ''"
            >
              대사창 미리보기
            </p>
          </div>
        </div>

        <div
          v-show="MAKER_GNB === 4"
          ref="displayProfileDetail"
          class="preview-con preview-profile detail"
          :style="
            PREVIEW_PROFILE.background
              ? `background: ${PREVIEW_PROFILE.background}`
              : ''
          "
        >
          <!-- 배경 넣어주세요 -->
          <img
            v-if="PREVIEW.img.bg"
            :src="onLoadAssetsImage(PREVIEW.img.bg, 'bg')"
            alt=""
            class="background"
            width="100%"
            height="100%"
          />
          <!-- <p
            class="name"
            :class="UISetting.font"
            :style="
              UISetting.mainColor
                ? `background:${UISetting.mainColor};color:${
                    UISetting.mainFontColor
                  };border-radius:${Math.round(
                    Number(UISetting.button.round) / 2
                  )}px;
                    border:${UISetting.button.border}px solid ${
                    UISetting.button.strokeColor
                  }`
                : 'background:#000;color:#fff'
            "
          > -->
          <p class="name" :class="UISetting.font">
            {{ PREVIEW_PROFILE.name ? PREVIEW_PROFILE.name : '인물이름' }}
          </p>
          <div class="character">
            <img :src="onLoadAssetsImage(PREVIEW.img.cr, 'cr')" alt="" />
          </div>
          <div class="character head">
            <img
              v-if="!CROP_IMAGE && PREVIEW.img.head"
              width="100%"
              :src="onLoadAssetsImage(PREVIEW.img.head, 'cr')"
            />
            <img v-if="CROP_IMAGE" :src="CROP_IMAGE" />
          </div>
          <div class="profile">
            <p class="con" :class="UISetting.font">
              {{
                PREVIEW_PROFILE.discription
                  ? PREVIEW_PROFILE.discription.replaceAll('||n', '\n')
                  : '인물소개'
              }}
            </p>
          </div>
          <ul v-if="ASSETS && ASSETS.crList" class="face-list">
            <!-- {{
              ASSETS
            }} -->
            <li
              v-for="(v, i) in ASSETS.crList"
              :key="i"
              class="face-list--item"
            >
              <img :src="onLoadAssetsImage(v.h_img, 'cr')" alt="" />
            </li>
          </ul>
        </div>
        <img src="~/static/images/mockup.png" alt="" class="preview-mockup" />
      </div>
      <div
        v-if="MAKER_GNB === 1 || MAKER_GNB === 3"
        ref="buttonNav"
        class="buttons"
      >
        <el-tooltip class="item" effect="dark" content="배경" placement="top">
          <button
            type="button"
            class="btn icon3"
            :class="{ active: CONTENT_CODE === 1, done: PREVIEW.img.bg }"
            @click="onClickContent(1)"
          ></button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="인물" placement="top">
          <button
            type="button"
            class="btn icon1"
            :class="{ active: CONTENT_CODE === 2, done: PREVIEW.img.cr }"
            @click="onClickContent(2)"
          ></button>
        </el-tooltip>
        <el-tooltip
          class="item"
          effect="dark"
          content="두번째 인물"
          placement="top"
        >
          <button
            type="button"
            class="btn icon2"
            :class="{ active: CONTENT_CODE === 3, done: PREVIEW.img.cr2 }"
            @click="onClickContent(3)"
          ></button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="사운드" placement="top">
          <button
            type="button"
            class="btn icon4"
            :class="{ active: CONTENT_CODE === 4, done: PREVIEW.data.sr }"
            @click="onClickContent(4)"
          ></button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="대사" placement="top">
          <button
            type="button"
            class="btn icon5"
            :class="{ active: CONTENT_CODE === 5 }"
            @click="onClickContent(5)"
          ></button>
        </el-tooltip>
      </div>
    </div>
    <div
      class="preview-save"
      :class="{ left: MAKER_GNB === 1 || MAKER_GNB === 3 }"
    >
      마지막 저장
      <span v-if="SAVE_DATETIME" class="time">{{
        SAVE_DATETIME | moment('YY.MM.DD HH:mm:ss')
      }}</span>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import { kooLogin } from '~/config/util'
export default {
  props: {
    cropImage: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      sceneData: [],
      params: {},
      paramsDelete: {},
      rangeValue1: 50,
      rangeValue2: 50,
    }
  },
  computed: {
    ...mapState([
      'SCENE_CODE',
      'PREVIEW',
      'cutType',
      'SAVE_DATETIME',
      'CUT_LIST',
      'CUT_CODE',
      'MAKER_GNB',
      'UISetting',
      'CONTENT_CODE',
      'PREVIEW_PROFILE',
      'PREVIEW_INTRO',
      'PROJECT_ID',
      'CHAPTER_INDEX',
      'CROP_IMAGE',
      'SCENE_INDEX',
      'ENDING_CODE',
      'LOGO_IMG',
      'ASSETS',
      'MY_NAME',
    ]),
  },
  watch: {
    'PREVIEW.data.effect': {
      handler(value) {
        if (value) {
          setTimeout(() => {
            this.$refs.characterImage.classList.remove('ani-vibration')
          }, 400)
        }
      },
    },
    'PREVIEW.data.effect2': {
      handler(value) {
        if (value) {
          setTimeout(() => {
            this.$refs.characterImage2.classList.remove('ani-vibration')
          }, 400)
        }
      },
    },
    // PREVIEW: {
    //   handler(value) {
    //     // chaterInsert
    //     console.log(value)
    //   },
    // },
    // SCENE_CODE: {
    //   handler(value) {
    //     if (value) {

    //     }
    //   },
    //   immediate: true,
    // },
  },
  mounted() {
    this.$nextTick(() => {
      this.user_idx = kooLogin('user_idx')
    })
  },
  methods: {
    ...mapMutations(['MUTATIONS_CONTENT_CODE', 'MUTATIONS_LOADING_INIT']),
    ...mapActions(['ACTION_AXIOS_GET', 'ACTION_AXIOS_POST']),
    onClickContent(e) {
      // const bn = this.$refs.buttonNav.children
      // for (let i = 0; i < bn.length; i++) {
      //   bn[i].classList.remove('active')
      // }
      // bn[e - 1].classList.add('active')
      this.MUTATIONS_CONTENT_CODE(e)
    },
    windowColor() {
      let style = ''
      if (this.UISetting.windowColor) {
        style += `background:${this.UISetting.windowColor};`
      }
      if (this.UISetting.strokeColor) {
        style += `outline : ${this.UISetting.border}px solid ${this.UISetting.strokeColor};`
      }
      if (this.UISetting.round) {
        style += `border-radius:${this.UISetting.round}px;`
      }
      if (this.UISetting.shadowColor) {
        style += `box-shadow: ${
          Number(this.UISetting.x) + Number(this.UISetting.border)
        }px ${Number(this.UISetting.y) + Number(this.UISetting.border)}px 0 ${
          this.UISetting.shadowColor
        };`
      }
      // style += `box-shadow:
      // ${this.UISetting.round ? this.UISetting.round : 0}
      // ${this.UISetting.round ? this.UISetting.round : 0}
      // ${this.UISetting.round ? this.UISetting.round : 0}
      // ${this.UISetting.round ? this.UISetting.round : 0}
      //  #ff0, 10px 10px 10px 10px #f00`
      console.log(style)
      return style
    },
    onLoadAssetsImage(v, f) {
      return `${process.env.VUE_APP_IMAGE}/${f}/${v}`
    },
    onClickCutDelete(v) {
      // return console.log(
      //   this.CUT_LIST.idx[this.CUT_CODE],
      //   this.CUT_CODE,
      //   this.MAKER_GNB
      // )
      this.MUTATIONS_LOADING_INIT()
      if (this.MAKER_GNB === 3) {
        this.paramsDelete.s_code = this.ENDING_CODE
        this.paramsDelete.ending = 'Y'
      } else {
        this.paramsDelete.s_code = this.SCENE_CODE
      }
      this.paramsDelete.type = 'cutDelete'
      this.paramsDelete.idx = this.CUT_LIST.idx[this.CUT_CODE]
      this.paramsDelete.secretKey = this.PROJECT_ID
      this.paramsDelete.user_idx = kooLogin('user_idx')
      this.paramsDelete.apiKey = process.env.API_KEY

      console.log('paramsDelete', this.paramsDelete)
      this.ACTION_AXIOS_GET(this.paramsDelete)
    },
  },
}
</script>

<style lang="scss">
.svg-button,
.svg-window {
  position: relative;
  left: -10px;
  top: -10px;
  width: 180px;
  height: 46px;
  margin-bottom: 20px;
  .text {
    position: absolute;
    left: 10px;
    top: 10px;
    z-index: 1;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.6rem;
  }
  svg {
    position: absolute;
  }
}
.svg-window {
  height: 50px;
  .text {
    width: calc(100% - 25px);
  }
  &.dialogue {
    top: unset;
    bottom: 40px;
    left: 5px;
    width: 90%;
    .name {
      width: 120px;
      left: 25px;
      top: 13px;
      height: 40px;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
    }
    .text {
      font-size: 1.4rem;
      justify-content: flex-start;
      left: 45px;
      top: 55px;
      align-items: flex-start;
    }
  }
}
.ani-vibration {
  animation: vibration 0.1s infinite;
  -webkit-animation: vibration 0.1s infinite;
}
.ani-fade {
  animation: fade 0.5s forwards;
  -webkit-animation: fade 0.5s forwards;
}
.ani-left {
  animation: left 0.5s forwards;
  -webkit-animation: left 0.5s forwards;
}
.ani-right {
  animation: right 0.5s forwards;
  -webkit-animation: right 0.5s forwards;
}
.ani-bottom {
  animation: bottom 0.5s forwards;
  -webkit-animation: bottom 0.5s forwards;
}
@keyframes vibration {
  from {
    transform: rotate(1deg);
  }
  to {
    transform: rotate(-1deg);
  }
}
@keyframes fade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes left {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}
@keyframes right {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}
@keyframes bottom {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}
</style>
