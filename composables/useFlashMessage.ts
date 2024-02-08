// フラッシュメッセージを表示するためのカスタムフック
// setFlashMessage関数を使ってフラッシュメッセージを表示する
// メッセージは2秒間表示される

interface FlashMessage {
    visible: boolean;
    message: string;
}

export const useFlashMessage = () => {
    const flashMessage = useState<FlashMessage>("flash-message", () => {
        return { visible: false, message: "", }
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