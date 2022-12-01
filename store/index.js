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
            LOGIN: {},
            PROJECT_MANAGER: [],
            IS_POST: false,
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
            SCENE_DATA_CHARACTER: [],
            SCENE_DATA_INIT: [],
            SCENE_CODE: null,
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
                },
                data: {
                    type: '',
                    point: '',
                    pointCr: '',
                    pointType: '',
                    su: '',
                    text: [],
                    cr: '',
                    effect: '',
                    connect: '',
                    code: ''
                }
            },
            MAKER_GNB: '',
            ASSETS: [],
            SCENE_INDEX: null,
            CHAPTER_INDEX: null,

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
            MUTATIONS_AXIOS_GET_PROJECT_DETAIL(state, payload) {
                // console.log('MUTATIONS_AXIOS_GET_PROJECT_DETAIL', JSON.parse(payload))
                state.SCENE_DATA = payload
            },
            MUTATIONS_AXIOS_GET_SCENE_DATA_CHARACTER(state, payload) {
                // console.log('MUTATIONS_AXIOS_GET_PROJECT_DETAIL', JSON.parse(payload))
                state.SCENE_DATA_CHARACTER = payload
            },

            // GNB LOAD
            MUTATIONS_MAKER_GNB(state, payload) {
                // console.log('MUTATIONS_AXIOS_GET_PROJECT_DETAIL', JSON.parse(payload))
                state.MAKER_GNB = payload
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

            //  ------------------- 프리뷰 데이터 바인딩
            // 배경
            MUTATIONS_ASSETS_BG(state, payload) {
                state.PREVIEW.img.bg = payload;
            },
            // 인물
            MUTATIONS_ASSETS_CR(state, payload) {
                state.PREVIEW.img.cr = payload;
            },
            // 효과
            MUTATIONS_ASSETS_EFFECT(state, payload) {
                state.PREVIEW.data.effect = payload;
            },
            // 대사인물
            MUTATIONS_ASSETS_DATA_CR(state, payload) {
                state.PREVIEW.data.cr = payload;
            },

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
                        if (params.type === 'scenarioDetail') {
                            console.log('MUTATIONS_AXIOS_GET_PROJECT_DETAIL')
                            commit('MUTATIONS_AXIOS_GET_PROJECT_DETAIL', res.data)
                            return;
                        }
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
