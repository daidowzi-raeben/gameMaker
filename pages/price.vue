<template>
  <div>
    <div class="price-top main-top">
      <div class="main-top--tit">
        MAKER KOO
        <p class="sub">내가 만드는 첫번째 어플리케이션</p>
      </div>
      <p class="main-top--sub">
        무료부터 프로 서비스까지,<br class="m-block" />
        나에게 맞는 플랜을 선택해 보세요.
      </p>
    </div>
    <div class="price-wrap">
      <table class="price-table">
        <colgroup>
          <col width="28%" />
          <col width="24%" />
          <col width="24%" />
          <col width="24%" />
        </colgroup>
        <tr>
          <th></th>
          <th class="txt-c--grey">FREE</th>
          <th class="txt-c--primary">BASIC</th>
          <th class="txt-c--blue">PRO</th>
        </tr>
        <tr>
          <td>프로젝트 공개</td>
          <td><strong>1</strong>개</td>
          <td><strong>3</strong>개</td>
          <td><strong>10</strong>개</td>
        </tr>
        <tr>
          <td>어플리케이션</td>
          <td><strong>1</strong>개</td>
          <td><strong>3</strong>개</td>
          <td><strong>10</strong>개</td>
        </tr>
        <tr>
          <td>웹/모바일</td>
          <td><strong>1</strong>개</td>
          <td><strong>3</strong>개</td>
          <td><strong>10</strong>개</td>
        </tr>
        <tr>
          <td>시나리오</td>
          <td><strong>3</strong>개</td>
          <td><strong>10</strong>개</td>
          <td><strong>무제한</strong></td>
        </tr>
        <tr>
          <td>챕터</td>
          <td>
            <strong>10</strong>개<span class="guide">(사운드 미지원)</span>
          </td>
          <td><strong>20</strong>개</td>
          <td><strong>무제한</strong></td>
        </tr>
        <tr>
          <td>컷</td>
          <td><strong>30</strong>개</td>
          <td><strong>60</strong>개</td>
          <td><strong>무제한</strong></td>
        </tr>
        <tr>
          <td>엔딩</td>
          <td><strong>1</strong>개</td>
          <td><strong>1</strong>개</td>
          <td><strong>무제한</strong></td>
        </tr>
        <tr>
          <td>용량</td>
          <td><strong>50</strong>MB/프로젝트</td>
          <td><strong>100</strong>MB/프로젝트</td>
          <td><strong>1</strong>GB/프로젝트</td>
        </tr>
        <tr>
          <td>빌드요청</td>
          <td><strong>1</strong>회/월</td>
          <td><strong>6</strong>회/월</td>
          <td><strong>20</strong>회/월</td>
        </tr>
        <tr>
          <td>광고</td>
          <td><strong>있음</strong></td>
          <td><strong>없음</strong></td>
          <td><strong>없음</strong></td>
        </tr>
        <tr>
          <td>가격</td>
          <td class="txt-c--grey"><strong>무료</strong></td>
          <td class="txt-c--primary"><strong>8,900</strong>원/월</td>
          <td class="txt-c--blue"><strong>16,500</strong>원/월</td>
        </tr>
      </table>
      <div class="price-select">
        <el-select :value="''">
          <el-option :value="''"
            >현재 텀블벅 후원 회원만 이용가능합니다</el-option
          >
        </el-select>
        <button type="button" class="button btn btn-primary md" disabled>
          구독 신청하기
        </button>
      </div>
      <div class="price-guide">
        <p>
          이용권을 구매하지 않아도 시나리오를 제작할 수 있습니다.
          <strong>이용권은 게임 출시 시 구매해 주시기 바랍니다.</strong>
        </p>
        <p>
          구독 해지 시 사용중이던 프로젝트는 무료버전으로 전환되어 광고가
          기재됩니다.
        </p>
        <p>구독 해지 시 사용중이던 프로젝트는 수정 및 빌드가 불가합니다.</p>
        <p>도메인 연결 신청 시 5,000원/월 의 추가금이 발생합니다</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
  layout: 'index',
  data() {
    return {}
  },
  computed: {
    ...mapState(['LOGIN']),
  },
  mounted() {
    this.$nextTick(() => {
      this.MUTATIONS_LOADING()
    })
  },
  methods: {
    ...mapMutations(['MUTATIONS_LOADING']),
  },
}
</script>

<style lang="scss" scoped>
</style>
