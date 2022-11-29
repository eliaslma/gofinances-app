import React from 'react';


import {
    Container,
    Title,
    Amount,
    Footer,
    Category,
    Icon,
    CategoryName,
    Date
} from './styles';


interface CategoryProps{
    label: string;
    icon: string;
}

interface Data{
    type: 'income' | 'outcome';
    title: string;
    amount: string;
    date: string;
    category: CategoryProps;
    
}

interface Props{
    data: Data;
}

export function TransactionCard({ data }: Props){
    return(
        
        <Container>
            <Title>{ data.title }</Title>
            <Amount type={data.type}>
                { data.type === "outcome" && '-' }
                { data.amount }
            </Amount>
            <Footer>
                <Category>
                    <Icon name={data.category.icon}/>
                    <CategoryName>{data.category.label}</CategoryName>
                </Category>
                <Date>{data.date}</Date>
            </Footer>
        </Container>


    )

}