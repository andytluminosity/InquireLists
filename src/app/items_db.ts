export function getAllLists() {
  const url = `http://127.0.0.1:5000/get_all_lists`;
  
  return fetch(url) // Fetch the data from the Flask API
    .then(data => {
      //console.log(`All lists: `, data);
      return data; // Return the data
    })
}

// Store a new item
export function storeItem(listName: null | string, itemName: string) {
  const url = 'http://127.0.0.1:5000/store_item';
  const payload = {
    listName: listName,
    itemName: itemName,
  };

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then(response => response.json())
    .catch(error => console.error('Error storing item:', error));
}

export function getAllItemsForList(listName: string) {
  const url = `http://127.0.0.1:5000/get_all_list_items/${listName}`;
  
  return fetch(url) // Fetch the data from the Flask API
    .then(data => {
      return data; // Return the data
    })
}

// Delete an item
export function deleteItem(listName: string | null, itemName: string) {
  const url = 'http://127.0.0.1:5000/delete_item';
  const payload = {
    listName: listName,
    itemName: itemName,
  };

  fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then(response => response.json())
}

// Delete a list
export function deleteList(listName: string) {
  const url = 'http://127.0.0.1:5000/delete_list';
  const payload = {
    listName: listName,
  };

  fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then(response => response.json())
}
  