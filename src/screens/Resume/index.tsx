import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback } from "react";
import { categories } from "@myApp/utils/categories";
import { useFocusEffect } from "@react-navigation/native";
import { VictoryPie } from "victory-native";
import { useBottomTabBarHeight} from '@react-navigation/bottom-tabs'

import { 
    Container,
    Header,
    Title,
    ChartContainer
} from "./styles";

import { HistoryCard } from "@myApp/components/HistoryCard";
import { ScrollView } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";


export function Resume(){

    const [totalByCategories, setTotalByCategories] = useState([]);

    async function getTransactionSummary(){
        const dataKey = '@gofinances:transactions';
        const response = await AsyncStorage.getItem(dataKey);
        const transactions = response ? JSON.parse(response): [];
        const expensives = transactions.filter(expensive => expensive.type === 'down')  
        
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
    }

    useFocusEffect( useCallback(() => { 
        getTransactionSummary();
    },[]));

    return(
        <Container>
            <Header>
                <Title>Resumo por categoria</Title>
            </Header>
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
        </Container>
    );
}