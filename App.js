import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TransacaoScreen from './screens/TransacaoScreen'; // Importando a tela de transações

const Stack = createStackNavigator();

function HomeScreen({ navigation }) {
  const receita = 1500.00; // Exemplo de receita
  const despesas = 550.00; // Exemplo de despesas
  const saldo = receita - despesas; // Calculando o saldo

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <Text style={styles.header}>💰 Controle de Gastos</Text>

      {/* Resumo Financeiro */}
      <View style={styles.summary}>
        <Text style={[styles.amount, styles.revenue]}>Receita: R$ {receita.toFixed(2)}</Text>
        <Text style={[styles.amount, styles.expense]}>Despesas: R$ {despesas.toFixed(2)}</Text>
        <Text style={[styles.amount, styles.balance]}>Saldo: R$ {saldo.toFixed(2)}</Text>
      </View>

      {/* Botões de Ação */}
      <View style={styles.buttonContainer}>
        <Button title="Adicionar Transação" onPress={() => navigation.navigate('Transacao')} />
        <Button title="Ver Relatórios" onPress={() => alert('Abrir Relatórios')} />
      </View>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Controle de Gastos' }} />
        <Stack.Screen name="Transacao" component={TransacaoScreen} options={{ title: 'Adicionar Transação' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  summary: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  amount: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  revenue: {
    color: '#FFA500', // Laranja mais visível
  },
  expense: {
    color: 'red',
  },
  balance: {
    color: 'green',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 20,
  },
});
