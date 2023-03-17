import { useState, useEffect } from "react";

/**
 * A custom hook that uses local storage to persist and retrieve data.
 * @param {string} key - The key to store the data under in local storage.
 * @param {any} defaultValue - The default value to use if the key does not exist in local storage.
 * @returns {[any, function, function]} - Returns an array containing the stored value, a function to set the value, and a function to remove the item from local storage.
 */
export function useLocalStorage(key, defaultValue) {
  // Use useState to retrieve the stored value from local storage, or the default value if the key does not exist
  const [value, setItem] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue !== null ? JSON.parse(storedValue) : defaultValue;
  });

  // Use useEffect to store the value in local storage whenever it changes
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  // Define a function to remove the item from local storage
  function removeItem() {
    localStorage.removeItem(key);
  }

  // Return an array containing the stored value, a function to set the value, and a function to remove the item from local storage
  return [value, setItem, removeItem];
}
