export const useModal = () => {
    const isVisible = useState("use-modal", () => {
        return { visible: false, number: 0, }
    });
    const modalNumber = []
    const openModal = (number) => {
        isVisible.value.number = number;
        isVisible.value.visible = true;
    };
    const closeModal = () => {
        isVisible.value.visible = false;
    };

    return { isVisible, openModal, closeModal };
};