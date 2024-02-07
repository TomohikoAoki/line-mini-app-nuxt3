<template>
    <Teleport to="#app">
        <Transition name="fade">
            <div v-if="flashMessageVisible" class="modal-container">
                <div class="modal-content">
                    {{ flashMessage }}
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup>

const { flashMessage, flashMessageVisible } = useFlashMessage()

</script>

<style lang="scss" scoped>
.modal-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 2001;

    .modal-content {
        position: absolute;
        padding: 2em 1em;
        width: 90%;
        background-color: #cacaca;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
        text-align: center;

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