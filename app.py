from flask import Flask, render_template, request, jsonify

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/api/guess', methods=['POST'])
def guess():
    data = request.get_json()
    country = data.get('country')
    response = f"You guessed: {country}"
    return jsonify(message=response)


if __name__ == '__main__':
    app.run(debug=True)
