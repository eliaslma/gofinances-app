import React, { useState } from 'react';
import { Input } from '@myApp/components/Forms/Input';
import { Button } from '@myApp/components/Forms/Button';
import { TransactionTypeButton } from '@myApp/components/Forms/TransactionTypeButton';
import { CategorySelect } from '@myApp/components/Forms/CategorySelect';
import { 
    Container,
    Header,
    Title,
    Form,
    Fields,
    TransactionTypes

} from './styles';


export function Register(){
    const [transactionType, setTransactionType] = useState('')
    const [selectionStatus, setSelection] = useState(false)
    function handleTransactionsTypeSelect(type: 'up' | 'down'){
        setSelection(true);
        setTransactionType(type);

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
                <CategorySelect title='Categoria'/>
            </Fields>
            <Button title="Enviar"/>
          </Form>


        </Container>

    );



}