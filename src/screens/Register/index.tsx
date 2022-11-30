import React, { useState } from 'react';
import { Modal } from 'react-native';
import { Input } from '@myApp/components/Forms/Input';
import { Button } from '@myApp/components/Forms/Button';
import { TransactionTypeButton } from '@myApp/components/Forms/TransactionTypeButton';
import { CategorySelectButton } from '@myApp/components/Forms/CategorySelectButton';
import { CategorySelect } from '../CategorySelect';
import { 
    Container,
    Header,
    Title,
    Form,
    Fields,
    TransactionTypes,

} from './styles';


export function Register(){
    const [category, setCategory] = useState({
       key: 'category',
       name: 'Categoria'
    }

    )
    const [transactionType, setTransactionType] = useState('')
    // estado para controlar se os botões foram selecionados pelo menos 1 vez
    const [selectionStatus, setSelection] = useState(false) 

    const [categoryModalOpen, setCategoryModalOpen] = useState(false)

    function handleTransactionsTypeSelect(type: 'up' | 'down'){
        setSelection(true);
        setTransactionType(type);
    }

    function handleOpenSelectionCategoryModal(){
        setCategoryModalOpen(true);
    }

    function handleCloseSelectionCategoryModal(){
        setCategoryModalOpen(false);
    }

    return(
        <Container>
            <Header>
                <Title>Cadastro</Title>
            </Header>
          <Form>
            <Fields>
                <Input placeholder='Nome'/>
                <Input placeholder='Preço'/>
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
                    title={category.name}/>
            </Fields>
            <Button title="Enviar"/>
          </Form>

         <Modal visible={categoryModalOpen}>
            <CategorySelect
                category={category}
                setCategory={setCategory}
                closeSelectCategory = {handleCloseSelectionCategoryModal}
            />
         </Modal>

        </Container>

    );



}