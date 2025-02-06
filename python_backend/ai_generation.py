from openai import OpenAI
from api_key_database import *

instructions = f"You will be provided with a list of item names with IDs. Ignored the IDs of each item. " \
               f"Consider each item carefully and how they may relate to completing the user-given prompt. " \
               f"Your primary task is to help complete the user's prompt. However, if the user-given prompt " \
               f"is unclear or lacks any details you need, you must tell them to restate their prompt "\
               f"the clarifications or details necessary and click the \"Generate\" button again. "

messages_list = [{"role":"system", "content": instructions},
                 {"role":"user", "content": "I know there's something in the wake of your smile"},
                 {"role":"assistant", "content": "I get a notion from the look in your eyes, yeah"},
                 {"role":"user", "content": "You've built a love but that love falls apart"},
                 {"role":"assistant", "content": "Your little piece of Heaven turns too dark"},
                 {"role":"user", "content": "Listen to your"}]

def general_request(listOfItems, userInput):
    key = get_api_key()
    client = OpenAI(
        api_key=key
    )

    inputPrompt = f"Here is the aforementioned list of items in the form of an array: {listOfItems}. " \
                  f"Only use this list and no other mentioned lists. Each line must be at most" \
                  f"110 characters long. Otherwise, continue on a newline with \\n" + userInput

    completion = client.chat.completions.create(
      model="gpt-4o-mini",
      store=True,
      messages=[
        {"role": "system", "content": instructions},
        {"role": "user", "content": inputPrompt}
      ],
        temperature=0.6
    )
    result = completion.choices[0].message.content
    new_message = {"role": "assistant", "content": result}
    messages_list.append(new_message)
    return completion.choices[0].message.content

# TO DO: Implement this as a preset
def cooking_request (listOfItems, excludedIngredients, numOfAdditionalIngredients, userInput):
    key = get_api_key()
    client = OpenAI(
        api_key=key
    )
    instructions = f"You will be provided with a list of ingredients. Ignored the IDs of each item. Consider each " \
                   f"ingredient carefully and how they may relate to completing the user-given prompt. " \
                   f"The order of items in the list may or may not matter based on the user prompt. " \
                   f"The user prompt will most likely involve you suggesting potential recipes. If you do" \
                   f"end up returning a recipe. You must specify that the recipe may be inaccurate and is " \
                   f"typically only partially correct. You must then strongly encourage the user to lookup" \
                   f"the recipe themselves. You must perform these two actions before each recipe"

    inputPrompt = f"Here is the aforementioned list of ingredients in the form of an array: {listOfItems}. " \
                  f"Only use this list and no other mentioned lists. " + userInput + \
                  f" You may include up to {numOfAdditionalIngredients} ingredients not in the given list. " \
                  f"You MUST exclude the following ingredients in any recipes: {excludedIngredients} as I" \
                  f"am deathly allergic to them."

    completion = client.chat.completions.create(
        model="gpt-4o-mini",
        store=True,
        messages=[
            {"role": "system", "content": instructions},
            {"role": "user", "content": inputPrompt}
        ],
        temperature=0.55
    )
    return completion.choices[0].message.content

# Tests
# print(cooking_request(['Apples', 'Bananas', 'Coconut', 'Eggs', 'Flour', 'Butter', 'Milk', 'Raspberries', 'Oranges', 'Tangerines'],
#                       ["Pineapple"], 4, "Suggest recipes for dinner"))
# print(general_request([1,2,4,5,7,8,10], "The list is a pattern of numbers. What number comes next if the pattern continues?"))
