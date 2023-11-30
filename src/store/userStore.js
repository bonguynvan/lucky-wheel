import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => ({ spinningTimes: 3, name: 'Eduardo', winning: 0, usedTimes: 0, isMenu: false, soundEnabled: true }),
    actions: {
        addSpinningTimes(times) {
            this.spinningTimes+=times
        },
        addWinning() {
            this.winning++
        },
        useSpin() {
            this.usedTimes++
            this.spinningTimes--
        },
        toggleMenu() {
            this.isMenu = !this.isMenu
        },
        toggleSound() {
            this.soundEnabled = !this.soundEnabled
            document.querySelectorAll("video, audio").forEach((elem) => {
                elem.muted = !this.soundEnabled;
            });
        }
    },
    persist: true,
})