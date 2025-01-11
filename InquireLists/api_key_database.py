import sqlite3

def create_api_key_database():
    # Connect to the SQLite database
    conn = sqlite3.connect('key.db')
    cursor = conn.cursor()

    # Create a table to store the key if it doesn't exist
    cursor.execute('''
          CREATE TABLE IF NOT EXISTS key (
              apiKey TEXT
          )
      ''')

    # Commit changes and close the connection

    conn.commit()
    conn.close()

def store_api_key(key):
    conn = sqlite3.connect('key.db')
    c = conn.cursor()

    c.execute(f"SELECT COUNT(*) FROM key")
    row_count = c.fetchone()[0]

    if row_count == 0: # There is no key stored
        c.execute("INSERT INTO key (apiKey) VALUES (?)", (key,))
        conn.commit()
        conn.close()
    else:
        c.execute("DELETE FROM key")
        c.execute("INSERT INTO key (apiKey) VALUES (?)", (key,))
        conn.commit()
        conn.close()

def get_api_key():
    conn = sqlite3.connect('key.db')
    c = conn.cursor()
    c.execute("SELECT apikey FROM key")
    key = c.fetchone()[0]
    conn.close()

    return key

