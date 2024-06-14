from flask import Flask, render_template, request, flash, redirect, jsonify
import pickle
import numpy as np
from PIL import Image
from tensorflow.keras.models import load_model
from flask_cors import CORS
from json import JSONEncoder
import json
from flask_json import FlaskJSON, JsonError, json_response, as_json

app = Flask(__name__)
CORS(app,  resources={r"/*": {"origins": "*"}})
FlaskJSON(app)


class CustomJSONEncoder(JSONEncoder):
    def default(self, obj):
        if isinstance(obj, np.int64):
            return int(obj)
        return JSONEncoder.default(self, obj)


app.json_encoder = CustomJSONEncoder


def predict(values, dic):
    if len(values) == 8:
        model = pickle.load(open('models/diabetes.pkl', 'rb'))
        values = np.asarray(values)
        return model.predict(values.reshape(1, -1))[0]
    elif len(values) == 26:
        model = pickle.load(open('models/breast_cancer.pkl', 'rb'))
        values = np.asarray(values)
        return model.predict(values.reshape(1, -1))[0]
    elif len(values) == 13:
        model = pickle.load(open('models/heart.pkl', 'rb'))
        values = np.asarray(values)
        return model.predict(values.reshape(1, -1))[0]
    elif len(values) == 18:
        model = pickle.load(open('models/kidney.pkl', 'rb'))
        values = np.asarray(values)
        return model.predict(values.reshape(1, -1))[0]
    elif len(values) == 10:
        model = pickle.load(open('models/liver.pkl', 'rb'))
        values = np.asarray(values)
        return model.predict(values.reshape(1, -1))[0]


@app.route("/")
def home():
    return render_template('home.html')


@app.route("/diabetes", methods=['GET', 'POST'])
def diabetesPage():
    return render_template('diabetes.html')


@app.route("/cancer", methods=['GET', 'POST'])
def cancerPage():
    return render_template('breast_cancer.html')


@app.route("/heart", methods=['GET', 'POST'])
def heartPage():
    return render_template('heart.html')


@app.route("/kidney", methods=['GET', 'POST'])
def kidneyPage():
    return render_template('kidney.html')


@app.route("/liver", methods=['GET', 'POST'])
def liverPage():
    return render_template('liver.html')


@app.route("/malaria", methods=['GET', 'POST'])
def malariaPage():
    return render_template('malaria.html')


@app.route("/pneumonia", methods=['GET', 'POST'])
def pneumoniaPage():
    return render_template('pneumonia.html')


@app.route("/predict", methods=['POST', 'GET'])
def predictPage():
    try:
        if request.method == 'POST':
            print('post data', request.get_json())
            to_predict_dict = request.form.to_dict()

            print("preduct dict ", to_predict_dict)
            to_predict_list = list(map(float, list(to_predict_dict.values())))
            print("preduct list ", to_predict_list)
            pred = predict(to_predict_list, to_predict_dict)
    except:
        message = "Please enter valid Data"
        return render_template("home.html", message=message)

    return render_template('predict.html', pred=pred)


@app.route("/malariapredict", methods=['POST', 'GET'])
def malariapredictPage():
    if request.method == 'POST':
        try:
            if 'image' in request.files:
                img = Image.open(request.files['image'])
                img = img.resize((36, 36))
                img = np.asarray(img)
                img = img.reshape((1, 36, 36, 3))
                img = img.astype(np.float64)
                model = load_model("models/malaria.h5")
                pred = np.argmax(model.predict(img)[0])
        except:
            response = jsonify({'message': int(-1)})
            return response
    response = jsonify({'message': int(pred)})
    return response


@app.route("/pneumoniapredict", methods=['POST', 'GET'])
def pneumoniapredictPage():
    if request.method == 'POST':
        try:
            if 'image' in request.files:
                img = Image.open(request.files['image']).convert('L')
                img = img.resize((36, 36))
                img = np.asarray(img)
                img = img.reshape((1, 36, 36, 1))
                img = img / 255.0
                model = load_model("models/pneumonia.h5")
                pred = np.argmax(model.predict(img)[0])
        except:
            response = jsonify({'message': int(-1)})
            return response
    response = jsonify({'message': int(pred)})
    return response


if __name__ == '__main__':
    app.run(debug=True)