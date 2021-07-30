import { createContext } from "react";

const AuthContext = createContext({
    auth: {},
    login: (token: any) => { },
    logout: () => { },
    setReloadUser: (auth: any) => { },
});

export default AuthContext;