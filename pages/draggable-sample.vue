<template>
  <div>
    <draggable
      :list="list"
      :disabled="!enabled"
      class="list-group"
      ghost-class="ghost"
      :move="checkMove"
      @start="dragging = true"
      @end="dragging = false"
    >
      <div v-for="(element, i) in list" :key="i" class="list-group-item">
        {{ element.name }}
      </div>
    </draggable>
    <div class="list-group-item mt-3">asd</div>
    {{ list }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      enabled: true,
      list: [
        { name: 'John', id: 0 },
        { name: 'Joao', id: 1 },
        { name: 'Jean', id: 2 },
      ],
      dragging: false,
    }
  },
  computed: {
    draggingInfo() {
      return this.dragging ? 'under drag' : ''
    },
  },
  methods: {
    checkMove(e) {
      console.log('Future index: ' + e.draggedContext.futureIndex)
    },
  },
}
</script>

<style>
</style>
