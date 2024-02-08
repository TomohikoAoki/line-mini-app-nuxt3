// モーダルの表示非表示を管理するカスタムフック
// モーダル内の内容も管理するため、モーダル内のコンポーネントを切り替えることもできる
// openModalでモーダルを開く: 引数にモーダル内のコンポーネントを指定

interface Modal {
    visible: boolean;
    number: number;
}

export const useModal = () => {
    const isVisible = useState<Modal>("use-modal", () => {
        return { visible: false, number: 0, }
    });
    const modalNumber = []
    const openModal = (number: number) => {
        isVisible.value.number = number;
        isVisible.value.visible = true;
    };
    const closeModal = () => {
        isVisible.value.visible = false;
    };

    return { isVisible, openModal, closeModal };
};