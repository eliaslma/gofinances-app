import { RFValue } from "react-native-responsive-fontsize";
import { RectButton } from "react-native-gesture-handler";
import styled from "styled-components/native";


export const Container = styled(RectButton)`
    width: 100%;
    background-color: ${({theme}) => theme.colors.secondary};
    border-radius: 5px;
    align-items: center;
    padding: 16px;
`;

export const Title = styled.Text`
    font-family: ${({theme}) => theme.fonts.medium};
    font-size: ${RFValue(14)}px;
    color: ${({theme}) => theme.colors.shape};
`;