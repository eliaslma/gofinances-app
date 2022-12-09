import { HighlightCard } from '@myApp/components/HighlightCard';
import { TransactionCard, TransactionCardProps } from '@myApp/components/TransactionCard';
import React, { useEffect, useState }from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import{
    Container,
    Header,
    HighlightCards,
    UserWrapper,
    UserInfo,
    LogoutButton,
    Photo,
    User,
    UserGreeting,
    UserName,
    Icon,
    Transactions,
    Title,
    TransactionList

} from './styles'

export interface DataListProps extends TransactionCardProps{
    id: string;
}

export function Dashboard(){
    
    const [myTransactions,setMyTransactions] = useState<DataListProps[]>([]);

    async function getTransactionList(){
        const dataKey = '@gofinances:transactions';
        const response = await AsyncStorage.getItem(dataKey);
        const transactions = response ? JSON.parse(response): [];

        const transactionsFormatted: DataListProps[] = transactions.map( (item: DataListProps) => {

            const amount = Number(item.amount)
             .toLocaleString('pt-BR',{
                style: 'currency',
                currency: 'BRL'
            });
            
            const date = Intl.DateTimeFormat('pt-BR',{
                day: '2-digit',
                month: '2-digit',
                year: '2-digit',
            }).format( new Date(item.date) );

            return{
                id: item.id,
                name: item.name,
                amount,
                type: item.type,
                category: item.category,
                date
            }

            
        });

        setMyTransactions(transactionsFormatted)
       }

    useEffect(() => {
        getTransactionList()
     },[])


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

                    <LogoutButton onPress={() => {}}>
                        <Icon name="power"/>
                    </LogoutButton>
                    
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
                    data={myTransactions}
                    keyExtractor={item => item.id}
                    renderItem={ ({ item } ) => 
                    <TransactionCard data={item}/> }
                />
            </Transactions>
        </Container>

    )
}
