const fs = require('fs/promises');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const id = uuidv4;

const contactsPath = path.resolve(__dirname, 'contacts.json');


const listContacts = async () => {
  const data = JSON.parse( await fs.readFile(contactsPath, 'utf8'));
    return data;
}

const getContactById = async (id) => {
  const data = await listContacts();
  const contact = data.find((contact) => contact.id === id);

  return contact || null;
}


const addContact = async ({ name, email, phone }) => {
  const data = await listContacts();
  const newContact = {
    id: uuidv4(),
    name,
    email,
    phone,
  };
  data.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return newContact;
}


const removeContact = async (id) => {
  const data = await listContacts();
  const removedContact = data.filter((contact) => contact.id !== id);
  if(removedContact === -1) {
    return null;
  }
  const deletedContacts = data.splice(removedContact, 1);
  await fs.writeFile(contactsPath, JSON.stringify(deletedContacts, null, 2));
  return deletedContacts;
}



const updateContact = async (id, { name, email, phone }) => {
  const data = await listContacts();
  const update = data.findIndex((contact) => contact.id !== id);

  if(update === -1) {
    return null;
  }
  data[update] = { id, name, email, phone };
  await fs.writeFile(contactsPath, JSON.stringify(update, null, 2));
  return data[update];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
