import React from 'react';

import { View, Text, TextInput, Button } from 'react-native';

export function Profile(){
    return(
        <View>
            <Text testID='text-perfil'>Perfil</Text>
            <TextInput testID='input-name' placeholder='Nome' autoCorrect={false} value='elias'/>
            <TextInput testID='input-lastname' placeholder='Sobrenome' autoCorrect={false}/>
            <Button title='Salvar' onPress={() => {}}/>
        </View>
    );
}