// screens/AddEditItemScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MenuItem, COURSE_OPTIONS } from './types';

// Define the root stack param list (FIXED for Add/Edit/Remove/Filter logic)
type RootStackParamList = {
  // Home now accepts savedItem and itemToRemoveId
  Home: { savedItem?: MenuItem; itemToRemoveId?: string; activeFilters?: MenuItem['course'][] };
  // AddEdit now accepts the itemToEdit parameter
  AddEdit: { itemToEdit?: MenuItem };
  Filter: { currentFilters?: MenuItem['course'][] }; // Include Filter for completeness
};

// Props are updated to include route so we can check for itemToEdit
type Props = NativeStackScreenProps<RootStackParamList, 'AddEdit'>;

const AddEditItemScreen: React.FC<Props> = ({ navigation, route }) => {
  // Determine if we are editing an existing item
  const itemToEdit = route.params?.itemToEdit;
  const isEditing = !!itemToEdit;

  // Initialize state based on whether we are editing or adding
  const [id, setId] = useState(itemToEdit?.id || Date.now().toString()); // Preserve ID if editing
  const [dishName, setDishName] = useState(itemToEdit?.dishName || '');
  const [description, setDescription] = useState(itemToEdit?.description || '');
  const [priceText, setPriceText] = useState(itemToEdit?.price ? itemToEdit.price.toFixed(2) : '');
  const [course, setCourse] = useState<MenuItem['course']>(itemToEdit?.course || COURSE_OPTIONS[0]);

  // Set the screen title dynamically
  useEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Menu Item' : 'Add New Menu Item',
    });
  }, [isEditing, navigation]);

  const handleSave = () => {
    // Basic validation
   if (!dishName || !description || !priceText) {
        Alert.alert('Error', 'Please fill out all fields.');
       return;
    }

   const newPrice = parseFloat(priceText);
    if (isNaN(newPrice)) {
        Alert.alert('Error', 'Please enter a valid price.');
        return;
    }

    // Create the item object
    const savedItem: MenuItem = {
      id,
      dishName,
      description,
      price: newPrice,
      course,
    };

    // Send the item back to the Home screen using the 'savedItem' parameter
    navigation.navigate('Home', { savedItem });
  };
  
  const handleRemove = () => {
    Alert.alert(
      "Confirm Deletion",
      `Are you sure you want to remove '${dishName}'?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          onPress: () => {
            // Send the ID back to the Home screen using the 'itemToRemoveId' parameter
            navigation.navigate('Home', { itemToRemoveId: id });
          },
          style: 'destructive',
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Dish Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter dish name.."
        value={dishName}
        onChangeText={setDishName}
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Enter dish description.."
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <Text style={styles.label}>Price</Text>
      <TextInput
        style={styles.input}
        placeholder="0.00"
        value={priceText}
        onChangeText={setPriceText}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Course Selection</Text>
      <Picker
        selectedValue={course}
        onValueChange={(itemValue) => setCourse(itemValue)}
        style={styles.picker}
      >
        {COURSE_OPTIONS.map((c) => (
         <Picker.Item key={c} label={c} value={c} />
        ))}
      </Picker>

      <View style={styles.buttonContainer}>
        {/* Save Button (Add or Update) */}
        <Button title={isEditing ? "Update Item" : "Add Item"} onPress={handleSave} />
        
        {/* Remove Button (Only visible when editing) */}
        {isEditing && (
          <View style={styles.removeButton}>
            <Button title="Remove Item" onPress={handleRemove} color="red" />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  label: { fontSize: 16, marginTop: 10, marginBottom: 5, fontWeight: 'bold' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 8, marginBottom: 10 },
  textArea: { height: 80 },
  picker: { borderWidth: 1, borderColor: '#ccc', marginBottom: 20 },
  buttonContainer: { 
    marginTop: 20, 
    flexDirection: 'column', // Stack buttons vertically
    gap: 10, // Space between buttons
  },
  removeButton: {
    marginTop: 10,
  }
});

export default AddEditItemScreen;