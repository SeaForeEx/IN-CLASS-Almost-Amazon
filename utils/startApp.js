import { getBooks } from '../api/bookData';
import { showBooks } from '../pages/books';
import { getAuthors } from '../api/authorData';
import { showAuthors } from '../pages/authors';
import logoutButton from '../components/buttons/logoutButton';
import domBuilder from '../components/shared/domBuilder';
import navBar from '../components/shared/navBar';
import domEvents from '../events/domEvents';
import formEvents from '../events/formEvents';
import navigationEvents from '../events/navigationEvents';

const startApp = () => {
  domBuilder(); // BUILD THE DOM
  domEvents(); // ADD THE EVENT LISTENTERS TO THE DOM
  formEvents(); // ADD FORM EVENT LISTENTERS TO THE DOM
  navBar(); // DYNAMICALLY ADD THE NAV
  logoutButton(); // ADD THE LOGOUT BUTTON COMPONENT
  navigationEvents(); // ATTACH THE EVENT LISTENERS TO THE NAVBAR

  // Put all books on the DOM on App load
  getBooks().then((books) => showBooks(books));
  // whatever you resolve is returned at .then(taco)
  getAuthors().then((authors) => showAuthors(authors));
};

export default startApp;