import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native'; // Use TouchableOpacity from 'react-native'
import { MenuItem } from '../types';

interface MenuItemCardProps {
  item: MenuItem;
  onEdit: (item: MenuItem) => void; 
}

// Ensure the component is explicitly typed as React.FC<Props>
const MenuItemCard: React.FC<MenuItemCardProps> = ({ item, onEdit }) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.dishName}>{item.dishName}</Text>
        <Text style={styles.foodType}>{item.course}</Text>
      </View>
      
      <Text style={styles.description}>{item.description}</Text>
      
      <View style={styles.footer}>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        <TouchableOpacity style={styles.editButton} onPress={() => onEdit(item)}>
            <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 15,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 2, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  dishName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flexShrink: 1,
  },
  foodType: {
    fontSize: 14,
    color: '#888',
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
  },
  editButton: {
    backgroundColor: '#333',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  editButtonText: {
    color: '#fff',
    fontWeight: '600',
  }
});

export default MenuItemCard;