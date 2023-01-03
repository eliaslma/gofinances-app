import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";


interface ContainerProps {
    color: string;
};


export const Container = styled.View<ContainerProps>`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 13px 24px;
    background-color: ${({theme}) => theme.colors.shape};
    border-radius: 5px;
    border-left-width: 4px;
    border-left-color: ${({ color }) => color};
    margin-bottom: 8px;
`;

export const Title = styled.Text`
    font-size: ${RFValue(15)}px;
    color: ${({theme}) => theme.colors.title};
    font-family: ${({theme}) => theme.fonts.regular};
`;

export const AmountContain = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const Symbol = styled.Text`
    font-size: ${RFValue(15)}px;
    color: ${({theme}) => theme.colors.title};
    font-family: ${({theme}) => theme.fonts.medium};
`;


export const Amount = styled.Text`
    font-size: ${RFValue(15)}px;
    color: ${({theme}) => theme.colors.title};
    font-family: ${({theme}) => theme.fonts.bold};
`;