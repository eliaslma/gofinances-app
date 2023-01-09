import React, { useState } from "react";
import { RFValue } from "react-native-responsive-fontsize";
import AppleIcon from '../../assets/apple-icon.svg';
import GoogleIcon from '../../assets/google-icon.svg';
import GoFinancesIcon from '../../assets/gofinances-icon.svg'
import { useTheme } from "styled-components";

import { useAuth } from "@myApp/hooks/auth";
import { SignInSocialButton } from "@myApp/components/SignInSocialButton";
import {
    Container,
    Header,
    TitleWrapper,
    Title,
    SignTitle,
    Footer,
    FooterWrapper
} from './styles'
import { ActivityIndicator, Alert, Platform } from "react-native";

export function SignIn(){
    
    const { SignInWithGoogle, SignInWithApple } = useAuth();
    const [isLoading, setIsLoading ] = useState(false)
    const theme = useTheme()
      
    async function handleGoogleSignIn(){
        try{
            setIsLoading(true)
            await SignInWithGoogle()
        }catch(error){
            console.log(error)
            Alert.alert('Não foi possível conectar a conta Google')
        }
        finally{
            setIsLoading(false)
        }                
    }

    async function handleAppleSignIn(){
        try{
            setIsLoading(true)
            await SignInWithApple()
        }catch(error){
            console.log(error)
            Alert.alert('Não foi possível conectar a conta Apple')
        }
        finally{
            setIsLoading(false)
        }
        
    }

    return(
        <Container>
            <Header>
                <TitleWrapper>
                    <GoFinancesIcon width={RFValue(128)} height={RFValue(68)}/>
                    <Title>
                        Controle suas {'\n'}
                        finanças de forma {'\n'}
                        muito simples
                    </Title>
                    <SignTitle>
                        Faça seu login com {'\n'}
                        uma das contas abaixo
                    </SignTitle>
                </TitleWrapper>
            </Header>
            <Footer>
                <FooterWrapper>
                    <SignInSocialButton title="Entrar com Google" svg={GoogleIcon} onPress={handleGoogleSignIn}/>
                    { Platform.OS === 'ios' &&
                    <SignInSocialButton title="Entrar com Apple" svg={AppleIcon} onPress={handleAppleSignIn}/>
                    }
                </FooterWrapper>
                { isLoading && <ActivityIndicator color={theme.colors.shape} size="large" style={{marginTop: 16}}/>}
            </Footer>
        </Container>
    );
}