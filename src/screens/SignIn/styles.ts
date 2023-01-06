import { GestureHandlerRootView } from "react-native-gesture-handler";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled(GestureHandlerRootView)`
    flex: 1;
`;

export const Header = styled.View`
    width: 100%;
    height: 70%;
    justify-content: flex-end;
    background-color: ${({ theme }) => theme.colors.primary};
`

export const TitleWrapper = styled.View`
    align-items: center;
`

export const Title = styled.Text`
    font-family: ${({ theme }) => theme.fonts.medium};
    font-size: ${RFValue(30)}px;
    text-align: center;
    color: ${({ theme }) => theme.colors.shape};
    margin-top: 40px;
`

export const SignTitle = styled.Text`
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(16)}px;
    text-align: center;
    color: ${({ theme }) => theme.colors.shape};
    margin-top: 80px;
    margin-bottom: 68px;
`

export const Footer = styled.View`
    height: 100%;
    background-color: ${({ theme }) => theme.colors.secondary};
    align-items: center;
`

export const FooterWrapper = styled.View`
    width: 100%;
    margin-top: ${RFPercentage(-4)}px;
    padding: 0 32px;
    justify-content: space-between;

`;