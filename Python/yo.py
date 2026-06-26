from flask import Flask, jsonify, request, send_file
from flask_cors import CORS  
import qrcode
import io
import qrcode 
import os



app= Flask(__name__)
CORS(app)

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


@app.route("/crearQR/<id>")
def crear_qr(id):

    query = request.args.get('query')
    if query:
        id = query

    qr = qrcode.QRCode()
    qr.add_data(id)
    img = qr.make_image()

    CARPETA_PROYECTO = os.path.dirname(os.path.abspath(__file__))
    ruta_segura_imagen = os.path.join(CARPETA_PROYECTO, "qr_actual.png")
    img.save(ruta_segura_imagen)

    buf = io.BytesIO()
    img.save(buf, format='PNG')
    buf.seek(0)

    img.save("qr_actual.png")
    return send_file("qr_actual.png", mimetype='image/png')


if __name__ =='__main__':
    app.run(debug=True)


