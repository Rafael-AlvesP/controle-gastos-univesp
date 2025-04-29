// TransacaoScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useTransactions } from '../contexts/TransactionsContext';
import { Picker } from '@react-native-picker/picker'; // Importação correta do Picker

export default function TransacaoScreen({ navigation }) {
  const { addTransaction } = useTransactions();
  
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [tipo, setTipo] = useState('receita');
  const [categoria, setCategoria] = useState('Pagamento Mensal');

  const handleAddTransaction = () => {
    if (descricao && valor && tipo && categoria) {
      addTransaction({ descricao, valor, tipo, categoria });
      navigation.goBack();
    } else {
      alert('Preencha todos os campos!');
    }
  };

  // Definindo as categorias de forma condicional
  const categoriasDisponiveis = tipo === 'receita'
    ? [
        { label: 'Pagamento Mensal', value: 'Pagamento Mensal' },
        { label: 'Renda Extra', value: 'Renda Extra' },
      ]
    : [
        { label: 'Alimentação', value: 'Alimentação' },
        { label: 'Transporte', value: 'Transporte' },
        { label: 'Lazer', value: 'Lazer' },
        { label: 'Saúde', value: 'Saúde' },
        // Adicione mais categorias de despesa aqui
      ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Adicionar Transação</Text>

      <Text>Descrição</Text>
      <TextInput
        style={styles.input}
        value={descricao}
        onChangeText={setDescricao}
        placeholder="Ex: Jantar"
      />

      <Text>Valor</Text>
      <TextInput
        style={styles.input}
        value={valor}
        onChangeText={setValor}
        placeholder="Ex: 50.00"
        keyboardType="numeric"
      />

      <Text>Tipo</Text>
      <Picker
        selectedValue={tipo}
        style={styles.input}
        onValueChange={(itemValue) => {
          setTipo(itemValue);
          // Atualiza a categoria automaticamente quando mudar o tipo
          if (itemValue === 'receita') {
            setCategoria('Pagamento Mensal');
          } else {
            setCategoria('Alimentação');
          }
        }}
      >
        <Picker.Item label="Receita" value="receita" />
        <Picker.Item label="Despesa" value="despesa" />
      </Picker>

      <Text>Categoria</Text>
      <Picker
        selectedValue={categoria}
        style={styles.input}
        onValueChange={(itemValue) => setCategoria(itemValue)}
      >
        {categoriasDisponiveis.map((cat) => (
          <Picker.Item key={cat.value} label={cat.label} value={cat.value} />
        ))}
      </Picker>

      <Button title="Adicionar Transação" onPress={handleAddTransaction} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
});
