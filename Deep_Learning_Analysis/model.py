#importing 
from flask import Flask, request, jsonify
from flask_restful import Resource
from flask_restful import Api
from flask_restful import fields

import numpy as np # linear algebra
import pandas as pd # data processing, CSV file I/O (e.g. pd.read_csv)
import matplotlib.pyplot as plt

from sklearn.preprocessing import LabelEncoder, StandardScaler, MinMaxScaler
from collections import Counter
from sklearn.model_selection import train_test_split #classification, regression and clustering,data analysis
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
from sklearn.metrics import precision_score,recall_score, f1_score
from imblearn.over_sampling import SMOTE
from sklearn.feature_selection import mutual_info_regression
from sklearn.preprocessing import OneHotEncoder
from sklearn.model_selection import train_test_split
import sklearn.metrics as sm
from xgboost import XGBClassifier
from sklearn.linear_model import RidgeClassifier
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.model_selection import cross_val_score
from sklearn.compose import ColumnTransformer
from sklearn.model_selection import GridSearchCV
from sklearn.metrics import accuracy_score
from sklearn.metrics import mean_squared_error

from sklearn import model_selection,linear_model, metrics
from sklearn.model_selection import GridSearchCV, KFold, RandomizedSearchCV, train_test_split


from tensorflow.keras.callbacks import ModelCheckpoint
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Activation, Flatten
 

import warnings
from tensorflow.keras.callbacks import History 
warnings.filterwarnings('ignore')
warnings.filterwarnings('ignore', category=DeprecationWarning)
from tensorflow.keras.callbacks import History 


app = Flask(__name__)
api = Api(app)
class DLModel(Resource):
    def get(self):
        df = pd.read_csv("credit_risk_dataset.csv", skipinitialspace = True)
        cols = ['person_home_ownership','cb_person_default_on_file']
        df = df.drop(cols, axis=1)


        #covert to int
        selected_features = ['person_age', 'person_emp_length']

        for colname in selected_features:
            if df[colname].dtype == 'object':
                df[colname], _ = df[colname].factorize()

        discrete_features = df.dtypes == int

        #filling NA 
        mean_person_emp_length = df['person_emp_length'].mean()
        mean_loan_int_rate = df['loan_int_rate'].mean()

        df['person_emp_length'] = df['person_emp_length'].fillna(mean_person_emp_length) 
        df['loan_int_rate'] = df['loan_int_rate'].fillna(mean_loan_int_rate) 

        df.isna().sum()


        cols = ['loan_intent']
        df = df.drop(cols, axis=1)

        #catogorical to ordinal
        def categorical_variables(df):
            object_cols = ['loan_grade']
            label_encoder = LabelEncoder()
            for col in object_cols:
                df[col] = label_encoder.fit_transform(df[col])
            return df
        categorical_variables(df)


        # Split Train and Test Sets
        label = df['loan_status'] # labels
        features = df.drop('loan_status',axis=1) # features
        x_train, x_test, y_train, y_test = model_selection.train_test_split(features, label, 
                                                                            random_state=42, test_size=.30)


        scaler = MinMaxScaler().fit(x_train)
        X_train_norm = scaler.transform(x_train)
        X_test_norm = scaler.transform(x_test)


        #DL model
        NN_model = Sequential() #train x_train working good
        NN_model.add(Dense(128, kernel_initializer='normal',input_dim = X_train_norm.shape[1], activation='relu'))
        NN_model.add(Dense(256, kernel_initializer='normal',activation='relu'))
        NN_model.add(Dense(256, kernel_initializer='normal',activation='relu'))
        NN_model.add(Dense(256, kernel_initializer='normal',activation='relu'))
        NN_model.add(Dense(1, kernel_initializer='normal',activation='linear'))
        NN_model.compile(loss='mean_absolute_error', optimizer='adam', metrics=['accuracy','mean_absolute_error'])



        history = History()
        History=NN_model.fit(X_train_norm, y_train, epochs=50, batch_size=500, validation_split = 0.2, callbacks=[history])
        return ("hi")

api.add_resource(DLModel,"/api/summary/dlmodel")




