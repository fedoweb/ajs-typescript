import Cart from '../service/Cart';
import Book from '../domain/Book';
import MusicAlbum from '../domain/MusicAlbum';
import Movie from '../domain/Movie';
import Gadgets from '../domain/Gadgets';

const testCart = new Cart();

test('new card should be empty', () => {
  expect(testCart.items.length).toBe(0);
});


describe('class MusicAlbum', () => {
  const musicAlbum = new MusicAlbum(364, 'Black album', 'Metallica', 350);

  test('create new MusicAlbum', () => {
    expect(musicAlbum).toEqual({
      'author': 'Metallica',
      'id': 364,
      'name': 'Black album',
      'price': 350,
    });
  });

  test ('should be add to Cart', () => {
    testCart.add(musicAlbum);
    expect(testCart.items.length).toBe(1);
  });

  test ('should be dont add to Cart', () => {
    testCart.add(musicAlbum);
    expect(testCart.items.length).toBe(1);
  });

  test ('should be dont reduce musicAlbum to Cart', () => {
    testCart.reduceQuantity(364);
    expect(testCart.items.length).toBe(1);
  });
});


describe('class Book', () => {
  const book = new Book(363, 'Евгений Онегин', 'А. С. Пушкин', 350, 150);

  test('create new Book', () => {
    expect(book).toEqual({
      'author': 'А. С. Пушкин',
      'id': 363,
      'name': 'Евгений Онегин',
      'pages': 150,
      'price': 350,
    });
  });

  test ('should be add to Cart', () => {
    testCart.add(book);
    expect(testCart.items.length).toBe(2);
  });
});

describe('class Movie', () => {
  const genre = ['фантастика', 'боевик', 'фентези', 'приключения'];
  const movie = new Movie(365, 'Мстители', 350, 2012, 'США', 'Avengers Assemble!', genre, 137);

  test('create new Movie', () => {
    expect(movie).toEqual({
      '_time': 137,
      'country': 'США',
      'genre': ['фантастика', 'боевик', 'фентези', 'приключения'],
      'id': 365,
      'name': 'Мстители',
      'price': 350,
      'slogan': 'Avengers Assemble!',
      'year': 2012,
    });
  });

  test('get and set method', () => {
    movie.time = 150;
    expect(movie.time).toEqual('150 мин. / 2:30');
  })

  test ('should be add to Cart', () => {
    testCart.add(movie);
    expect(testCart.items.length).toBe(3);
  });
});

describe('Cart method', () => {
  test('should return full sum', () => {
    expect(testCart.getSumFull()).toBe(1050);
  });

  test('should return sum with discount 10%', () => {
    expect(testCart.getSumDiscount(10)).toBe(945);
  });

  test('should delete item of ID', () => {
    testCart.deleteItem(365);

    expect(testCart.items.length).toBe(2);
  });
});

describe('class Gadgets', () => {
  const gadget = new Gadgets(366, 'IPhone 16 Pro', 119000);

  test('create new Gadget', () => {
    expect(gadget).toEqual({
      'id': 366,
      'name': 'IPhone 16 Pro',
      'price': 119000,
      'quantity': 1
    });
  });

  test('should add Gadgets from cart', () => {
    testCart.add(gadget);

    expect(testCart.items.length).toBe(3);
  });

  test('should add Gadgets to cart many times', () => {
    
    testCart.add(gadget);
    testCart.add(gadget);

    const item = testCart.items.find(item => item.id === gadget.id);
    expect(item.quantity).toBe(3);
    expect(testCart.items.length).toBe(3);
  });

  test('should return full sum', () => {
    testCart.clear();

    testCart.add(gadget);
    testCart.add(gadget);

    expect(testCart.getSumFull()).toBe(238000);
  });

  test('should return sum with discount 10%', () => {
    expect(testCart.getSumDiscount(10)).toBe(214200);
  });

  test('should reduce by one unit', () => {
    testCart.reduceQuantity(366);

    const item = testCart.items.find(item => item.id === 366);
    expect(item.quantity).toBe(1);
  });

  test('should delete gadget from cart', () => {
    testCart.reduceQuantity(366);

    const item = testCart.items.find(item => item.id === 366);
    expect(item).toEqual(undefined);
  });

});

