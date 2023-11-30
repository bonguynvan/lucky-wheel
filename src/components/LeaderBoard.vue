<script setup>
import {useUserStore} from "@/store/userStore";
const userStore = useUserStore()
</script>
<template>
  <h2 style="text-align: center;margin: 5px;">Leaderboard</h2>
  <div id="leaderBoard">
    <div class="champion">
      <div class="avatar">
          <span>1</span>
          <img src="/static/img/avatar-default.jpg" alt="">
      </div>
      <div class="name">John Week</div>
      <div class="achievements">
        <div>100 wins</div>
        <div>234 used</div>
      </div>
    </div>
    <div class="champion self">
      <div class="avatar">
        <span>2</span>
        <img src="/static/img/avatar-default.jpg" alt="">
      </div>
      <div class="name">{{userStore.name}}</div>
      <div class="achievements">
        <div>{{userStore.winning}} wins</div>
        <div>{{userStore.usedTimes}} used</div>
      </div>
    </div>
    <div class="champion">
      <div class="avatar">
          <span>3</span>
          <img src="/static/img/avatar-default.jpg" alt="">
      </div>
      <div class="name">Hanna_123</div>
      <div class="achievements">
        <div>50 wins</div>
        <div>55 used</div>
      </div>
    </div>
    <div class="champion">
      <div class="avatar">
        <span>4</span>
        <img src="/static/img/avatar-default.jpg" alt="">
      </div>
      <div class="name">Baby Boss</div>
      <div class="achievements">
        <div>50 wins</div>
        <div>55 used</div>
      </div>
    </div>
    <div class="champion">
      <div class="avatar">
        <span>5</span>
        <img src="/static/img/avatar-default.jpg" alt="">
      </div>
      <div class="name">Venomvenom</div>
      <div class="achievements">
        <div>50 wins</div>
        <div>55 used</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#leaderBoard {
  color: #333;
  max-height: 300px;
  overflow-y: auto;
  overflow-x: hidden;
  width: 100%;
  min-width: 300px;
  .champion {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #fff;
    width: 97%;
    margin: auto;
    &:nth-child(1) {
      border-radius: 8px 8px 0 0;
      .achievements {
        border-radius: 0 8px 0 0;
      }
    }
    &:last-child {
      border-radius: 0 0 8px 8px;
      .achievements {
        border-radius: 0 0 8px 0;
      }
    }
    &.self {
      background: #555;
      color: #fff;
      border: 1px solid #555;
      border-radius: 8px;
      position: relative;
      width: 100%;
      .achievements {
        background: #555;
        border-radius: 8px;
      }
    }
    .avatar {
      display: flex;
      gap: 5px;
      align-items: center;
      justify-content: space-between;
      padding: 8px 16px 8px 8px;
      border-right: 1px solid #ccc;
      span {
        margin: 0 3px;
      }
      img {
        width: 28px;
        height: 28px;
        border-radius: 50%;
      }
    }
    .achievements {
      padding: 8px;
      background: #0d2d4b;
      width: 80px;
      div {
        background: white;
        margin: 4px 0;
        color: #444;
        text-align: right;
        border-radius: 8px;
        padding: 0 8px;
        font-size: 14px;
      }
    }
  }
}
</style>
