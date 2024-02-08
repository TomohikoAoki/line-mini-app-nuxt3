// フラッシュメッセージを表示するためのカスタムフック
// setFlashMessage関数を使ってフラッシュメッセージを表示する
// メッセージは2秒間表示される

export const useFlashMessage = () => {
    const flashMessage = useState("flash-message", () => {
        return { visible: false, message: "", }
    });

    const setFlashMessage = (message) => {
        flashMessage.value.message = message;
        flashMessage.value.visible = true;

        setTimeout(() => {
            flashMessage.value.message = '';
            flashMessage.value.visible = false;
        }, 2000);
    };

    return { flashMessage, setFlashMessage };
}