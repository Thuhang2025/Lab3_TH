import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Surface, Text, Title, Paragraph, Chip } from 'react-native-paper';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Transaction = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "TRANSACTIONS"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const transactionsData = [];
      querySnapshot.forEach((doc) => {
        transactionsData.push({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt.toDate(),
        });
      });
      setTransactions(transactionsData);
    });

    return () => unsubscribe();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return '#4caf50';
      case 'pending':
        return '#ff9800';
      case 'cancelled':
        return '#f44336';
      default:
        return '#999';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed':
        return 'Đã thanh toán';
      case 'pending':
        return 'Chờ thanh toán';
      case 'cancelled':
        return 'Đã hủy';
      default:
        return 'Không xác định';
    }
  };

  const renderTransaction = ({ item }) => (
    <Surface style={styles.transactionCard}>
      <View style={styles.header}>
        <MaterialCommunityIcons name="cash-register" size={24} color="#ff6b81" />
        <Title style={styles.serviceName}>{item.serviceName}</Title>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <MaterialCommunityIcons name="account" size={20} color="#666" />
          <Text style={styles.infoText}>
            {item.customerName}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <MaterialCommunityIcons name="email" size={20} color="#666" />
          <Text style={styles.infoText}>
            {item.customerId}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <MaterialCommunityIcons name="cash" size={20} color="#666" />
          <Text style={styles.infoText}>
            {item.amount?.toLocaleString()} đ
          </Text>
        </View>

        <View style={styles.infoRow}>
          <MaterialCommunityIcons name="clock" size={20} color="#666" />
          <Text style={styles.infoText}>
            {item.createdAt.toLocaleString('vi-VN')}
          </Text>
        </View>
      </View>

      <Chip 
        style={[styles.statusChip, { backgroundColor: getStatusColor(item.status) }]}
        textStyle={{ color: 'white' }}
      >
        {getStatusText(item.status)}
      </Chip>
    </Surface>
  );

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Lịch sử giao dịch</Title>
      <FlatList
        data={transactions}
        renderItem={renderTransaction}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 16,
  },
  transactionCard: {
    padding: 16,
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  serviceName: {
    marginLeft: 8,
    fontSize: 18,
    color: '#333',
  },
  infoContainer: {
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#666',
  },
  statusChip: {
    alignSelf: 'flex-start',
  },
  list: {
    paddingBottom: 20,
  },
});

export default Transaction;
