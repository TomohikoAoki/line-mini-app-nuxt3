/**
 * ローディング状態画面を管理するためのカスタムフック
 * - isLoading: reactive boolean value
 * - startLoading: function to set isLoading to true
 * - endLoading: function to set isLoading to false
 */

export const useLoading = () => {
    const isLoading = useState<boolean>("loading", () => false);
    const startLoading = () => {
        isLoading.value = true;
    };
    const endLoading = () => {
        isLoading.value = false;
    };

    return { isLoading, startLoading, endLoading };
}