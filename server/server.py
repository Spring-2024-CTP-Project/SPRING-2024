from flask import Flask, render_template, jsonify
from pymongo.mongo_client import MongoClient
from flask_pymongo import PyMongo
from pymongo.server_api import ServerApi
from flask_cors import CORS
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)
app.config["MONGO_URI"] = os.getenv("DB_URI")
uri = os.getenv("DB_URI")
client = MongoClient(uri, server_api=ServerApi('1'))
# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)

mongo = PyMongo(app).db

db_operations = client.db.player_info
@app.route("/")
def home_page():
    users = db_operations.find()
    output = [{'Name' : user['Name'], 'Race' : user['Race'], 'Class' : user['Class'], 'Weapons' : user['Weapons'], 'Background' : user['Background']} for user in users]
    print(output)
    return jsonify(output)

@app.route('/', methods=['GET'])
#All the necessary information for each character
def insert_all_docs():
  db_operations.insert_one({
      "Name": "Joseph",
      "Race": "Kobol",
      "Class": "Paladin",
      "Weapons": ["Sword", "Mace"],
      "Background": "Scholar",
      "BackgroundStory":[],
      "Images":[],
    })
  
  return "Inserted"


if __name__=="__main__":
    app.run(debug=True, port=8080)


