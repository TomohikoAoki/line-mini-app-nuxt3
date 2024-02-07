export const useModal = () => {
    const isVisible = useState("use-modal", () => {
        return { visible: false, number: 0, propsData: null }
    });
    const modalNumber = []
    const openModal = (number, propsData = null) => {
        isVisible.value.number = number;
        isVisible.value.propsData = propsData;
        isVisible.value.visible = true;
    };
    const closeModal = () => {
        isVisible.value.visible = false;
        isVisible.value.propsData = null;
    };

    return { isVisible, openModal, closeModal };
};