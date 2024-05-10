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

mongo = PyMongo(app).db

collection = client.db.player_info
@app.route("/")
def home_page():
    users = collection.find()
    output = [{'Name' : user['name'], 'Race' : user['race'], 'Class' : user['characterClass'], 'Weapons' : user['weapons'], 'Background' : user['background'], 'Attribute Points' : user['points'], 'Allignment': user['allignment']} for user in users]
    print(output)
    return jsonify(output)



@app.route('/process_character', methods=['POST'])
#All the necessary information for each character
def insert_all_docs():
   try:
        character_data = request.json
        if not character_data or not isinstance(character_data, dict):
            return jsonify({"error": "Invalid character data"}), 400
        result = collection.insert_one(character_data)

        if result.acknowledged:
            return jsonify({"message": "Character added successfully"}), 201
        else:
            return jsonify({"error": "Failed to add character"}), 500
  
   except Exception as e:
        return jsonify({"error": str(e)}), 500
    

#fucntion that sends a prompt to the model and generates text 
@app.route('/generate', methods=['POST'])
def generate():
    character_data = request.json
    if not character_data or not isinstance(character_data, dict):
        return jsonify({"error": "Invalid character data"}), 400

    message = f"Describe the background of a {character_data['race']} {character_data['characterClass']} named {character_data['name']}. This character's weapons are the {', '.join(character_data['weapons'])}. They are {character_data['alignment']} background. Use 150 words."
    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a Dungeons & Dragons expert"},
                {"role": "user", "content": message}
            ]
        )
        generated_text = response.choices[0].message.content.strip()
    except Exception as e:
        return jsonify({"error": str(e)}), 500







if __name__=="__main__":
    app.run(debug=True, port=8080)


