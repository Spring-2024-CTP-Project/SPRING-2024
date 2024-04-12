from flask import Flask, render_template, jsonify
from pymongo import MongoClient
from flask_pymongo import PyMongo

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/playersDB"
mongo = PyMongo(app)

# mongo.insertOne({
#       "Name": "Dinorah",
#       "Race": "Human",
#       "Class": "Wizard",
#       "Weapons": ["Staff", "Spellbook"],
#       "Background": "Scholar"
#     })
db_operations = mongo.db.player
@app.route("/")
def home_page():
    users = db_operations.find()
    output = [{'Name' : user['Name'], 'Race' : user['Race'], 'Class' : user['Class'], 'Weapons' : user['Weapons'], 'Background' : user['Background']} for user in users]
    #print(output)
    return jsonify(output)

@app.route('/mongo', methods=['GET'])
def insert_all_docs():
  db_operations.insert_one({
      "Name": "Anthony",
      "Race": "Human",
      "Class": "Wizard",
      "Weapons": ["Staff", "Spellbook"],
      "Background": "Scholar"
    })
  return "Inserted"
#Characters api route example
# @app.route("/characters")
# def characters():
#     return {"characters": ["character1","character2","character3"] }

if __name__=="__main__":
    app.run(debug=True)
