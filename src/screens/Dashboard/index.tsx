import { HighlightCard } from '@myApp/components/HighlightCard';
import { TransactionCard, TransactionCardProps } from '@myApp/components/TransactionCard';
import React, { useCallback, useEffect, useState }from 'react';
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

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
    TransactionList,
    LoadContainer

} from './styles'

export interface DataListProps extends TransactionCardProps{
    id: string;
}

interface HighlightProps {
    amount: string;
}
interface HighLightData{
    entries: HighlightProps;
    expensives: HighlightProps;
    total: HighlightProps;
}

export function Dashboard(){
    const [isLoading, setLoading] = useState(true);
    const [myTransactions,setMyTransactions] = useState<DataListProps[]>([]);
    const [highLightData, setHighLightData] = useState<HighLightData>({} as HighLightData);

    async function getTransactionList(){
        const dataKey = '@gofinances:transactions';
        const response = await AsyncStorage.getItem(dataKey);
        const transactions = response ? JSON.parse(response): [];

        let entriesTotal = 0;
        let expensiveTotal = 0;
        
        const transactionsFormatted: DataListProps[] = transactions.map( (item: DataListProps) => {

            if(item.type === 'up'){
                entriesTotal += Number(item.amount);   
            }
            else{
                expensiveTotal += Number(item.amount);
            }

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
        const balance = entriesTotal - expensiveTotal;
        setHighLightData({
            entries: {
                amount: entriesTotal.toLocaleString('pt-BR',{ style: 'currency', currency: 'BRL'})
            },
            expensives: {
                amount: expensiveTotal.toLocaleString('pt-BR',{ style: 'currency', currency: 'BRL'})
            },
            total: {
                amount: balance.toLocaleString('pt-BR',{ style: 'currency', currency: 'BRL'})
            }
            
        });
        setLoading(false)
        
       
    }

    useEffect(() => {
        getTransactionList()
     },[]);
            
    useFocusEffect( useCallback(()=> { 
        getTransactionList();
    },[]));


    return (
        <Container>
            {
                isLoading ?
                <LoadContainer>
                    <ActivityIndicator color="#5636D3" size="large"/>
                </LoadContainer> :
            <>
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
                <HighlightCard type="up" title="Entradas" amount={highLightData.entries.amount} lastTransaction="Última entrada dia 13 de abril"/>
                <HighlightCard type="down" title="Saídas" amount={highLightData.expensives.amount} lastTransaction="Última saída dia 03 de abril"/>
                <HighlightCard type="total" title="Total" amount={highLightData.total.amount} lastTransaction="01 à 16 de abril"/>
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
            </>
            }
        </Container>

    )
}
