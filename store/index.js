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
            SCENE_DATA: []
        },
        getters: {
            GETTER_SCENE_DATA(state) {
                if (typeof window !== 'undefined') {
                    return localStorage.getItem('TEACHER')
                        ? (state.LOGIN = JSON.parse(localStorage.getItem('TEACHER')))
                        : (state.LOGIN = '')
                }
            },
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
            MUTATIONS_AXIOS_GET(state, payload) {
                state.SCENE = payload
            },
            MUTATIONS_AXIOS_GET_PROJECT(state, payload) {
                state.PROJECT_MANAGER = payload
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
                state.SCENE_DATA = []
                console.log('MUTATIONS_SCENE_DATA', payload)
                state.SCENE_DATA = payload
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
