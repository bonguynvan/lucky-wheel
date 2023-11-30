<script setup>
import IconMenuBar from "@/components/icons/IconMenuBar.vue";
import IconSoundOn from "@/components/icons/IconSoundOn.vue";
import IconSoundOff from "@/components/icons/IconSoundOff.vue";
import WheelContainer from "@/components/WheelContainer.vue";
import {useUserStore} from "@/store/userStore";
import LeaderBoard from "@/components/LeaderBoard.vue";
import DialogReward from "@/components/DialogReward.vue";
import {onMounted, ref} from "vue";

const isDialog = ref(false)
const statusDialog = ref(0)
const prizeWin = ref(null)
const msgDialog = ref('')
const userStore = useUserStore()

onMounted( () => {
  if(userStore.spinningTimes === 0) {
    isDialog.value = true
    statusDialog.value = 0
    msgDialog.value = 'You have run out of spins, please do more tasks to earn more spins'
  }
})


const showDialog = ({status, msg, prize}) => {
  msgDialog.value = msg
  isDialog.value = true
  prizeWin.value = prize || null
  statusDialog.value = status
}

const closeDialog = () => {
  statusDialog.value = 0
  msgDialog.value = ''
  isDialog.value = false
  prizeWin.value = null
}
</script>

<template>
  <div class="container">
    <header>
      <IconMenuBar />
      <h3>Spin & Win</h3>
      <IconSoundOn v-if="userStore.soundEnabled" @click="userStore.toggleSound"/>
      <IconSoundOff v-else  @click="userStore.toggleSound"/>
    </header>
    <div class="intro">
      Filling lucky? Try out our spin and win game to win one of our exciting prizes.
    </div>
    <main>
      <WheelContainer @showDialog="showDialog"/>
    </main>
    <footer>
      <LeaderBoard />
    </footer>
    <DialogReward :status="statusDialog" :prize="prizeWin" :msg="msgDialog" :dialog="isDialog" @close="closeDialog"/>
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 100%;
  min-width: 300px;
  min-height: 100vh;
  margin: 0;
  padding: 8px;
  background: #3e9ea4;
  color: #fff;
  .intro {
    text-align: center;
  }
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    svg {
      cursor: pointer;
      margin-right: 10px;
    }
  }
  footer {
    padding: 30px;
  }
  @media only screen and (max-width: 600px) {
    width: 97%;
  }
}

</style>
