// components/MenuSummary.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MenuItem } from '../types';

interface MenuSummaryProps {
  items: MenuItem[];
}

// Ensure the component is explicitly typed as React.FC<Props>
const MenuSummary: React.FC<MenuSummaryProps> = ({ items }) => {
  // Calculate Total Menu Items
  const totalItems = items.length;

  // Calculate Average Price
  const totalCost = items.reduce((sum, item) => sum + item.price, 0);
  const averagePrice = totalItems > 0 ? totalCost / totalItems : 0;

  return (
    <View style={styles.container}>
      {/* Box 1: Total Menu Items */}
      <View style={styles.summaryBox}>
        <Text style={styles.label}>Total Menu Items</Text>
        <Text style={styles.value}>{totalItems}</Text>
      </View>

      {/* Box 2: Average Price */}
      <View style={styles.summaryBox}>
        <Text style={styles.label}>Average Price</Text>
        <Text style={styles.value}>${averagePrice.toFixed(2)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginBottom: 15,
  },
  summaryBox: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
  },
  label: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  value: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default MenuSummary;