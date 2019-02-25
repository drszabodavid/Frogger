from flask import Flask, render_template, request

app = Flask(__name__)


@app.route('/game')
def run_game():
    return render_template('game.html')


@app.route('/')
def index():
    return render_template('index.html')


if __name__ == '__main__':
    app.run(
        debug=True,
        port=5000,
    )
