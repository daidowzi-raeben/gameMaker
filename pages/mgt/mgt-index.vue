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
              <el-menu-item index="1-1"
                >에셋관리
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
                <th>이메일</th>
                <th>닉네임</th>
                <th>생년월일</th>
                <th>가입일</th>
              </tr>
              <tbody v-if="ADMIN && ADMIN.MEMBERS && ADMIN.MEMBERS.members">
                <tr v-for="(v, i) in ADMIN.MEMBERS.members" :key="i">
                  <td>{{ v.user_id }}</td>
                  <td>{{ v.user_name }}</td>
                  <td>{{ v.year }}.{{ v.month }}</td>
                  <td>{{ v.datetime }}</td>
                </tr>
              </tbody>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { kooLogin } from '~/config/util'
export default {
  data() {
    return {
      params: {},
    }
  },
  computed: {
    ...mapState(['ADMIN']),
  },
  mounted() {
    if (
      kooLogin('user_idx') !==
      'ef2d127de37b942baad06145e54b0c619a1f22327b2ebbcfbec78f5564afe39d'
    ) {
      this.$router.push('/sign-in')
    }

    this.params.type = 'members'
    this.params.apiKey = process.env.API_KEY
    this.params.user_idx = this.$cookies.get('user_idx')
    this.ADMIN_ACTION_AXIOS_GET(this.params)
  },
  methods: {
    ...mapActions(['ADMIN_ACTION_AXIOS_GET']),
  },
}
</script>

<style lang="scss"></style>
