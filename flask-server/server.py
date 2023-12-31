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
@app.route("/api", methods=["GET"])
def index():
    return {
        "name": "Nagato",
        "about" :"Hello! I'm a full stack developer that loves python and javascript"
    }

# ------------------------- Supervisor -------------------------

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
    
# ----- Sign In Supervisor -----
@app.route("/login_supervisor", methods=["POST"])
def login_supervisor():
    try:
        data = request.json
        supervisor_id = data.get("supervisor_id")
        password = data.get("password")

        # Connect to the database
        cursor = db_conn.cursor()

        # Query the database to check if the provided username and password match
        select_query = "SELECT supervisor_id, password FROM supervisor WHERE supervisor_id = %(supervisor_id)s AND password = %(password)s"
        cursor.execute(select_query, {"supervisor_id": supervisor_id, "password": password})

        # Fetch the result
        supervisor = cursor.fetchone()

        db_conn.commit()
        cursor.close()

        if supervisor:
        # If a supervisor with the provided username and password is found, return a success message
            return jsonify({"message": "Successful"}), 200
        else:
            # If no matching supervisor is found, return an error message
            return jsonify({"message": "Invalid Supervisor ID or Password"}), 401

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ------------------------- Supervisor -------------------------


# ------------------------- Company -------------------------

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

# ----- Delete Company -----
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
    

# ------------------------- Company -------------------------



# ------------------------- Student -------------------------

# ----- Add Student -----
@app.route("/add_student", methods=["POST"])
def add_student():
    try:
        # Extract data from the request
        data = request.json
        student_id = data.get("student_id")
        first_name = data.get("first_name")
        last_name = data.get("last_name")
        email = data.get("email")
        ic_no = data.get("ic_no")
        cohort = data.get("cohort")
        intern_start = data.get("intern_start")
        intern_end = data.get("intern_end")
        remark = 1
        supervisor_assigned = data.get("supervisor_assigned")
        
        # Connect to the database
        cursor = db_conn.cursor()

        # Insert data into the database
        insert_query = "INSERT INTO student (student_id, firstname, lastname, email, ic_no, cohort, intern_start, intern_end, remarks, supervisor_assigned) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
        cursor.execute(insert_query, (student_id, first_name, last_name, email, ic_no, cohort, intern_start, intern_end, remark, supervisor_assigned))

        db_conn.commit()
        cursor.close()

        return jsonify({"message": "Student added successfully."}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ----- Get all Student data -----
@app.route("/get_students", methods=["GET"])
def get_students():
    try:
        # Connect to the database
        cursor = db_conn.cursor()

        # Retrieve student data from the database
        query = "SELECT * FROM student"
        cursor.execute(query)
        students = cursor.fetchall()

        # Create a list to store the results
        student_list = []
        for student in students:
            student_data = {
                "id": student[0],
                "first_name": student[1],
                "last_name": student[2],
                "email": student[3],
                "ic_no": student[4],
                "cohort": student[5],
                "intern_start": student[6],
                "intern_end": student[7],
                "remarks": student[8],
                "supervisor_assigned": student[9],
            }
            student_list.append(student_data)

        cursor.close()

        return jsonify(student_list), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
# ----- Get Student data -----
@app.route("/get_student/<string:student_id>", methods=["GET"])
def get_student(student_id):
    try:
        # Connect to the database
        cursor = db_conn.cursor()

        # Retrieve student data from the database based on supervisor_id
        query = "SELECT * FROM student WHERE student_id = %(student_id)s"
        cursor.execute(query, {"student_id": student_id})
        student = cursor.fetchone()

        if student:
            student_data = {
                "id": student[0],
                "first_name": student[1],
                "last_name": student[2],
                "email": student[3],
                "ic_no": student[4],
                "cohort": student[5],
                "intern_start": student[6],
                "intern_end": student[7],
                "remarks": student[8],
                "supervisor_assigned": student[9],
            }
            cursor.close()
            return jsonify(student_data), 200
        else:
            cursor.close()
            return jsonify({"error": "Student not found"}), 404
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ----- Edit Student -----
@app.route("/edit_student", methods=["POST"])
def edit_student():
    try:
        data = request.json
        student_id = data.get("student_id")
        first_name = data.get("first_name")
        last_name = data.get("last_name")
        email = data.get("email")
        ic_no = data.get("ic_no")
        cohort = data.get("cohort")
        intern_start = data.get("intern_start")
        intern_end = data.get("intern_end")
        supervisor_assigned = data.get("supervisor_assigned")
        
        # Connect to the database
        cursor = db_conn.cursor()

        # Update the supervisor's data in the database using parameterized query
        update_query = "UPDATE student SET firstname = %(first_name)s, lastname = %(last_name)s, email = %(email)s, ic_no = %(ic_no)s, cohort = %(cohort)s, intern_start = %(intern_start)s, intern_end = %(intern_end)s, supervisor_assigned = %(supervisor_assigned)s WHERE student_id = %(student_id)s"
        
        cursor.execute(update_query, {
            "student_id": student_id,
            "first_name": first_name,
            "last_name": last_name,
            "email": email,
            "ic_no": ic_no,
            "cohort": cohort,
            "intern_start": intern_start,
            "intern_end": intern_end,
            "supervisor_assigned": supervisor_assigned,
        })

        db_conn.commit()
        cursor.close()

        return jsonify({"message": "Student updated successfully."}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ----- Delete Student -----
@app.route("/delete_student", methods=["POST"])
def delete_student():
    try:
        data = request.json
        student_id = data.get("student_id")

        # Connect to the database
        cursor = db_conn.cursor()

        # Update the student's data in the database using parameterized query
        update_query = "DELETE from student WHERE student_id = %(student_id)s"
        
        cursor.execute(update_query, {"student_id": student_id,})

        db_conn.commit()
        cursor.close()

        return jsonify({"message": "Student deleted successfully."}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ----- Sign In Student -----
@app.route("/login_student", methods=["POST"])
def login_student():
    try:
        data = request.json
        email = data.get("email")
        ic = data.get("ic")

        # Connect to the database
        cursor = db_conn.cursor()

        # Query the database to check if the provided username and password match
        select_query = "SELECT * FROM student WHERE email = %(email)s AND ic_no = %(ic)s"
        cursor.execute(select_query, {"email": email, "ic": ic})

        # Fetch the result
        student = cursor.fetchone()
        print(student)
        db_conn.commit()
        cursor.close()

        if student:
            student_data = {
                "id": student[0],
                "first_name": student[1],
                "last_name": student[2],
                "email": student[3],
                "ic_no": student[4],
                "cohort": student[5],
                "intern_start": student[6],
                "intern_end": student[7],
                "remarks": student[8],
                "supervisor_assigned": student[9],
            }
            cursor.close()
            return jsonify(student_data), 200
        else:
            cursor.close()
            return jsonify({"error": "Invalid Student ID or IC"}), 401

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

# ----- Update student status -----
@app.route("/edit_student_status", methods=["POST"])
def edit_student_status():
    try:
        data = request.json
        student_id = data.get("student_id")
        remarks = data.get("remarks")
        
        # Connect to the database
        cursor = db_conn.cursor()

        # Update the supervisor's data in the database using parameterized query
        update_query = "UPDATE student SET remarks = %(remarks)s WHERE student_id = %(student_id)s"
        
        cursor.execute(update_query, {
            "remarks": remarks,
            "student_id": student_id,
        })

        db_conn.commit()
        cursor.close()

        return jsonify({"message": "Student Application is Approved."}), 200
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

# ------------------------- Student -------------------------



# ------------------------- Application -------------------------

# ----- Add Application -----
@app.route("/add_application", methods=["POST", "GET"])
def add_application():
    try:
        student_id = request.form.get("student_id")
        company_name = request.form.get("company_name")
        company_address = request.form.get("company_address")
        company_supervisor_name = request.form.get("company_supervisor_name")
        company_supervisor_email = request.form.get("company_supervisor_email")
        allowance = request.form.get("allowance")
        com_acceptance_form = request.files.get("com_acceptance_form")
        parent_ack_form = request.files.get("parent_ack_form")
        indemnity = request.files.get("indemnity")
        hired_evidence = request.files.get("hired_evidence")

        # Connect S3 and upload files
        try:
            s3 = boto3.client('s3')
            print("S3 connected")

            try:
                com_acceptance_file_name_in_s3 = "companyFile_" + com_acceptance_form.filename
                s3.upload_fileobj(com_acceptance_form, custombucket, com_acceptance_file_name_in_s3)
                company_url = f"https://{custombucket}.s3.{customregion}.amazonaws.com/{com_acceptance_file_name_in_s3}"
                parent_ack_file_name_in_s3 = "parentFiles_" + parent_ack_form.filename
                s3.upload_fileobj(parent_ack_form, custombucket, parent_ack_file_name_in_s3)
                parent_url = f"https://{custombucket}.s3.{customregion}.amazonaws.com/{parent_ack_file_name_in_s3}"
                indemnity_file_name_in_s3 = "indemnityFiles_" + indemnity.filename
                s3.upload_fileobj(indemnity, custombucket, indemnity_file_name_in_s3)
                indemnity_url = f"https://{custombucket}.s3.{customregion}.amazonaws.com/{indemnity_file_name_in_s3}"
                hired_evidence_file_name_in_s3 = "evidenceFile_" + hired_evidence.filename
                s3.upload_fileobj(hired_evidence, custombucket, hired_evidence_file_name_in_s3)
                hired_url = f"https://{custombucket}.s3.{customregion}.amazonaws.com/{hired_evidence_file_name_in_s3}"
                print("S3 Upload Success")

                # Connect to the database
                print("DB connected")
                cursor = db_conn.cursor()
                insert_query = "INSERT INTO application (student_id, com_name, com_address, com_supervisor_name, com_supervisor_email, allowance, com_acceptance_form, parent_ack_form, indemnity, hired_evidence) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
                cursor.execute(insert_query, (student_id, company_name, company_address, company_supervisor_name, company_supervisor_email, allowance, company_url, parent_url, indemnity_url, hired_url))
                db_conn.commit()
                cursor.close()
                print("DB Update success")

                # Close the S3 connection and return a success response
                return jsonify({"message": "Data inserted successfully"}), 200

            except Exception as e:
                # Print detailed error information for debugging
                print("S3 Upload Error:", str(e))
                return jsonify({"error": "An error occurred while uploading to S3."}), 500

        except Exception as e:
            return jsonify({"error": str(e)}), 500

    except Exception as e:
        # Print detailed error information for debugging
        print("Application Error:", str(e))
        return jsonify({"error": "An error occurred while processing the request."}), 500


# ----- Get Application -----
@app.route("/get_application/<string:student_id>", methods=["GET"])
def get_application(student_id):
    try:
        # Connect to the database
        cursor = db_conn.cursor()

        # Query the database to check if the provided username and password match
        select_query = "SELECT * FROM application WHERE student_id = %(student_id)s"
        cursor.execute(select_query, {"student_id": student_id})

        # Fetch the result
        application = cursor.fetchone()

        db_conn.commit()
        cursor.close()

        if application:
            application_data = {
                "application_id": application[0],
                "student_id": application[1],
                "com_name": application[2],
                "com_address": application[3],
                "com_supervisor_name": application[4],
                "com_supervisor_email": application[5],
                "allowance": application[6],
                "com_acceptance_form": application[7],
                "parent_ack_form": application[8],
                "indemnity": application[9],
                "hired_evidence": application[10],
                "report_1": application[11],
                "report_2": application[12],
            }
            cursor.close()
            return jsonify(application_data), 200
        else:
            cursor.close()
            return jsonify({"error": "Invalid Data"}), 401

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    
# ----- Update  -----
@app.route("/approve_application", methods=["POST"])
def approve_application():
    try:
        data = request.json
        student_id = data.get("student_id")
        remarks = data.get("remarks")
        
        # Connect to the database
        cursor = db_conn.cursor()

        # Update the supervisor's data in the database using parameterized query
        update_query = "UPDATE student SET remarks = %(remarks)s WHERE student_id = %(student_id)s"
        
        cursor.execute(update_query, {
            "remarks": remarks,
            "student_id": student_id,
        })

        db_conn.commit()
        cursor.close()

        return jsonify({"message": "Student Application is Approved successfully."}), 200

        # #---------------------
        # if com_acceptance_form is None:
        #     return jsonify({"error": "Please select a file for company acceptance file"}), 400
        
        # if parent_ack_form.filename == "":
        #     return "Please select a file for parent acknowledgement form"  
        
        # if indemnity.filename == "":
        #     return "Please select a file for indemnity form"

        # if com_acceptance_form: 
            
        #     s3 = boto3.client('s3')

        #     com_acceptance_file_name_in_s3 = com_acceptance_form.filename + "_files"
        #     try: 
        #         s3.upload_fileobj(com_acceptance_form, custombucket, com_acceptance_file_name_in_s3)
        #     except Exception as e: 
        #         return jsonify({"error": str(e)}), 500
        
        #     s3_url = f"https://{custombucket}.s3.{customregion}.amazonaws.com/{com_acceptance_file_name_in_s3}"
        # #----------------------------------------------

        return jsonify({"message": "Internship Application added successfully.", "s3_url": s3_url}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ----- Add Progress  -----
@app.route("/add_progress", methods=["POST", "GET"])
def add_progress():
    try:
        student_id = request.form.get("student_id")
        report_1 = request.files.get("report1")
        report_2 = request.files.get("report2")

        # Connect S3 and upload files
        try:
            s3 = boto3.client('s3')
            print("Connecting to S3")

            try: 
                report_1_file_name_in_s3 = "report1_" + report_1.filename
                s3.upload_fileobj(report_1, custombucket, report_1_file_name_in_s3)
                report_1_url = f"https://{custombucket}.s3.{customregion}.amazonaws.com/{report_1_file_name_in_s3}"
                report_2_file_name_in_s3 = "report2_" + report_2.filename
                s3.upload_fileobj(report_2, custombucket, report_2_file_name_in_s3)
                report_2_url = f"https://{custombucket}.s3.{customregion}.amazonaws.com/{report_2_file_name_in_s3}"
                print("S3 Upload Success")

                print("Connecting to database")
                cursor = db_conn.cursor()
                update_query = "UPDATE application SET report_1 = %(report_1)s, report_2 = %(report_2)s WHERE student_id = %(student_id)s"
                cursor.execute(update_query, {"report_1": report_1_url, "report_2": report_2_url, "student_id": student_id})
                db_conn.commit()
                cursor.close()
                print("DB Update success")

                # Close the S3 connection and return a success response
                return jsonify({"message": "Data inserted successfully"}), 200

            except Exception as e: 
                # Print detailed error information for debugging
                print("S3 Upload Error:", str(e))
                return jsonify({"error": "An error occurred while uploading to S3."}), 500

        except Exception as e:
            return jsonify({"error": str(e)}), 500

    except Exception as e:
        # Print detailed error information for debugging
        print("Progress Error:", str(e))
        return jsonify({"error": "An error occurred while processing the request."}), 500

# ------------------------- Application -------------------------

if __name__ == "__main__":
    #app.run(debug=True)
    app.run(host='0.0.0.0', port=5000, debug=True)
