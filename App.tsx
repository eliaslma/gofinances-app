//importação de componentes de biliotecas
import React from 'react';
import { ThemeProvider } from 'styled-components'
import 'react-native-gesture-handler';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR'
import { ActivityIndicator } from 'react-native';
import { LoadContainer } from '@myApp/screens/Dashboard/styles';

import {
	useFonts, // hooks para carregar fontes
	Poppins_400Regular,
	Poppins_500Medium,
	Poppins_700Bold
} from '@expo-google-fonts/poppins'

//importação de componentes criados
import theme from '@myApp/global/styles/theme'
import { StatusBar } from 'expo-status-bar';
import { AuthProvider, useAuth } from '@myApp/hooks/auth';
import { Routes } from '@myApp/routes';

export default function App() {
	// carrega as fontes antes de iniciar o aplicativo
	const [fontsLoaded] = useFonts({  // useFonts retorna verdadeiro ou false 
		Poppins_400Regular,
		Poppins_500Medium,
		Poppins_700Bold
	});

	const { userStorageLoading } = useAuth()

	if(!fontsLoaded || userStorageLoading){
		return(
			<LoadContainer>
				<ActivityIndicator color="#5636D3" size="large"/>
			</LoadContainer> 
		)
	}
	
	else{
		return (
			<ThemeProvider theme={theme}>
				<StatusBar style="light" />
				<AuthProvider>
					<Routes/>
				</AuthProvider>
			</ThemeProvider>
	 );
	}
}


