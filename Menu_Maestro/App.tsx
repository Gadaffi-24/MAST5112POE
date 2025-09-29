import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MenuItem } from './types';
import HomeScreen from '';
import AddEditItemScreen from '';
import FilterScreen from '';

// Define stack navigator for type safety
const Stack = createNativeStackNavigator<{
  Home: { newItem?: MenuItem }; // Home screen can receive a new item as a parameter
  AddEdit: undefined;
  Filter: undefined;
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
    },
    {
      id: '2',
      dishName: 'Chef Salad',
      description: 'A light and zesty starter.',
      price: 6.0,
      course: 'Starter',
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