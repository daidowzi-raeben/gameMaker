import axios from 'axios'
import Vue from 'vue'
import Vuex, { Store } from 'vuex'
Vue.use(Vuex)
// const apiUrl = {
//   apiMain: '/student.php?type=main&smt_idx=1&sms_idx=1',
// }
// const LOCALSTORAGE = localStorage.getItem('STUDENT')
// console.log('LOCALSTORAGE', LOCALSTORAGE)
const createStore = () => {
    return new Store({
        state: {
            API_KEY: 'ZFR4NUR3WnhyUVdBb0ExZDdMUGNDMWY3T25hV0pOWXhwQk0xZCtvV1E9',
            LOADING: true,
            alertSave: 0,
            LOGIN: {},
            PROJECT_MANAGER: [],
            IS_POST: false,
            cutType: 1,
            PROJECT_ID: '',
            POST: {
                PROJECT_MANAGER: false,
            },
            SCENE: [
                {
                    idx: '1', title: '1장', subTitle: '1', subScene: {
                        idx: 1, title: '1-1', subTitle: '1-3'
                    }
                },
                { idx: '2', title: '2장', subTitle: '2' },
                { idx: '3', title: '3장', subTitle: '3' },
                { idx: '4', title: '4장', subTitle: '4' },
                { idx: '5', title: '5장', subTitle: '5' },
            ],
            SCENE_DATA: [],
            CUT_DATA: [],
            CUT_LIST: [],
            SCENE_DATA_CHARACTER: [],
            SCENE_DATA_CHARACTER_INIT: [],
            SCENE_DATA_INIT: [],
            CHAPTER_DATA: [],
            // 프리뷰 데이터
            MAKER_AXIOS: {
                bg: [],
                cr: [],
                su: [],
            },
            PREVIEW: {
                s_code: '',
                c_code: '',
                img: {
                    bg: '',
                    cr: '',
                    cr2: '',
                },
                data: {
                    type: '',
                    point: '',
                    pointCr: '',
                    pointType: '',
                    endType: '',
                    sound: '',
                    text: '',
                    narration: '',
                    questions: {
                        text: [
                            '',
                            '',
                            '',
                        ]
                    },
                    questionsTimer: null,
                    subjectiveQuestion: '',
                    questionsPoint: [{
                        pointType: null,
                        pointCr: null,
                        point: null,
                        nextBtn: null
                    },
                    {
                        pointType: null,
                        pointCr: null,
                        point: null,
                        nextBtn: null
                    },
                    {
                        pointType: null,
                        pointCr: null,
                        point: null,
                        nextBtn: null

                    }],
                    answer: '',
                    cr: '',
                    effect: '',
                    connect: '',
                    code: ''
                }
            },
            PREVIEW_INTRO: {
                copyright: '',
                logo: '',
                position: '',
                bg: '',
                ver: '',
            },
            PREVIEW_ENDING: [
                {
                    name: '',
                    upPoint: '',
                    upUnit: '',
                    downPoint: '',
                    downUnit: '',
                    gotoBtn: [],
                    cut: []
                }
            ],
            // UI세팅
            UISetting: {
                // mainColor: {},
                // windowColor: {},
                // strokeColor: {},
                // shadowColor: {},
            },
            // app icon
            IN_APP_ICON: null,
            // 챕터 코드
            SCENE_CODE: null,
            // 인물코드
            CHAPTER_CODE: null,
            // 컷코드
            CUT_CODE: null,
            // 컨텐츠
            CONTENT_CODE: 4,
            MAKER_GNB: 6,
            ASSETS: [],
            SCENE_INDEX: null,
            CHAPTER_INDEX: null,
            CHAPTER_LIST: [],
            CHAPTER_DEATILE: [],
            CHAPTER_DEATILE_IDX: '',
            SAVE_DATETIME: null,
            ASSETS_STORE: {
                crList: [],
                detail: {}
            }

        },
        getters: {
            GETTER_SCENE_DATA(state) {
                if (typeof window !== 'undefined') {
                    return localStorage.getItem('TEACHER')
                        ? (state.LOGIN = JSON.parse(localStorage.getItem('TEACHER')))
                        : (state.LOGIN = '')
                }
            },
            // GETTER_LOGIN_CHECK(state, payload) {
            //     console.log('GETTER_LOGIN_CHECK', payload)
            // },
        },
        mutations: {
            // 로딩
            MUTATIONS_LOADING(state, payload) {
                state.LOADING = false
            },
            MUTATIONS_LOADING_INIT(state, payload) {
                state.LOADING = true
            },
            MUTATIONS_COLOR_PICKER(state, payload) {
                state.UISetting = payload
            },

            MUTATIONS_STORE_CRLIST(state, payload) {
                state.ASSETS_STORE.crList = payload
            },
            MUTATIONS_STORE_DETAIL(state, payload) {
                state.ASSETS_STORE.detail = payload
            },
            MUTATIONS_IN_APP_ICON(state, payload) {
                state.IN_APP_ICON = payload
            },
            MUTATIONS_CONTENT_CODE(state, payload) {
                state.CONTENT_CODE = payload
            },


            MUTAIONS_SAVE(state) {
                state.alertSave = 3
                setTimeout(() => {
                    state.alertSave = 0
                }, 3000);
            },
            // 로그인
            MUTATIONS_LOGIN(state, payload) {
                state.LOGIN = payload
            },
            MUTATIONS_LOGIN_CHECK(state, payload) {
                console.log('MUTATIONS_LOGIN_CHECK', payload)
                state.LOGIN = payload

            },
            MUTATIONS_AXIOS_GET(state, payload) {
                state.SCENE = payload
            },
            MUTATIONS_AXIOS_GET_PROJECT(state, payload) {
                state.PROJECT_MANAGER = payload
            },
            MUTATIONS_PROJECT(state, payload) {
                state.PROJECT_ID = payload
            },
            MUTATIONS_PREVIEW_POINT(state, payload) {
                state.PREVIEW.data.point = payload
            },
            MUTATIONS_PREVIEW_TIMER(state, payload) {
                state.PREVIEW.data.questionsTimer = payload
            },
            MUTATIONS_PREVIEW_POINT_CR(state, payload) {
                state.PREVIEW.data.pointCr = payload
            },
            MUTATIONS_PREVIEW_POINT_TYPE(state, payload) {
                state.PREVIEW.data.pointType = payload
            },
            MUTATIONS_PREVIEW_END_TYPE(state, payload) {
                // state.PREVIEW.data.endType = payload
            },
            MUTATIONS_PREVIEW_QUESTIONS_POINT(state, payload) {
                state.PREVIEW.data.questionsPoint = payload
            },
            MUTATIONS_AXIOS_GET_PROJECT_DETAIL(state, payload) {
                // console.log('MUTATIONS_AXIOS_GET_PROJECT_DETAIL', JSON.parse(payload))
                state.SCENE_DATA = payload
            },
            MUTATIONS_AXIOS_GET_SCENE_DATA_CHARACTER(state, payload) {
                // console.log('MUTATIONS_AXIOS_GET_PROJECT_DETAIL', JSON.parse(payload))
                state.SCENE_DATA_CHARACTER = payload
            },
            MUTATIONS_AXIOS_GET_SCENE_DATA_CHARACTER_DETAIL(state, payload) {
                // console.log('MUTATIONS_AXIOS_GET_PROJECT_DETAIL', JSON.parse(payload))
                state.SCENE_DATA_CHARACTER = payload
            },

            // GNB LOAD
            MUTATIONS_MAKER_GNB(state, payload) {
                // console.log('MUTATIONS_AXIOS_GET_PROJECT_DETAIL', JSON.parse(payload))
                state.MAKER_GNB = payload
            },
            MUTATIONS_CUT_LIST_FIRST(state, payload) {
                state.CUT_LIST.idx = ["@@"]
            },
            MUTATIONS_CUT_LIST_ADD(state, payload) {
                // state.CUT_LIST.idx = state.CUT_LIST.idx.unshift('"@@')
            },

            // POST 성공
            MUTATIONS_AXIOS_POST_SUCCESS(state, payload) {
                console.log('MUTATIONS_AXIOS_POST_PROJECT')
                state.IS_POST = true
            },
            // POST 성공
            MUTATIONS_AXIOS_POST_INIT(state) {
                console.log('MUTATIONS_AXIOS_POST_INIT')
                state.IS_POST = false
            },
            MUTATIONS_SCENE_DATA(state, payload) {
                let payLoad = []
                payLoad = payload.filter(function (item) {
                    return item !== null && item !== undefined && item !== '';
                });
                console.log('MUTATIONS_SCENE_DATA', payLoad)
                state.SCENE_DATA = payLoad;
            },
            MUTATIONS_CHAPTER_DATA(state, payload) {
                // CHAPTER_DATA
                let payLoad = []
                payLoad = payload?.chapters?.filter(function (item) {
                    return item !== null && item !== undefined && item !== '';
                });
                console.log('MUTATIONS_CHAPTER_DATA', payLoad)
                // console.log('state.SCENE_DATA[payload.arrIndex].chapters', state.SCENE_DATA[payload.arrIndex].chapters)
                console.log('state.SCENE_DATA[0]', state.SCENE_DATA[payload.arrIndex].chapters)
                state.SCENE_DATA[payload.arrIndex].chapters = payLoad;
            },
            // 데이터 재정렬
            MUTATIONS_SCENE_DATA_RELOAD(state, payload) {
                state.SCENE_DATA = payload;
            },
            // 데이터 코드
            MUTATIONS_SCENE_CODE(state, payload) {
                state.SCENE_CODE = payload;
            },
            MUTATIONS_SCENE_INDEX(state, payload) {
                state.SCENE_INDEX = payload;
            },
            MUTATIONS_CHAPTER_INDEX(state, payload) {
                state.CHAPTER_INDEX = payload;
            },
            // 나의 에셋 로드
            MUTATIONS_AXIOS_GET_ASSETS_PROJECT(state, payload) {
                state.ASSETS = payload;
            },
            // 캐릭터 리스트
            MUTATIONS_AXIOS_GET_CHAPTER_LIST(state, payload) {
                state.CHAPTER_LIST = payload;
            },
            // 컷 데이터
            MUTATIONS_CUT_GET_DATA(state, payload) {
                state.CUT_DATA = payload;
            },

            //  ------------------- 프리뷰 데이터 바인딩
            // 통신용 데이터 변환
            MUTATIONS_ASSETS_GET_DATA(state, payload) {
                state.CHAPTER_DEATILE = payload.jsonData;
                state.CHAPTER_DEATILE_IDX = payload.idx;
                state.PREVIEW.img.bg = payload.jsonData.bg;
                state.PREVIEW.img.cr = payload.jsonData.cr;
                state.PREVIEW.img.cr2 = payload.jsonData.cr2;
                console.log(payload)
            },
            // 저장시간 초기화
            MUTATIONS_SAVE_DATETIME_INIT(state, payload) {
                state.SAVE_DATETIME = null
            },
            // 데이터초기화
            MUTATIONS_ASSETS_INIT(state, payload) {
                state.PREVIEW.img.bg = '';
                state.PREVIEW.img.cr = '';
                state.PREVIEW.img.cr2 = '';
                state.PREVIEW.data.cr = '';
                state.PREVIEW.data.effect = '';
                state.PREVIEW.data.text = '';
                state.SCENE_CODE = ''
                state.PREVIEW.data.questionsPoint = [
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
                ]
            },
            // 인물 데이터 초기화
            MUTATIONS_CHAPTER_DEATILE_INIT(state, payload) {
                state.CHAPTER_DEATILE = []
                state.CHAPTER_DEATILE_IDX = ''
                state.PREVIEW.img.bg = '';
                state.PREVIEW.img.cr = '';
                state.PREVIEW.img.cr2 = '';
            },
            // 대사 초기화
            MUTATIONS_ASSETS_INIT_TEXT(state, payload) {
                state.PREVIEW.data.text = '';
            },
            // 배경
            MUTATIONS_ASSETS_BG(state, payload) {
                state.PREVIEW.img.bg = payload;
            },
            // 인물
            MUTATIONS_ASSETS_CR(state, payload) {
                state.PREVIEW.img.cr = payload;
            },
            MUTATIONS_ASSETS_CR2(state, payload) {
                state.PREVIEW.img.cr2 = payload;
            },
            // 효과
            MUTATIONS_ASSETS_EFFECT(state, payload) {
                state.PREVIEW.data.effect = payload;
            },
            // 대사인물
            MUTATIONS_ASSETS_DATA_CR(state, payload) {
                state.PREVIEW.data.cr = payload;
            },
            // 대사
            MUTATIONS_ASSETS_DATA_TEXT(state, payload) {
                console.log('MUTATIONS_ASSETS_DATA_TEXT', payload)
                state.PREVIEW.data.text = payload.replaceAll('||n', '\n');
            },
            // 나레이션
            MUTATIONS_ASSETS_DATA_NARRATION(state, payload) {

                console.log('MUTATIONS_ASSETS_DATA_NARRATION', payload)
                state.PREVIEW.data.narration = payload.replaceAll('||n', '\n');
            },
            // 객관식
            MUTATIONS_ASSETS_DATA_QUESTIONS(state, payload) {

                console.log('MUTATIONS_ASSETS_DATA_NARRATION', payload)
                state.PREVIEW.data.questions.text = payload
            },
            // 주관식 질문
            MUTATIONS_ASSETS_DATA_SUBJECTIVE(state, payload) {

                console.log('subjectiveQuestion', payload)
                state.PREVIEW.data.subjectiveQuestion = payload
            },
            // 주관식 답
            MUTATIONS_ASSETS_DATA_ANSWER(state, payload) {

                console.log('MUTATIONS_ASSETS_DATA_NARRATION', payload)
                state.PREVIEW.data.answer = payload
            },
            // 컷 리스트
            MUTATIONS_CUT_LIST_GET_DATA(state, payload) {
                console.log('MUTATIONS_CUT_LIST_GET_DATA', payload)
                state.CUT_LIST = payload;
                if (state.CUT_LIST.jsonData) {
                    state.CONTENT_CODE = 5
                } else {
                    state.CONTENT_CODE = 1
                }
                if (state.CUT_LIST && state.CUT_LIST.jsonData && state.CUT_LIST.jsonData.length > 0) {
                    state.PREVIEW.img.bg = state.CUT_LIST.jsonData[0].bg
                    state.cutType = state.CUT_LIST.jsonData[0].cutType
                    state.PREVIEW.img.cr = state.CUT_LIST.jsonData[0].cr
                    state.PREVIEW.img.cr2 = state.CUT_LIST.jsonData[0].cr2
                    state.PREVIEW.data.cr = state.CUT_LIST.jsonData[0].crName
                    state.PREVIEW.data.effect = state.CUT_LIST.jsonData[0].effect
                    state.PREVIEW.data.text = state.CUT_LIST.jsonData[0].text.replaceAll('||n', '\n')
                    state.PREVIEW.data.narration = state.CUT_LIST.jsonData[0].narration.replaceAll('||n', '\n')
                    state.PREVIEW.data.questions.text = state.CUT_LIST.jsonData[0].questionsText
                    state.PREVIEW.data.questionsPoint = state.CUT_LIST.jsonData[0].questionsPoint
                    state.PREVIEW.data.questionsTimer = state.CUT_LIST.jsonData[0].questionsTimer
                    state.PREVIEW.data.answer = state.CUT_LIST.jsonData[0].answer
                    state.PREVIEW.data.subjectiveQuestion = state.CUT_LIST.jsonData[0].subjectiveQuestion
                    state.SAVE_DATETIME = state.CUT_LIST.datetime_modify
                } else {
                    state.PREVIEW.img.bg = ''
                    state.PREVIEW.img.cr = ''
                    state.PREVIEW.img.cr2 = ''
                    state.PREVIEW.data.cr = ''
                    state.PREVIEW.data.effect = ''
                    state.PREVIEW.data.text = ''
                    state.PREVIEW.data.narration = ''
                    state.PREVIEW.data.questionsTimer = null
                    state.PREVIEW.data.subjectiveQuestion = ''
                    state.PREVIEW.data.questions.text = [
                        '',
                        '',
                        '',
                    ]
                    state.cutType = 1
                    state.PREVIEW.data.questionsPoint = [
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
                    ]
                }
                state.CUT_CODE = 0
            },
            // 컷 리스트 변환
            MUTATIONS_CUT_LIST_GET_DATA_DETAIL(state, payload) {
                console.log('MUTATIONS_ASSETS_DATA_TEXT', payload)
                state.CUT_CODE = payload
                if (state.CUT_LIST && state.CUT_LIST.jsonData && state.CUT_LIST.jsonData.length > 0) {
                    state.PREVIEW.img.bg = state.CUT_LIST.jsonData[payload].bg
                    state.PREVIEW.img.cr = state.CUT_LIST.jsonData[payload].cr
                    state.PREVIEW.img.cr2 = state.CUT_LIST.jsonData[payload].cr2
                    state.PREVIEW.data.cr = state.CUT_LIST.jsonData[payload].crName
                    state.PREVIEW.data.effect = state.CUT_LIST.jsonData[payload].effect
                    state.PREVIEW.data.text = state.CUT_LIST.jsonData[payload].text.replaceAll('||n', '\n')
                    state.PREVIEW.data.narration = state.CUT_LIST.jsonData[payload].narration.replaceAll('||n', '\n')
                    state.PREVIEW.data.questionsPoint = state.CUT_LIST.jsonData[payload].questionsPoint
                    state.PREVIEW.data.questionsTimer = state.CUT_LIST.jsonData[payload].questionsTimer
                    state.PREVIEW.data.subjectiveQuestion = state.CUT_LIST.jsonData[payload].subjectiveQuestion
                    state.PREVIEW.data.answer = state.CUT_LIST.jsonData[payload].answer
                    state.cutType = state.CUT_LIST.jsonData[payload].cutType
                }
            },
            MUTATIONS_CUT_TYPE(state, payload) {
                state.cutType = payload
            }

        },
        actions: {
            ACTION_AXIOS_LOGIN({ commit }, params) {
                this.$axios
                    .post(process.env.VUE_APP_API, params, {
                        header: {
                            'Context-Type': 'multipart/form-data',
                        },
                    })
                    .then((res) => {
                        console.log(res.data)
                        if (res.data.result === 'FALSE') {
                            return alert('아이디 및 패스워드를 확인해 주세요.')
                        }
                        //   아이디 암호화
                        this.$cookies.set('user_idx', res.data.login.user_idx, {
                            path: '/',
                            maxAge: 60 * 60 * 24 * 7,
                        })
                        //   이름
                        this.$cookies.set('user_name', res.data.login.user_name, {
                            path: '/',
                            maxAge: 60 * 60 * 24 * 7,
                        })
                        commit('MUTATIONS_LOGIN', res.data)
                    })
                    .catch((res) => {
                        console.log('AXIOS FALSE', res)
                    })
            },
            ACTION_AXIOS_GET({ commit }, params) {
                console.log('ACTION_AXIOS_GET', params)
                axios
                    .get(process.env.VUE_APP_API, { params })
                    .then((res) => {
                        commit('MUTATIONS_LOADING', false)
                        console.log('ACTION_AXIOS_GET', res, params)
                        if (params.type === 'project') {
                            commit('MUTATIONS_AXIOS_GET_PROJECT', res.data)
                            return;
                        }
                        if (params.type === 'assetsProject') {
                            commit('MUTATIONS_AXIOS_GET_ASSETS_PROJECT', res.data)
                            // commit('MUTATIONS_AXIOS_GET_SCENE_DATA_CHARACTER', res.data)
                            return;
                        }
                        if (params.type === 'characterList' || params.type === 'characterInsert') {
                            commit('MUTATIONS_AXIOS_GET_SCENE_DATA_CHARACTER', res.data)
                            commit('MUTATIONS_AXIOS_GET_SCENE_DATA_CHARACTER', res.data)
                            return;
                        }
                        // if (params.type === 'characterDetail') {
                        //     console.log('MUTATIONS_AXIOS_GET_SCENE_DATA_CHARACTER_DETAIL', res.data)
                        //     commit('MUTATIONS_AXIOS_GET_SCENE_DATA_CHARACTER_DETAIL', res.data)
                        //     return;
                        // }
                        if (params.type === 'scenarioDetail') {
                            console.log('MUTATIONS_AXIOS_GET_PROJECT_DETAIL')
                            commit('MUTATIONS_AXIOS_GET_PROJECT_DETAIL', res.data)
                            return;
                        }
                        if (params.type === 'characterDetail') {
                            console.log('MUTATIONS_ASSETS_GET_DATA', res.data)
                            commit('MUTATIONS_ASSETS_GET_DATA', res.data)
                            return;
                        }
                        if (params.type === 'cutInsert') {
                            console.log('MUTATIONS_CUT_LIST_GET_DATA', res.data)
                            commit('MUTATIONS_CUT_LIST_GET_DATA', res.data)
                            return;
                        }
                        if (params.type === 'cutList') {
                            console.log('MUTATIONS_CUT_LIST_GET_DATA', res.data)
                            commit('MUTATIONS_CUT_LIST_GET_DATA', res.data)
                            return;
                        }
                        if (params.type === 'assetsList') {
                            console.log('MUTATIONS_STORE_CRLIST', res.data)
                            commit('MUTATIONS_STORE_CRLIST', res.data)
                            return;
                        }
                        if (params.type === 'assetsDetail') {
                            console.log('MUTATIONS_STORE_DETAIL', res.data)
                            commit('MUTATIONS_STORE_DETAIL', res.data)
                            return;
                        }
                        // if (params.type === 'characterList') {
                        //     console.log('MUTATIONS_AXIOS_GET_CHAPTER_LIST', res.data)
                        //     commit('MUTATIONS_AXIOS_GET_CHAPTER_LIST', res.data)
                        //     return;
                        // }
                        // if (params.type === 'scenarioDetail') {
                        //     console.log('MUTATIONS_AXIOS_GET_SCENE_DATA_CHARACTER')
                        //     commit('MUTATIONS_AXIOS_GET_SCENE_DATA_CHARACTER', res.data)
                        //     return;
                        // }

                        commit('MUTATIONS_AXIOS_GET', res.data)
                    })
                    .catch((res) => {
                        console.error('ACTIONS_TEACHER_FALSE', res)
                    })
            },
            ACTION_AXIOS_POST({ commit }, params, isType) {
                console.log('ACTION_AXIOS_POST_PARAMS', params, isType)
                axios
                    .post(process.env.VUE_APP_API, params, {
                        header: {
                            'Context-Type': 'multipart/form-data',
                        },
                    })
                    .then((res) => {
                        commit('MUTATIONS_LOADING', false)
                        console.log('MUTATIONS_AXIOS_POST_SUCCESS', res, params)
                        commit('MUTATIONS_AXIOS_POST_SUCCESS', res.data)

                        console.log('SUCCESS')
                    })
                    .catch((res) => {
                        console.error('ACTIONS_TEACHER_FALSE', res)
                    })
            },

        },
    })
}

export default createStore
