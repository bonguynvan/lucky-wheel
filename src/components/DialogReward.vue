<script setup>
import {toRefs, watch} from "vue";
import { useSound } from '@vueuse/sound'
import {useUserStore} from "@/store/userStore";

const cheerSound = useSound('/static/sound/cheer.mp3')
const failSound = useSound('/static/sound/fail.mp3')
const props = defineProps({
  status: {
    type: Number, // -1: fail 1: success 0: nothing
    required: true
  },
  msg: {
    type: String
  },
  prize: {
    type: Object
  },
  dialog: Boolean
})

const userStore = useUserStore()
const { status, msg, dialog, prize } = toRefs(props)

watch(() => status.value, (val) => {
  if(val === 1) {
    cheerSound.play()
  } else if(val === -1){
    failSound.play()
  } else {
    cheerSound.stop()
    failSound.stop()
  }
}, {immediate: true})

watch(() => userStore.soundEnabled, (val) => {
  if(!val) {
    cheerSound.pause()
    failSound.pause()
  }
})

const emit = defineEmits(['close'])
</script>
<template>
  <div v-if="dialog" id="dialog" class="modal" :class="status === 1 ? 'success' : 'failure'">
    <div class="modal-content">
      <div class="reward-icon">
        <img v-if="prize && prize.svg" :src="`/static/img/${prize.svg}.svg`" alt="">
        <h3>{{status === 1 ? 'Congratulations' : 'Oh no'}}</h3>
      </div>
      <span class="close" @click="emit('close')">&times;</span>
      <p>{{msg}}</p>
      <div class="actions">
        <button @click="emit('close')">
          {{ status === 1 ? 'Cheer' : 'Try again'}}
        </button>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.modal {
  position: fixed;
  z-index: 99;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4);
  &-content {
    position: relative;
    background-color: #0f4657;
    margin: 15% auto;
    padding: 20px;
    box-shadow: 3px 5px 2px rgba(0, 0, 0, 0.15);
    width: 500px;
    border-radius: 8px;
    p {
      text-align: center;
    }
    .reward-icon {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      h3 {
        margin: 5px 0;
      }
      img {
        width: 50px;
        height: 50px;
      }
    }
    .actions {
      display: flex;
      align-items: center;
      justify-content: center;
      button {
        outline: none;
        border: none;
        background: #ffd044;
        padding: 8px;
        border-radius: 4px;
        width: 30%;
        cursor: pointer;
      }
    }
    @media only screen and (max-width: 600px) {
      margin: 30% auto;
      width: 280px;
    }
  }
}
.close {
  color: #aaa;
  position: absolute;
  font-size: 28px;
  font-weight: bold;
  top: 5px;
  right: 10px;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>