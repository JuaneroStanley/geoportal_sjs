import mcdonalds_img from "./mcdonald.png";
import wendys_img from "./wendys.png";
import burgerking_img from "./burgerking.png";
import tacobell_img from "./tacobell.png";

export const restaurants = [
  {
    id: 0,
    menuId: 0,
    name: "McDonalds",
    address: "1234 Main St",
    location: [21.3, 52.3],
    rating: 2.5,
    desctiption: "Fast Food",
    image: mcdonalds_img,
  },
  {
    id: 1,
    menuId: 1,
    name: "Burger King",
    address: "1234 Main St",
    location: [21.3, 52.4],
    rating: 1.5,
    desctiption: "Fast Food",
    image: burgerking_img,
  },
  {
    id: 2,
    menuId: 2,
    name: "Wendys",
    address: "1234 Main St",
    location: [21.3, 52.5],
    rating: 3.5,
    desctiption: "Fast Food",
    image: wendys_img,
  },
  {
    id: 3,
    menuId: 3,
    name: "Taco Bell",
    address: "1234 Main St",
    location: [21.3, 52.6],
    rating: 4.5,
    desctiption: "Fast Food",
    image: tacobell_img,
  },
  {
    id: 4,
    menuId: 0,
    name: "McDonalds",
    address: "1234 Main St",
    location: [21.3, 52.3],
    rating: 2.5,
    desctiption: "Fast Food",
    image: mcdonalds_img,
  },
];

export const menu = [
  [
    { id: 0, name: "Big Mac", price: 5.99 },
    { id: 1, name: "Quarter Pounder", price: 6.99 },
    { id: 2, name: "Chicken Nuggets", price: 3.99 },
    { id: 3, name: "Fries", price: 2.99 },
    { id: 4, name: "Coke", price: 1.99 },
    { id: 5, name: "McFlurry", price: 3.99 },
    { id: 6, name: "Apple Pie", price: 2.99 },
    { id: 7, name: "Salad", price: 4.99 },
    { id: 8, name: "Happy Meal", price: 5.99 },
  ],
  [
    { id: 0, name: "Whopper", price: 5.99 },
    { id: 1, name: "Chicken Sandwich", price: 6.99 },
    { id: 2, name: "Chicken Fries", price: 3.99 },
    { id: 3, name: "Fries", price: 2.99 },
    { id: 4, name: "Coke", price: 1.99 },
  ],
  [
    { id: 0, name: "Baconator", price: 5.99 },
    { id: 1, name: "Spicy Chicken Sandwich", price: 6.99 },
    { id: 2, name: "Frosty", price: 3.99 },
    { id: 3, name: "Fries", price: 2.99 },
    { id: 4, name: "Coke", price: 1.99 },
  ],
  [
    { id: 0, name: "Taco", price: 5.99 },
    { id: 1, name: "Burrito", price: 6.99 },
    { id: 2, name: "Nachos", price: 3.99 },
    { id: 3, name: "Fries", price: 2.99 },
    { id: 4, name: "Coke", price: 1.99 },
  ],
];
