# Flask

## Full stack application has 3 parts

- FE → send req to BE
- BE → receive req from FE and perform business logic
- DB → store app data

## How FE interacts with BE?

- via HTTP req and HTTP res
- client → browser (req) → backend (received) → DB (returns) → backend (res) → browser (visuals)

## What  is Flask?

- Lighweight python framework → build web app & REST API’s
- flexible → I can choose DB, auth, project structure (django have all of these)

## Flask vs Django

| Flask | Django |
| --- | --- |
| lightweight framework | heavy but complete |
| more control (need extensions) | more in-built features  |
| good for APIs | good for full projects |

## Flask Architecture

- client → http req → flask router → python function → business logic → DB → http res

## Creating virtual enviornment

- why use? → isolate project dependencies, avoid version conflict

```python
# Command
python -m venv venv

# Activate 
venv\Scripts\activate

(venv) C:\project>

# Install flask
pip insall flask
```

## Flask Application

```python
from flask import Flask # import flask class

app = Flask(__name__) # create flask application object 

@app.route("/") # route - when user visit / -> execute below function
def home():
		return "Hello" # respoonse sent to browser
		
@app.route("/about")
def about():
		return "My name is Kap10"

if __name__ == "__main__":
		app.run(debug=True) # start development server
		
# how to run flask server
python app.py

# run on -> https://127.0.0.1:5000 -> localhost:5000
```

## Flask Project Structure

my_app/ (root)

[app.py](http://app.py) (file)

requirements.txt (file)

templates/ (folder)

index.html

static/ (folder)

css/

images/

venv/ (folder)

## Debug mode

→ app.run() - every change require restart

→ app.run(debug=True) - auto reload, show error, but not use in prod due to security issues

## Routing

→ mapping URL to python function

```python
Client
	|
Browser 
	|
GET /home (req)
	|
flask router 
	|
home() function
	|
Response
	|
display "Home Page" on screen
```

→ real application has many URLs, we need to create more routing

## Dynamic Routing

- real app dont have fixed URLs

```python
@app.route("/profile/Kap10")
@app.route("/profile/iota")
@app.route("/profile/1")

# instead do URL segments

# string
@app.route("/profile/<username>")
def profile(username):
		return f"Welcome {username}"
		
# integer
@app.route("/profile/<int:id>")
def profile(id):
		return f"Studnet id: {id}"

# float
@app.route("/profile/<float:id>")
```

## HTTP methods in flask (CRUD)

- GET - fetch data
- POST - create data
- PUT - update data
- DELETE - delete data

```python
# GET method
from flask import Flask, request
# request object -> contains incoming client data

app = Flask(__name__)

@app.route("/users", methods=["GET"])
def get_users():
		return "All Users"
		
@app.route("/register", methods=["POST"])
def register():
		data = request.json
		name = data["name"]
		return f"Welcome {name}"

@app.route("/user/<int:id>", methods=["PUT"])
def updated_user(id):
		return f"{id} updated"

@app.route("/user/<int:id>", methods=["DELETE"])
def delete_user(id):
		return f"User {id} deleted"
```

## Complete CRUD API using flask

```python
from flask import Flask, request, jsonify

app = Flast(__name__)

users = [
		{
			"id":1,
			"name":"kap10"
		},
		{
			"id":2,
			"name":"iota"
		}
]

# read all users
@app.route("/users",methods=["GET"])
def get_user():
		return jsonify(users)
		
# read single user
@app.route("/users/<int:id>", methods=["GET"])
def get_user(id):
		for user in users:
				if user["id"] == id:
						return jsonify(user)
		return "user not found"

# creating user
@app.route("/users",methods=["POST"])
def create_user():
		data = request.json
		users.append(data)
		
		return jsonify({"message": "user created"})

# updating user
@app.route("users/<int:id",methods=["PUT"])
def update_user(id):
		for user in users:
				if user["id"] == id:
						user["name"] = request.json["name"]
						return jsonify(user)

# delete user
@app.route("/users/<int:id>",methods=["DELETE"])
def delete_user(id):
		global users
		
		users = [user for user in users if user["id"] != id
		
		return jsonify({"message":"Deleted"})

# starting development server
app.run(debug=True)
```

## Request object

```python
# request.args (query parameters)

# localhost:5000/search?name=Flask

@app.run("/search", method["GET"])
def get_user():
		keyword = request.args.get("name")
		return f"find {name}"

#multiple query parameter
#localhost:5000/product?category=mobile&brand=samsung

@app.run("/product", methods=["GET"])
def get_product():
		category = request.args.get("category")
		brand = request.args.get("brand")
		return "data fetched"
```

### HTML data

```python
@app.run("/login", methods=["GET"])
def get_details():
		user = request.form.get("email")
		password = request.form.get("password")
		
		return "data fetched"
```

### JSON data

```python
@app.run("/login", methods=["GET"])
def get_details():
		data = request.json
		name = data["name"]
		password = data["password"
		
		return "data fetched"
```

## Response Object

- flask automatically convert return into http response

### Jsonify()

- convert python object into json response

```python
from flask import Flase, jsonify

app = Flask(__name__)

@app.route("/login", method=["GET"])
def get_login():
		data = request.json
		return jsonify(data)
```

## HTTP Status code

return response, status_code

- 200 - success
- 201 - created
- 400 - bad request
- 401 - unauthorized
- 403 - forbidden
- 404 - not found
- 500 - server error