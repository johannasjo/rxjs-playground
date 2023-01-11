import './style.css';

import { of, map, pipe, take, filter, Observable } from 'rxjs';

const users = {
  data: [
    {
      name: 'Piotr',
      age: 32,
      pet: null,
    },
    {
      name: 'Michal',
      age: 45,
      pet: 'cat',
    },
    {
      name: 'Krystian',
      age: 29,
      pet: 'Dog',
    },
  ],
};

const observable = new Observable((subscriber) => {
  subscriber.next(users);
}).pipe(
  map((value) => {
    value.data.filter((object) => {
      if (object.pet === null) {
        object.pet = 'horse';
      }
    });
    return value.data;
  }),
  map((value) => {
    console.log('second map', value);
    return value;
  }),
  take(1)
);

const observer = {
  // if no issues
  next: (value) => {
    console.log('I am the observer', value);
  },

  // if error
  error: (err) => {
    console.log('Observer got error', err);
  },

  // if complete
  complete: () => {
    console.log('Observer was completed');
  },
};

// connect observable and observer
observable.subscribe(observer);
