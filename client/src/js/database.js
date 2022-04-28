import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

/*
  We need to add some code below which will take updated content and save it to IndexedDB.
*/
export const putDb = async (content) => {
  // First, create a variable, and set it to asyncronously await the opening of the database. Replace the items in all caps
  const jateDB = await openDB('jate', 1);

  // Now create a variable for the transaction
  const tx = jateDB.transaction('jate', 'readwrite');

  // Now create a variable for the store
  const store = tx.objectStore('jate');

  // Now create a variable named "request" and have it perform the update
  const request = store.put({ id: 1, value.content });

  const result = await request;
  console.log('Data successfully saved to database', result.value);
};

/*
  We need to add some code below which will get all content from IndexedDB.
*/
export const getDb = async () => {
  // You can duplicate the same first lines of code from above, except that the transaction will be 'readonly'

  // LINES 1-3 HERE

  // Leave the rest as-is
  const jateDB = await openDB('jate', 1);
  const tx = jateDB.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const request = store.get(1);
  const result = await request;
  result
  ? console.log('Data retrieved from database', result,value)
  : console.log('Data not found in the database.');

   // Check if a variable is defined and if it is, return it. See MDN Docs on Optional Chaining (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining)
  return result?.value;
};

initdb();