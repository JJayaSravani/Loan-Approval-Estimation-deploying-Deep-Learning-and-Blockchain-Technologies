import os
from flask import Flask
from flask_restful import Resource, Api

from flask_cors import CORS, cross_origin


app = None
api=None


def create_app():
    app = Flask(__name__, template_folder="templates")
    app.secret_key = 'Secret Key'
    if os.getenv('ENV', "development") == "production":
      raise Exception("Currently no production config is setup.")
    else:
      print("Staring Local Development")
    

    # user_datastore = SQLAlchemySessionUserDatastore(db.session, User,Role)
    
    # security = Security(app, user_datastore)
    # api = Api(app)
    # app.app_context().push()
    
    # CORS(app,allow_headers=["Content-Type"],origins=["http://localhost:8080"], supports_credentials=True,resources={r"/api/*": {"origins": "http://localhost:8080"},r"/login*": {"origins": "http://localhost:8080"}})
    # app.config['CORS_HEADERS'] = 'application/json'
    CORS(app, supports_credentials=True)
    CORS(app, resources={r"/api/*": {"origins": "*", "methods": "GET,POST,PUT,DELETE"}})
    app.config['CORS_HEADERS'] = 'application/json'
    app.app_context().push()
    
    app.app_context().push()
    return app, api

app, api= create_app()

from application.model import *

if __name__ == '__main__':
  # Run the Flask app
  app.run(host='0.0.0.0')
