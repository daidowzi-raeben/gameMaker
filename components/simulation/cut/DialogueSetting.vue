<template>
  <div class="setting">
    <!-- <ImageController /> -->
    <div class="setting-con setting-talk">
      <div class="setting-tit">대사 입력</div>
      <div class="setting-info">
        상황에 따라 대사의 상대와 종류를 변경할 수 있습니다.
      </div>
      <div class="tab-list">
        <button
          type="button"
          class="tab-list--btn"
          :class="{ active: cutType === 1 }"
          @click="onClickChangeCutType(1)"
        >
          일반대사
        </button>
        <button
          type="button"
          class="tab-list--btn"
          :class="{ active: cutType === 2 }"
          @click="onClickChangeCutType(2)"
        >
          나레이션
        </button>
        <button
          type="button"
          class="tab-list--btn"
          :class="{ active: cutType === 3 }"
          @click="onClickChangeCutType(3)"
        >
          객관식
        </button>
        <button
          type="button"
          class="tab-list--btn"
          :class="{ active: cutType === 4 }"
          @click="onClickChangeCutType(4)"
        >
          주관식
        </button>
      </div>
      <swiper
        v-if="
          SCENE_DATA_CHARACTER && SCENE_DATA_CHARACTER.jsonData && cutType === 1
        "
        :options="swiperOptionSelectCharacter"
        class="tab-list type2"
      >
        <swiper-slide
          v-for="(v, i) in SCENE_DATA_CHARACTER.jsonData"
          :key="'SCENE_DATA_CHARACTER' + i"
          class="tab-list--item"
        >
          <label class="radio" @change="onCiickDataCr(v.name)">
            <input
              type="radio"
              name="character"
              :checked="v.name === PREVIEW.data.cr"
              :value="SCENE_DATA_CHARACTER.idx[i]"
            />
            <span>{{ v.name }}</span>
          </label>
        </swiper-slide>
        <div slot="button-prev" class="swiper-button-prev"></div>
        <div slot="button-next" class="swiper-button-next"></div>
      </swiper>
      <div
        v-if="cutType === 1 || cutType === 2 || cutType === 4"
        class="insert-wrap"
      >
        <textarea
          v-if="cutType === 1"
          rows="3"
          placeholder="대사를 입력해 주세요. 세 줄까지만 입력 가능합니다."
          :value="PREVIEW.data.text"
          @input="onInputDataText"
        ></textarea>
        <textarea
          v-if="cutType === 2"
          rows="3"
          placeholder="나레이션을 입력해 주세요. 세 줄까지만 입력 가능합니다."
          :value="PREVIEW.data.narration"
          @input="onInputDataNarration"
        ></textarea>
        <textarea
          v-if="cutType === 4"
          rows="3"
          placeholder="질문을 입력해 주세요. 세 줄까지만 입력 가능합니다."
          :value="PREVIEW.data.subjectiveQuestion"
          @input="onInputDataSubjectiveQuestion"
        ></textarea>
        <div class="insert-set">
          <button
            v-show="!pointSettingShow && !scenarioSettingShow"
            type="button"
            class="btn point"
            @click="onClickPointSetting"
          >
            포인트 조건
          </button>
          <div v-show="pointSettingShow" class="set point-set">
            <select class="input-select">
              <option></option>
              <option></option>
            </select>
            <input type="number" class="input-number" min="1" max="100" />
            <span class="text">포인트</span>
            <select class="input-select">
              <option></option>
              <option></option>
            </select>
            <button
              type="button"
              class="save"
              @click="onClickPointSetting('save')"
            >
              닫기
            </button>
          </div>
          <button
            v-show="!pointSettingShow && !scenarioSettingShow"
            type="button"
            class="btn scenario"
            @click="onClickScenarioSetting"
          >
            시나리오 연결
          </button>
          <div v-show="scenarioSettingShow" class="set scenario-set">
            <select class="input-select">
              <option></option>
              <option></option>
            </select>
            <button
              type="button"
              class="save"
              @click="onClickScenarioSetting('save')"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
      <div v-if="cutType === 3 || cutType === 4" class="timer">
        <button type="button" class="btn set">타이머 설정</button>
        <div class="btn-wrap">
          <label class="btn">
            <input
              type="checkbox"
              :checked="timerSettingSecond === 5"
              @change="onChangeTimerSetting(5)"
            />
            <span class="check-text">5초</span>
          </label>
          <label class="btn">
            <input
              type="checkbox"
              :checked="timerSettingSecond === 10"
              @change="onChangeTimerSetting(10)"
            />
            <span class="check-text">10초</span>
          </label>
          <label class="btn">
            <input
              type="checkbox"
              :checked="timerSettingSecond === 15"
              @change="onChangeTimerSetting(15)"
            />
            <span class="check-text">15초</span>
          </label>
          <label class="btn">
            <input
              type="checkbox"
              :checked="timerSettingSecond === 20"
              @change="onChangeTimerSetting(20)"
            />
            <span class="check-text">20초</span>
          </label>
          <label class="btn">
            <input
              type="checkbox"
              :checked="timerSettingSecond === 30"
              @change="onChangeTimerSetting(30)"
            />
            <span class="check-text">30초</span>
          </label>
        </div>
      </div>
      <div v-if="cutType === 3">
        <div v-for="itemQuestion in 3" :key="`question${itemQuestion}`">
          <label class="label">답변{{ itemQuestion }}</label>
          <div class="insert-answer">
            <input
              type="text"
              class="input-text"
              :value="PREVIEW.data.questions.text[itemQuestion - 1]"
              @input="onInputDataQuestions(itemQuestion, $event)"
            />
            <button
              type="button"
              class="btn link"
              :class="{ active: isActiveEventLink }"
              @click="onClickIsActiveEventLink"
            ></button>
            <div v-show="isActiveEventLink" class="event-con">
              <div class="tab-list sm">
                <button
                  :id="`isActivePointTab${itemQuestion}`"
                  type="button"
                  class="tab-list--btn active"
                  @click="onClickTabActive(itemQuestion, $event)"
                >
                  포인트 설정
                </button>
                <button
                  :id="`isActiveScenarioTab${itemQuestion}`"
                  type="button"
                  class="tab-list--btn"
                  @click="onClickTabActive(itemQuestion, $event)"
                >
                  시나리오 연결
                </button>
              </div>
              <div :id="`pointTab${itemQuestion}`" class="set point-set active">
                <select
                  v-if="SCENE_DATA_CHARACTER && SCENE_DATA_CHARACTER.jsonData"
                  class="input-select"
                  :value="PREVIEW.data.questionsPoint[0].pointCr"
                  @change="dataPointUpdate('pointCr0', $event)"
                >
                  <option :value="null">선택안함</option>
                  <option
                    v-for="(v, i) in SCENE_DATA_CHARACTER.jsonData"
                    :key="'SCENE_DATA_CHARACTER' + i"
                    :value="v.name"
                  >
                    {{ v.name }}
                  </option>
                </select>
                <select v-else disabled class="input-select">
                  <option>캐릭터 없음</option>
                </select>
                <input type="number" class="input-number" min="1" max="100" />
                <span class="text">포인트</span>
                <select
                  class="input-select"
                  :value="PREVIEW.data.questionsPoint[1].pointType"
                  @change="dataPointUpdate('pointType1', $event)"
                >
                  <option :value="null">선택</option>
                  <option value="P">증가</option>
                  <option value="M">감소</option>
                </select>
              </div>
              <div :id="`scenarioTab${itemQuestion}`" class="set scenario-set">
                <select
                  v-if="CUT_LIST && CUT_LIST.jsonData"
                  class="input-select"
                  :value="PREVIEW.data.questionsPoint[0].nextBtn"
                  @change="dataPointUpdate('nextBtn0', $event)"
                >
                  <option :value="null">선택안함</option>
                  <option
                    v-for="(v, i) in CUT_LIST.jsonData"
                    :key="CUT_LIST.idx[i]"
                    :value="CUT_LIST.idx[i]"
                  >
                    {{ CUT_LIST.jsonData.length - i }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <!-- <label v-if="cutType === 4" class="label">질문</label>
        <div v-if="cutType === 4" class="insert-wrap">
          <textarea
            rows="3"
            :value="PREVIEW.data.subjectiveQuestion"
            @input="onInputDataSubjectiveQuestion"
          ></textarea>
        </div>
        <div v-if="cutType === 3" class="insert-wrap">
          <input
            type="text"
            placeholder="객관식 선택 문항을 작성해 주세요"
            class="input-text"
            :value="PREVIEW.data.questions.text[0]"
            @input="onInputDataQuestions(0, $event)"
          />
          <div class="insert-set">
            <button
              v-show="!pointSettingShow"
              type="button"
              class="btn point"
              @click="onClickPointSetting('set')"
            >
              포인트 설정
            </button>
            <div v-show="pointSettingShow" class="set point-set">
              <select
                v-if="SCENE_DATA_CHARACTER && SCENE_DATA_CHARACTER.jsonData"
                class="input-select"
                :value="PREVIEW.data.questionsPoint[0].pointCr"
                @change="dataPointUpdate('pointCr0', $event)"
              >
                <option :value="null">선택안함</option>
                <option
                  v-for="(v, i) in SCENE_DATA_CHARACTER.jsonData"
                  :key="'SCENE_DATA_CHARACTER' + i"
                  :value="v.name"
                >
                  {{ v.name }}
                </option>
              </select>
              <select v-else disabled class="input-select">
                <option>캐릭터 없음</option>
              </select>
              <input
                type="number"
                class="input-number"
                :value="PREVIEW.data.questionsPoint[0].point"
                @input="dataPointUpdate('point0', $event)"
              />
              <span class="text">포인트</span>
              <select
                class="input-select"
                :value="PREVIEW.data.questionsPoint[0].pointType"
                @change="dataPointUpdate('pointType0', $event)"
              >
                <option :value="null">선택</option>
                <option value="P">증가</option>
                <option value="M">감소</option>
              </select>
              <button
                type="button"
                class="save"
                @click="onClickPointSetting('save')"
              >
                닫기
              </button>
            </div>
            <button
              v-show="!scenarioSettingShow"
              type="button"
              class="btn scenario"
              @click="onClickScenarioSetting('set')"
            >
              시나리오 연결
            </button>
            <div v-show="scenarioSettingShow" class="set scenario-set">
              <select
                v-if="CUT_LIST && CUT_LIST.jsonData"
                class="input-select"
                :value="PREVIEW.data.questionsPoint[0].nextBtn"
                @change="dataPointUpdate('nextBtn0', $event)"
              >
                <option :value="null">선택안함</option>
                <option
                  v-for="(v, i) in CUT_LIST.jsonData"
                  :key="CUT_LIST.idx[i]"
                  :value="CUT_LIST.idx[i]"
                >
                  {{ CUT_LIST.jsonData.length - i }}
                </option>
              </select>
              <button
                type="button"
                class="save"
                @click="onClickScenarioSetting('save')"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
        <div v-if="cutType === 3" class="insert-wrap">
          <input
            type="text"
            placeholder="객관식 선택 문항을 작성해 주세요"
            class="input-text"
            :value="PREVIEW.data.questions.text[1]"
            @input="onInputDataQuestions(1, $event)"
          />
          <div class="insert-set">
            <button
              v-show="!pointSettingShow"
              type="button"
              class="btn point"
              @click="onClickPointSetting('set')"
            >
              포인트 설정
            </button>
            <div v-show="pointSettingShow" class="set point-set">
              <select
                v-if="SCENE_DATA_CHARACTER && SCENE_DATA_CHARACTER.jsonData"
                class="input-select"
                :value="PREVIEW.data.questionsPoint[1].pointCr"
                @change="dataPointUpdate('pointCr1', $event)"
              >
                <option :value="null">선택안함</option>
                <option
                  v-for="(v, i) in SCENE_DATA_CHARACTER.jsonData"
                  :key="'SCENE_DATA_CHARACTER' + i"
                  :value="v.name"
                >
                  {{ v.name }}
                </option>
              </select>
              <select v-else disabled class="input-select">
                <option>캐릭터 없음</option>
              </select>
              <input
                type="number"
                class="input-number"
                :value="PREVIEW.data.questionsPoint[1].point"
                @input="dataPointUpdate('point1', $event)"
              />
              <span class="text">포인트</span>
              <select
                class="input-select"
                :value="PREVIEW.data.questionsPoint[1].pointType"
                @change="dataPointUpdate('pointType1', $event)"
              >
                <option :value="null">선택</option>
                <option value="P">증가</option>
                <option value="M">감소</option>
              </select>
              <button
                type="button"
                class="save"
                @click="onClickPointSetting('save')"
              >
                닫기
              </button>
            </div>
            <button
              v-show="!scenarioSettingShow"
              type="button"
              class="btn scenario"
              @click="onClickScenarioSetting('set')"
            >
              시나리오 연결
            </button>
            <div v-show="scenarioSettingShow" class="set scenario-set">
              <select
                v-if="CUT_LIST && CUT_LIST.jsonData"
                class="input-select"
                :value="PREVIEW.data.questionsPoint[1].nextBtn"
                @change="dataPointUpdate('nextBtn1', $event)"
              >
                <option :value="null">선택안함</option>
                <option
                  v-for="(v, i) in CUT_LIST.jsonData"
                  :key="CUT_LIST.idx[i]"
                  :value="CUT_LIST.idx[i]"
                >
                  {{ CUT_LIST.jsonData.length - i }}
                </option>
              </select>
              <button
                type="button"
                class="save"
                @click="onClickScenarioSetting('save')"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
        <div v-if="cutType === 3" class="insert-wrap">
          <input
            type="text"
            placeholder="객관식 선택 문항을 작성해 주세요"
            class="input-text"
            :value="PREVIEW.data.questions.text[2]"
            @input="onInputDataQuestions(2, $event)"
          />
          <div class="insert-set">
            <button
              v-show="!pointSettingShow"
              type="button"
              class="btn point"
              @click="onClickPointSetting('set')"
            >
              포인트 설정
            </button>
            <div v-show="pointSettingShow" class="set point-set">
              <select
                v-if="SCENE_DATA_CHARACTER && SCENE_DATA_CHARACTER.jsonData"
                class="input-select"
                :value="PREVIEW.data.questionsPoint[2].pointCr"
                @change="dataPointUpdate('pointCr2', $event)"
              >
                <option :value="null">선택안함</option>
                <option
                  v-for="(v, i) in SCENE_DATA_CHARACTER.jsonData"
                  :key="'SCENE_DATA_CHARACTER' + i"
                  :value="v.name"
                >
                  {{ v.name }}
                </option>
              </select>
              <select v-else disabled class="input-select">
                <option>캐릭터 없음</option>
              </select>
              <input
                type="number"
                class="input-number"
                :value="PREVIEW.data.questionsPoint[2].point"
                @input="dataPointUpdate('point2', $event)"
              />
              <span class="text">포인트</span>
              <select
                class="input-select"
                :value="PREVIEW.data.questionsPoint[2].pointType"
                @change="dataPointUpdate('pointType2', $event)"
              >
                <option :value="null">선택</option>
                <option value="P">증가</option>
                <option value="M">감소</option>
              </select>
              <button
                type="button"
                class="save"
                @click="onClickPointSetting('save')"
              >
                닫기
              </button>
            </div>
            <button
              v-show="!scenarioSettingShow"
              type="button"
              class="btn scenario"
              @click="onClickScenarioSetting('set')"
            >
              시나리오 연결
            </button>
            <div v-show="scenarioSettingShow" class="set scenario-set">
              <select
                v-if="CUT_LIST && CUT_LIST.jsonData"
                class="input-select"
                :value="PREVIEW.data.questionsPoint[2].nextBtn"
                @change="dataPointUpdate('nextBtn2', $event)"
              >
                <option :value="null">선택안함</option>
                <option
                  v-for="(v, i) in CUT_LIST.jsonData"
                  :key="CUT_LIST.idx[i]"
                  :value="CUT_LIST.idx[i]"
                >
                  {{ CUT_LIST.jsonData.length - i }}
                </option>
              </select>
              <button
                type="button"
                class="save"
                @click="onClickScenarioSetting('save')"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
        <label v-if="cutType === 4" class="label">정답</label>
        <div v-if="cutType !== 3" class="insert-wrap">
          <textarea
            v-if="cutType === 4"
            rows="3"
            :value="PREVIEW.data.answer"
            @input="onInputDatAnswer"
          ></textarea>
          <textarea
            v-if="cutType === 1"
            placeholder="대사를 입력해 주세요. 대사는 세줄까지만 입력가능합니다."
            rows="3"
            :value="PREVIEW.data.text"
            @input="onInputDataText"
          ></textarea>
          <textarea
            v-if="cutType === 2"
            placeholder="나레이션을 입력해 주세요"
            rows="3"
            :value="PREVIEW.data.narration"
            @input="onInputDataNarration"
          ></textarea>
          <div class="insert-set">
            <button
              v-show="
                (!pointSettingShow && cutType !== 1) || detailSettingButton
              "
              type="button"
              class="btn point"
              @click="onClickPointSetting('set')"
            >
              포인트 조건
            </button>
            <div
              v-show="pointSettingShow && cutType === 1"
              class="set point-set"
            >
              <select
                v-if="SCENE_DATA_CHARACTER && SCENE_DATA_CHARACTER.jsonData"
                class="input-select"
                @change="dataPointUpdate('pointCr', $event)"
              >
                <option :value="null">인물</option>
                <option
                  v-for="(v, i) in SCENE_DATA_CHARACTER.jsonData"
                  :key="'SCENE_DATA_CHARACTER' + i"
                >
                  {{ v.name }}
                </option>
              </select>
              <select v-else disabled class="input-select">
                <option>캐릭터 없음</option>
              </select>
              <input
                type="number"
                class="input-number"
                @input="dataPointUpdate('point', $event)"
              />
              <span class="text">포인트</span>
              <select
                class="input-select"
                @change="dataPointUpdate('pointType', $event)"
              >
                <option :value="null">선택</option>
                <option value="P">이상일때</option>
                <option value="P">이하일때</option>
              </select>
              <button
                type="button"
                class="save"
                @click="onClickPointSetting('save')"
              >
                닫기
              </button>
            </div>
            <button
            v-show="(!pointSettingShow && cutType !== 1)"
            type="button"
            class="btn point"
            @click="onClickPointSetting('set')"
          >
            포인트 조건
          </button>
          <div v-show="pointSettingShow && cutType !== 1" class="set point-set">
            <select
              v-if="SCENE_DATA_CHARACTER && SCENE_DATA_CHARACTER.jsonData"
              class="input-select"
              @change="dataPointUpdate('pointCr', $event)"
            >
              <option :value="null">선택안함</option>
              <option
                v-for="(v, i) in SCENE_DATA_CHARACTER.jsonData"
                :key="'SCENE_DATA_CHARACTER' + i"
              >
                {{ v.name }}
              </option>
            </select>
            <select v-else disabled class="input-select">
              <option>캐릭터 없음</option>
            </select>
            <input
              type="number"
              class="input-number"
              @input="dataPointUpdate('point', $event)"
            />
            <span class="text">포인트</span>
            <select
              class="input-select"
              @change="dataPointUpdate('pointType', $event)"
            >
              <option :value="null">선택</option>
              <option value="P">증가</option>
              <option value="M">감소</option>
            </select>
            <button
              type="button"
              class="save"
              @click="onClickPointSetting('save')"
            >
              닫기
            </button>
          </div>
            <button
              v-show="!scenarioSettingShow && detailSettingButton"
              type="button"
              class="btn scenario"
              @click="onClickScenarioSetting('set')"
            >
              시나리오 연결
            </button>
            <div v-show="scenarioSettingShow" class="set scenario-set">
              <select v-if="SCENE_DATA" class="input-select">
                <option
                  v-for="(v, i) in SCENE_DATA"
                  :key="i"
                  :value="v.timestamp"
                >
                  {{ v.tit }}
                </option>
              </select>
              <select v-else disabled class="input-select">
                <option>시나리오 없음</option>
              </select>
              <select class="input-select">
                <option>챕터2</option>
                <option>챕터2</option>
              </select>
              <select
                v-if="CUT_LIST && CUT_LIST.jsonData"
                class="input-select"
                :value="eventCut"
              >
                <option :value="null">선택안함</option>
                <option
                  v-for="(v, i) in CUT_LIST.jsonData"
                  :key="CUT_LIST.idx[i]"
                  :value="CUT_LIST.idx[i]"
                >
                  {{ CUT_LIST.jsonData.length - i }}
                </option>
              </select>
              <button
                type="button"
                class="save"
                @click="onClickScenarioSetting('save')"
              >
                닫기
              </button>
            </div>
          </div>
        </div> -->
      </div>
      <div v-if="cutType === 4">
        <label class="label">질문</label>
        <label class="label">답변</label>
        <div class="insert-answer">
          <input
            type="text"
            class="input-text"
            :value="PREVIEW.data.answer"
            @input="onInputDatAnswer"
          />
          <button
            type="button"
            class="btn link"
            :class="{ active: isActiveEventLink }"
            @click="onClickIsActiveEventLink"
          ></button>
          <div v-show="isActiveEventLink" class="event-con">
            <div class="tab-list sm">
              <button
                id="isActivePointTab4"
                type="button"
                class="tab-list--btn active"
                @click="onClickTabActive(4, $event)"
              >
                포인트 설정
              </button>
              <button
                id="isActiveScenarioTab4"
                type="button"
                class="tab-list--btn"
                @click="onClickTabActive(4, $event)"
              >
                시나리오 연결
              </button>
            </div>
            <div id="pointTab4" class="set point-set active">
              <select
                v-if="SCENE_DATA_CHARACTER && SCENE_DATA_CHARACTER.jsonData"
                class="input-select"
                :value="PREVIEW.data.questionsPoint[0].pointCr"
                @change="dataPointUpdate('pointCr0', $event)"
              >
                <option :value="null">선택안함</option>
                <option
                  v-for="(v, i) in SCENE_DATA_CHARACTER.jsonData"
                  :key="'SCENE_DATA_CHARACTER' + i"
                  :value="v.name"
                >
                  {{ v.name }}
                </option>
              </select>
              <select v-else disabled class="input-select">
                <option>캐릭터 없음</option>
              </select>
              <input type="number" class="input-number" min="1" max="100" />
              <span class="text">포인트</span>
              <select
                class="input-select"
                :value="PREVIEW.data.questionsPoint[1].pointType"
                @change="dataPointUpdate('pointType1', $event)"
              >
                <option :value="null">선택</option>
                <option value="P">증가</option>
                <option value="M">감소</option>
              </select>
            </div>
            <div id="scenarioTab4" class="set scenario-set">
              <select
                v-if="CUT_LIST && CUT_LIST.jsonData"
                class="input-select"
                :value="PREVIEW.data.questionsPoint[0].nextBtn"
                @change="dataPointUpdate('nextBtn0', $event)"
              >
                <option :value="null">선택안함</option>
                <option
                  v-for="(v, i) in CUT_LIST.jsonData"
                  :key="CUT_LIST.idx[i]"
                  :value="CUT_LIST.idx[i]"
                >
                  {{ CUT_LIST.jsonData.length - i }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="text-center">
      <button
        v-if="CUT_CODE === 0"
        class="button md btn-primary"
        @click="onSubmitCutData"
      >
        대사 추가
      </button>
      <button class="button md btn-l-grey" @click="onSubmitCutDataUpdate">
        수정
      </button>
      <button
        v-if="CUT_LIST.idx && CUT_LIST.idx.length > 0 && CUT_CODE > 0"
        class="button md btn-blue"
        @click="onSubmitCutDataAdd"
      >
        다음컷에 추가
      </button>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import { kooLogin } from '~/config/util'
export default {
  data() {
    return {
      params: {},
      paramsPreview: {},
      paramsList: {},
      cutIndex: 0,
      eventCut: 3,
      cuts: [
        {
          index: 0,
          type: '0_1',
        },
      ],

      cutCode: '',
      tempInputData: {
        bg: [],
        cr: [],
        crName: [],
        text: [],
        effect: [],
      }, // input data bind
      sceneData: [],

      swiperOptionSelectCharacter: {
        allowTouchMove: false,
        loop: false,
        slidesPerView: 'auto',
        slidesPerGroup: 4,
        mousewheel: {
          draggable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      },
      swiperOptionCutList: {
        loop: false,
        slidesPerView: 4,
        slidesPerGroup: 4,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      },

      cutListShow: false,
      // cutType: 1,
      rightContentShow: false,
      detailSettingButton: true,
      cutData: [],
      rowIdx: [],
      questions: 1,
      questionsText: [],
      questionsPoint: [
        {
          pointType: null,
          pointCr: null,
          point: null,
          nextBtn: null,
        },
        {
          pointType: null,
          pointCr: null,
          point: null,
          nextBtn: null,
        },
        {
          pointType: null,
          pointCr: null,
          point: null,
          nextBtn: null,
        },
      ],
      timerSettingSecond: 0,
      isActiveEventLink: false,
      isActivePointTab: true,
      isActiveScenarioTab: false,
      pointSettingShow: false,
      scenarioSettingShow: false,
    }
  },
  computed: {
    ...mapState([
      'LOGIN',
      'LOADING',
      'SCENE_DATA',
      'SCENE_CODE',
      'SCENE_INDEX',
      'CHAPTER_INDEX',
      'ASSETS',
      'SCENE_DATA_CHARACTER',
      'PREVIEW',
      'PROJECT_ID',
      'CUT_LIST',
      'cutType',
      'CUT_CODE',
    ]),
  },
  // watch: {
  //   tempInputData: {
  //     handler(value) {
  //       console.log('===========> watch tempInputData', value)
  //     },
  //     immediate: true,
  //   },
  // },
  mounted() {
    // cutList
    // this.$nextTick(() => {
    //   this.SCENE_DATA.forEach((e, i) => {
    //     e.chapters.forEach((v, k) => {
    //       console.log('=================', v)
    //     })
    //   })
    // })
    if (this.SCENE_CODE) {
      this.paramsList.gc_timestamp = this.SCENE_CODE
      this.paramsList.type = 'cutList'
      this.paramsList.secretKey = this.PROJECT_ID
      this.paramsList.user_idx = kooLogin('user_idx')
      this.paramsList.apiKey = process.env.API_KEY
      console.log(this.SCENE_CODE)
    }
    this.$nextTick(() => {
      if (this.CUT_LIST && this.CUT_LIST.jsonData) {
        this.MUTATIONS_CONTENT_CODE(5)
      }
    })
  },
  methods: {
    ...mapMutations([
      'MUTATIONS_SCENE_DATA',
      'MUTATIONS_ASSETS_DATA_CR',
      'MUTATIONS_ASSETS_DATA_TEXT',
      'MUTATIONS_CHAPTER_DEATILE_INIT',
      'MUTATIONS_ASSETS_INIT',
      'MUTATIONS_CUT_LIST_GET_DATA_DETAIL',
      'MUTATIONS_CUT_LIST_FIRST',
      'MUTATIONS_CUT_LIST_ADD',
      'MUTATIONS_ASSETS_INIT_TEXT',
      'MUTATIONS_ASSETS_DATA_NARRATION',
      'MUTATIONS_CUT_TYPE',
      'MUTATIONS_PREVIEW_POINT',
      'MUTATIONS_PREVIEW_POINT_CR',
      'MUTATIONS_PREVIEW_POINT_TYPE',
      'MUTATIONS_ASSETS_DATA_QUESTIONS',
      'MUTATIONS_ASSETS_DATA_ANSWER',
      'MUTATIONS_PREVIEW_QUESTIONS_POINT',
      'MUTATIONS_PREVIEW_TIMER',
      'MUTATIONS_ASSETS_DATA_SUBJECTIVE',
      'MUTATIONS_LOADING_INIT',
      'MUTATIONS_PREVIEW_END_TYPE',
      'MUTATIONS_CONTENT_CODE',
    ]),
    ...mapActions(['ACTION_AXIOS_GET', 'ACTION_AXIOS_POST']),
    onClickCutAdd() {
      this.cutIndex++
      this.cuts.push({
        index: this.cutIndex,
        type: this.cutIndex + '_1',
      })
      //   this.$emit(
      //     'myLoadBgImage',
      //     'https://img.lovepik.com/background/20211102/medium/lovepik-banff-national-park-mobile-wallpaper-canada-background-image_400706001.jpg'
      //   )
      //   this.$emit(
      //     'myLoadCrImage',
      //     'https://cdn.pixabay.com/photo/2013/07/12/13/27/man-147091_960_720.png'
      //   )
      //   this.$emit('myLoadText', '')
      //   this.$emit('myLoadFocus', `CUT CODE : ${this.cutIndex}`)
      console.log(this.cutIndex)
    },
    cutDelete(idx) {
      //   this.cuts.splice(idx, 1)
      console.log(idx)
      this.$refs[`cut${idx}`][0].remove()
    },
    onCiickDataCr(e) {
      console.log(e)
      this.MUTATIONS_ASSETS_DATA_CR(e)
    },
    onClickChangeCutType(type) {
      // this.MUTATIONS_ASSETS_INIT_TEXT()
      if (type !== 1) this.MUTATIONS_ASSETS_DATA_CR('')
      this.MUTATIONS_CUT_TYPE(type)
    },
    slideTo(index) {
      console.log(this.$refs.cutList)
      this.$refs.cutList.slideTo(index - 1, 0)
    },
    onClickRightContentShow() {
      this.rightContentShow = !this.rightContentShow
    },
    // 대사
    onInputDataText({ target }) {
      // this.onWatchTextRowLimit(target.value)
      const row = target.value.split('\n').length
      if (row > 3) {
        const modifiedText = target.value.split('\n').slice(0, 3)
        target.value = modifiedText.join('\n')
        return alert('대사는 세줄까지 입력 할 수 있습니다')
      }
      this.MUTATIONS_ASSETS_DATA_TEXT(target.value)
    },
    // 나레이션
    onInputDataNarration({ target }) {
      // this.onWatchTextRowLimit(target.value)
      const row = target.value.split('\n').length
      if (row > 3) {
        const modifiedText = target.value.split('\n').slice(0, 3)
        target.value = modifiedText.join('\n')
        return alert('나레이션은 세줄까지 입력 할 수 있습니다')
      }
      this.MUTATIONS_ASSETS_DATA_NARRATION(target.value)
    },
    onSubmitCutDataAdd() {
      this.rowIdx = this.CUT_LIST.idx
      // rowIdx.reverse()
      this.rowIdx.splice(this.CUT_CODE, 0, '@@')
      console.log(this.CUT_CODE, this.rowIdx)
      this.params.type = 'cutInsert'

      this.params.idxRow = JSON.stringify(this.rowIdx)
      this.params.secretKey = this.PROJECT_ID
      this.params.user_idx = kooLogin('user_idx')
      this.params.apiKey = process.env.API_KEY
      this.params.s_code = this.SCENE_CODE
      this.update()
      console.log('onSubmitCutData', this.params)
      this.ACTION_AXIOS_GET(this.params)
      this.cutListShow = true
    },
    onSubmitCutData() {
      // this.paramsPreview.cutType = this.cutType
      // this.paramsPreview.code = this.SCENE_CODE
      // this.paramsPreview.bg = this.PREVIEW.img.bg
      // this.paramsPreview.cr = this.PREVIEW.img.cr
      // this.paramsPreview.cr2 = this.PREVIEW.img.cr2
      // this.paramsPreview.crName = this.PREVIEW.data.cr
      // this.paramsPreview.effect = this.PREVIEW.data.effect
      // this.paramsPreview.text = this.PREVIEW.data.text

      // this.cutData = this.CUT_LIST.jsonData
      // this.cutData.push(this.paramsPreview)
      // console.log(JSON.stringify(this.cutData))
      console.log(
        'this.CUT_LIST.idx',
        this.CUT_LIST,
        this.CUT_LIST.idx,
        this.SCENE_CODE
      )
      this.params.type = 'cutInsert'
      if (!this.CUT_LIST.idx) {
        this.MUTATIONS_CUT_LIST_FIRST()
      } else {
        this.params.idxRow = this.CUT_LIST.idx.unshift('@@')
      }
      this.params.idxRow = JSON.stringify(this.CUT_LIST.idx)
      this.params.secretKey = this.PROJECT_ID
      this.params.user_idx = kooLogin('user_idx')
      this.params.apiKey = process.env.API_KEY
      this.params.s_code = this.SCENE_CODE
      this.update()
      console.log('onSubmitCutData', this.params)
      this.ACTION_AXIOS_GET(this.params)
      // this.MUTATIONS_CHAPTER_DEATILE_INIT()
      this.cutListShow = true
    },
    onSubmitCutDataUpdate() {
      // this.paramsPreview.cutType = this.cutType
      // this.paramsPreview.code = this.SCENE_CODE
      // this.paramsPreview.bg = this.PREVIEW.img.bg
      // this.paramsPreview.cr = this.PREVIEW.img.cr
      // this.paramsPreview.cr2 = this.PREVIEW.img.cr2
      // this.paramsPreview.crName = this.PREVIEW.data.cr
      // this.paramsPreview.effect = this.PREVIEW.data.effect
      // this.paramsPreview.text = this.PREVIEW.data.text

      // this.cutData = this.CUT_LIST.jsonData
      // this.cutData.push(this.paramsPreview)
      // console.log(JSON.stringify(this.cutData))
      console.log(
        'this.CUT_LIST.idx',
        this.CUT_LIST,
        this.CUT_LIST.idx,
        this.SCENE_CODE
      )
      this.params.type = 'cutInsert'
      this.params.mode = 'update'
      this.params.idx = this.CUT_LIST.idx[this.CUT_CODE]
      this.params.secretKey = this.PROJECT_ID
      this.params.user_idx = kooLogin('user_idx')
      this.params.apiKey = process.env.API_KEY
      this.params.s_code = this.SCENE_CODE
      this.update()
      console.log('onSubmitCutData', this.params)
      this.ACTION_AXIOS_GET(this.params)
      // this.MUTATIONS_CHAPTER_DEATILE_INIT()
      this.cutListShow = true
    },
    onClickCutPush(e) {
      console.log(e)
      this.MUTATIONS_CUT_LIST_GET_DATA_DETAIL(e)
    },
    onWatchTextRowLimit(e) {},
    onChageQuestionsTimer({ target }) {
      this.MUTATIONS_PREVIEW_TIMER(target.value)
    },
    dataPointUpdate(type, e) {
      console.log(type, e.target.value)
      if (type === 'point') this.MUTATIONS_PREVIEW_POINT(e.target.value)
      if (type === 'pointCr') this.MUTATIONS_PREVIEW_POINT_CR(e.target.value)
      if (type === 'pointType')
        this.MUTATIONS_PREVIEW_POINT_TYPE(e.target.value)
      if (type === 'endType') this.MUTATIONS_PREVIEW_END_TYPE(e.target.value)

      if (
        type !== 'point' &&
        type !== 'pointCr' &&
        type !== 'pointType' &&
        type !== 'endType'
      ) {
        console.log('ARRAY')
        const typeParam = type.substr(0, type.length - 1)
        this.questionsPoint[type.substr(-1)][typeParam] = e.target.value
        console.log(type.substr(-1), this.questionsPoint, typeParam)
        this.MUTATIONS_PREVIEW_QUESTIONS_POINT(this.questionsPoint)
      }
    },
    onInputDataQuestions(array, e) {
      // console.log(array, e.target.value)
      this.questionsText[array] = e.target.value.replaceAll('||n', '\n')
      this.MUTATIONS_ASSETS_DATA_QUESTIONS(this.questionsText)
      console.log(this.questionsText)
    },
    onInputDatAnswer({ target }) {
      this.MUTATIONS_ASSETS_DATA_ANSWER(target.value)
    },
    onInputDataSubjectiveQuestion({ target }) {
      this.MUTATIONS_ASSETS_DATA_SUBJECTIVE(target.value)
    },
    update() {
      this.MUTATIONS_LOADING_INIT()
      this.paramsPreview.cutType = this.cutType
      this.paramsPreview.code = this.SCENE_CODE
      this.paramsPreview.bg = this.PREVIEW.img.bg
      this.paramsPreview.cr = this.PREVIEW.img.cr
      this.paramsPreview.cr2 = this.PREVIEW.img.cr2
      this.paramsPreview.crName = this.PREVIEW.data.cr
      this.paramsPreview.effect = this.PREVIEW.data.effect
      this.paramsPreview.point = this.PREVIEW.data.point
      this.paramsPreview.pointCr = this.PREVIEW.data.pointCr
      this.paramsPreview.pointType = this.PREVIEW.data.pointType
      this.paramsPreview.subjectiveQuestion =
        this.PREVIEW.data.subjectiveQuestion
      this.paramsPreview.answer = this.PREVIEW.data.answer
      this.paramsPreview.sr = this.PREVIEW.data.sr
      this.paramsPreview.questionsTimer = this.PREVIEW.data.questionsTimer
      this.paramsPreview.questionsPoint = this.PREVIEW.data.questionsPoint
      this.paramsPreview.text = this.PREVIEW.data.text.replaceAll('\n', '||n')
      this.paramsPreview.narration = this.PREVIEW.data.narration.replaceAll(
        '\n',
        '||n'
      )
      this.paramsPreview.questionsText = this.questionsText
      if (this.cutType === 1) {
        // this.paramsPreview.text = ''
        this.paramsPreview.answer = ''
        this.paramsPreview.narration = ''
        this.paramsPreview.subjectiveQuestion = ''
        this.paramsPreview.questions = {
          text: ['', '', ''],
        }
      }
      if (this.cutType === 2) {
        this.paramsPreview.text = ''
        this.paramsPreview.answer = ''
        // this.paramsPreview.narration = ''
        this.paramsPreview.subjectiveQuestion = ''
        this.paramsPreview.questions = {
          text: ['', '', ''],
        }
      }
      if (this.cutType === 3) {
        this.paramsPreview.text = ''
        this.paramsPreview.answer = ''
        this.paramsPreview.narration = ''
        this.paramsPreview.subjectiveQuestion = ''
        // this.paramsPreview.questions = {
        //   text: ['', '', ''],
        // }
      }
      if (this.cutType === 4) {
        this.paramsPreview.text = ''
        // this.paramsPreview.answer = ''
        this.paramsPreview.narration = ''
        // this.paramsPreview.subjectiveQuestion = ''
        this.paramsPreview.questions = {
          text: ['', '', ''],
        }
      }
      this.params.previewData = JSON.stringify(this.paramsPreview)
    },
    onChangeTimerSetting(second) {
      this.timerSettingSecond = second
    },
    onClickTabActive(e, t) {
      if (t.target.classList.contains('active')) {
        return
      }
      document.getElementById('isActivePointTab' + e).classList.toggle('active')
      document
        .getElementById('isActiveScenarioTab' + e)
        .classList.toggle('active')
      document.getElementById('pointTab' + e).classList.toggle('active')
      document.getElementById('scenarioTab' + e).classList.toggle('active')
    },
    onClickIsActiveEventLink({ target }) {
      target.nextElementSibling.style = 'display:block'
      if (target.classList.contains('active')) {
        target.nextElementSibling.style = 'display:none'
      }
      target.classList.toggle('active')
    },
    onClickPointSetting(type) {
      this.pointSettingShow = true
      this.scenarioSettingShow = false
      if (type === 'save') this.pointSettingShow = false
    },
    onClickScenarioSetting(type) {
      this.pointSettingShow = false
      this.scenarioSettingShow = true
      if (type === 'save') this.scenarioSettingShow = false
    },
  },
}
</script>

<style lang="scss">
</style>
