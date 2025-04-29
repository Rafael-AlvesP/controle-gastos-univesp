import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { useTransactions } from '../contexts/TransactionsContext'; // Importando o contexto de transações

const RelatoriosScreen = () => {
  const { transactions } = useTransactions(); // Pega as transações do contexto

  // Calcular o total de receita e despesas
  const receita = transactions
    .filter(t => t.tipo === 'receita')
    .reduce((acc, curr) => acc + parseFloat(curr.valor), 0);

  const despesas = transactions
    .filter(t => t.tipo === 'despesa')
    .reduce((acc, curr) => acc + parseFloat(curr.valor), 0);

  // Agrupar despesas por categoria
  const categorias = transactions
    .filter(t => t.tipo === 'despesa')
    .reduce((acc, curr) => {
      const categoria = curr.categoria;
      acc[categoria] = acc[categoria] ? acc[categoria] + parseFloat(curr.valor) : parseFloat(curr.valor);
      return acc;
    }, {});

  const categoriaLabels = Object.keys(categorias);
  const categoriaValues = Object.values(categorias);

  // Preparar os dados para o gráfico de pizza
  const data = [
    {
      name: 'Receitas',
      population: receita,
      color: '#4CAF50',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15
    },
    {
      name: 'Despesas',
      population: despesas,
      color: '#FF6347',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15
    }
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Relatório Financeiro</Text>

      {/* Exibir o gráfico de pizza */}
      <PieChart
        data={data}
        width={300}
        height={220}
        chartConfig={{
          backgroundColor: '#fff',
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16
          }
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
      />

      {/* Resumo de valores */}
      <View style={styles.summary}>
        <Text style={styles.amount}>Receitas: R$ {receita.toFixed(2)}</Text>
        <Text style={styles.amount}>Despesas: R$ {despesas.toFixed(2)}</Text>
        <Text style={styles.balance}>Saldo: R$ {(receita - despesas).toFixed(2)}</Text>
      </View>

      {/* Exibir as despesas por categoria */}
      <View style={styles.categorySummary}>
        {categoriaLabels.length > 0 ? (
          categoriaLabels.map((categoria, index) => (
            <View key={index} style={styles.categoryRow}>
              <Text style={styles.categoryText}>{categoria}: </Text>
              <Text style={styles.categoryAmount}>R$ {categoriaValues[index].toFixed(2)}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.noData}>Nenhuma despesa registrada por categoria.</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  summary: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
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
  balance: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
  },
  categorySummary: {
    marginTop: 20,
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  categoryText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  categoryAmount: {
    fontSize: 18,
    color: 'red',
  },
  noData: {
    fontSize: 18,
    color: '#aaa',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default RelatoriosScreen;
