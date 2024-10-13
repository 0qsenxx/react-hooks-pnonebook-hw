import { useState, useEffect } from "react";
import styles from "./App.module.css";
import { nanoid } from "nanoid";
import ContactForm from "./components/ContactForm/ContactForm";
import Filter from "./components/Filter/Filter";
import ContactsList from "./components/ContactsList/ContactsList";

const App = () => {
  const [contacts, setContacts] = useState(() => {
    const savedContacts = localStorage.getItem("contacts");
    return savedContacts
      ? JSON.parse(savedContacts)
      : [
          { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
          { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
          { id: "id-3", name: "Eden Clements", number: "645-17-79" },
          { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
        ];
  });
  const [filter, setFilter] = useState("");

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (evt) => {
    evt.preventDefault();

    const contactExists = contacts.some((contact) =>
      contact.name
        .toLowerCase()
        .includes(evt.target.elements.contactName.value.toLowerCase())
    );

    if (contactExists) {
      alert(`${evt.target.elements.contactName.value} is already in contacts.`);
      evt.target.reset();
      return;
    }

    setContacts((prevContacts) => {
      return prevContacts.concat({
        name: evt.target.elements.contactName.value,
        number: evt.target.elements.contactNumber.value,
        id: nanoid(),
      });
    });
    evt.target.reset();
  };

  const deleteContact = (evt) => {
    const idContactToDelete = evt.target.getAttribute("data-id");

    return setContacts((prevContacts) =>
      prevContacts.filter((contact) => contact.id !== idContactToDelete)
    );
  };

  const findContact = (evt) => {
    return setFilter(evt.target.value);
  };

  return (
    <div className={styles.mainBox}>
      <h1>Phonebook</h1>
      <ContactForm addContact={addContact} />
      <h2>Contacts</h2>
      <Filter findContact={findContact} />
      <ContactsList
        contacts={contacts}
        filter={filter}
        deleteContact={deleteContact}
      />
    </div>
  );
};

export default App;
