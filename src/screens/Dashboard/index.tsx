import { HighlightCard } from '@myApp/components/HighlightCard';
import { TransactionCard } from '@myApp/components/TransactionCard';
import React from 'react';
import{
    Container,
    Header,
    HighlightCards,
    UserWrapper,
    UserInfo,
    Photo,
    User,
    UserGreeting,
    UserName,
    Icon,
    Transactions,
    Title,
    TransactionList

} from './styles'


export function Dashboard(){
    const data = [
        {
        type: "income",
        title: "Desenvolvimento de site",
        amount:"R$ 12.000,00",
        category: {label: 'Vendas', icon: 'dollar-sign'},
        date: "13/04/2020"
        },
        {
        type: "outcome",
        title: "Hamburgueria Pizzy",
        amount:"R$ 59,00",
        category: {label: 'Alimentação', icon: 'coffee'},
        date: "10/04/2020"
        },
        {
        type: "outcome",
        title: "Aluguel do apartamento",
        amount:"R$ 1200,00",
        category: {label: 'Casa', icon: 'home'},
        date: "10/04/2020"
        }
    ];
    return (
        <Container>
            <Header> 
                <UserWrapper>
                    <UserInfo>
                        <Photo source={{ uri: 'https://avatars.githubusercontent.com/u/70176310?v=4'}}/>
                        <User>
                            <UserGreeting>Olá,</UserGreeting>
                            <UserName>Elias</UserName>
                        </User>
                    </UserInfo>
                    <Icon name="power"/>
                </UserWrapper>
            </Header>
            <HighlightCards>
                <HighlightCard type="up" title="Entradas" amount="R$ 17.400,00" lastTransaction="Última entrada dia 13 de abril"/>
                <HighlightCard type="down" title="Saídas" amount="R$ 1.259,00" lastTransaction="Última saída dia 03 de abril"/>
                <HighlightCard type="total" title="Total" amount="R$ 16.141,00" lastTransaction="01 à 16 de abril"/>
            </HighlightCards>
            <Transactions>
                <Title>Listagem</Title>
                <TransactionList 
                    data={data}
                    renderItem={ ({ item } ) => 
                    <TransactionCard data={item}/> }
                />
            </Transactions>
        </Container>

    )
}
