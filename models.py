from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import desc, exc


class Database:
    def __init__(self,app):
        self.db=SQLAlchemy(app)

        class User(self.db.Model):
            id = self.db.Column(self.db.Integer, primary_key=True)
            username = self.db.Column(self.db.String(80), unique=True, nullable=False)
            password = self.db.Column(self.db.String(50), unique=False, nullable=False)
            name=self.db.Column(self.db.String(),unique=False,nullable=False)
            def __repr__(self):
                return '<User username='+self.username+ ' id='+str(self.id)+' name='+self.name+' >' 
        self.User_Table=User
        class Recipe(self.db.Model):
            id = self.db.Column(self.db.Integer, primary_key=True)
            name=self.db.Column(self.db.String(),nullable=False)
            creator_id=self.db.Column(self.db.Integer,self.db.ForeignKey('user.id'),nullable=False)
            cuisine=self.db.Column(self.db.String(),nullable=False)
            description=self.db.Column(self.db.String(),nullable=True)
            ingredients=self.db.Column(self.db.String(),nullable=False)
            def __repr__(self):
                return '<Recipe id='+str(self.id)+ ' name=' + self.name+' >'
        self.Recipe_Table=Recipe
        class Comments(self.db.Model):
            id=self.db.Column(self.db.Integer,primary_key=True)
            creator_id=self.db.Column(self.db.Integer,self.db.ForeignKey('user.id'),nullable=False)
            recipe_id=self.db.Column(self.db.Integer,self.db.ForeignKey('recipe.id'),nullable=False)
            comment=self.db.Column(self.db.String())
            def __repr__(self):
                return '<Comment '+'id='+str(self.id)+' creator='+str(self.creator_id)+ ' recipe_id=' + str(self.recipe_id)+ ' >'
        self.Comment_Table=Comments
        self.db.create_all()
        
    #inserts user and returns a user id
    def insertUser(self,username:str,password:str,name:str):
        entry=self.User_Table(username=username,password=password,name=name)
        self.db.session.add(entry)
        try:
            self.db.session.commit()
        except exc.SQLAlchemyError:
            return(
                {
                    "code":0,
                    "message":"User already exist"
                }
            )
        
        print('User ',entry ," was added to database")
        user=self.User_Table.query.filter_by(username=username).first()
        return(
            {
                "code":1,
                "User_Id":user.id
            }
        )
    def User_Exist(self,username:str,password:str):
        exist=self.User_Table.query.filter_by(username=username,password=password).first()
        if exist==None:
            return(
                {
                    "code":0,
                    "message": "Username or Password is wrong"
                }
            )
        
        print(exist)
        return(
            {
                "code":1,
                "id":exist.id
            }
        )
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
    def deleteUser(self,user_id):
        self.User_Table.query.filter_by(id=user_id).delete()
        self.db.session.commit()
    def deleteRecipe(self,recipe_id):
        self.Recipe_Table.query.filter_by(id=recipe_id).delete()
        self.db.session.commit()
    def deleteComment(self,comment_id):
        self.Comment_Table.query.filter_by(id=comment_id).delete()
        self.db.session.commit()
    def changeUser(self,user_id,newUsername,newName):
        entry=self.User_Table.query.filter_by(id=user_id).first()
        if entry.username!=newUsername:
            entry.username=newUsername 
        if entry.name!=newName:
            entry.name=newName
        self.db.session.commit()
    def changeComment(self,comment_id,newComment):
        entry=self.Comment_Table.query.filter_by(id=comment_id).first()
        if entry.comment!=newComment:
            entry.comment=newComment 
        self.db.session.commit()
    def changeRecipe(self,recipe_id,newName,newDescription,newIngredients):
        entry=self.Recipe_Table.query.filter_by(id=recipe_id).first()
        if entry.name!=newName:
            entry.name=newName
        if entry.description!=newDescription:
            entry.description=newDescription
        if entry.ingredients!=newIngredients:
            entry.ingredients=newIngredients
        self.db.session.commit()
