"""
This is the main backend of our app.
"""
# pylint: disable=E1101, C0413, C0103, W1508, R0903, W0603, E0602, W0404, C0301, W0105, W0612, C0411, C0412
import os
import hashlib
from flask import Flask, send_from_directory, json, request
from dotenv import load_dotenv, find_dotenv
#from flask_socketio import SocketIO
#from flask_cors import CORS
#from flask_sqlalchemy import SQLAlchemy
#from sqlalchemy import desc
from flask import Flask, send_from_directory
from models import Database
from dotenv import load_dotenv, find_dotenv

app = Flask(__name__, static_folder='./build/static')
load_dotenv(find_dotenv())

app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0
app.config['TEMPLATES_AUTO_RELOAD'] = True
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICSTIONS'] = False

#used to salt hashed passwords
salt = 'cs490project3'

db = Database(app)
'''
register endpoint
takes json
{
    'username':'test',
    'password':'test',
    'name':'name'
}
'''


@app.route('/register', methods=['POST'])
def register():
    """This send register info from client to db"""
    data = json.loads(request.data.decode())
    print(data)
    return registerUser(username=data['username'],
                        password=data['password'],
                        name=data['name'])


def registerUser(username, password, name):
    """This will hash the password from a users register"""
    hashedpassword = hashlib.md5((password + salt).encode()).hexdigest()
    return db.insertUser(username=username, password=hashedpassword, name=name)


"""
login endpoint 
takes json
{
    'username':'test',
    'password':'test'
}
"""


@app.route('/login', methods=["GET", "POST"])
def login():
    """This takes login info from client to check with the db"""
    data = json.loads(request.data.decode())
    return loginUser(username=data['username'], password=data['password'])


def loginUser(username, password):
    """This will check the hashed password from the login info"""
    hashedpassword = hashlib.md5((password + salt).encode()).hexdigest()
    return db.User_Exist(username=username, password=hashedpassword)


"""
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
"""


@app.route("/AddRecipe", methods=["POST"])
def addRecipe():
    """This lets a user add a recipe"""
    data = json.loads(request.data.decode())
    return db.insertRecipe(name=data['name'],
                           creator_id=data['id'],
                           description=data['description'],
                           ingredients=json.dumps(data['Ingredients']),
                           cuisine=data['cuisine'],
                           img=data['image'],
                           instructions=json.dumps(data['Instructions']))


@app.route("/GetUserName", methods=["GET"])
def getUserName():
    """This gets username and ID"""
    users = db.getUsers()
    print(users)
    return users


@app.route('/GetRecipes', methods=["GET"])
def getRecipes():
    """This gets the recipies"""
    ret = db.getRecipes()
    return ret

@app.route('/SearchRecipes',methods=["GET"])
def searchRecipes():
    """This gets the recipies"""
    print("Searching...")
    search = request.args.get('search')
    ret = db.searchRecipes(search)
    print("ret")
    print(ret)
    return ret
    


@app.route('/GetRecipesbyCuisine', methods=["GET"])
def getCuisineRecipes():
    """gets recipes by cuisine"""
    cuisine = request.args.get('cuisine')
    #data = json.loads(request.data.decode())
    return getRecipesbyCuisine(data['cuisine'], data['recipe_limit'])


"""
    endpoint for getting recipies for id for recipe page
    takes json
    {
        
       params: {
            id: id
        }
    }
    id being recipe id
"""


@app.route('/getRecipebyId', methods=["GET"])
def getRecipeByID():
    """This will get the recipe with its id in the table"""
    Recipe_ID = request.args.get('id')
    return db.getRecipesById(Recipe_ID)


def getRecipesbyCuisine(cuisine: str, recipe_limit: int):
    """This gets the recipies based on the cuisine they picked"""
    returnval = db.getRecipesbyCuisine(cuisine, recipe_limit)
    print(returnval)
    return returnval


@app.route('/addComment', methods=["POST"])
def addcomment():
    """ Insert new comments into the database"""
    data = json.loads(request.data.decode())
    db.insertComment(creator_id=data['id'],
                     comment=data['comment'],
                     recipe_id=data["recipe_id"])
    return {"code": 0}


@app.route('/deleteComment', methods=["POST"])
def removeComment():
    """ Deletes comments from the database """
    data = json.loads(request.data.decode())
    print(data)
    db.deleteComment(comment_id=data['comment'])
    return {"code": 0}

# New added feature
@app.route('/addFavorite', methods=["POST"])
def addFavorite():
    """ Inserts favorited recipe into the database"""
    data = json.loads(request.data.decode())
    db.insertFavorite(creator_id=data['id'],
                     recipe_id=data["recipe_id"])
    return {"code": 0}
@app.route('/deleteFavorite', methods=["POST"])
def removeFavorite():
    """ Deletes favorited recipe from the database """
    data = json.loads(request.data.decode())
    print(data)
    db.deleteFavorite(favorite_id=data['recipe_id'])
    return {"code": 0}

db.getFavorite(1)
@app.route('/GetFavorite', methods=["GET"])
def getFavoriteRecipeId():
    """This gets the recipie ids from the favorite table"""
    User_ID = request.args.get('user_id')
    ret = db.getFavorite(User_ID)
    return ret



@app.route('/', defaults={"filename": "index.html"})
@app.route('/<path:filename>')
def index(filename):
    """This is used to test the app with mock data"""
    return send_from_directory('./build', filename)


app.run(host=os.getenv('IP', '0.0.0.0'),
        port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', 8081)),
        debug=True)
