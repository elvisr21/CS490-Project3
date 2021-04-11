import os
from flask import Flask, send_from_directory, json
from dotenv import load_dotenv, find_dotenv
from flask_socketio import SocketIO
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import desc

app = Flask(__name__, static_folder='./build/static')


@app.route('/', defaults={"filename": "index.html"})
@app.route('/<path:filename>')
def index(filename):
    return send_from_directory('./build', filename)


app.run(
    host=os.getenv('IP', '0.0.0.0'),
    port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', 8081)),
)
