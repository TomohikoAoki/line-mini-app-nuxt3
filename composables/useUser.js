// ユーザー情報を管理するためのカスタムフック

export const useUser = () => {
    const userState = useState("use-user", () => {
        return { name: null, token: null, profileData: null, point: 0 }
    });

    const setUserToken = (token) => {
        userState.value.token = token;
    }

    const setUserName = (name) => {
        userState.value.name = name;
    }

    const setUserPoint = (point) => {
        userState.value.point = point;
    }

    const getUserName = () => userState.value.name
    const getUserToken = () => userState.value.token
    const getUserPoint = () => userState.value.point

    return { userState, getUserName, getUserToken, getUserPoint, setUserName, setUserToken, setUserPoint };
}