<template>
  <div class="mgt">
    <div class="mgt-admin">
      <div class="left">
        <div class="gnb">
          <h1>MAKER KOO</h1>
          <el-menu :default-openeds="['1']">
            <el-submenu index="1">
              <template slot="title"
                ><i class="el-icon-setting"></i>환경설정
                <span class="badge badge-warning">999</span>
              </template>
              <el-menu-item index="1-1">에셋관리
                <span class="badge badge-warning">99</span>
              </el-menu-item>
              <el-menu-item index="1-2">사용자관리</el-menu-item>
              <el-menu-item index="1-3">에셋관리</el-menu-item>
              <el-menu-item index="1-4">사용자관리</el-menu-item>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title"
                ><i class="el-icon-message"></i>환경설정</template
              >
              <el-menu-item index="2-1">에셋관리</el-menu-item>
              <el-menu-item index="2-2">사용자관리</el-menu-item>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title"
                ><i class="el-icon-message"></i>환경설정</template
              >
              <el-menu-item index="3-1">에셋관리</el-menu-item>
              <el-menu-item index="3-2">사용자관리</el-menu-item>
            </el-submenu>
          </el-menu>
        </div>
      </div>
      <div class="right">
        <section class="container">
          <div class="content">
            <div class="tit">
              <div class="tit-txt">
                <h4 class="tit-txt is_active">신규소식</h4>
                <h4 class="tit-txt">환경설정</h4>
              </div>
              <div class="tit-btn">
                <button type="button" class="el-button tit-btn__primary">
                  버튼1
                </button>
                <button type="button" class="el-button tit-btn__success">
                  버튼2예용
                </button>
              </div>
            </div>
            <div class="table-mgt">
              <colgroup>
                <col style="width: 20%" />
                <col style="width: 20%" />
                <col style="width: 20%" />
                <col style="width: 20%" />
                <col style="width: auto" />
              </colgroup>
              <tr>
                <th>출석번호</th>
                <th>이름</th>
                <th>출결사항</th>
                <th>출결사항</th>
                <th>특이사항</th>
              </tr>
              <tr>
                <td>내용이 들어갑니다</td>
                <td>내용이 들어갑니다</td>
                <td>내용이 들어갑니다</td>
                <td>내용이 들어갑니다</td>
                <td>내용이 들어갑니다</td>
              </tr>
              <tr>
                <td>내용이 들어갑니다</td>
                <td>내용이 들어갑니다</td>
                <td>내용이 들어갑니다</td>
                <td>내용이 들어갑니다</td>
                <td>내용이 들어갑니다</td>
              </tr>
              <tr>
                <td>내용이 들어갑니다</td>
                <td>내용이 들어갑니다</td>
                <td>내용이 들어갑니다</td>
                <td>내용이 들어갑니다</td>
                <td>내용이 들어갑니다</td>
              </tr>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script></script>

<style lang="scss"></style>
