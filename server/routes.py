from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, Transaction
from datetime import datetime

api_bp = Blueprint("api", __name__, url_prefix="/api")

# -------------------------
# GET all transactions
# -------------------------
@api_bp.route("/transactions", methods=["GET"])
@jwt_required()
def get_transactions():
    user_id = get_jwt_identity()
    txs = Transaction.query.filter_by(user_id=user_id).all()

    return jsonify([
        {
            "id": t.id,
            "amount": t.amount,
            "type": t.type,
            "category": t.category,
            "date": t.date.isoformat(),
            "description": t.description
        }
        for t in txs
    ])

# -------------------------
# GET single transaction
# -------------------------
@api_bp.route("/transactions/<int:id>", methods=["GET"])
@jwt_required()
def get_transaction(id):
    user_id = get_jwt_identity()
    tx = Transaction.query.filter_by(id=id, user_id=user_id).first_or_404()

    return jsonify({
        "id": tx.id,
        "amount": tx.amount,
        "type": tx.type,
        "category": tx.category,
        "date": tx.date.isoformat(),
        "description": tx.description
    })

# -------------------------
# POST (add) transaction
# -------------------------
@api_bp.route("/transactions", methods=["POST"])
@jwt_required()
def add_transaction():
    user_id = get_jwt_identity()
    data = request.json

    tx = Transaction(
        amount=data["amount"],
        type=data["type"],
        category=data["category"],
        date=datetime.fromisoformat(data["date"]),
        description=data.get("description"),
        user_id=user_id
    )

    db.session.add(tx)
    db.session.commit()

    return jsonify({
        "message": "Transaction added",
        "transaction_id": tx.id
    }), 201

# -------------------------
# PUT (update) transaction
# -------------------------
@api_bp.route("/transactions/<int:id>", methods=["PUT"])
@jwt_required()
def update_transaction(id):
    user_id = get_jwt_identity()
    data = request.json

    tx = Transaction.query.filter_by(id=id, user_id=user_id).first_or_404()

    tx.amount = data["amount"]
    tx.type = data["type"]
    tx.category = data["category"]
    tx.date = datetime.fromisoformat(data["date"])
    tx.description = data.get("description")

    db.session.commit()

    return jsonify({"message": "Transaction updated"})

# -------------------------
# DELETE transaction
# -------------------------
@api_bp.route("/transactions/<int:id>", methods=["DELETE"])
@jwt_required()
def delete_transaction(id):
    user_id = get_jwt_identity()
    tx = Transaction.query.filter_by(id=id, user_id=user_id).first()

    if not tx:
        return jsonify({"message": "Transaction already deleted or not found"}), 200

    db.session.delete(tx)
    db.session.commit()

    return jsonify({"message": "Transaction deleted"})

# -------------------------
# Monthly summary
# -------------------------
@api_bp.route("/summary/month/<int:year>/<int:month>", methods=["GET"])
@jwt_required()
def monthly_summary(year, month):
    user_id = get_jwt_identity()

    txs = Transaction.query.filter(
        Transaction.user_id == user_id,
        db.extract("year", Transaction.date) == year,
        db.extract("month", Transaction.date) == month
    ).all()

    income = sum(t.amount for t in txs if t.type == "income")
    expense = sum(t.amount for t in txs if t.type == "expense")

    return jsonify({
        "year": year,
        "month": month,
        "income": income,
        "expense": expense
    })
