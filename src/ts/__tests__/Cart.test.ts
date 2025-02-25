import Cart from '../service/Cart';
import Book from '../domain/Book';
import MusicAlbum from '../domain/MusicAlbum';
import Movie from '../domain/Movie';

const cart = new Cart();

test('new card should be empty', () => {
  expect(cart.items.length).toBe(0);
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
    cart.add(musicAlbum);
    expect(cart.items.length).toBe(1);
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
    cart.add(book);
    expect(cart.items.length).toBe(2);
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
    cart.add(movie);
    expect(cart.items.length).toBe(3);
  });
});

describe('Cart method', () => {
  test('should return full sum of cart', () => {
    expect(cart.getSumFull()).toBe(1050);
  });

  test('should return sum with discount 10% of cart', () => {
    expect(cart.getSumDiscount(10)).toBe(945);
  });

  test('should delete item of ID', () => {
    cart.deleteItem(365);

    expect(cart.items.length).toBe(2);
  });
});

