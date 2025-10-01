import React, { useEffect, useCallback, useState } from 'react'; // ADDED useState
import { View, FlatList, Button, StyleSheet, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
// Assuming these are the correct relative paths in your project structure
import { MenuItem } from './types'; 
import MenuSummary from './components/MenuSummary';
import MenuItemCard from './components/MenuItemCard';

// FIX: Update the RootStackParamList to reflect all parameters used in navigation.navigate()
type RootStackParamList = {
  // Home: Receives data back from AddEdit or Filter
  Home: { savedItem?: MenuItem; itemToRemoveId?: string; activeFilters?: MenuItem['course'][] }; // ADDED activeFilters
  // AddEdit: Requires the itemToEdit parameter for the edit functionality
  AddEdit: { itemToEdit?: MenuItem };
  // Filter: Requires the currentFilters parameter
  Filter: { currentFilters?: MenuItem['course'][] }; // ADDED currentFilters
};

// Define the component's props including navigation and state management
type Props = NativeStackScreenProps<RootStackParamList, 'Home'> & {
  menuItems: MenuItem[];
  setMenuItems: React.Dispatch<React.SetStateAction<MenuItem[]>>;
};

const HomeScreen: React.FC<Props> = ({ navigation, route, menuItems, setMenuItems }) => {
  
  // NEW STATE: Manage the currently applied filters
  const [activeFilters, setActiveFilters] = useState<MenuItem['course'][]>([]);

  // DERIVED STATE: The list to actually display (filtered or full list)
  const filteredMenuItems = activeFilters.length > 0 
    ? menuItems.filter(item => activeFilters.includes(item.course))
    : menuItems; // Show all if no filters are active

  // Handler for the Edit button on a MenuItemCard
  const handleEdit = useCallback((item: MenuItem) => {
    navigation.navigate('AddEdit', { itemToEdit: item }); 
  }, [navigation]);

  // Logic for handling ADD, EDIT, REMOVE, and FILTER actions
  useEffect(() => {
    
    // --------------------------------------------------
    // 1. Handle Saved Item (Add or Edit)
    // --------------------------------------------------
    if (route.params?.savedItem) {
      const savedItem = route.params.savedItem;
      
      setMenuItems(prevItems => {
        const existingIndex = prevItems.findIndex(item => item.id === savedItem.id);
        
        if (existingIndex > -1) {
          // EDIT: Replace the existing item
          const updatedItems = [...prevItems];
          updatedItems[existingIndex] = savedItem;
          Alert.alert("Success", `Menu item '${savedItem.dishName}' updated.`);
          return updatedItems;
        } else {
          // ADD: Append the new item
          Alert.alert("Success", `Menu item '${savedItem.dishName}' added to the menu.`);
          return [...prevItems, savedItem];
        }
      });
      
      navigation.setParams({ savedItem: undefined });
    }
    
    // --------------------------------------------------
    // 2. Handle Item Removal
    // --------------------------------------------------
    if (route.params?.itemToRemoveId) {
        const idToRemove = route.params.itemToRemoveId;
        
        setMenuItems(prevItems => {
            const itemRemoved = prevItems.find(item => item.id === idToRemove);
            if (itemRemoved) {
                Alert.alert("Success", `Menu item '${itemRemoved.dishName}' removed.`);
            }
            return prevItems.filter(item => item.id !== idToRemove);
        });

        navigation.setParams({ itemToRemoveId: undefined });
    }
    
    // --------------------------------------------------
    // 3. Handle Active Filters received from FilterScreen (NEW LOGIC)
    // --------------------------------------------------
    if (route.params?.activeFilters !== undefined) {
      setActiveFilters(route.params.activeFilters);
      
      const filterCount = route.params.activeFilters.length;
      if (filterCount > 0) {
          Alert.alert("Filters Applied", `Showing ${filterCount} course(s).`);
      } else {
          Alert.alert("Filters Cleared", "Showing all menu items.");
      }
      
      navigation.setParams({ activeFilters: undefined });
    }
    
  }, [route.params?.savedItem, route.params?.itemToRemoveId, route.params?.activeFilters, setMenuItems, navigation]); 


  return (
    <View style={styles.container}>
      {/* 1. Summary Section - PASS FILTERED MENU ITEMS */}
      <MenuSummary items={filteredMenuItems} />

      {/* 2. Filter Button */}
      <Button 
        // Show filter count if active
        title={activeFilters.length > 0 ? `Filter Menu (${activeFilters.length})` : "Filter Menu"} 
        // Navigate to Filter, passing current filters for pre-selection
        onPress={() => navigation.navigate('Filter', { currentFilters: activeFilters })} 
      />

      {/* 3. Menu Item List - USES FILTERED MENU ITEMS */}
      <FlatList
        data={filteredMenuItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MenuItemCard item={item} onEdit={handleEdit} />}
        contentContainerStyle={styles.list}
      />
      
      {/* 4. Add Button (Prominent at the bottom) */}
      <Button 
        title="Add Item" 
        // Navigate to AddEdit, passing an explicit undefined for a new item
        onPress={() => navigation.navigate('AddEdit', { itemToEdit: undefined })} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  list: { paddingBottom: 60 },
});

export default HomeScreen;