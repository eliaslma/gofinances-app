import React from "react";
import { TouchableOpacityProps } from "react-native";
import { 
    Container,
    Icon,
    Title


} from "./styles";

const icons = {
    up: 'arrow-up-circle',
    down: 'arrow-down-circle',
    
}


interface Props extends TouchableOpacityProps {
    title: string;
    type: 'up' | 'down';
    isActive: boolean;
    isSelected: boolean;
}


export function TransactionTypeButton({title, type, isActive, isSelected, ...rest} : Props){
    return(
        <Container 
        isActive={isActive} type={type} isSelected={isSelected} {...rest}  >
            <Icon name={icons[type]} type={type}/>
            <Title>
                {title}
            </Title>
        </Container>
    );
}