'use strict';
//Destructuring Array
const arr = [2, 3, 4];
const [a, b, c] = arr;
console.log(a);
console.log(b);
console.log(c);

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],
  order(start, mainCourse) {
    return [this.starterMenu[start], this.mainMenu[mainCourse]];
  },
  orderPasta(ing1, ing2, ing3) {
    console.log(
      `Here is your delicious pasta with ${ing1}, ${ing2} and ${ing3}`
    );
  },

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 10,
      close: 22,
    },
  },
};
console.log(restaurant.openingHours.mon?.open);
const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

for (const day of days) {
  const open = restaurant.openingHours[day]?.open ?? 'closed';
  const message = open === 'closed' ? `we are ${open}` : `we open at ${open}`;
  console.log(`On ${day}, ${message}`);
}
restaurant.numGuests = 0;

//conditional(ternary) operator
const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guests1);

const guests2 = restaurant.numGuests ?? 10;
console.log(guests2);

/*
const ingredient = [
  prompt('what do you want 1ingret for pasta'),
  prompt('what do you want 2ingret for pasta'),
  prompt('what do you want 3ingret for pasta'),
];

restaurant.orderPasta(...ingredient);


console.log(restaurant.categories);
let [main, , secondary] = restaurant.categories;
console.log(main, secondary);
[main, secondary] = [secondary, main];
console.log(main, secondary);


const [start, mainCourse] = restaurant.order(2, 0);
console.log(start, mainCourse);

const [p = 1, q, r] = [, 2, 9];
console.log(p, q, r);

console.log('Destructuring Objects');
const { name, openingHours, categories } = restaurant;
console.log(name, openingHours, categories);

let o = 111;
let k = 999;
const obj = { o: 23, k: 7, c: 14 };
({ o, k } = obj);
console.log(o, k);
*/
