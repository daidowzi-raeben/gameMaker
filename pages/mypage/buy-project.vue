<template>
  <div class="mypage-wrap store">
    <div class="tab">
      <div class="tab-list">
        <button
          type="button"
          class="tab-list--btn"
          :class="{ active: activeTab === 0 }"
          @click="activeTab = 0"
        >
          프로젝트 구매내역
        </button>
        <button
          type="button"
          class="tab-list--btn"
          :class="{ active: activeTab === 1 }"
          @click="activeTab = 1"
        >
          에셋 구매내역
        </button>
        <button
          type="button"
          class="tab-list--btn"
          :class="{ active: activeTab === 2 }"
          @click="activeTab = 2"
        >
          정보변경
        </button>
      </div>
      <div class="tab-con el-scrollbar">
        <div
          v-show="activeTab === 0"
          class="detail el-scrollbar__wrap el-scrollbar__wrap--hidden-default"
        >
          <div class="tui-editor-contents">
            <table class="table table-buy">
              <caption>
                프로젝트 구매내역
              </caption>
              <colgroup>
                <col style="width: 15%;" />
                <col style="width: auto;" />
                <col style="width: 15%;" />
                <col style="width: 20%;" />
                <col style="width: 15%;" />
              </colgroup>
              <thead>
                <tr>
                  <th scope="col">구매일시</th>
                  <th scope="col">상품명</th>
                  <th scope="col">금액</th>
                  <th scope="col">상태</th>
                  <th scope="col">관리</th>
                </tr>
              </thead>
              <tbody>
                <tr class="buy">
                  <td scope="row">2023.01.01</td>
                  <td scope="row">프로젝트 쿠 구독 서비스 PRO</td>
                  <td scope="row">15,000 원</td>
                  <td scope="row" class="txt-red">구독중</td>
                  <td scope="row">
                    <button type="button" class="button btn-white">해지</button>
                  </td>
                </tr>
                <tr class="buy">
                  <td scope="row">2023.01.01</td>
                  <td scope="row">프로젝트 쿠 구독 서비스 PRO</td>
                  <td scope="row">15,000 원</td>
                  <td scope="row" class="disabled">구독완료</td>
                  <td scope="row">
                    <button type="button" disabled class="button btn-disabled">
                      해지
                    </button>
                  </td>
                </tr>
                <tr class="buy">
                  <td scope="row">2023.01.01</td>
                  <td scope="row">프로젝트 쿠 구독 서비스 PRO</td>
                  <td scope="row">15,000 원</td>
                  <td scope="row" class="disabled">구독취소</td>
                  <td scope="row">
                    <button type="button" disabled class="button btn-disabled">
                      해지
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div
          v-show="activeTab === 1"
          class="list list-asset el-scrollbar__wrap el-scrollbar__wrap--hidden-default"
          style="display: none;"
        >
          <div class="item">
            <div class="item-img">
              <img
                src="~/static/images/mypage.png"
                alt="구매내역 이미지 미리보기"
              />
            </div>
            <div class="item-txt">
              <div class="tit">
                판타지 핑뚝이 여자 캐릭터 총 세줄까지만 표시됩니다판타지 핑뚝이
                여자 캐릭터 총 세줄까지만 표시됩니다판타지 핑뚝이 여자 캐릭터 총
                세줄까지만 표시됩니다판타지 핑뚝이 여자 캐릭터 총 세줄까지만
                표시됩니다
              </div>
              <ul class="info">
                <li class="info-list">
                  <label class="label">제작자</label>
                  <span class="text">
                    <span>쟈몽</span>
                  </span>
                </li>
                <li class="info-list">
                  <label class="label">구성</label>
                  <span class="text">
                    <span>무표정</span>
                    <span>무표정</span>
                    <span>무표정</span>
                    <span>무표정</span>
                    <span>무표정</span>
                    <span>무표정</span>
                    <span>무표정</span>
                    <span>무표정</span>
                    <span>무표정</span>
                    <span>무표정</span>
                  </span>
                </li>
                <li class="info-list">
                  <label class="label">구매가격</label>
                  <span class="text"> <span>5,000</span><span>원</span> </span>
                </li>
                <li class="info-list">
                  <label class="label">구매일</label>
                  <span class="text">
                    <span>2023.01.01</span>
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div class="item">
            <div class="item-img">
              <img
                src="~/static/images/mypage.png"
                alt="구매내역 이미지 미리보기"
              />
            </div>
            <div class="item-txt">
              <div class="tit">
                판타지 핑뚝이 여자 캐릭터 총 세줄까지만 표시됩니다판타지 핑뚝이
                여자 캐릭터 총 세줄까지만 표시됩니다판타지 핑뚝이 여자 캐릭터 총
                세줄까지만 표시됩니다판타지 핑뚝이 여자 캐릭터 총 세줄까지만
                표시됩니다
              </div>
              <ul class="info">
                <li class="info-list">
                  <label class="label">제작자</label>
                  <span class="text">
                    <span>쟈몽</span>
                  </span>
                </li>
                <li class="info-list">
                  <label class="label">구성</label>
                  <span class="text">
                    <span>무표정</span>
                    <span>무표정</span>
                    <span>무표정</span>
                    <span>무표정</span>
                  </span>
                </li>
                <li class="info-list">
                  <label class="label">구매가격</label>
                  <span class="text"> <span>5,000</span><span>원</span> </span>
                </li>
                <li class="info-list">
                  <label class="label">구매일</label>
                  <span class="text">
                    <span>2023.01.01</span>
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div class="item">
            <div class="item-img">
              <img
                src="~/static/images/mypage.png"
                alt="구매내역 이미지 미리보기"
              />
            </div>
            <div class="item-txt">
              <div class="tit">
                판타지 핑뚝이 여자 캐릭터 총 세줄까지만 표시됩니다판타지 핑뚝이
                여자 캐릭터 총 세줄까지만 표시됩니다판타지 핑뚝이 여자 캐릭터 총
                세줄까지만 표시됩니다판타지 핑뚝이 여자 캐릭터 총 세줄까지만
                표시됩니다
              </div>
              <ul class="info">
                <li class="info-list">
                  <label class="label">제작자</label>
                  <span class="text">
                    <span>쟈몽</span>
                  </span>
                </li>
                <li class="info-list">
                  <label class="label">구성</label>
                  <span class="text">
                    <span>무표정</span>
                    <span>무표정</span>
                    <span>무표정</span>
                    <span>무표정</span>
                  </span>
                </li>
                <li class="info-list">
                  <label class="label">구매가격</label>
                  <span class="text"> <span>5,000</span><span>원</span> </span>
                </li>
                <li class="info-list">
                  <label class="label">구매일</label>
                  <span class="text">
                    <span>2023.01.01</span>
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div class="item">
            <div class="item-img">
              <img
                src="~/static/images/mypage.png"
                alt="구매내역 이미지 미리보기"
              />
            </div>
            <div class="item-txt">
              <div class="tit">
                판타지 핑뚝이 여자 캐릭터 총 세줄까지만 표시됩니다판타지 핑뚝이
                여자 캐릭터 총 세줄까지만 표시됩니다판타지 핑뚝이 여자 캐릭터 총
                세줄까지만 표시됩니다판타지 핑뚝이 여자 캐릭터 총 세줄까지만
                표시됩니다
              </div>
              <ul class="info">
                <li class="info-list">
                  <label class="label">제작자</label>
                  <span class="text">
                    <span>쟈몽</span>
                  </span>
                </li>
                <li class="info-list">
                  <label class="label">구성</label>
                  <span class="text">
                    <span>무표정</span>
                    <span>무표정</span>
                    <span>무표정</span>
                    <span>무표정</span>
                  </span>
                </li>
                <li class="info-list">
                  <label class="label">구매가격</label>
                  <span class="text"> <span>5,000</span><span>원</span> </span>
                </li>
                <li class="info-list">
                  <label class="label">구매일</label>
                  <span class="text">
                    <span>2023.01.01</span>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div
          v-show="activeTab === 2"
          class="detail el-scrollbar__wrap el-scrollbar__wrap--hidden-default"
          style="display: none;"
        >
          <div class="tui-editor-contents">
            <p>33</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'index',
  data() {
    return {
      activeTab: 0,
    }
  },
}
</script>

<style lang="scss"></style>
