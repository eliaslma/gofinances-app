import React from 'react';
import { Platform } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from 'styled-components';
import { Register } from '@myApp/screens/Register';
import { Dashboard } from '@myApp/screens/Dashboard';
import { Resume } from '@myApp/screens/Resume';

const { Navigator, Screen } = createBottomTabNavigator();

export function AppRoutes(){

    const theme = useTheme();

    return(
        <Navigator screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: theme.colors.secondary,
            tabBarInactiveTintColor: theme.colors.title,
            tabBarLabelPosition: 'beside-icon',
            tabBarStyle: {
                paddingVertical: Platform.OS === 'ios' ? 20 : 0,
                height: 72
            }
            }} >
            <Screen 
                name="Listagem"
                component={Dashboard} 
                options={{ tabBarIcon: (({ size, color })=> (
                    <MaterialIcons 
                        name='format-list-bulleted'
                        size={size}
                        color={color}
                    />
                )) }}
            />

            <Screen 
                name="Cadastro"
                component={Register} 
                options={{ tabBarIcon: (({ size, color })=> (
                    <MaterialIcons 
                        name='attach-money'
                        size={size}
                        color={color}
                    />
                )) }}
            />

            <Screen 
                name="Resumo"
                component={Resume} 
                options={{ tabBarIcon: (({ size, color })=> (
                    <MaterialIcons 
                        name='pie-chart'
                        size={size}
                        color={color}
                    />
                )) }}
            />
            
        </Navigator>
    );

}