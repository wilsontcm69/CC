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

# ----- Add Company -----
@app.route("/add_company", methods=["POST"])
def add_company():
    try:
        # Extract data from the request
        data = request.json
        company_name = data.get("company_name")
        email = data.get("email")
        website = data.get("website")
        job_title = data.get("job_title")
        address = data.get("address")
        job_description = data.get("job_description")
        working_day_start = data.get("working_day_start")
        working_day_end = data.get("working_day_end")
        working_hour_start = data.get("working_hour_start")
        working_hour_end = data.get("working_hour_end")
        allowance_start = data.get("allowance_start")
        allowance_end = data.get("allowance_end")
        open_for = data.get("open_for")
        accomodation = data.get("accomodation")

        # Connect to the database
        cursor = db_conn.cursor()

        # Insert data into the database
        insert_query = f"INSERT INTO company (company_name, email, website, job_title, address, job_description, working_day_start, working_day_end, working_hour_start, working_hour_end, allowance_start, allowance_end, open_for, accomodation) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
        cursor.execute(insert_query, (company_name, email, website, job_title, address, job_description, working_day_start , working_day_end, working_hour_start, working_hour_end, allowance_start, allowance_end, open_for, accomodation))
        db_conn.commit()
        cursor.close()

        return jsonify({"message": "Company added successfully."}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ----- Get all company data -----
@app.route("/get_companies", methods=["GET"])
def get_companies():
    try:
        # Connect to the database
        cursor = db_conn.cursor()

        # Retrieve company data from the database
        query = "SELECT company_name, email, website, job_title, address, job_description, working_day_start, working_day_end, working_hour_start, working_hour_end, allowance_start, allowance_end, open_for, accomodation FROM company"
        cursor.execute(query)
        companies = cursor.fetchall()

        # Create a list to store the results
        company_list = []
        for company in companies:
            company_data = {
                "company_name": company[0],
                "email": company[1],
                "website": company[2],
                "job_title": company[3],
                "address": company[4],
                "job_description": company[5],
                "working_day_start": company[6],
                "working_day_end": company[7],
                "working_hour_start": company[8],
                "working_hour_end": company[9],
                "allowance_start": company[10],
                "allowance_end": company[11],
                "open_for": company[12],
                "accomodation": company[13],
            }
            company_list.append(company_data)

        cursor.close()

        return jsonify(company_list), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ----- Get company data -----
@app.route("/get_company/<string:cname>", methods=["GET"])
def get_company(cname):
    try:
        # Connect to the database
        cursor = db_conn.cursor()

        # Retrieve company data from the database based on company_name
        query = "SELECT company_name, email, website, job_title, address, job_description, working_day_start, working_day_end, working_hour_start, working_hour_end, allowance_start, allowance_end, open_for, accomodation FROM company WHERE company_name = %(company_name)s"
        cursor.execute(query, {"company_name": cname})
        company = cursor.fetchone()

        if company:
            company_data = {
                "cname": company[0],
                "email": company[1],
                "website": company[2],
                "job_title": company[3],
                "address": company[4],
                "job_description": company[5],
                "working_day_start": company[6],
                "working_day_end": company[7],
                "working_hour_start": company[8],
                "working_hour_end": company[9],
                "allowance_start": company[10],
                "allowance_end": company[11],
                "open_for": company[12],
                "accomodation": company[13],
            }
            cursor.close()
            return jsonify(company_data), 200
        else:
            cursor.close()
            return jsonify({"error": "Company not found"}), 404
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ----- Edit Company -----
@app.route("/edit_company", methods=["POST"])
def edit_company():
    try:
        # Extract data from the request
        data = request.json
        company_name = data.get("company_name")
        email = data.get("email")
        website = data.get("website")
        job_title = data.get("job_title")
        address = data.get("address")
        job_description = data.get("job_description")
        working_day_start = data.get("working_day_start")
        working_day_end = data.get("working_day_end")
        working_hour_start = data.get("working_hour_start")
        working_hour_end = data.get("working_hour_end")
        allowance_start = data.get("allowance_start")
        allowance_end = data.get("allowance_end")
        open_for = data.get("open_for")
        accomodation = data.get("accomodation")

        # Connect to the database
        cursor = db_conn.cursor()

        # Update the company's data in the database using parameterized query
        update_query = "UPDATE company SET email = %(email)s, website = %(website)s, job_title = %(job_title)s, address = %(address)s, job_description = %(job_description)s, working_day_start = %(working_day_start)s, working_day_end = %(working_day_end)s, working_hour_start = %(working_hour_start)s, working_hour_end = %(working_hour_end)s, allowance_start = %(allowance_start)s, allowance_end = %(allowance_end)s, open_for = %(open_for)s, accomodation = %(accomodation)s WHERE company_name = %(company_name)s"

        cursor.execute(update_query, {
            "company_name": company_name,
            "email": email,
            "website": website,
            "job_title": job_title,
            "address": address,
            "job_description": job_description,
            "working_day_start": working_day_start,
            "working_day_end": working_day_end,
            "working_hour_start": working_hour_start,
            "working_hour_end": working_hour_end,
            "allowance_start": allowance_start,
            "allowance_end": allowance_end,
            "open_for": open_for,
            "accomodation": accomodation,
        })

        db_conn.commit()
        cursor.close()

        return jsonify({"message": "Company updated successfully."}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ----- Delete Supervisor -----
@app.route("/delete_company", methods=["POST"])
def delete_company():
    try:
        data = request.json
        company_name = data.get("company_name")

        # Connect to the database
        cursor = db_conn.cursor()

        # Delete the company's data in the database using parameterized query
        update_query = "DELETE from company WHERE company_name = %(company_name)s"
        
        cursor.execute(update_query, {"company_name": company_name,})

        db_conn.commit()
        cursor.close()

        return jsonify({"message": "Company deleted successfully."}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

if __name__ == "__main__":
    #app.run(debug=True)
    app.run(host='0.0.0.0', port=5000, debug=True)
