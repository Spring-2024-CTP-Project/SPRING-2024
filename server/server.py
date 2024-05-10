from flask import Flask, render_template, jsonify, request
from pymongo.mongo_client import MongoClient
from flask_pymongo import PyMongo
from pymongo.server_api import ServerApi
from flask_cors import CORS
import os
from langchain_openai import ChatOpenAI
import openai
import json
import os
from openai import OpenAI
from dotenv import load_dotenv
from flask_cors import CORS


load_dotenv()

app = Flask(__name__)
CORS(app)
app.config["MONGO_URI"] = os.getenv("DB_URI")
uri = os.getenv("DB_URI")
ai = os.getenv("OPENAI_API_KEY")
AIclient=OpenAI(api_key=ai)
client = MongoClient(uri, server_api=ServerApi('1'))
# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)

db = client.db
collection = db.player_info 
db_operations = client.db.player_info
@app.route("/")
def home_page():
    users = collection.find()
    output = [{'Name' : user['name'], 'Race' : user['race'], 'Class' : user['characterClass'], 'Weapons' : user['weapons'], 'Background' : user['background'], 'Attribute Points' : user['points'], 'Allignment': user['allignment']} for user in users]
    print(output)
    return jsonify(output)

@app.route('/process_character', methods=['POST'])
def insert_all_docs():
  try:
      character_data = request.json

      # Check if character_data is not None and is a dictionary
      if not character_data or not isinstance(character_data, dict):
          return jsonify({"error": "Invalid character data"}), 400

      # Insert the character data into the MongoDB collection
      result = collection.insert_one(character_data)

      if result.acknowledged:
          return jsonify({"message": "Character added successfully"}), 201
      else:
          return jsonify({"error": "Failed to add character"}), 500

  except Exception as e:
      return jsonify({"error": str(e)}), 500




if __name__=="__main__":
    app.run(debug=True, port=8080)


