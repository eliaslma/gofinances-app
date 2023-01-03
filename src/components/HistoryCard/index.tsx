import React from "react";
import { Container,Title, AmountContain, Symbol, Amount } from "./styles";


interface HistoryCardProps {
    title: string;
    amount: string;
    color: string;
}

export function HistoryCard({title, amount, color} : HistoryCardProps ){

    return(
        <Container color={color}>
            <Title>{title}</Title>
            <AmountContain>
                <Symbol>R$</Symbol>
                <Amount>{amount}</Amount>
            </AmountContain>
        </Container>
    );

}