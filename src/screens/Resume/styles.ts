import styled from "styled-components/native";
import { BorderlessButton, GestureHandlerRootView } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import { Feather } from '@expo/vector-icons'; 


export const Container = styled(GestureHandlerRootView)`
    flex: 1;
    background-color: ${({theme})=> theme.colors.background};
`;

export const Header = styled.View`
    width: 100%;
    background-color: ${ ({theme}) => theme.colors.primary};
    height: ${RFValue(113)}px;
    justify-content: flex-end;
    align-items: center;
    padding-bottom: 19px;
`;

export const Title = styled.Text`
    color: ${({ theme }) => theme.colors.shape};
    font-size: ${RFValue(18)}px;
    font-family: ${({ theme }) => theme.fonts.regular};
`;

export const ChartContainer = styled.View`
    width: 100%;
    align-items: center;
`
export const MonthSelect = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 16px;
`
export const SelectButton = styled(BorderlessButton)``

export const Month = styled.Text`
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(20)}px;
    color: '#000000';
`
export const SelectIcon = styled(Feather)`
    font-size: ${RFValue(24)}px;
    color: '#000000';
`;