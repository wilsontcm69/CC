from flask import Flask, request, jsonify, render_template
from pymysql import connections
import os
import boto3
from config import *
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
#CORS(app, origins="http://localhost:5173")

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

# ----- Profile -----
@app.route("/profile")
def my_profile():
    response_body = {
        "name": "Nagato",
        "about" :"Hello! I'm a full stack developer that loves python and javascript"
    }
    return response_body

# ----- Add Supervisor -----
@app.route("/add_supervisor", methods=["POST"])
def add_supervisor():
    try:
        # Extract data from the request
        data = request.json
        supervisor_id = data.get("supervisor_id")
        first_name = data.get("first_name")
        last_name = data.get("last_name")
        password = data.get("password")
        email = data.get("email")
        phone = data.get("phone")
        birth_date = data.get("birth_date")
        gender = data.get("gender")
        position_title = data.get("position_title")
        major = data.get("major")
        
        # Connect to the database
        cursor = db_conn.cursor()

        # Insert data into the database
        insert_query = f"INSERT INTO supervisor (supervisor_id, firstname, lastname, password, email, phone, dob, gender, position, major) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
        cursor.execute(insert_query, (supervisor_id, first_name, last_name, password, email, phone, birth_date, gender, position_title, major))
        db_conn.commit()
        cursor.close()

        return jsonify({"message": "Supervisor added successfully."}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ----- Get all supervisor data -----
@app.route("/get_supervisors", methods=["GET"])
def get_supervisors():
    try:
        # Connect to the database
        cursor = db_conn.cursor()

        # Retrieve supervisor data from the database
        query = "SELECT supervisor_id, firstname, lastname, email, phone, dob, gender, position, major FROM supervisor"
        cursor.execute(query)
        supervisors = cursor.fetchall()

        # Create a list to store the results
        supervisor_list = []
        for supervisor in supervisors:
            supervisor_data = {
                "id": supervisor[0],
                "first_name": supervisor[1],
                "last_name": supervisor[2],
                "email": supervisor[3],
                "phone": supervisor[4],
                "birth_date": supervisor[5],
                "gender": supervisor[6],
                "position_title": supervisor[7],
                "major": supervisor[8],
            }
            supervisor_list.append(supervisor_data)

        cursor.close()

        return jsonify(supervisor_list), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ----- Get supervisor data -----
@app.route("/get_supervisor/<string:supervisor_id>", methods=["GET"])
def get_supervisor(supervisor_id):
    try:
        # Connect to the database
        cursor = db_conn.cursor()

        # Retrieve supervisor data from the database based on supervisor_id
        query = "SELECT supervisor_id, firstname, lastname, password, email, phone, dob, gender, position, major FROM supervisor WHERE supervisor_id = %(supervisor_id)s"
        cursor.execute(query, {"supervisor_id": supervisor_id})
        supervisor = cursor.fetchone()

        if supervisor:
            supervisor_data = {
                "id": supervisor[0],
                "first_name": supervisor[1],
                "last_name": supervisor[2],
                "password": supervisor[3],
                "email": supervisor[4],
                "phone": supervisor[5],
                "birth_date": supervisor[6],
                "gender": supervisor[7],
                "position_title": supervisor[8],
                "major": supervisor[9],
            }
            cursor.close()
            return jsonify(supervisor_data), 200
        else:
            cursor.close()
            return jsonify({"error": "Supervisor not found"}), 404
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ----- Edit Supervisor -----
@app.route("/edit_supervisor", methods=["POST"])
def edit_supervisor():
    try:
        data = request.json
        supervisor_id = data.get("supervisor_id")
        first_name = data.get("first_name")
        last_name = data.get("last_name")
        password = data.get("password")
        email = data.get("email")
        phone = data.get("phone")
        birth_date = data.get("birth_date")
        gender = data.get("gender")
        position_title = data.get("position_title")
        major = data.get("major")

        # Connect to the database
        cursor = db_conn.cursor()

        # Update the supervisor's data in the database using parameterized query
        update_query = "UPDATE supervisor SET firstname = %(first_name)s, lastname = %(last_name)s, password = %(password)s, email = %(email)s, phone = %(phone)s, dob = %(birth_date)s, gender = %(gender)s, position = %(position_title)s, major = %(major)s WHERE supervisor_id = %(supervisor_id)s"
        
        cursor.execute(update_query, {
            "supervisor_id": supervisor_id,
            "first_name": first_name,
            "last_name": last_name,
            "password": password,
            "email": email,
            "phone": phone,
            "birth_date": birth_date,
            "gender": gender,
            "position_title": position_title,
            "major": major,
        })

        db_conn.commit()
        cursor.close()

        return jsonify({"message": "Supervisor updated successfully."}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ----- Delete Supervisor -----
@app.route("/delete_supervisor", methods=["POST"])
def delete_supervisor():
    try:
        data = request.json
        supervisor_id = data.get("supervisor_id")

        # Connect to the database
        cursor = db_conn.cursor()

        # Update the supervisor's data in the database using parameterized query
        update_query = "DELETE from supervisor WHERE supervisor_id = %(supervisor_id)s"
        
        cursor.execute(update_query, {"supervisor_id": supervisor_id,})

        db_conn.commit()
        cursor.close()

        return jsonify({"message": "Supervisor deleted successfully."}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

        

if __name__ == "__main__":
    #app.run(debug=True)
    app.run(host='0.0.0.0', port=5000, debug=True)
