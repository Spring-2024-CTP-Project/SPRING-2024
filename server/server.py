from flask import Flask, render_template, jsonify
from pymongo import MongoClient
from flask_pymongo import PyMongo
from pymongo.server_api import ServerApi
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
app.config["MONGO_URI"] = os.getenv("DB_URI")
uri = os.getenv("DB_URI")
client = MongoClient(uri, server_api=ServerApi('1'))
# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)
mongo = PyMongo(app)


db_operations = client.db.player_info
@app.route("/")
def home_page():
    users = db_operations.find()
    output = [{'Name' : user['Name'], 'Race' : user['Race'], 'Class' : user['Class'], 'Weapons' : user['Weapons'], 'Background' : user['Background']} for user in users]
    #print(output)
    return jsonify(output)

@app.route('/mongo', methods=['GET'])
def insert_all_docs():
  client.db.player_info.insert_one({
      "Name": "Anthony",
      "Race": "Human",
      "Class": "Wizard",
      "Weapons": ["Staff", "Spellbook"],
      "Background": "Scholar"
    })
  return "Inserted"


if __name__=="__main__":
    app.run(debug=True)
