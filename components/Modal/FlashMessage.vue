<template>
    <Transition name="fade">
        <div v-if="visible" class="modal-container">
            <div class="modal-content">
                {{ message }}
            </div>
        </div>
    </Transition>
</template>

<script setup lang="ts">

const { flashMessage } = useFlashMessage()

const message = computed(() => {
    return flashMessage.value.message
})

const visible = computed(() => {
    return flashMessage.value.visible
})

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