from flask import Flask, request, jsonify
from pymysql import connections
import os
import boto3
from config import *
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# ----- Configure Database ----- 
bucket = custombucket
region = customregion

db_conn = connections.Connection(
    host=customhost,
    port=3306,
    user=customuser,
    password=custompass,
    db=customdb
)
output = {}

# ----- Default home -----
@app.route("/", methods=["GET", "POST"])
def home():
    return "<h1>Home</h1>"

# ----- Add Supervisor -----
@app.route("/add_supervisor", methods=["POST"])
def add_supervisor():
    try:
        # Extract data from the request
        data = request.json
        first_name = data.get("first_name")
        last_name = data.get("last_name")
        email = data.get("email")
        phone = data.get("phone")
        birth_date = data.get("birth_date")
        gender = data.get("gender")
        position_title = data.get("position_title")
        major = data.get("major")
        
        # Connect to the database
        cursor = db_conn.cursor()

        # Insert data into the database
        insert_query = f"INSERT INTO supervisor (firstname, lastname, email, phone, dob, gender, position, major) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)"
        cursor.execute(insert_query, (first_name, last_name, email, phone, birth_date, gender, position_title, major))
        db_conn.commit()
        cursor.close()

        return jsonify({"message": "Supervisor added successfully."}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500



if __name__ == "__main__":
    app.run(debug=True)
