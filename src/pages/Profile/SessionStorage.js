import { useState, useEffect } from "react";

/**
 * A custom hook that uses session storage to persist and retrieve data.
 * @param {string} key - The key to store the data under in session storage.
 * @param {any} defaultValue - The default value to use if the key does not exist in session storage.
 * @returns {[any, function, function]} - Returns an array containing the stored value, a function to set the value, and a function to remove the item from session storage.
 */
export function useSessionStorage(key, defaultValue) {
  // Use useState to retrieve the stored value from session storage, or the default value if the key does not exist
  const [value, setItem] = useState(() => {
    const storedValue = sessionStorage.getItem(key);
    return storedValue !== null ? JSON.parse(storedValue) : defaultValue;
  });

  // Use useEffect to store the value in session storage whenever it changes
  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  // Define a function to remove the item from session storage
  function removeItem() {
    sessionStorage.removeItem(key);
  }

  // Return an array containing the stored value, a function to set the value, and a function to remove the item from session storage
  return [value, setItem, removeItem];
}
