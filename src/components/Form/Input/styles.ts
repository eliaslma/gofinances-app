import styled from 'styled-components/native'
import { RFValue } from 'react-native-responsive-fontsize';
import theme from '@myApp/global/styles/theme';

interface Props{
    active?: boolean;
}

export const Container = styled.TextInput<Props>`
    width: 100%;
    padding: 16px 18px;
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(14)}px;
    color: ${({theme}) => theme.colors.title};
    background-color: ${({theme}) => theme.colors.shape};
    border-radius: 5px;
    margin-bottom: 8px;
`;