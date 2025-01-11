from flask import Flask, jsonify, request
from flask_cors import CORS
from items_db import *
from ai_generation import *
from api_key_database import *

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/store_item', methods=['POST'])
def api_store_item():
    data = request.json
    list_name = data.get('listName')
    item_name = data.get('itemName')
    if list_name and item_name:
        store_item_to_database(list_name, item_name)
        return jsonify({"message": "Item stored successfully."}), 201
    return jsonify({"error": "Invalid input."}), 400

@app.route('/get_all_list_items/<list_name>', methods=['GET'])
def api_get_all_list_items(list_name):
    items = get_all_list_items(list_name)
    return jsonify(items), 200

@app.route('/get_all_lists', methods=['GET'])
def api_get_all_lists():
    lists = get_all_lists()
    return jsonify(lists), 200

@app.route('/delete_item', methods=['DELETE'])
def api_delete_item():
    data = request.json
    list_name = data.get('listName')
    item_name = data.get('itemName')
    if list_name and item_name:
        delete_from_database(list_name, item_name)
        return jsonify({"message": "Item deleted successfully."}), 200
    return jsonify({"error": "Invalid input."}), 400

@app.route('/delete_list', methods=['DELETE'])
def api_delete_list():
    data = request.json
    list_name = data.get('listName')
    if list_name:
        delete_list_from_database(list_name)
        return jsonify({"message": "List deleted successfully."}), 200
    return jsonify({"error": "Invalid input."}), 400

@app.route('/change_key', methods=['POST'])
def api_change_key():
    data = request.json
    key = data.get('key')
    if key:
        store_api_key(key)
        return jsonify({"message": "API key stored successfully."}), 201
    return jsonify({"error": "Invalid input."}), 400

@app.route('/general_ai_request', methods=['POST'])
def api_general_ai_request():
    data = request.json
    listOfItems = data.get('listOfItems')
    userInput = data.get('userInput')
    if listOfItems and userInput:
        return jsonify({"general_ai_response": general_request(listOfItems,userInput)}), 200
    return jsonify({"error": "Invalid input."}), 400

if __name__ == '__main__':
    # Ensure the databases are created when the server starts
    create_items_database()
    create_api_key_database()
    app.run(debug=True)
