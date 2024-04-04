from flask import Flask


app = Flask(__name__)

#Characters api route example
@app.route("/characters")
def characters():
    return {"characters": ["character1","character2","character3"] }

if __name__=="__main__":
    app.run(debug=True)
