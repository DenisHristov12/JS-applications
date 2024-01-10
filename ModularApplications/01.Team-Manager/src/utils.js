export const getUserData = () => {
    if(sessionStorage.getItem("accessToken")){
        return {
            email: sessionStorage.getItem("email"),
            password: sessionStorage.getItem("password"),
            _id: sessionStorage.getItem("_id"),
            accessToken: sessionStorage.getItem("accessToken")
        };
    }

    return null;
};

export const setUserData = (data) => {
    sessionStorage.setItem("email", data.email);
    sessionStorage.setItem("username", data.password);
    sessionStorage.setItem("_id", data._id);
    sessionStorage.setItem("accessToken", data.accessToken);
};

export const clearUserData = () => {
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("password");
    sessionStorage.removeItem("_id");
    sessionStorage.removeItem("accessToken");
};
