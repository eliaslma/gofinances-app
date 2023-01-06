import React from "react";
import { RFValue } from "react-native-responsive-fontsize";
import AppleIcon from '../../assets/apple-icon.svg';
import GoogleIcon from '../../assets/google-icon.svg';
import GoFinancesIcon from '../../assets/gofinances-icon.svg'

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

export function SignIn(){

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
                    <SignInSocialButton title="Entrar com Google" svg={GoogleIcon}/>
                    <SignInSocialButton title="Entrar com Apple" svg={AppleIcon}/>
                </FooterWrapper>
            </Footer>
        </Container>
    );
}