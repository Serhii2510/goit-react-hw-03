import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import initialContacts from './initialContacts.json';
import ContactForm from './components/ContactForm/ContactForm';
import SearchBox from './components/SearchBox/SearchBox';
import ContactList from './components/ContactList/ContactList';
import css from './App.module.css';

const App = () => {
  const [contacts, setContacts] = useState(() => {
    const dataFromLocalStorage = JSON.parse(
      window.localStorage.getItem('contacts')
    );
    if (dataFromLocalStorage) {
      return dataFromLocalStorage;
    }

    return initialContacts;
  });

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const [filter, setFilter] = useState('');

  const visibleContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  const addContact = contact => {
    const finalContact = {
      id: nanoid(),
      ...contact,
    };

    setContacts([...contacts, finalContact]);
  };

  const deleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  return (
    <div className={css.wrapper}>
      <h1 className={css.title}>Phonebook</h1>
      <ContactForm addContact={addContact} />
      <SearchBox value={filter} onFilter={setFilter} />
      {visibleContacts.length > 0 && (
        <ContactList contacts={visibleContacts} onDelete={deleteContact} />
      )}

      {!visibleContacts.length && (
        <p className={css.notification}>
          No matching contacts have been found. Please check your request input
          and try again
        </p>
      )}
    </div>
  );
};

export default App;
