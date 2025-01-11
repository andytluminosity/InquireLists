interface generatePromptResponse { // Structure of response from backend
    general_ai_response: string; // The response from the AI
    error?: string; // Optional error message in case something goes wrong
}
interface Item {
    id: number;
    name: string;
  }

export async function generatePrompt(listOfItems: Item[],userInput:string) {
    const url = 'http://127.0.0.1:5000/general_ai_request';
    const payload = {
        listOfItems: listOfItems,
        userInput: userInput,
    };

    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
            body: JSON.stringify(payload),
        })

    // Handle successful response
    if (res.ok) {
        const data: generatePromptResponse = await res.json();
        console.log("Returned AI Response")
        return (data.general_ai_response);  // Return AI response
    } else { // An error has occurred
        const data: generatePromptResponse = await res.json();
        // Make sure to return some error message
        return data.error || "An error occurred in returning AI response"; 
    }
}

export function changeAPIKey(key: string) {
    const url = 'http://127.0.0.1:5000/change_key';
    const payload = {
        key: key,
    };
  
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then(response => response.json())
      .catch(error => console.error('Error changing api key:', error));
}