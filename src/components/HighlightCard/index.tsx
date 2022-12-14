import React from 'react';
import { 
    Container,
    Header,
    Title,
    Icon,
    Content,
    Amount,
    LastTransaction

} from './styles'

interface Props {
    type: 'up' | 'down' | 'total',
    title: String,
    amount: String,
    lastTransaction: String,
    
}

const icon = {
    up: 'arrow-up-circle',
    down: 'arrow-down-circle',
    total: 'dollar-sign',
}

export function HighlightCard({type, title, amount, lastTransaction} : Props){
    return(
        <Container type={type}>
            <Header>
                <Title type={type}>{ title }</Title>
                <Icon name={icon[type]} type={type}></Icon>
            </Header>
            <Content>
                <Amount type={type}>{ amount }</Amount>
                <LastTransaction type={type}>{ lastTransaction }</LastTransaction>
            </Content>
        </Container>
    )
}