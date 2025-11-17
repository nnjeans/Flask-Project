from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/html")
def html_tutorial():
    return render_template("html_tutorial.html")

@app.route("/css")
def css_tutorial():
    return render_template("css_tutorial.html")

@app.route("/quiz")
def quiz():
    return render_template("quiz.html")

if __name__ == "__main__":
    app.run(debug=True, port=8000, host="0.0.0.0")
