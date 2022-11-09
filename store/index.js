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
            LOADING: true,
            LOGIN: {
                user_id: 'testUsers',
                user_idx: '6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b'
            },
            PROJECT_MANAGER: [],
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
            ]
        },
        getters: {
            LOGIN_TEACHER(state) {
                if (typeof window !== 'undefined') {
                    return localStorage.getItem('TEACHER')
                        ? (state.LOGIN = JSON.parse(localStorage.getItem('TEACHER')))
                        : (state.LOGIN = '')
                }
            },
        },
        mutations: {
            MUTATIONS_AXIOS_GET(state, payload) {
                state.SCENE = payload
            },
            MUTATIONS_AXIOS_GET_PROJECT(state, payload) {
                state.PROJECT_MANAGER = payload
            },

        },
        actions: {
            ACTION_AXIOS_GET({ commit }, params) {
                commit('LOADING_TRUE')
                console.log('ACTION_AXIOS_GET', params)
                axios
                    .get(process.env.VUE_APP_API, { params })
                    .then((res) => {
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

        },
    })
}

export default createStore
