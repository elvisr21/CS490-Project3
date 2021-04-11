import os
from flask import Flask, send_from_directory
from models import Database
from dotenv import load_dotenv, find_dotenv

app = Flask(__name__, static_folder='./build/static')
load_dotenv(find_dotenv())

app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0
app.config['TEMPLATES_AUTO_RELOAD'] = True
app.config['SQLALCHEMY_DATABASE_URI']=os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICSTIONS']= False

db=Database(app)
db.insertComment(creator_id=5,recipe_id=2,comment="comment3")
db.getComments()

@app.route('/', defaults={"filename": "index.html"})
@app.route('/<path:filename>')
def index(filename):
    return send_from_directory('./build', filename)


app.run(
    host=os.getenv('IP', '0.0.0.0'),
    port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', 8081)),
)
