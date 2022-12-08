import React, { useState, useEffect } from 'react';

// modal - exibir modal ao clicar na categoria
// TouchableWithoutFeedback - clicar em qualquer area tela e fechar o keyboard
import { Modal, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';

// react hook form - utilizado para formularios e evitar varias renderizações com useState
import { useForm } from 'react-hook-form';

// Yup para validação de formulários
// Validar o schema de dados 
// yupResolver força padronização no envio de dados do formulário
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Button } from '@myApp/components/Form/Button';
import { TransactionTypeButton } from '@myApp/components/Form/TransactionTypeButton';
import { CategorySelectButton } from '@myApp/components/Form/CategorySelectButton';
import { CategorySelect } from '../CategorySelect';
import { InputForm } from '@myApp/components/Form/InputForm';
import { 
    Container,
    Header,
    Title,
    Form,
    Fields,
    TransactionTypes,

} from './styles';

interface FormData {
    name: string;
    amount: string;
}


const schema = Yup.object().shape({
    name: Yup.string().required('Descrição é obrigatório'),
    amount: Yup
    .number()
    .typeError('Informe um valor numérico')
    .positive('Valor não pode ser negativo')
    .required('Valor é obrigatório')
});

export function Register(){
    const dataKey = '@gofinances:transactions';
    const [category, setCategory] = useState({
       key: 'category',
       name: 'Categoria'
    })
    const [transactionType, setTransactionType] = useState('')
    // estado para controlar se os botões foram selecionados pelo menos 1 vez
    const [selectionStatus, setSelection] = useState(false) 

    const [categoryModalOpen, setCategoryModalOpen] = useState(false)

    const { control, handleSubmit, formState:{ errors } } = useForm({
        resolver: yupResolver(schema)
      });

    function handleTransactionsTypeSelect(type: 'up' | 'down'){

        // verifica se o botão não foi selecionado para evitar mudança de estado a cada clique
        if(!transactionType){
            setSelection(true);
        }
        setTransactionType(type);

    }

    function handleOpenSelectionCategoryModal(){
        setCategoryModalOpen(true);
    }

    function handleCloseSelectionCategoryModal(){
        setCategoryModalOpen(false);
    }

    async function handleRegister(form : FormData){

        if(!transactionType){
            return Alert.alert('Selecione o tipo da transação')
        }

        if(category.key === "category"){
            return Alert.alert('Selecione uma categoria')
        }

        const data = {
            name: form.name,
            amount: form.amount,
            transactionType,
            category: category.key
        }
        

        try {
            const dataList = await AsyncStorage.getItem(dataKey); // puxando todos os dados com a key específica
            const currentData = dataList ? JSON.parse(dataList) : [];

            const dataFormatted = [
                ...currentData,
                data
            ]

            await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));
        } catch (error) {
            console.log(error);
            Alert.alert("Não foi possível salvar")
        }

    }


    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
            <Header>
                <Title>Cadastro</Title>
            </Header>
          <Form>
            <Fields>
                <InputForm control={control} 
                    name="name" 
                    placeholder="Descrição" 
                    autoCorrect={false} 
                    error={errors.name && errors.name.message}
                />
                
                <InputForm control={control} 
                    name="amount" 
                    placeholder="Valor" 
                    keyboardType="numeric" 
                    error={errors.amount && errors.amount.message}
                />

                <TransactionTypes>
                    <TransactionTypeButton 
                        type='up' 
                        title="Income" 
                        onPress={() => handleTransactionsTypeSelect('up')}
                        isActive={transactionType === 'up'}
                        isSelected={selectionStatus}
                    />
                    <TransactionTypeButton 
                        type='down' 
                        title="Outcome" 
                        onPress={() => handleTransactionsTypeSelect('down')}
                        isActive={transactionType === 'down'}
                        isSelected={selectionStatus}
                    />
                </TransactionTypes>
                <CategorySelectButton
                    onPress={handleOpenSelectionCategoryModal}
                    title={category.name}
                />
            </Fields>
            <Button title="Enviar" onPress={handleSubmit(handleRegister)}/>
          </Form>

         <Modal visible={categoryModalOpen}>
            <CategorySelect
                category={category}
                setCategory={setCategory}
                closeSelectCategory = {handleCloseSelectionCategoryModal}
            />
         </Modal>
        </Container>
        </TouchableWithoutFeedback>

    );



}