<template>
  <div>MOCK</div>
</template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return {
      MOCK: {
        intro: {
          bg: '/asset/bg',
          profile: [
            {
              code: '',
              name: '',
              information: '',
              photo: '/asset/bg',
              bgColor: '#ddd',
            },
            {
              code: '',
              name: '',
              information: '',
              photo: '/asset/bg',
              bgColor: '#ddd',
            },
            {
              code: '',
              name: '',
              information: '',
              photo: '/asset/bg',
              bgColor: '#ddd',
            },
          ],
          gallery: [
            { code: '', assetBG: '', display: '' },
            { code: '', assetBG: '', display: '' },
            { code: '', assetBG: '', display: '' },
          ],
        },
        loading: {
          bg: 'asset/bg',
        },
        smlt: {
          cp: {
            code001: {
              cut001: {
                name: '이지안',
                tkType: 'O',
                tk: [
                  {
                    tk: '안녕하세요',
                    point: 0,
                    next: 'cut002',
                  },
                  {
                    tk: '반갑습니다',
                    point: 0,
                    next: 'cut002',
                  },
                ],
                photo: '/asset/bg',
                bg: '/asset/bg',
              },
              cut002: {
                name: '이지안',
                tkType: 'M',
                tk: [
                  {
                    tk: '안녕하세요',
                    point: 0,
                    next: 'cut004',
                  },
                  {
                    tk: '안녕하세요',
                    point: 0,
                    next: 'cut003',
                  },
                  {
                    tk: '안녕하세요',
                    point: 0,
                    next: 'cut005',
                  },
                ],
                photo: '/asset/bg',
                bg: '/asset/bg',
              },
            },
          },
        },
      },
    }
  },
  computed: {},
  methods: {},
}
</script>

<style>
</style>
