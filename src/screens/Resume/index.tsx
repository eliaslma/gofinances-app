import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback } from "react";
import { categories } from "@myApp/utils/categories";
import { useFocusEffect } from "@react-navigation/native";
import { VictoryPie } from "victory-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import { addMonths, subMonths, format } from "date-fns";
import { ptBR } from 'date-fns/locale'
import { ScrollView } from "react-native";
import { ActivityIndicator } from "react-native";


import { HistoryCard } from "@myApp/components/HistoryCard";
import { 
    Container,
    Header,
    Title,
    ChartContainer,
    MonthSelect,
    SelectButton,
    Month,
    SelectIcon,
    LoadContainer
} from "./styles";
import theme from "@myApp/global/styles/theme";

export function Resume(){
    const [selectedDate, setSelectedDate] = useState( new Date());
    const [totalByCategories, setTotalByCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(false)

    function handleDateChange(action: 'next' | 'prev'){
        if(action === 'next'){
            setSelectedDate(addMonths(selectedDate, 1))
        }else{
            setSelectedDate(subMonths(selectedDate, 1))
        }
    }


    async function getTransactionSummary(){
        const dataKey = '@gofinances:transactions';
        const response = await AsyncStorage.getItem(dataKey);
        const transactions = response ? JSON.parse(response): [];
        setIsLoading(true)

        const expensives = transactions
        .filter(expensive => 
            expensive.type === 'down' && 
            new Date(expensive.date).getMonth() === selectedDate.getMonth() &&
            new Date(expensive.date).getFullYear() === selectedDate.getFullYear()
        );

        const expensivesTotal = expensives.reduce(( accumulator, expensive) => {
            return accumulator + expensive.amount;
        },0);
        
        const totalByCategory = []

        categories.forEach(categorie => { 
            let categorieSum = 0
            expensives.forEach(expensives => {
                if(categorie.key === expensives.category){
                    categorieSum += expensives.amount
                }           
            })

            categorieSum && totalByCategory.push({
                name: categorie.name,
                total: categorieSum.toLocaleString('pt-BR',{ minimumFractionDigits: 2}),
                key: categorie.key,
                color: categorie.color,
                percent: Number((categorieSum / expensivesTotal * 100).toFixed(0)),
                percentFormatted: `${(categorieSum / expensivesTotal * 100).toFixed(0)}%`
            })
        })
        setTotalByCategories(totalByCategory)
        setIsLoading(false)
    }

    useFocusEffect( useCallback(() => { 
        getTransactionSummary();
    },[selectedDate]));

    return(
        <Container>
            <Header>
                <Title>Resumo por categoria</Title>
            </Header>

            { isLoading ?
                <LoadContainer>
                    <ActivityIndicator
                    color={theme.colors.primary}
                    size="large"                    
                    />
                </LoadContainer> :
            <>
                <MonthSelect>
                    <SelectButton onPress={() => handleDateChange('prev')}>
                        <SelectIcon name="chevron-left"/>
                    </SelectButton>
                    <Month>{ format(selectedDate,'MMMM, yyyy', {locale: ptBR})}</Month>
                    <SelectButton onPress={() => handleDateChange('next')}>
                        <SelectIcon name="chevron-right"/>
                    </SelectButton>
                </MonthSelect>
                <ChartContainer>
                    <VictoryPie
                    data={totalByCategories} 
                    colorScale={totalByCategories.map(category => category.color)}
                    style={{
                        labels:{
                            fontSize: RFValue(16),
                        }
                    }}
                    width={RFValue(245)}
                    height={RFValue(245)}
                    x="percentFormatted" 
                    y="percent" 
                    />
                </ChartContainer>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 24, paddingBottom: useBottomTabBarHeight()}}>
                {   totalByCategories.map(item => 
                    <HistoryCard key={item.key} title={item.name} amount={item.total} color={item.color}/>
                )}
                </ScrollView>
            </>
            }
        </Container>
    );
}