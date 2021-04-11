from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import desc

class Database:
    def __init__(self,app):
        self.db=SQLAlchemy(app)
        class User(self.db.Model):
            id = self.db.Column(self.db.Integer, primary_key=True)
            username = self.db.Column(self.db.String(80), unique=True, nullable=False)
            score = self.db.Column(self.db.Integer, unique=False, nullable=False)
            def __repr__(self):
                return '<Person username='+self.username+'  score=' +str(self.score)+ ' >' 
