export const useFlashMessage = () => {
    const flashMessage = ref('')
    const flashMessageVisible = ref(false)

    const setFlashMessage = (message) => {
        flashMessage.value = message;
        flashMessageVisible.value = true;

        setTimeout(() => {
            flashMessage.value = '';
            flashMessageVisible.value = false;
        }, 3000);
    };

    return { flashMessage, flashMessageVisible, setFlashMessage };
}