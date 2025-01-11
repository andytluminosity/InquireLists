"use client"; 

import React, { useState, useEffect } from 'react';
import { getAllLists, storeItem, getAllItemsForList, deleteItem, deleteList } from './items_db';
import { generatePrompt, changeAPIKey } from './ai_implementation';

interface Item {
  id: number;
  name: string;
}

interface List {
  id: number;
  name: string;
}

const Page = () => {
  const listAction = 0
  
  const [allCurLists, setAllCurLists] = useState<List[]>([]); // State for list names

  useEffect(() => {
    const updateListNames = async () => {
      try {
        const response = await getAllLists();
        const unformatted = await response.json();
        const formattedList = unformatted.map((item: string, index: number) => ({
          id: index + 1,
          name: `${item[0]}`,
        }));
        setAllCurLists(formattedList); // Update state
      } catch (error) {
        console.error('Error fetching list names:', error);
      }
  };

  updateListNames();
}, [listAction]); // Runs whenever the lists change

  const [selectedListName, setSelectedListName] = useState<string | null>(null);
  // Function to handle list selection
  const [allItemsofSelectedList, setallListItems] = useState<Item[]>([]); // State for list names

   // Fetch items when the selected list changes
   useEffect(() => {
    if (selectedListName !== null) {
      const updateListItemNames = async () => {
        try {
          const response = await getAllItemsForList(selectedListName);
          const unformatted = await response.json();
          const formattedList = unformatted.map((item: string, index: number) => ({
            id: index + 1,
            name: `${item[0]}`,
          }));
          setallListItems(formattedList); // Update state with items for the selected list
        } catch (error) {
          console.error('Error fetching list item names:', error);
        }
      };

      updateListItemNames();
    }
  }, [selectedListName]); // Runs whenever the selectedListName changes

   // Function to handle list selection
   const showList = (ListName: string) => {
    setSelectedListName(ListName); // Update selected list
  };

  // New API Key
  const [newAPIKey, setNewAPIKey] = useState('');

  // Handler function for when the user types in the input
  const handleNewAPIKeyRequest = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewAPIKey(event.target.value); // Update the state with the input value
  };

  // Add a new item to the list
  const [newItem, setNewItem] = useState('');

  const handleNewItemRequest = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewItem(event.target.value); // Update the state with the input value
  };

  // Add a new list
  const [newList, setNewList] = useState('');

  const handleNewListRequest = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewList(event.target.value); // Update the state with the input value
  };

  // New user-inputted AI Prompt
  const [newPrompt, setNewPrompt] = useState('');

  const handleNewPromptRequest = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewPrompt(event.target.value); // Update the state with the input value
  };

  // AI Response to last query
  const [AIResponse, setAIResponse] = useState('');

  async function updateAIResponse(userInput: string) { // Need to wait for backend to generate response
    const data = await generatePrompt(allItemsofSelectedList, userInput);
    setAIResponse(data);
  };
  // // Handler function for when the user types in the input
  // const handleAIResponse = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   getAIResponse(event.target.value); // Update the state with the input value
  // };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh', // Ensures full page height (100% of viewport height)
        background: '#e0f7f7',
      }}
    >
      <h1 // Title
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '0.1vh',
          background: '#32a8a8',
          textAlign: 'center',
          justifyContent: 'center',
          fontSize: '50px',
          width: '100vw',
          height: '100px',
        }}
      ><strong>InquireLists</strong>
      </h1>
      <div // Add space between title and rest of content
          style={{marginBottom: '40px'}}></div>
      <div //Start a grid
        style = {{
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', // Second column has twice the width of the first
          gridRowGap: '25px', // Increase vertical space between rows
          gridColumnGap: '50px', // Reduce horizontal space between columns
          justifyItems: 'center',
          marginBottom: '50px'}}>
        
        <div style={{ // Prompt Input Box
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          gridRow: '1 / 2',
          gridColumn: '1 / 3',
          marginTop: '20px',
          padding: '10px',
          border: '1px solid #ccc',
          borderRadius: '10px',
          background: '#32a8a8',
        }}>
          <label htmlFor="text-input"><strong>OpenAI API Key</strong></label>
          <input
            type="text"
            id="text-input"
            value={newAPIKey}  // The value is controlled by state
            onChange={handleNewAPIKeyRequest}  // Updates state on change
            placeholder="Enter your OpenAI API Key"
          />
          <button type='button' onClick = {() => 
            changeAPIKey(newAPIKey)
          }
            style={{  
              width: '40vw',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '10px',
              background: '#f9f9f9',
              textAlign: 'center', 
            }}>
            Save
          </button>

          <div // Add space between top and bottom items 
          style={{marginBottom: '40px'}}>
          </div>

          <label htmlFor="text-input"><strong>Prompt to use with selected list items</strong></label>
          <input
            type="text"
            id="text-input"
            value={newPrompt}  // The value is controlled by state
            onChange={handleNewPromptRequest}  // Updates state on change
            placeholder="Eg. Suggest dinner recipes given this list of ingredients (and three more ingredients)"
          />
          <button type='button' onClick = {() => 
            updateAIResponse(newPrompt) // generatePrompt(newPrompt, selectedListName)
          }
              style={{  
                width: '40vw',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '10px',
                background: '#f9f9f9',
                textAlign: 'center', 
              }}
            >
              Generate
          </button>

          {AIResponse && ( // Render AIResponse if one is provided. Otherwise, render nothing
            <div style={{
              marginTop: '20px',  // Adds some space between the form and AI response
              padding: '10px',
              background: '#e0f7f7',  // Different background color for the response box
              borderRadius: '8px',
              border: '1px solid #ccc',
              wordWrap: 'break-word',  // Ensures the response doesn't overflow horizontally
              maxWidth: '100%',  // Ensures the response box doesn't extend beyond its parent
              minHeight: '50px',  // Provides a minimum height to the response box
            }}>
              {AIResponse}
            </div>
          )}
        </div>

        <h1 // List Header Text
          style={{
            gridColumn: '1 / 2', //Start at col 1 end at col 2
            gridRow: '2 / 3', // Similarly for row
            fontSize: '25px',
            textAlign: 'left',
            marginTop: '40px',
          }}
        >
          <strong>Select a List</strong>
        </h1>
        <h1 
          style={{
            gridColumn: '2 / 3', //Start at col 2 end at col 3
            gridRow: '2 / 3', // Similarly for row
            fontSize: '25px',
            textAlign: 'left',
            marginTop: '40px',
          }}
        > Items in Selected List 
        </h1>
        <div style= {{
            gridColumn: '1 / 2',
            gridRow: '3 / 4',
          }}>
          <div style={{ // Add new Item
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            marginTop: '20px',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '10px',
            background: '#32a8a8',
          }}>
            <label htmlFor="text-input"><strong>Add a new list: </strong></label>
            <input
              type="text"
              id="text-input"
              value={newList}  // The value is controlled by state
              onChange={handleNewListRequest}  // Updates state on change
              placeholder="Type a list name"
            />
            <button type='button' onClick = {() => 
            storeItem(newList, "placeholder")
            }
              style={{  
                width: '20vw',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '10px',
                background: '#f9f9f9',
                textAlign: 'center', 
              }}
            >
              Add 
            </button>
          </div>
          </div>
        <div style={{              
          gridColumn: '1 / 2',
          gridRow: '4 / 5',}}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 0.25fr', // Second column has twice the width of the first
            gridRowGap: '25px', // Increase vertical space between rows
            gridColumnGap: '0px', // Reduce horizontal space between columns
            justifyItems: 'center',
            marginBottom: '50px'
          }}>
            <div style={{                
              gridColumn: '1 / 2',
              gridRow: '2 / 3',}}>
              <div // List of buttons to select lists
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  marginTop: '20px',
                  border: '1px solid #ccc', 
                  borderRadius: '10px',
                  padding: '10px', 
                  background: '#32a8a8',
                }}
              >
                {allCurLists.map((list) => ( // Create list of buttons to select lists
                  <button type='button' onClick = {() => showList(list.name)}
                    key={list.id}
                    style={{  
                      width: '20vw',
                      padding: '10px',
                      border: '1px solid #ccc',
                      borderRadius: '10px',
                      background: '#f9f9f9',
                      textAlign: 'left', 
                    }}
                  >
                    {list.name}
                  </button>
                ))}
              </div>
            </div>
            <div style={{                
              gridColumn: '2 / 3',
              gridRow: '2 / 3',}}>
              <div // List of buttons to delete lists
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  marginTop: '20px',
                  border: '1px solid #ccc', 
                  borderRadius: '10px',
                  padding: '10px', 
                  background: '#32a8a8',
                }}
              >
                {allCurLists.map((list) => ( // Create list of buttons to delete lists
                  <button type='button' onClick = {() => deleteList(list.name)}
                    key={list.id}
                    style={{  
                      width: '33px',
                      padding: '10px',
                      border: '1px solid #ccc',
                      borderRadius: '10px',
                      background: '#f9f9f9',
                      textAlign: 'left', 
                    }}
                  >
                    X
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
          <div style= {{
            gridColumn: '2 / 3',
            gridRow: '3 / 4',
          }}>
            <div style={{ // Add new Item
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              marginTop: '20px',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '10px',
              background: '#32a8a8',
            }}>
              <label htmlFor="text-input"><strong>Add a new item: </strong></label>
              <input
                type="text"
                id="text-input"
                value={newItem}  // The value is controlled by state
                onChange={handleNewItemRequest}  // Updates state on change
                placeholder="Type an item name"
              />
              <button type='button' onClick = {() => 
              storeItem(selectedListName, newItem)
              }
                  style={{  
                    width: '20vw',
                    padding: '10px',
                    border: '1px solid #ccc',
                    borderRadius: '10px',
                    background: '#f9f9f9',
                    textAlign: 'center', 
                  }}
                >
                  Add
              </button>
            </div>
          </div>
        <div //Necessary to avoid random splotches of border
          style= {{
            gridColumn: '2 / 3',
            gridRow: '4 / 5',
            }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 0.25fr', // Second column has twice the width of the first
            gridRowGap: '25px', // Increase vertical space between rows
            gridColumnGap: '0px', // Reduce horizontal space between columns
            justifyItems: 'center',
            marginBottom: '50px'
          }}>
            <div style={{                
              gridColumn: '1 / 2',
              gridRow: '2 / 3',}}>
              <div // The list of items
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',  
                  marginTop: '20px',
                  padding: '10px',
                  border: '1px solid #ccc',
                  borderRadius: '10px',
                  background: '#32a8a8',
                }}
              >
                <div>
                  {!(allItemsofSelectedList.length === 0) ? ( // Display items in selected list
                    allItemsofSelectedList.map((item, index) => (
                      <div
                        key={item.id}
                        style={{
                          width: '20vw',
                          padding: '10px',
                          border: '1px solid #ccc',
                          borderRadius: '10px',
                          background: '#f9f9f9',
                          textAlign: 'left',
                          marginBottom: index === allItemsofSelectedList.length - 1 ? '0' : '10px', // Remove margin for the last item
                        }}
                      >
                        {item.name}
                      </div>
                    ))
                  ) : (
                    <div>Select a list to see items</div> // Display this if none selected
                  )}
                </div>
              </div>
            </div>
            <div style={{                
              gridColumn: '2 / 3',
              gridRow: '2 / 3',}}>
              <div // List of buttons to delete lists
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  marginTop: '20px',
                  border: '1px solid #ccc', 
                  borderRadius: '10px',
                  padding: '10px', 
                  background: '#32a8a8',
                }}
              >
                {allItemsofSelectedList.map((item) => ( // Create list of buttons to delete lists
                  <button type='button' onClick = {() => deleteItem(selectedListName,item.name)}
                    key={item.id}
                    style={{  
                      width: '33px',
                      padding: '10px',
                      border: '1px solid #ccc',
                      borderRadius: '10px',
                      background: '#f9f9f9',
                      textAlign: 'left', 
                    }}
                  >
                    X
                  </button>
                ))}
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
