<template>
  <div class="insert">
    <div class="setting">
      <div class="setting-con">
        <div class="setting-tit">항목 설정</div>
        <div class="setting-info">설정 창에 표시될 항목을 체크해 주세요.</div>
        <div class="radio-wrap">
          <label class="input-check">
            <input type="checkbox" checked>
            <span class="check checkbox"></span>
            <span class="text">배경음</span>
          </label>
          <label class="input-check">
            <input type="checkbox" checked>
            <span class="check checkbox"></span>
            <span class="text">효과음</span>
          </label>
          <label class="input-check">
            <input type="checkbox">
            <span class="check checkbox"></span>
            <span class="text">푸시알림</span>
          </label>
          <label class="input-check">
            <input type="checkbox">
            <span class="check checkbox"></span>
            <span class="text">진동효과</span>
          </label>
        </div>
        <div class="radio-wrap mb-5">
          <label class="input-check">
            <input type="checkbox">
            <span class="check checkbox"></span>
            <span class="text">도움주신분</span>
          </label>
          <label class="input-check">
            <input type="checkbox">
            <span class="check checkbox"></span>
            <span class="text">데이터초기화</span>
          </label>
          <label class="input-check">
            <input type="checkbox">
            <span class="check checkbox"></span>
            <span class="text">로그인</span>
          </label>
        </div>
        <div class="setting-tit">디자인 설정</div>
        <div class="color-select--list">
          <div class="color-select--wrap mb-5">
            <el-color-picker
                  show-alpha
            ></el-color-picker>
            <label class="label">메인 색상</label>
          </div>
          <div class="color-select--wrap mb-5">
            <el-color-picker
                  show-alpha
            ></el-color-picker>
            <label class="label">서브 색상</label>
          </div>
        </div>
        <div class="input-wrap">
          <label class="input-label">모서리 둥글기</label>
          <el-select>
            <el-option>없음</el-option>
            <el-option>있음</el-option>
          </el-select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
