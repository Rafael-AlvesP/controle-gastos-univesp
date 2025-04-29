import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TransactionsProvider, useTransactions } from './contexts/TransactionsContext'; // Importando o contexto
import TransacaoScreen from './screens/TransacaoScreen'; // Importando a tela de transações
import RelatorioScreen from './screens/RelatorioScreen'; // Se você for adicionar uma tela de relatórios

const Stack = createStackNavigator();

function HomeScreen({ navigation }) {
  const { transactions } = useTransactions(); // Pega as transações do contexto

  const receita = transactions
    .filter(t => t.tipo === 'receita')
    .reduce((acc, curr) => acc + parseFloat(curr.valor), 0);

  const despesas = transactions
    .filter(t => t.tipo === 'despesa')
    .reduce((acc, curr) => acc + parseFloat(curr.valor), 0);

  const saldo = receita - despesas;

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
        <Button title="Ver Relatórios" onPress={() => navigation.navigate('Relatorio')} />
      </View>
    </View>
  );
}

export default function App() {
  return (
    <TransactionsProvider> {/* Envolve o app no Provider */}
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Controle de Gastos' }} />
          <Stack.Screen name="Transacao" component={TransacaoScreen} options={{ title: 'Adicionar Transação' }} />
          <Stack.Screen name="Relatorio" component={RelatorioScreen} options={{ title: 'Relatórios' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </TransactionsProvider>
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
    color: '#FFA500', // Laranja para receita
  },
  expense: {
    color: 'red', // Vermelho para despesas
  },
  balance: {
    color: 'green', // Verde para saldo
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 20,
  },
});
