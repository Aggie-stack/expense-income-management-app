from flask import Flask
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from config import Config
from models import db
from auth import auth_bp
from routes import api_bp

app = Flask(__name__)
app.config.from_object(Config)

CORS(app)
db.init_app(app)
JWTManager(app)

app.register_blueprint(auth_bp)
app.register_blueprint(api_bp)

with app.app_context():
    db.create_all()

@app.route("/")
def home():
    return {"status": "API is running"}

if __name__ == "__main__":
    app.run(debug=True)
