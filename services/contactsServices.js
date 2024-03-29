import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("db", "contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath);

  return JSON.parse(data);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === contactId);

  return result || null;
}

async function addContact({ name, email, phone }) {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };

  contacts.push(newContact);
  await updateContactsList(contacts);

  return newContact;
}

async function updateContactBuId(id, data) {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === id);

  if (index === -1) {
    return null;
  }

  contacts[index] = { ...contacts[index], ...data };
  await updateContactsList(contacts);

  return contacts[index];
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);

  if (index === -1) {
    return null;
  }

  const [result] = contacts.splice(index, 1);
  await updateContactsList(contacts);

  return result;
}

async function updateContactsList(contacts) {
  try {
    const updatedList = await fs.writeFile(
      contactsPath,
      JSON.stringify(contacts, null, 2)
    );

    return updatedList;
  } catch (error) {
    console.log(error);
  }
}

export {
  listContacts,
  getContactById,
  addContact,
  updateContactBuId,
  removeContact,
};
