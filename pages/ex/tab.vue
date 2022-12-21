<template>
  <div>
    <div>
      <h1>탭</h1>
      <b-tabs>
        <b-tab active>
          <template #title> 탭1 </template>
          <div>내용</div>
        </b-tab>

        <b-tab>
          <template #title> 탭2 </template>
          <div>내용2</div>
        </b-tab>
      </b-tabs>
    </div>
    <div>
      <h1>토글</h1>
      <!-- v-b-toggle.엘리멘트아이디 -->
      <b-button v-b-toggle.my-collapse>토글버튼</b-button>
      <!-- 엘리멘트 아이디랑 동일하게 설정 -->
      <b-collapse id="my-collapse">
        <div>내용</div>
      </b-collapse>
    </div>
    <div class="m-t-5">
      <el-switch v-model="value1"> </el-switch>
      <el-switch
        v-model="value2"
        active-color="#13ce66"
        inactive-color="#ff4949"
      >
      </el-switch>
    </div>
    <div class="m-t-5">
      <i class="el-icon-edit"></i>
      <i class="el-icon-share"></i>
      <i class="el-icon-delete"></i>
      <el-button type="primary" icon="el-icon-search">Search</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EXtab',
  data() {
    return {
      value1: true,
      value2: true,
    }
  },
}
</script>

<style></style>
