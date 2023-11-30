<script setup>
import {ref} from "vue";
import {useUserStore} from "@/store/userStore";
import { useSound } from '@vueuse/sound'

const userStore = useUserStore()
const spinningWheel = useSound('static/sound/spiningwheel.mp3')
const prizes = ref([])
prizes.value = [
  {
    svg: 'iphone',
    color: '#af1e1e',
    name: 'iphone 15'
  },
  {
    svg: 'money',
    color: '#279093',
    name: '100$'
  },
  {
    svg: 'coins',
    color: '#42d013',
    name: '5000 coins'
  },
  {
    svg: 'gift-box',
    color: '#e89c0f',
    name: 'Magic Box'
  },
  {
    svg: 'voucher',
    color: '#fff207',
    name: 'Voucher'
  },
  {
    svg: 'gold',
    color: '#ee07da',
    name: 'gold 9999'
  },
  {
    svg: 'sad-circle',
    color: '#727272',
    name: ''
  },
  {
    svg: 'free-spin',
    color: '#3cff00',
    name: '1 free turn'
  },
]
const spinBtn = ref(null)
const wheel = ref(null)
const prizeResult = ref(null)
const spinning = ref(false)
const prizeRatio = ref(0)
const emit = defineEmits(['showDialog'])

const playWheel = () => {
  if(spinning.value) return false
  if(userStore.spinningTimes < 1) {
    emit('showDialog', {status: 0, msg: 'You have run out of spins, please do the mission or buy more spins'})
    return false
  }
  spinningWheel.play()
  spinning.value = true
  prizeRatio.value += Math.ceil(Math.random() * 7200)
  const result = Math.round((prizeRatio.value % 360)/45)
  prizeResult.value = result > 0 ? prizes.value[prizes.value.length - result] : prizes.value[0]
  setTimeout(() => {
    spinning.value = false
    if(prizeResult.value?.name !== '') {
      userStore.addWinning()
      emit('showDialog', {status: 1, msg: `You have won ${prizeResult.value?.name}. Try out our spin and win more exciting prizes.`, prize: prizeResult.value})
    } else {
      emit('showDialog', {status: -1, msg: 'Sorry, you lost your turn. Try again to find your chance to win', prize: prizeResult.value})
    }
    userStore.useSpin()
  }, 5000)
}

</script>

<template>
  <div id="wheelContainer">
    <div class="spin-btn" ref="spinBtn" :class="{disabled: spinning}" @click="playWheel">PLAY</div>
    <div class="wheel" ref="wheel" :style="{transform: `rotate(${prizeRatio}deg)`}">
      <div v-for="(prize, i) in prizes" class="prize" :style="`--i:${i+1};--clr:${prize.color}`" :key="i">
        <div class="prize__name">
          <span>{{ prize.name }}</span>
          <img :src="`/static/img/${prize.svg}.svg`" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#wheelContainer {
  height: 300px;
  width: 300px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 50px auto;

  .spin-btn {
    position: absolute;
    width: 60px;
    height: 60px;
    background: #243636;
    border-radius: 50%;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    letter-spacing: .1em;
    border: 4px solid #020202;
    cursor: pointer;
    user-select: none;
    text-shadow: 4px 6px 2px rgba(0, 0, 0, 0.15);
    &:before {
      content: '';
      position: absolute;
      top: -36px;
      width: 20px;
      height: 40px;
      background: #243636;
      clip-path: polygon(50% 0%, 15% 100%, 85% 100%);
    }
    &.disabled {
      color: #ccc;
      cursor: not-allowed;
    }
  }

  .wheel {
    position: absolute;
    top: 0;
    left: 0;
    height: 300px;
    width: 300px;
    overflow: hidden;
    background: #333;
    border-radius: 50%;
    box-shadow: 0 0 0 5px #333, 0 0 0 15px #fff, 0 0 0 18px #111;
    transition: transform 5s ease-in-out;

    .prize {
      position: absolute;
      width: 50%;
      height: 50%;
      background: var(--clr);
      transform-origin: bottom right;
      transform: rotate(calc(45deg * var(--i))); // 45 90 135 180 ...
      clip-path: polygon(0 0, 58% 0, 100% 100%, 0% 58%);
      display: flex;
      align-items: center;
      justify-content: center;
      user-select: none;

      &__name {
        position: relative;
        transform: rotate(-45deg);
        font-size: 12px;
        font-weight: 600;
        color: #fff;
        text-shadow: 3px 5px 2px rgba(0, 0, 0, 0.15);
        display: flex;
        flex-direction: column;
        gap: 10px;
        align-items: center;
        img {
          width: 30px;
          height: 30px;
          box-shadow: 3px 5px 2px rgba(0, 0, 0, 0.15);
        }
      }

    }
  }
}
</style>
