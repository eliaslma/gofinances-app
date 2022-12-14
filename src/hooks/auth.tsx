import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import * as Google from 'expo-auth-session/providers/google';
import * as AppleAuthentication from 'expo-apple-authentication';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as AuthSession from 'expo-auth-session';

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
    SignInWithGoogle(): Promise<void>;
    SignInWithApple(): Promise<void>;
    signOut(): Promise<void>;
    userStorageLoading: boolean;

}

const AuthContext = createContext({} as AuthContextData);

function AuthProvider({children}: AuthProviderProps){


    const [ request, response, promptAsync ] = Google.useAuthRequest({
        expoClientId: '643802899002-q5ftu0kbk0d1qiimif7avt5ak8dijvbg.apps.googleusercontent.com',
        iosClientId: '643802899002-df30f4pk14hc8rq0j3pnl4tcd3ah8ga4.apps.googleusercontent.com',
        androidClientId: '643802899002-df30f4pk14hc8rq0j3pnl4tcd3ah8ga4.apps.googleusercontent.com',
    });

    const [userInfos, setUserInfos] = useState<User>({} as User);
    const [userStorageLoading,setUserStorageLoading] = useState(true);
    const userStorageKey = '@gofinances:user';
    const [accessToken, setAccessToken] = useState('');

    async function getUserData({authentication}){

        const response = await axios(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${authentication.accessToken}`)
        const userLogged: User = {
            id: response.data.id,
            name: response.data.name,
            email: response.data.email,
            picture: response.data.picture,
        }
        setUserInfos(userLogged)
        await AsyncStorage.setItem(userStorageKey,JSON.stringify(userLogged))
    }

    async function SignInWithGoogle(){
        try{
            await promptAsync({useProxy: true, showInRecents: true});
        }catch(error){
            throw new Error(error)
        }
    }

    async function SignInWithApple(){
        try {
            const credential = await AppleAuthentication.signInAsync({
              requestedScopes: [
                AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                AppleAuthentication.AppleAuthenticationScope.EMAIL,
              ],
            });

            if(credential){
                const userLogged: User = {
                    id: credential.user,
                    name: String(credential.fullName),
                    email: credential.email,
                    picture: `https://ui-avatars.com/api/?name=${credential.fullName.givenName}&lenght=1`
                }
                await AsyncStorage.setItem(userStorageKey,JSON.stringify(userLogged))
                setUserInfos(userLogged)
            }
            
          }catch (error) {
            throw Error(error)
          }
    }

    async function getUserInfo(){
        const userData = await AsyncStorage.getItem(userStorageKey)
        if(userData){
            const userDataFormatted = JSON.parse(userData) as User
            setUserInfos(userDataFormatted)
        }
        setUserStorageLoading(false)
        
    }

    async function signOut(){
        setUserInfos({} as User)
        await AsyncStorage.removeItem(userStorageKey)
        await AuthSession.revokeAsync({
            token: accessToken
          }, {
            revocationEndpoint: "https://oauth2.googleapis.com/revoke"
        });
    }

    useEffect(() => {
        getUserInfo(); 
    },[])

    useEffect(() => {
        if(response?.type === 'success'){
            setAccessToken(response.authentication.accessToken)
            getUserData(response)
        }
    },[response])
    
    return(
        <AuthContext.Provider value={{
            user: userInfos,
            SignInWithGoogle,
            SignInWithApple,
            signOut,
            userStorageLoading
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