from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import desc

class Database:
    def __init__(self,app):
        self.db=SQLAlchemy(app)

        class User(self.db.Model):
            id = self.db.Column(self.db.Integer, primary_key=True)
            username = self.db.Column(self.db.String(80), unique=True, nullable=False)
            password = self.db.Column(self.db.String(50), unique=False, nullable=False)
            def __repr__(self):
                return '<User username='+self.username+ ' id='+str(self.id)+ ' >' 
        self.User_Table=User
        
        class Recipe(self.db.Model):
            id = self.db.Column(self.db.Integer, primary_key=True)
            name=self.db.Column(self.db.String(),nullable=False)
            creator_id=self.db.Column(self.db.Integer,self.db.ForeignKey('user.id'),nullable=False)
            description=self.db.Column(self.db.String(),nullable=False)
            ingredients=self.db.Column(self.db.String(),nullable=False)
            def __repr__(self):
                return '<Recipe id='+str(self.id)+ ' name=' + self.name+ ' id='+str(self.id)+' >'
        self.Recipe_Table=Recipe
        class Comments(self.db.Model):
            comment_id=self.db.Column(self.db.Integer,primary_key=True)
            creator_id=self.db.Column(self.db.Integer,self.db.ForeignKey('user.id'),nullable=False)
            recipe_id=self.db.Column(self.db.Integer,self.db.ForeignKey('recipe.id'),nullable=False)
            comment=self.db.Column(self.db.String())
            def __repr__(self):
                return '<Comment '+'id='+str(self.comment_id)+' creator='+str(self.creator_id)+ ' recipe=' + str(self.recipe_id)+' >'
        self.Comment_Table=Comments
        self.db.create_all()
    def insertUser(self,username:str,password:str):
        entry=self.User_Table(username=username,password=password)
        self.db.session.add(entry)
        self.db.session.commit()
        print('User ',entry ," was added to database")
        
    def insertRecipe(self, name:str, creator_id:int,description:str,ingredients:str):
        entry=self.Recipe_Table(name=name,creator_id=creator_id,description=description,ingredients=ingredients)
        self.db.session.add(entry)
        self.db.session.commit()
        print('Recipe ',entry ," was added to database")
    def insertComment(self,creator_id,recipe_id,comment):
        ##
        entry=self.Comment_Table(creator_id=creator_id,recipe_id=recipe_id,comment=comment)
        self.db.session.add(entry)
        self.db.session.commit()
        print('Comment ',entry ," was added to database")
    def getUsers(self):
        que= self.User_Table.query.all()
        print(que)
    def getRecipes(self):
        que= self.Recipe_Table.query.all()
        print(que)
    def getComments(self):
        que= self.Comment_Table.query.all()
        print(que)
