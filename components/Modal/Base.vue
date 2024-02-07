<template>
    <teleport to="#app">
        <Transition name="fade">
            <div v-if="isVisible.visible" class="modal-container">
                <div class="modal-content">
                    <component :is="modalTyle(isVisible.number)" @emitData="emitData">
                    </component>
                    <button @click="close" class="close">
                        <span class="close-icon">
                            <SvgBase icon-name="icon-navi-add" viewBox="0 -960 960 960" iconColor="#504848;"
                                iconTitle="モーダル閉じる">
                                <SvgDataClose></SvgDataClose>
                            </SvgBase>
                        </span>
                        <span class="close-text">CLOSE</span>
                    </button>
                </div>
            </div>
        </Transition>
    </teleport>
</template>

<script setup>
import {
    disableBodyScroll,
    clearAllBodyScrollLocks
} from 'body-scroll-lock'

// modal #0
import ConnectConfirm from '@/components/Modal/ConnectConfirm.vue';
// modal #1
import UsePoint from '@/components/Modal/UsePoint.vue';

const modalConmopents = [
    ConnectConfirm,
    UsePoint
]

const { isVisible, closeModal } = useModal()

// modal componentの切り替え
const modalTyle = (index) => {
    return modalConmopents[index]
}

// mountしたらbody scroll lockを付与
watch(isVisible, (newVal) => {
    if (newVal) {
        nextTick(() => {
            const confirmModal = document.querySelector(".modal-container")
            disableBodyScroll(confirmModal)
        })
    } else {
        clearAllBodyScrollLocks();
    }
})


const emits = defineEmits(['emitData', 'close'])

const emitData = (value) => {
    emits('emitData', value)
}

const close = () => {
    clearAllBodyScrollLocks()
    closeModal()
}

</script>

<style lang="scss" scoped>
.modal-container {
    width: 100%;
    padding: 50px 0 150px 0;
    position: fixed;
    z-index: 1002;
    height: 100%;
    overflow-y: scroll;
    top: 0;
    left: 0;
    margin: 0;
    background-color: rgba(56, 50, 61, 0.8);

    .modal-content {
        padding: 2em 1em;
        width: 90%;
        margin: 0 auto;
        min-height: 80%;
        background-color: #fff;
        border-radius: 10px;
    }
}

.close {
    width: 150px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    color: #504848;

    .close-icon {
        display: block;
        width: 30px;
        margin: 0 0.2em;
    }

    .close-text {
        display: block;
        font-size: 18px;
        margin: 0 0.2em;
        color: #504848;

    }
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>