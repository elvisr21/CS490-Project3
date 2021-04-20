import os
from flask import Flask, send_from_directory, json, request
from dotenv import load_dotenv, find_dotenv
from flask_socketio import SocketIO
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import desc
from flask import Flask, send_from_directory
from models import Database
from dotenv import load_dotenv, find_dotenv
import hashlib


app = Flask(__name__, static_folder='./build/static')
load_dotenv(find_dotenv())


app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0
app.config['TEMPLATES_AUTO_RELOAD'] = True
app.config['SQLALCHEMY_DATABASE_URI']=os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICSTIONS']= False

#used to salt hashed passwords
salt='cs490project3'

db=Database(app)

'''
register endpoint
takes json 
{
    'username':'test',
    'password':'test',
    'name':'name'
}
'''
@app.route('/register',methods=['POST'])
def register():
    data = json.loads(request.data.decode())
    print(data)
    return registerUser(username=data['username'],password=data['password'],name=data['name'])
    
    
def registerUser(username,password,name):
    hashedpassword=hashlib.md5((password+salt).encode()).hexdigest()
    return db.insertUser(username=username,password=hashedpassword,name=name)
    

'''
login endpoint 
takes json
{
    'username':'test',
    'password':'test'
}
'''
@app.route('/login',methods=["GET","POST"])
def login():
    data = json.loads(request.data.decode())
    return loginUser(username=data['username'],password=data['password'])
    
    
def loginUser(username,password):
    hashedpassword=hashlib.md5((password+salt).encode()).hexdigest()
    return db.User_Exist(username=username,password=hashedpassword)

    

'''
    endpoint to add new recipes
    takes json
    {
        'name':'test',
        'creator_id':'test',
        'description':'test',
        'Ingredients':[],
        'cuisine':'test',
        'img':'test',
        'instructions':[]
        
    }
'''

# db.insertUser(username="test3",password="password",name="test1")
# db.deleteUser(user_id=1)
# db.changeUser(user_id=2,newUsername="newUsername",newName="newName")
# db.getUsers()

# db.insertRecipe(name='test2',creator_id=3,description='test',ingredients='test') 
# db.deleteRecipe(recipe_id=1)
# db.changeRecipe(recipe_id=2,newName="testt",newDescription='testt',newIngredients='testt')
# db.getRecipes()
 
# db.insertComment(creator_id=2,comment="comment",recipe_id=2)  
# db.deleteComment(comment_id=2)
# db.changeComment(comment_id=3,newComment='commentt')
# db.getComments()

# db.insertUser(username="test3",password="password",name="test1")
# db.deleteUser(user_id=1)
# db.changeUser(user_id=2,newUsername="newUsername",newName="newName")
# db.getUsers()

# db.insertRecipe(name='test2',creator_id=3,description='test',ingredients='test') 
# db.deleteRecipe(recipe_id=1)
# db.changeRecipe(recipe_id=2,newName="testt",newDescription='testt',newIngredients='testt')
# db.getRecipes()
 
# db.insertComment(creator_id=2,comment="comment",recipe_id=2)  
# db.deleteComment(comment_id=2)
# db.changeComment(comment_id=3,newComment='commentt')
# db.getComments()

@app.route("/AddRecipe",methods=["POST"])
def addRecipe():
    data=json.loads(request.data.decode())
    return db.insertRecipe(name=data['name'],creator_id=data['id'],description=data['description'],ingredients=json.dumps(data['Ingredients']),cuisine=data['cuisine'],img=data['image'],instructions=json.dumps(data['Instructions']))

'''
    endpoint for getting recipies for id for recipe page
    takes json
    {
        
       params: {
            id: id
        }

    }
    id being recipe id
'''
@app.route('/getRecipebyId',methods=["GET"])
def getRecipeByID():
    Recipe_ID=request.args.get('id')
    return db.getRecipesById(Recipe_ID)




@app.route('/GetRecipesbyCuisine',methods=["GET"])
def getRecipes():
    cuisine=request.args.get('cuisine')
    #data = json.loads(request.data.decode())
    return getRecipesbyCuisine(data['cuisine'],data['recipe_limit'])
    
    
def getRecipesbyCuisine(cuisine:str,recipe_limit:int):
    returnval= db.getRecipesbyCuisine(cuisine,recipe_limit)
    print(returnval)
    return returnval

#id 1
#print(registerUser("taco","taco","taco")) 
#print(loginUser("taco4","taco"))
#print(getRecipesbyCuisine("chinese",0))
#db.getRecipes()
#db.insertUser(username="test3",password="password",name="test1")
#db.deleteUser(user_id=1)
#db.changeUser(user_id=2,newUsername="newUsername",newName="newName")
#db.getUsers()


#db.insertRecipe(name='test2',creator_id=1,description='test',ingredients='test',cuisine="chinese", img='test', instructions="test#") 
#db.deleteRecipe(recipe_id=1)
#db.changeRecipe(recipe_id=2,newName="testt",newDescription='testt',newIngredients='testt')
#db.getRecipes()


#db.insertComment(creator_id=1,comment="comment",recipe_id=6)         
#db.deleteComment(comment_id=2)
#db.changeComment(comment_id=3,newComment='commentt')
#db.getComments()
@app.route('/', defaults={"filename": "index.html"})
@app.route('/<path:filename>')
def index(filename):
    return send_from_directory('./build', filename)
app.run(
    host=os.getenv('IP', '0.0.0.0'),
    port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', 8081)), debug=True
)