import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MenuItem } from './types';
import HomeScreen from './HomeScreen';
import AddEditItemScreen from './AddEditItemScreen';
import FilterScreen from './FilterScreen';

const Stack = createNativeStackNavigator<{
  // Home: Receives a saved item (add/edit), an item ID to remove, and active filter criteria
  Home: { savedItem?: MenuItem; itemToRemoveId?: string; activeFilters?: MenuItem['course'][] };
  // AddEdit: Receives an optional item to populate the form for editing
  AddEdit: { itemToEdit?: MenuItem };
  // Filter: Receives the current active filters to pre-select options
  Filter: { currentFilters?: MenuItem['course'][] }; 
}>();

const App: React.FC = () => {
  // Hardcode an initial item for testing purposes
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    {
      id: '1',
      dishName: 'The Chief Burger',
      description: 'Classic patty with all the fixings.',
      price: 12.5,
      course: 'Main Dish',
      image: 'Menu_Maestro/images/burgerbilly.jpg'
    },
    {
      id: '2',
      dishName: 'Chef Salad',
      description: 'A light and zesty starter.',
      price: 6.0,
      course: 'Starter',
      image: 'Menu_Maestro/images/salad.jpg'
    },
  ]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" options={{ title: "Chef My Chef's Kitchen" }}>
          {/* Pass the state and the setter function down to the Home Screen */}
          {(props) => (
            <HomeScreen
              {...props}
              menuItems={menuItems}
              setMenuItems={setMenuItems}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="AddEdit" component={AddEditItemScreen} options={{ title: 'Add New Menu Item' }} />
        <Stack.Screen name="Filter" component={FilterScreen} options={{ title: 'Filter Menu' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;