import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

export default function TransacaoScreen({ navigation }) {
  const [tipo, setTipo] = useState('despesa');  // 'despesa' ou 'receita'
  const [categoria, setCategoria] = useState('');
  const [valor, setValor] = useState('');
  const [data, setData] = useState(new Date().toISOString().slice(0, 10)); // Data atual no formato 'YYYY-MM-DD'

  const handleSalvarTransacao = () => {
    if (!categoria || !valor) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    // Salvar transação (aqui, apenas exibimos no console)
    console.log('Transação salva:', { tipo, categoria, valor, data });
    
    // Após salvar, podemos limpar os campos e voltar para a tela anterior
    setTipo('despesa');
    setCategoria('');
    setValor('');
    setData(new Date().toISOString().slice(0, 10));
    navigation.goBack(); // Retorna para a tela inicial
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adicionar Transação</Text>

      <Text>Tipo de Transação:</Text>
      <Picker
        selectedValue={tipo}
        onValueChange={(itemValue) => setTipo(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Despesa" value="despesa" />
        <Picker.Item label="Receita" value="receita" />
      </Picker>

      <Text>Categorias:</Text>
      <Picker
        selectedValue={categoria}
        onValueChange={(itemValue) => setCategoria(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Alimentação" value="alimentacao" />
        <Picker.Item label="Transporte" value="transporte" />
        <Picker.Item label="Lazer" value="lazer" />
        <Picker.Item label="Saúde" value="saude" />
      </Picker>

      <Text>Valor:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Digite o valor"
        value={valor}
        onChangeText={setValor}
      />

      <Text>Data:</Text>
      <TextInput
        style={styles.input}
        placeholder="Data"
        value={data}
        onChangeText={setData}
      />

      <Button title="Salvar Transação" onPress={handleSalvarTransacao} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 15,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
});
