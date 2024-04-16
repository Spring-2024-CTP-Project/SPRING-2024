from flask import Flask, jsonify
from flask_cors import CORS
from langchain_openai import ChatOpenAI
import openai
import json
from openai import OpenAI

client = OpenAI()

app = Flask(__name__)
cors = CORS(app, origins='*')

#Characters api route example
@app.route("/api/characters", methods=['GET'])
def characters():
    return jsonify( 
        {
        "characters": [
    {
      "Name": "Dinorah",
      "Race": "Human",
      "Class": "Wizard",
      "Weapons": ["Staff", "Spellbook"],
      "Background": "Scholar"
    },

    {
      "Name": "Evan",
      "Race": "Elf",
      "Class": "Ranger",
      "Weapons": ["Longbow", "Dagger"],
      "Background": "Outlander"
    },
    
    {
      "Name": "Anthony",
      "Race": "Lizard",
      "Class": "Fighter",
      "Weapons": ["Battleaxe", "Shield"],
      "Background": "Soldier"
    }

  ] }
    )

character_stories = []

# Generate fantasy background stories for each character
for character in characters["characters"]:
    message = f"Describe the background of a {character['Race']} {character['Class']} named {character['Name']}. This character's weapons are the {', '.join(character['Weapons'])}. They hail from a {character['Background']} background. Use 150 words."

    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a Dungeons & Dragons expert"},
            {"role": "user", "content": message}
        ]
    )

    character_story = response.choices[0].message.content.strip()
    character_stories.append(character_story)


if __name__=="__main__":
    app.run(debug=True, port=8080)
