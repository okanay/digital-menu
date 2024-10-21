declare global {
  type AllergenDisplay = {
    id: number;
    name: string;
    icon: React.ReactNode;
  };
}

export const allergensList: AllergenDisplay[] = [
  { id: 1, name: "Peanuts", icon: "🥜" },
  { id: 2, name: "Milk", icon: "🥛" },
  { id: 3, name: "Eggs", icon: "🥚" },
  { id: 4, name: "Fish", icon: "🐟" },
  { id: 5, name: "Shellfish", icon: "🦐" },
  { id: 6, name: "Soy", icon: "🌱" },
  { id: 7, name: "Wheat", icon: "🌾" },
  { id: 8, name: "Sesame", icon: "🌿" },
  { id: 9, name: "Celery", icon: "🥬" },
  { id: 10, name: "Gluten", icon: "🍞" },
  { id: 11, name: "Crustaceans", icon: "🦞" },
  { id: 12, name: "Lupin", icon: "🌸" },
  { id: 13, name: "Molluscs", icon: "🐚" },
  { id: 14, name: "Mustard", icon: "🥫" },
  { id: 15, name: "Tree Nuts", icon: "🌰" },
  { id: 16, name: "Sulphites", icon: "🧪" },
];
