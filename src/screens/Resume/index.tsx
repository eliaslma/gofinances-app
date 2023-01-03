import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useCallback } from "react";
import { categories } from "@myApp/utils/categories";
import { useFocusEffect } from "@react-navigation/native";

import { 
    Container,
    Header,
    Title,
} from "./styles";

import { HistoryCard } from "@myApp/components/HistoryCard";
import { ScrollView } from "react-native";


export function Resume(){

    const [totalByCategories, setTotalByCategories] = useState([]);

    async function getTransactionSummary(){
        const dataKey = '@gofinances:transactions';
        const response = await AsyncStorage.getItem(dataKey);
        const transactions = response ? JSON.parse(response): [];
        const expensives = transactions.filter(expensive => expensive.type === 'down')   
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
                color: categorie.color

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
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flex: 1, padding: 24}}>
            {   totalByCategories.map(item => 
                <HistoryCard key={item.key} title={item.name} amount={item.total} color={item.color}/>
            )}
            </ScrollView>
        </Container>
    );
}