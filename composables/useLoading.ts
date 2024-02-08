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