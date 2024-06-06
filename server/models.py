from langchain_openai import ChatOpenAI
import openai
import json
import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv
client = OpenAI(os.getenv("OPEN_AI_KEY"))

#Function that takes Character sheet information and used it
def get_character_info():
    print()

#instead of doing it the iterated array it fetches info from the previous function
for character in character_data["characters"]:
    message = f"Describe the background of a {character['Race']} {character['Class']} named {character['Name']}. This character's weapons are the {', '.join(character['Weapons'])}. They hail from a {character['Background']} background. Use 150 words."

    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a Dungeons & Dragons expert"},
            {"role": "user", "content": message}
        ]
    )

    character_story = response.choices[0].message.content.strip()
    #add to the characters json data in database