#2 outils biblio Flask : Flask (creer serveur) // render_template (envoie pages html)
from flask import Flask , render_template , request , jsonify 
from Caesar.main import user_input , brute_force , frequency_analysis

app = Flask(__name__) 


# relie une adresse URL a la fonction du dessous 
# / : page accueil 
@app.route("/")
def index():
    return render_template('index.html')
# /api/caesar/ciper (autorise envoie données) 
@app.route("/api/caesar/cipher" , methods=["POST"])
def caesar_cipher():
    recup_json = request.get_json() #lit data envoyées par navig et renvoie dictio py avec texte / decalage / mode 
    text = recup_json["message"]
    key = int(recup_json["shift"])
    mode = recup_json["mode"]

    if mode == "decrypt": 
        key = -key 
    
    clear = user_input(text, key)
    frequences = frequency_analysis(clear)

    return jsonify({"result" : clear, "frequencies" : frequences})
# /api/caesar/bruteforce (autorise envoie données)
@app.route("/api/caesar/bruteforce" , methods=["POST"])
def caesar_bruteforce():
    recup_json = request.get_json()
    text = recup_json["message"]
    result = brute_force(text)
    frequences = frequency_analysis(text)

    return jsonify({"results" : result , "frequencies" : frequences})





if __name__ == "__main__":
    app.run(debug=True)