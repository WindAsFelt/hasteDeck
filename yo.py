from flask import Flask, jsonify, request




app= Flask(__name__)

@app.route("/")
def root():
    return "home"

@app.route("/usuarios/<user_id>")
def get_user(user_id):
    user= {"id loll": user_id, "name":'test',"telefono": "999-333-777"}
        #/usuarios/2654?query=query_test
    query= request.args.get('query')
    if query:
        user["query"]=query
    return jsonify(user), 200

@app.route("/usuarios/", methods=['POST'])
def create_user():
    data = request.get_json()
    data['status'] = "user creato"
    return jsonify(data),201


if __name__ =='__main__':
    app.run(debug=True)


