// screens/FilterScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Switch, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { COURSE_OPTIONS, MenuItem } from './types';

// Define the navigation types for this screen
type RootStackParamList = {
  Home: { savedItem?: MenuItem; itemToRemoveId?: string; activeFilters?: MenuItem['course'][] };
  Filter: { currentFilters?: MenuItem['course'][] }; // Accepts optional current filters to pre-select
};

type Props = NativeStackScreenProps<RootStackParamList, 'Filter'>;

const FilterScreen: React.FC<Props> = ({ navigation, route }) => {
  // Use a Set for efficient filter management, initializing with any filters passed from Home
  const initialFilters = new Set(route.params?.currentFilters || []);
  const [selectedCourses, setSelectedCourses] = useState<Set<MenuItem['course']>>(initialFilters);

  // Toggles a course filter on or off
  const toggleFilter = (course: MenuItem['course']) => {
    setSelectedCourses(prevFilters => {
      const newFilters = new Set(prevFilters);
      if (newFilters.has(course)) {
        newFilters.delete(course); // Turn off
      } else {
        newFilters.add(course); // Turn on
      }
      return newFilters;
    });
  };

  // Sends the active filters back to the Home screen
  const applyFilters = () => {
    // Convert the Set back to an array for transmission
    const filtersArray = Array.from(selectedCourses);
    
    // Navigate back to Home, passing the active filters
    navigation.navigate('Home', { activeFilters: filtersArray });
  };
  
  // Clears all filters and navigates back
  const resetFilters = () => {
    navigation.navigate('Home', { activeFilters: [] });
  };
  
  // Custom component for the filter row
  const FilterRow: React.FC<{ course: MenuItem['course'] }> = ({ course }) => {
    const isActive = selectedCourses.has(course);
    
    return (
      <View style={styles.filterRow}>
        <Text style={styles.filterLabel}>{course}</Text>
        <Switch
          value={isActive}
          onValueChange={() => toggleFilter(course)}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isActive ? "#f5dd4b" : "#f4f3f4"}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.header}>Filter Menu by Course</Text>
        {COURSE_OPTIONS.map(course => (
          <FilterRow key={course} course={course} />
        ))}
      </ScrollView>

      <View style={styles.buttonContainer}>
        <Button 
          title="Reset Filters" 
          onPress={resetFilters} 
          color="#ff6347" // Tomato red for reset
        />
        <Button 
          title="Apply Filters" 
          onPress={applyFilters} 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: '#fff' 
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  filterLabel: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  }
});

export default FilterScreen;