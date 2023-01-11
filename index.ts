import './style.css';

import { of, map, pipe, take, pluck, filter, Observable } from 'rxjs';

const users = {
  data: [
    {
      name: 'Piotr',
      age: 32,
      pet: 'cat',
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

const usersWithoutAnimals = {
  data: [
    {
      name: 'Piotr',
      age: 32,
      pet: null,
    },
    {
      name: 'Michal',
      age: 45,
      pet: undefined,
    },
    {
      name: 'Krystian',
      age: 29,
      pet: '',
    },
  ],
};

const observable = new Observable((subscriber) => {
  subscriber.next(users);
  subscriber.next(usersWithoutAnimals);
}).pipe(
  map((value) => {
    value.data.filter((object) => {
      if (object.pet === null) {
        throw new Error('No animal!');
      }
    });
    return value.data;
  })
);

const observer = {
  // if no issues
  next: (value) => {
    console.log('I am the observer', value);
  },

  // if error
  error: (err) => {
    console.log('Observer got error' + err);
  },

  // if complete
  complete: () => {
    console.log('Observer was completed');
  },
};

// connect observable and observer
observable.subscribe(observer);
