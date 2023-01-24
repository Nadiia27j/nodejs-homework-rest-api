const fs = require('fs/promises');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const id = uuidv4;

const contactsPath = path.resolve(__dirname, 'contacts.json');


const getAll = async () => {
  const data = JSON.parse( await fs.readFile(contactsPath, 'utf8'));
    return data;
}

const getContactById = async (contactId) => {
  const data = await getAll();
  const contact = data.find((contact) => contact.id === contactId);

  return contact || null;
}

const addContact = async ({ name, email, phone }) => {
  const data = await getAll();
  const newContact = {
    id,
    name,
    email,
    phone,
  };
  data.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return newContact;
}

const removeContact = async (contactId) => {
  const data = await getAll();
  const removedContact = data.filter((contact) => contact.id !== contactId);
  if(removedContact === -1) {
    return null;
  }
  const deletedContacts = data.splice(removedContact, 1);
  await fs.writeFile(contactsPath, JSON.stringify(deletedContacts, null, 2));
  return deletedContacts;
}



const updateContact = async (contactId, { name, email, phone }) => {
  const data = await getAll();
  const update = data.filter((contact) => contact.id !== contactId);

  if(update === -1) {
    return null;
  }
  data[update] = { id, name, email, phone };
  await fs.writeFile(contactsPath, JSON.stringify(update, null, 2));
  return data[update];
}

module.exports = {
  getAll,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
