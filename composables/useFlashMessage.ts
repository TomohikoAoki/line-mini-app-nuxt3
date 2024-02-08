/**
 * フラッシュメッセージを表示するためのカスタムフック
 * @packageDocumentation
 * @module useFlashMessage
 * @category Composable
 * @subcategory FlashMessage
 * setFlashMessage: フラッシュメッセージを表示する: 2000msで非表示にする
 */

interface FlashMessage {
    visible: boolean;
    message: string;
}

export const useFlashMessage = () => {
    const flashMessage = useState<FlashMessage>("flash-message", () => {
        return { visible: false, message: "" }
    });

    const setFlashMessage = (message: string) => {
        flashMessage.value.message = message;
        flashMessage.value.visible = true;

        setTimeout(() => {
            flashMessage.value.message = '';
            flashMessage.value.visible = false;
        }, 2000);
    };

    return { flashMessage, setFlashMessage };
}