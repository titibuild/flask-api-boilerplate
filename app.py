from flask import Flask, request, jsonify, render_template
from flask_cors import CORS, cross_origin

app = Flask(__name__)
app.config['SECRET_KEY'] = 'the quick brown fox jumps over the lazy dog'
app.config['CORS_HEADERS'] = 'Content-Type'

cors = CORS(app, resources={r"/api/button-click": {"origins": "http://localhost:5002"}})

@app.route('/')
def home():
    # Front-end page for Resonate — connecting London's music communities.
    return render_template('index.html')

@app.route('/api/button-click', methods=['POST'])
@cross_origin(origin='localhost',headers=['Content- Type','Authorization'])

def handle_button_click():

    data = request.get_json()
    button_type = data.get('buttonType')

    if button_type == 'primary':
        response = "You clicked on the Primary Button"
    elif button_type == 'secondary':
        response = "You clicked on the Secondary Button"
    else:
        response = "Invalid button type"

    return jsonify({"response": response})
if __name__ == '__main__':
    app.run(host='localhost', port=5002)
