// フラッシュメッセージを表示するためのカスタムフック
// setFlashMessage関数を使ってフラッシュメッセージを表示する
// メッセージは2秒間表示される
// メッセージの表示状態はflashMessage.value.visibleで取得できる
// メッセージの内容はflashMessage.value.messageで取得できる

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