import sqlite3
def create_items_database():
    # Connect to the SQLite database
    conn = sqlite3.connect('items.db')
    cursor = conn.cursor()

    # Create a table to store items if it doesn't exist
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS items (
            listName TEXT NOT NULL,
            itemName TEXT NOT NULL
        )
    ''')

    # Commit changes and close the connection

    conn.commit()
    conn.close()

def store_item_to_database(list, item):
    if not check_existence_of_item(list, item):
        conn = sqlite3.connect('items.db')
        c = conn.cursor()
        c.execute("INSERT INTO items (listName, itemName) VALUES (?,?)", (list, item,))
        conn.commit()
        conn.close()

def check_existence_of_item(checkList, checkItem):
    conn = sqlite3.connect('items.db')
    c = conn.cursor()

    query = "SELECT EXISTS(SELECT 1 FROM items WHERE (ListName, itemName) = (?,?) LIMIT 1)"
    c.execute(query, (checkList, checkItem))
    exists = c.fetchone()[0]
    conn.close()
    return exists

def check_existence_of_list(checkList):
    conn = sqlite3.connect('items.db')
    c = conn.cursor()
    query = "SELECT EXISTS(SELECT 1 FROM items WHERE ListName = ? LIMIT 1)"
    c.execute(query, (checkList,))
    exists = c.fetchone()[0]
    conn.close()
    return exists

def delete_from_database(listName,itemName):
    if check_existence_of_item(listName,itemName):
        conn = sqlite3.connect('items.db')
        c = conn.cursor()
        c.execute('DELETE FROM items WHERE (listName, itemName) = (?,?)', (listName,itemName))
        conn.commit()
        conn.close()

def delete_list_from_database(listName):
    if check_existence_of_list(listName):
        conn = sqlite3.connect('items.db')
        c = conn.cursor()
        c.execute('DELETE FROM items WHERE listName = ?', (listName,))
        conn.commit()
        conn.close()

def get_all_list_items(listName):
    conn = sqlite3.connect('items.db')
    c = conn.cursor()

    query = 'SELECT itemName FROM items WHERE (listName) = ? ORDER BY itemName ASC'
    c.execute(query, (listName,))
    allItems = c.fetchall()
    conn.close()
    return allItems

def get_all_lists():
    conn = sqlite3.connect('items.db')
    c = conn.cursor()

    # If there are no lists, add a placeholder list
    c.execute(f"SELECT COUNT(*) FROM items")
    row_count = c.fetchone()[0]
    if row_count < 1:
        store_item_to_database("Example List", "Example Item 1")
        store_item_to_database("Example List", "Example Item 2")

    c.execute('SELECT listName FROM items ORDER BY itemName ASC')
    allItems = c.fetchall()
    conn.close()
    # Remove duplicates by converting to a set
    allItems = list(set(allItems))
    return allItems

# create_items_database()
# store_item_to_database("3a", "c")
# store_item_to_database("2a", "aBCDEe")
# store_item_to_database("3a", "bCe")
# a = get_all_list_items("1")
# print(a)
