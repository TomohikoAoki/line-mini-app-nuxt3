<template>
    <Transition name="fade">
        <div v-if="isVisible.visible" class="modal-container">
            <div class="modal-content">
                <component :is="modalType(isVisible.number)">
                </component>
                <button @click="closeModal" class="close">
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
</template>

<script setup lang="ts">
import {
    disableBodyScroll,
    clearAllBodyScrollLocks
} from 'body-scroll-lock'


const { isVisible, closeModal } = useModal()

// dinamic componentの為にimport
// modal #0
import ConnectConfirm from '@/components/Modal/ConnectConfirm.vue';
// modal #1
import UsePoint from '@/components/Modal/UsePoint.vue';

const modalConmopents = [
    ConnectConfirm,
    UsePoint
]

/**
 * @description モーダルの内容を切り替える
 * @see modalConmopents
 * @returns {Component} modalConmopents[index]
 */
const modalType = (index: number): Component => {
    return modalConmopents[index]
}

/**
 * @description isVisibleの値を監視して、モーダルが表示されたらbody scroll lockを付与する
 * @see isVisible　モーダルの表示状態と内容
 * @see disableBodyScroll　body scroll lockを付与する
 * @see clearAllBodyScrollLocks　body scroll lockを解除する
 * @see nextTick　DOMの更新後に実行する
 */
watch(isVisible.value, (newVal) => {
    nextTick(() => {
        if (newVal.visible) {
            const modal: HTMLElement | null = document.querySelector(".modal-container")
            disableBodyScroll(modal!)
        } else {
            clearAllBodyScrollLocks();
        }
    })
})


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
    box-sizing: border-box;

    .modal-content {
        padding: 2em 1em;
        width: 90%;
        margin: 0 auto;
        min-height: 80%;
        background-color: #fff;
        border-radius: 10px;
        box-sizing: border-box;
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