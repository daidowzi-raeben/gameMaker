<template>
  <div>
    <div>json title : {{ onLoadStory() }}</div>
    <div>
      <button @click="onClickNetxStory">NEXT BUTTON</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  // layout: 'index',
  data() {
    return {
      mockArray: 0,
      MOCK: {
        story: [
          {
            title: '1장',
          },
          {
            title: '2장',
          },
          {
            title: '3장',
          },
          {
            title: '4장',
          },
          {
            title: '5장',
          },
        ],
        btn: [
          {
            title: '2장',
            array: 1,
            array2: [
              {
                title: '1화',
              },
              {
                title: '2화',
              },
              {
                title: '3화',
              },
              {
                title: '4화',
              },
            ],
          },
          {
            title: '3장',
            array: 2,
            array2: [
              {
                title: '1화',
              },
              {
                title: '2화',
              },
              {
                title: '3화',
              },
              {
                title: '4화',
              },
            ],
          },
          {
            title: '4장',
            array: 3,
            array2: [
              {
                title: '1화',
              },
              {
                title: '2화',
              },
              {
                title: '3화',
              },
              {
                title: '4화',
              },
            ],
          },
          {
            title: '5장',
            array: 4,
            array2: [
              {
                title: '1화',
              },
              {
                title: '2화',
              },
              {
                title: '3화',
              },
              {
                title: '4화',
              },
            ],
          },
          {
            title: '',
            array: null,
          },
        ],
        assets: [
          {
            code: 'A',
            background: '이미지경로',
            titleBackground: '이미지경로',
            textBackground: '이미지경로',
            people: [{ img: '이미지경로' }, { img: '이미지경로' }],
          },
          {
            title: '2장',
          },
          {
            title: '3장',
          },
          {
            title: '4장',
          },
          {
            title: '5장',
          },
        ],
      },
    }
  },
  methods: {
    onLoadStory() {
      const storyTitle = this.MOCK.story[this.mockArray].title
      return storyTitle
    },
    onClickNetxStory() {
      const storyTitle = this.MOCK.btn[this.mockArray].array
      if (storyTitle === null) {
        return alert('END')
      }
      this.mockArray = storyTitle
    },
  },
}
</script>

<style>
</style>