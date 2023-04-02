import { Component } from 'react';
import { nanoid } from 'nanoid';

import ContactsList from 'components/ContactList/ContactList';
import Filter from 'components/Filter/Filter';
import ContactForm from 'components/ContactForm/ContactsForm';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  getFormData = data => {
    console.log('data :>> ', data);
    const dataIncludes = this.state.contacts.find(
      contact => contact.name.toLowerCase() === data.name.toLowerCase()
    );
    if (dataIncludes) {
      return alert(`${data.name} is already in contacts`);
    }
    const newContact = {
      ...data,
      id: nanoid(),
    };
    this.setState(prevState => ({
      contacts: [newContact, ...prevState.contacts],
    }));
  };

  handleFilterChange = e => {
    const target = e.target.value;
    this.setState(prevState => ({
      ...prevState,
      filter: target,
    }));
  };

  handleDelete = id => {
    console.log('id :>> ', id);
    const filtered = this.state.contacts.filter(contact => contact.id !== id);
    this.setState(prevState => ({
      ...prevState,
      contacts: filtered,
    }));
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem(' contacts', JSON.stringify(this.state.contacts));
    }
  }

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parse = JSON.parse(contacts);
    if (parse) {
      this.setState({ contacts: parse });
    }
  }

  render() {
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm getFormData={this.getFormData} />
        <h2>Contacts</h2>
        <Filter
          handleFilterChange={this.handleFilterChange}
          filter={this.state.filter}
        />
        <ContactsList
          contacts={this.getVisibleContacts()}
          onRemove={this.handleDelete}
        />
      </div>
    );
  }
}

export default App;
