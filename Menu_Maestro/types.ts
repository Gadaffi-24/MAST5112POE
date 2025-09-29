export interface MenuItem {
  id: string; // Unique identifier for each item
  dishName: string;
  description: string;
  price: number;
  course: 'Starter' | 'Main Dish' | 'Dessert'; // Defined courses
}

export const COURSE_OPTIONS: MenuItem['course'][] = [
  'Starter',
  'Main Dish',
  'Dessert',
];