import { createContext, ReactNode, useContext, useState } from "react";
import * as AuthSession from 'expo-auth-session';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// tipagem para elemento filho
interface AuthProviderProps {
    children: ReactNode
}

interface User{
    id: string;
    name: string;
    email: string;
    picture?: string;
}

interface AuthContextData {
    user: User;
    signInWithGoogle(): Promise<void>
}

type AuthResponse = {
    params:{
        access_token: string;
    }
    type: string;
}

const AuthContext = createContext({} as AuthContextData);

function AuthProvider({children}: AuthProviderProps){

    const [userInfos, setUserInfos] = useState<User>({} as User)

    async function signInWithGoogle(){
        try{
            const CLIEND_ID = "ADICIONE O CLIENT_ID DA GOOGLE CLOUD PLATFORM";
            const REDIRECT_URI = "https://auth.expo.io/@eliaslma/gofinances"
            const SCOPE = encodeURI("profile email");
            const RESPONSE_TYPE = "token";
            const authUrl = 
            `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIEND_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`

            const {type, params} = await AuthSession.startAsync({ authUrl }) as AuthResponse;
            if(type === 'success'){
                const response = await axios(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`)
                const userLogged: User = {
                    id: response.data.id,
                    name: response.data.name,
                    email: response.data.email,
                    picture: response.data.picture,
                }
                await AsyncStorage.setItem('@gofinances:user',JSON.stringify(userLogged))
                setUserInfos(userLogged)
            }

        }catch(error){
            throw new Error(error)
        }

    }

    return(
        <AuthContext.Provider value={{
            user: userInfos,
            signInWithGoogle,
            }}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth(){
    const context = useContext(AuthContext)
    return context;
}

export { AuthProvider, useAuth }