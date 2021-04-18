import os
from flask import Flask, send_from_directory, json
from dotenv import load_dotenv, find_dotenv
from flask_socketio import SocketIO
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import desc
from flask import Flask, send_from_directory
from models import Database
from dotenv import load_dotenv, find_dotenv

app = Flask(__name__, static_folder='./build/static')

#<<<<<<<<< saved version

#=========
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0
app.config['TEMPLATES_AUTO_RELOAD'] = True
app.config['SQLALCHEMY_DATABASE_URI']=os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICSTIONS']= False

db=Database(app)


db.insertUser(username="test3",password="password",name="test1")
db.deleteUser(user_id=1)
db.changeUser(user_id=2,newUsername="newUsername",newName="newName")
db.getUsers()

#db.insertRecipe(name='test2',creator_id=3,description='test',ingredients='test') 
#db.deleteRecipe(recipe_id=1)
#db.changeRecipe(recipe_id=2,newName="testt",newDescription='testt',newIngredients='testt')
#db.getRecipes()
 
#db.insertComment(creator_id=2,comment="comment",recipe_id=2)  
#db.deleteComment(comment_id=2)
#db.changeComment(comment_id=3,newComment='commentt')
#db.getComments()

@app.route('/', defaults={"filename": "index.html"})
@app.route('/<path:filename>')
def index(filename):
    return send_from_directory('./build', filename)


app.run(
    host=os.getenv('IP', '0.0.0.0'),
db=Database(app)


#db.insertUser(username="test3",password="password",name="test1")
#db.deleteUser(user_id=1)
#db.changeUser(user_id=2,newUsername="newUsername",newName="newName")
#db.getUsers()

#db.insertRecipe(name='test2',creator_id=3,description='test',ingredients='test') 
#db.deleteRecipe(recipe_id=1)
#db.changeRecipe(recipe_id=2,newName="testt",newDescription='testt',newIngredients='testt')
#db.getRecipes()
 
#db.insertComment(creator_id=2,comment="comment",recipe_id=2)  
#db.deleteComment(comment_id=2)
#db.changeComment(comment_id=3,newComment='commentt')
#db.getComments()
#>>>>>>>>> local version

#@app.route('/', defaults={"filename": "index.html"})
#@app.route('/<path:filename>')

#def index(filename):
#   return send_from_directory('./build', filename)

#app.run(
#    host=os.getenv('IP', '0.0.0.0'),
#<<<<<<<<< saved version

#=========

#>>>>>>>>> local version
)
