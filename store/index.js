import axios from 'axios'
import Vue from 'vue'
import Vuex, { Store } from 'vuex'

import ASEETS_STORE from "./modules/assetsStore.js"

Vue.use(Vuex)
// const apiUrl = {
//   apiMain: '/student.php?type=main&smt_idx=1&sms_idx=1',
// }
// const LOCALSTORAGE = localStorage.getItem('STUDENT')
// console.log('LOCALSTORAGE', LOCALSTORAGE)

const createStore = () => {
    return new Store({
        state: {
            IN_APP_GAME: [{}],
            API_KEY: 'ZFR4NUR3WnhyUVdBb0ExZDdMUGNDMWY3T25hV0pOWXhwQk0xZCtvV1E9',
            LOADING: true,
            IN_APP_GAME_START: false,
            alertSave: 0,
            LOGIN: {},
            PROJECT_MANAGER: [],
            IS_POST: false,
            IS_UI: false,
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
                type: '',
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
                    sr: '',
                    sound: '',
                    text: '',
                    narration: '',
                    questions: {
                        text_1: '',
                        text_2: '',
                        text_3: ''
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
                    effect2: '',
                    connect: '',
                    code: ''
                }
            },
            PREVIEW_INTRO: {
                copyright: '',
                copyrightPosition: 'center',
                logo: '',
                position: 'center',
                bg: '',
                ver: '',
                dim: 'dim-light',
            },
            PREVIEW_PROFILE: {
                name: '',
                background: '',
                discription: '',
                open: '',
                backgroundChk: null
            },
            PREVIEW_ENDING: [
                {
                    name: '',
                    upPoint: 0,
                    downPoint: 0,
                    gotoBtn: [],
                    cut: []
                }
            ],
            // UI세팅
            UISetting: {
                mainColor: null,
                windowColor: null,
                strokeColor: null,
                shadowColor: null,
                fontColor: null,
                mainFontColor: null,
                round: 0,
                border: 0,
                x: 0,
                y: 0,
                font: '',
                icon: '',
                fontSize: '',
                button: {
                    strokeColor: null,
                    shadowColor: null,
                    x: 0,
                    y: 0,
                    round: 0,
                    border: 0,
                },
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
            CONTENT_CODE: 1,
            MAKER_GNB: 6,
            ASSETS: [],
            ASSETSMY: [],
            SCENE_INDEX: null,
            CHAPTER_INDEX: null,
            CHAPTER_LIST: [],
            CHAPTER_DEATILE: [],
            CHAPTER_DEATILE_IDX: '',
            SAVE_DATETIME: null,
            ASSETS_STORE: {
                crList: [],
                detail: {}
            },
            ASSETS_EMOTION: {},
            TEST: ''

        },
        getters: {
            GETTER_LOADING_INIT(state) {
                state.LOADING = false
            },
            GETTER_LOADING(state) {
                state.LOADING = true
            },
            GETTER_TEST(state) {
                state.TEST = 'asd'
            },
            GETTER_SCENE_DATA(state) {
                if (typeof window !== 'undefined') {
                    return localStorage.getItem('TEACHER')
                        ? (state.LOGIN = JSON.parse(localStorage.getItem('TEACHER')))
                        : (state.LOGIN = '')
                }
            },
            // GETTER_IS_ENDING(state) {
            //     state.PREVIEW.type = 'e'
            // },
            // GETTER_LOGIN_CHECK(state, payload) {
            //     console.log('GETTER_LOGIN_CHECK', payload)
            // },
        },
        mutations: {
            // ----------- intro
            MUTATIONS_INTRO_DIM(state, payload) {
                state.PREVIEW_INTRO.dim = payload
            },
            MUTATIONS_INTRO_POSITION(state, payload) {
                state.PREVIEW_INTRO.position = payload
            },
            MUTATIONS_INTRO_COPYRIGHT(state, payload) {
                state.PREVIEW_INTRO.copyright = payload
            },
            MUTATIONS_INTRO_COPYRIGHT_POSITION(state, payload) {
                state.PREVIEW_INTRO.copyrightPosition = payload
            },


            // 로딩
            MUTATIONS_LOADING(state, payload) {
                state.LOADING = false
            },
            MUTATIONS_IS_UI(state, payload) {
                state.IS_UI = true
                if (payload.jsonData) {
                    state.UISetting = payload.jsonData
                }
            },
            MUTATIONS_LOADING_INIT(state, payload) {
                state.LOADING = true
            },
            MUTATIONS_PROFILE_NAME(state, payload) {
                state.PREVIEW_PROFILE.name = payload
            },
            MUTATIONS_PROFILE_DISCRIPTION(state, payload) {
                state.PREVIEW_PROFILE.discription = payload
            },
            MUTATIONS_COLOR_PICKER(state, payload) {
                state.UISetting = payload
            },
            MUTATIONS_PROFILE_COLOR_PICKER(state, payload) {
                state.PREVIEW_PROFILE.background = payload
            },
            MUTATIONS_INTRO(state, payload) {
                state.PREVIEW_INTRO = payload
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
            MUTATIONS_AXIOS_GET_DEVELOP(state, payload) {
                state.IN_APP_GAME = payload
                state.IN_APP_GAME_START = true
                console.log('START')
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
                console.log('MUTATIONS_AXIOS_GET_SCENE_DATA_CHARACTER', payload)
                state.SCENE_DATA_CHARACTER = payload
                state.CHAPTER_DEATILE = payload.jsonData[state.CHAPTER_DEATILE_IDX - 1];
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
            MUTATIONS_AXIOS_MY_GET_ASSETS_PROJECT(state, payload) {
                state.ASSETSMY = payload;
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
                state.PREVIEW_PROFILE.name = payload.jsonData.name
                state.PREVIEW_PROFILE.discription = payload.jsonData.profile
                if (payload.jsonData.background) {
                    state.PREVIEW_PROFILE.background = payload.jsonData.background
                    state.PREVIEW_PROFILE.backgroundChk = payload.jsonData.background
                } else {
                    state.PREVIEW_PROFILE.background = null
                }
                console.log('MUTATIONS_ASSETS_GET_DATA', payload)
            },
            // 저장시간 초기화
            MUTATIONS_SAVE_DATETIME_INIT(state, payload) {
                state.SAVE_DATETIME = null
            },
            // 데이터초기화
            MUTATIONS_ASSETS_INIT(state, payload) {
                state.PREVIEW.img.bg = '';
                state.PREVIEW.img.cr = '';
                state.PREVIEW.data.sr = '';
                state.PREVIEW.img.cr2 = '';
                state.PREVIEW.data.cr = '';
                state.PREVIEW.data.effect = '';
                state.PREVIEW.data.effect2 = '';
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
                state.CHAPTER_DEATILE_IDX = null
                state.PREVIEW.img.bg = '';
                state.PREVIEW.img.cr = '';
                state.PREVIEW.img.cr2 = '';
                state.PREVIEW.data.sr = '';
                state.PREVIEW_PROFILE.name = ''
                state.PREVIEW_PROFILE.discription = ''
                state.PREVIEW_PROFILE.background = null
                state.PREVIEW_PROFILE.bg = ''
                state.PREVIEW_PROFILE.open = ''
            },
            // 대사 초기화
            MUTATIONS_ASSETS_INIT_TEXT(state, payload) {
                state.PREVIEW.data.text = '';
            },
            // 인트로
            MUTATIONS_PREVIEW_INTRO(state, payload) {
                // return console.log('MUTATIONS_PREVIEW_INTRO', payload)
                if (payload.jsonData) {
                    state.PREVIEW_INTRO = payload.jsonData
                }

                state.PREVIEW_INTRO.logo = payload.logo
            },
            // 배경
            MUTATIONS_ASSETS_BG(state, payload) {
                state.PREVIEW.img.bg = payload;
                state.PREVIEW_INTRO.bg = payload;
            },
            // 사운드
            MUTATIONS_ASSETS_SOUND(state, payload) {
                state.PREVIEW.data.sr = payload;
            },
            // 인물
            MUTATIONS_ASSETS_CR(state, payload) {
                state.PREVIEW.img.cr = payload;
            },
            // 표정
            MUTATIONS_ASSETS_EMOTION(state, payload) {
                state.ASSETS_EMOTION = payload;
            },
            MUTATIONS_ASSETS_CR2(state, payload) {
                state.PREVIEW.img.cr2 = payload;
            },
            // 효과
            MUTATIONS_ASSETS_EFFECT(state, payload) {
                state.PREVIEW.data.effect = payload;
            },
            // 효과
            MUTATIONS_ASSETS_EFFECT2(state, payload) {
                state.PREVIEW.data.effect2 = payload;
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
            MUTATIONS_ASSETS_DATA_QUESTIONS_1(state, payload) {

                console.log('MUTATIONS_ASSETS_DATA_QUESTIONS', payload)
                state.PREVIEW.data.questions.text_1 = payload
            },
            // 객관식
            MUTATIONS_ASSETS_DATA_QUESTIONS_2(state, payload) {

                console.log('MUTATIONS_ASSETS_DATA_QUESTIONS', payload)
                state.PREVIEW.data.questions.text_2 = payload
            },
            // 객관식
            MUTATIONS_ASSETS_DATA_QUESTIONS_3(state, payload) {

                console.log('MUTATIONS_ASSETS_DATA_QUESTIONS', payload)
                state.PREVIEW.data.questions.text_3 = payload
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
                    state.PREVIEW.data.effect2 = state.CUT_LIST.jsonData[0].effect2
                    state.PREVIEW.data.sr = state.CUT_LIST.jsonData[0].sr
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
                    state.PREVIEW.data.effect2 = ''
                    state.PREVIEW.data.sr = ''
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
                    state.PREVIEW.data.effect2 = state.CUT_LIST.jsonData[payload].effect2
                    state.PREVIEW.data.sr = state.CUT_LIST.jsonData[payload].sr
                    state.PREVIEW.data.text = state.CUT_LIST.jsonData[payload].text.replaceAll('||n', '\n')
                    state.PREVIEW.data.narration = state.CUT_LIST.jsonData[payload].narration.replaceAll('||n', '\n')
                    state.PREVIEW.data.questionsPoint = state.CUT_LIST.jsonData[payload].questionsPoint
                    state.PREVIEW.data.questionsTimer = state.CUT_LIST.jsonData[payload].questionsTimer
                    state.PREVIEW.data.subjectiveQuestion = state.CUT_LIST.jsonData[payload].subjectiveQuestion
                    state.PREVIEW.data.answer = state.CUT_LIST.jsonData[payload].answer
                    state.PREVIEW.data.questions.text = state.CUT_LIST.jsonData[payload].questionsText
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
                        setTimeout(() => {
                            commit('MUTATIONS_LOADING', false)
                        }, 1000);
                        console.log('ACTION_AXIOS_GET', res, params)
                        if (params.type === 'project') {
                            commit('MUTATIONS_AXIOS_GET_PROJECT', res.data)
                            return;
                        }
                        if (params.type === 'develop') {
                            commit('MUTATIONS_AXIOS_GET_DEVELOP', res.data)
                            return;
                        }
                        if (params.type === 'assetsProject') {
                            commit('MUTATIONS_AXIOS_GET_ASSETS_PROJECT', res.data)
                            // commit('MUTATIONS_AXIOS_GET_SCENE_DATA_CHARACTER', res.data)
                            return;
                        }
                        if (params.type === 'characterList' || params.type === 'characterInsert') {
                            commit('MUTATIONS_AXIOS_GET_SCENE_DATA_CHARACTER', res.data)
                            // commit('MUTATIONS_AXIOS_GET_SCENE_DATA_CHARACTER', res.data)
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
                        if (params.type === 'assetsMyList') {
                            console.log('MUTATIONS_AXIOS_MY_GET_ASSETS_PROJECT', res.data)
                            commit('MUTATIONS_AXIOS_MY_GET_ASSETS_PROJECT', res.data)
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
                        if (params.type === 'uiList') {
                            console.log('MUTATIONS_IS_UI', res.data)
                            commit('MUTATIONS_IS_UI', res.data)
                            return;
                        }
                        if (params.type === 'introList') {
                            console.log('MUTATIONS_PREVIEW_INTRO', res.data)
                            commit('MUTATIONS_PREVIEW_INTRO', res.data)
                            return;
                        }

                        if (params.type === 'assetsProjectAdd') {
                            console.log('MUTATIONS_AXIOS_GET_ASSETS_PROJECT', res.data)
                            commit('MUTATIONS_AXIOS_GET_ASSETS_PROJECT', res.data)
                            return;
                        }
                        if (params.type === 'assetsProjectEmotion') {
                            console.log('MUTATIONS_ASSETS_EMOTION', res.data)
                            commit('MUTATIONS_ASSETS_EMOTION', res.data)
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
                        if (params.type === 'introList') {
                            // intro
                            commit('MUTATIONS_PREVIEW_INTRO', res.data)
                        }
                        console.log('SUCCESS')
                    })
                    .catch((res) => {
                        console.error('ACTIONS_TEACHER_FALSE', res)
                    })
            },

        },
        modules: {
            foo: {
                // namespaced: true,
                modules: {
                    assetsStore: ASEETS_STORE,
                },
            },
        },
    })
}

export default createStore
