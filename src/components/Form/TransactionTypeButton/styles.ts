import styled, { css } from "styled-components/native";
import { RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';

interface IconProps {
    type: 'up' | 'down';
}

interface ContainerProps extends IconProps {
    isActive: boolean;
    isSelected: boolean;
}

export const Container = styled.TouchableOpacity<ContainerProps>`
    width: 48%;
    flex-direction: row;
    border-style: solid;
    border-color: ${({ theme}) => theme.colors.text_light};
    border-radius: 5px;
    align-items: center;
    justify-content: center;
    padding: 18px;
    opacity: ${({ isActive, isSelected }) => isActive || !isSelected ? 1 : 0.6};

    ${({ isSelected }) => !isSelected && css`
        border-width: 1.5px;
    `};
    

    ${({ isActive, type }) => isActive && type === 'up' && css`
    
        background-color: ${({theme})=> theme.colors.success_light};
        border-width: 0px;
        

    `};

    ${({ isActive, type }) => isActive && type === 'down' && css`
    
        background-color: ${({theme})=> theme.colors.attention_light};
        border-width: 0px;
        
    `};

    

`;

export const Icon = styled(Feather)<IconProps>`
    font-size: ${RFValue(24)}px;
    color: ${({theme, type}) => 
    type === 'up' ? theme.colors.success : theme.colors.attention};
`;

export const Title = styled.Text`
    color: ${({theme}) => theme.colors.title};
    font-size: ${RFValue(14)}px;
    font-family: ${({theme}) => theme.fonts.regular};
    margin-left: 14px;
`;