import React, { createContext, useState, useContext } from 'react';

// Cria o contexto
const TransactionsContext = createContext();

// Provedor do contexto
export function TransactionsProvider({ children }) {
  const [transactions, setTransactions] = useState([]);

  function addTransaction(transaction) {
    setTransactions((prev) => [...prev, transaction]);
  }

  return (
    <TransactionsContext.Provider value={{ transactions, addTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
}

// Hook personalizado para usar o contexto mais fácil
export function useTransactions() {
  const context = useContext(TransactionsContext);
  if (!context) {
    throw new Error('useTransactions deve ser usado dentro de um TransactionsProvider');
  }
  return context;
}
