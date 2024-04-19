from flask import Flask, request, jsonify
from flask_restful import Resource, Api
from sklearn.preprocessing import MinMaxScaler
import pickle
import pandas as pd
import numpy as np
from flask import current_app as app

api = Api(app)

class DLModel(Resource):
    def post(self):
        try:
           
            with open('model1.pkl', 'rb') as file:
                loaded_model, training_data = pickle.load(file)

            # Extract input features
            input_data = request.get_json()
            #print(input_data)
            input_features = training_data.columns.tolist()
            input_values = [input_data.get(feature, None) for feature in input_features]
            input_array = np.array(input_values).reshape(1, -1)
            
        
            # Scale input data
            scaler = MinMaxScaler()
            scaler.fit(training_data)
            scaled_data = scaler.transform(input_array)
           

            # Predict using the loaded model
            predict = loaded_model.predict(scaled_data)
            #print(predict)
            output = "YES" if predict[0][0] > 0.5 else "NO"
            print(output)
           
            return {"prediction": output}

        except Exception as e:
            return {"error": str(e)}

api.add_resource(DLModel, "/api/dlmodel")



