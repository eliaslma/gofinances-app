//importação de componentes de biliotecas
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ThemeProvider } from 'styled-components'
import * as SplashScreen from 'expo-splash-screen';

import {
  useFonts, // hooks para carregar fontes
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold
} from '@expo-google-fonts/poppins'

//importação de componentes criados

import theme from '@myApp/global/styles/theme'
import { Dashboard } from '@myApp/screens/Dashboard';


export default function App() {
  // carrega as fontes antes de iniciar o aplicativo
  const [fontsLoaded] = useFonts({  // useFonts retorna verdadeiro ou false 
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  });

  if(!fontsLoaded){
    
    SplashScreen.preventAutoHideAsync();
  }
  
  else{
    SplashScreen.hideAsync();
    return (
      <ThemeProvider theme={theme}>
        <Dashboard/>
      </ThemeProvider>
       
   );
  }

  
}


