// ユーザー情報を管理するためのカスタムフック

interface User {
    name: string | null; // ユーザー名
    token: string | null; // Lineのアクセストークン
    point: number; // ユーザーのポイント
}

export const useUser = () => {
    const userState = useState<User>("use-user", () => {
        return { name: null, token: null, point: 0 }
    });

    const setUserToken = (token: string | null) => {
        userState.value.token = token;
    }

    const setUserName = (name: string | null) => {
        userState.value.name = name;
    }

    const setUserPoint = (point: number | 0) => {
        userState.value.point = point;
    }

    const getUserName = (): string | null => userState.value.name
    const getUserToken = (): string | null => userState.value.token
    const getUserPoint = (): number => userState.value.point

    return { userState: readonly(userState), getUserName, getUserToken, getUserPoint, setUserName, setUserToken, setUserPoint };
}