from langchain.chains import RetrievalQA
from langchain_community.chat_models import ChatOpenAI
from langchain_community.document_loaders import TextLoader
from langchain_community.vectorstores import DocArrayInMemorySearch
from IPython.display import display, Markdown
from langchain.text_splitter import CharacterTextSplitter
from langchain_community.embeddings import OpenAIEmbeddings, HuggingFaceInstructEmbeddings
from langchain.memory import ConversationBufferMemory
from langchain.chains import ConversationalRetrievalChain
from langchain.indexes import VectorstoreIndexCreator
from langchain_experimental.agents.agent_toolkits.csv.base import create_csv_agent
from langchain.agents.agent_types import AgentType
from langchain.memory import ConversationBufferMemory
import tiktoken
from langchain_community.vectorstores import FAISS
from langchain.text_splitter import CharacterTextSplitter
from flask import Flask, render_template, jsonify, request
from pymongo.mongo_client import MongoClient
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
from pymongo.server_api import ServerApi
from flask_cors import CORS
import os
from langchain_openai import ChatOpenAI
import openai
import json
import traceback
import logging
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
logging.basicConfig(level=logging.INFO)

# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)

mongo = PyMongo(app).db

collection = client.db.player_info
collection2= client.db.Campaign

@app.route("/users")
def home_page():
    users = collection.find()
    print(users)
    output = [{ 'Name' : user['name'], 'Race' : user['race'], 'Class' : user['characterClass'], 'Weapons' : user['weapons'], 'Background' : user['background'], 'AttributePoints' : user['points'], 'Allignment': user['allignment'], "Images": user['images'], 'Hitpoints': user['hitpoints']} for user in users]
    return jsonify(output)

@app.route("/campaigns")
def get_campaigns():
    campaigns=collection2.find()
    output=[{'Title' : campaign['title'], 'Description' : campaign['description'], "Characters": campaign['characters'], 'Date': campaign['date']} for campaign in campaigns ]
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

@app.route('/add_campaign', methods=['POST'])
def insert_campaign():
    try:
        campaign_data = request.json
        if not campaign_data or not isinstance(campaign_data, dict):
            return jsonify({"Error": "Invalid Campaign Data"}), 400
        result=collection2.insert_one(campaign_data)

        if result.acknowledged:
            return jsonify({"Message": "Campaign added Successfully"}), 201
        else: 
            return jsonify({"Error": "Failed to add Campaign"}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    


@app.route('/Start_campaign', methods=["POST"])
def Start():
    
    try:
        campaign_data = request.json
        print("Campaign DATA:\n", campaign_data)
      
        character_names = campaign_data["title"]["props"]["characters"]
        temp_data=campaign_data["title"]["props"]["description"]
        campaign_inclusion=temp_data+(campaign_data["log"])
        character_data = list(collection.find({"name": {"$in": character_names}}))

        character_data = {
            "characters": [{k: v for k, v in d.items() if k != "_id"} for d in character_data],
        }

        if not campaign_data:
            return jsonify({"error": "Invalid campaign data"}), 400
       
        story_skeleton = '''{
    "beginning": "In the ancient land of Eldoria, a powerful artifact known as the Blue Gem is said to hold unimaginable magic. Legends speak of its ability to grant great power or bring about immense destruction. The rulers of Eldoria have long sought to possess it, but its location remains a mystery.",
    "middle": [
        "our heros form an unlikely alliance within the prison walls, realizing they share a common goal of freedom and redemption.",
        "With a map smuggled from a fellow prisoner, they embark on a perilous journey through the Wraithwood Forest, rumored to be haunted by vengeful spirits.",
        "Along the way, they encounter mysterious creatures, ancient ruins, and treacherous traps that test their skills and resolve.",
        "As they delve deeper into the forest, they uncover clues leading to the hidden location of the Blue Gem, guarded by powerful enchantments and ancient guardians."
    ],
    "end": [
        "With the Blue Gem in their possession, our heroes face a choice: use its power for their own ambitions or destroy it to prevent it from falling into the wrong hands.",
        "Their decision determines the fate of Eldoria and the legacy they leave behind, shaping the course of history for generations to come."
    ]
}
'''
    # Convert the story_skeleton from a string to a Python dictionary
        story_skeleton_dict = json.loads(story_skeleton)
    # Combine story_skeleton_dict and character_data into a new dictionary
        combined_data = {"story_skeleton": story_skeleton_dict, "character_data": character_data, "inclusions": campaign_inclusion}
        # print(combined_data)
    # Convert the combined_data dictionary to JSON format
        combined_json = json.dumps(combined_data, indent=4)

    # Print the combined JSON data
        # print(combined_json)

    # Load JSON data
        data = json.loads(combined_json)

# Convert JSON data to a formatted string
        formatted_data = json.dumps(data, indent=4)

# Write the formatted data to a text file
        with open('combined_skeleton.txt', 'w') as file:
            file.write(formatted_data)

        print("Story skeleton written to combined_skeleton.txt")

        txt_file_path = 'combined_skeleton.txt'

        loader = TextLoader(file_path=txt_file_path, encoding="utf-8")

        data = loader.load()

        text_splitter = CharacterTextSplitter(chunk_size=100, chunk_overlap=20)
        data = text_splitter.split_documents(data)

        embeddings = OpenAIEmbeddings()


        vectorstore = FAISS.from_documents(data, embedding=embeddings)

        llm = ChatOpenAI(temperature=0.7, model_name="gpt-4")

        memory = ConversationBufferMemory(memory_key='chat_history', return_messages=True)

        conversation_chain = ConversationalRetrievalChain.from_llm(
            llm=llm,
            chain_type="stuff",
            retriever=vectorstore.as_retriever(),
            memory=memory
            )       

        query = "Fill in the story and take into account the characters' data. Also take into account Generate random encounters and pick one of the endings to end the adventure with. Do not answer me with 'sure lets expand the story, just seemlessy write it'"
        result = conversation_chain({"question": query})
        answer = result["answer"]
        answer
        return jsonify(answer)
    
    except Exception as e:
        logging.error('An error occurred: %s', traceback.format_exc())
        return jsonify({"error": str(e)}), 500









#fucntion that sends a prompt to the model and generates text 
@app.route('/generate', methods=['POST'])
def generate():
    generated =[]
    try:
        character_data = request.json
        if not character_data or not isinstance(character_data, dict):
            return jsonify({"error": "Invalid character data"}), 400

        message = f"Describe the background of a {character_data['race']} {character_data['characterClass']} named {character_data['name']}. This character's weapons are the {character_data['weapons']}. Their allignment is {character_data['allignment']}.  Use 150 words."
        
        response = AIclient.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a Dungeons & Dragons expert"},
                {"role": "user", "content": message}
            ]
        )
        generated.append( response.choices[0].message.content.strip())
        prompt = f"Generate a fantasy image of a {character_data['race']} {character_data['characterClass']} named {character_data['name']}. They are equipped with {character_data['weapons']} and have a {character_data['background']} background. Use the characteristics of {character_data['description']} to help you visualize the character. THERE IS NO TEXT ON THE IMAGE EXCEPT, {character_data['name']} at the bottom of the image"
        response = AIclient.images.generate(
             model="dall-e-3",
             prompt=prompt ,
             size="1024x1024",
             quality="hd",
             #n of imgs
             n=1
    )
        generated.append(response.data[0].url)
        return jsonify(generated)
       
    except Exception as e:
        logging.error('An error occurred: %s', traceback.format_exc())
        return jsonify({"error": str(e)}), 500
    






@app.route('/delete_character', methods=['DELETE'])
def delete_docs():
  try:
      character_data = request.json

      # Check if character_data is not None and is a dictionary
      if not character_data or not isinstance(character_data, dict):
          return jsonify({"error": "Invalid character data"}), 400

      # delete  the character data into the MongoDB collection
      
     
      character_id= character_data.get('_id:')
      object_id = ObjectId(character_id)
      print("CHARACTER ID", object_id)
      
      if not object_id:
            return jsonify({"error": "Missing character ID"}), 400
      

      result = collection.delete_one({"_id": object_id})

      if result.deleted_count > 0:
          return jsonify({"message": "Character deleted successfully"}), 201
      else:
          return jsonify({"error": "Failed to delete character"}), 500

  except Exception as e:
      return jsonify({"error": str(e)}), 500


if __name__=="__main__":
 app.run(debug=True, port=8080)


