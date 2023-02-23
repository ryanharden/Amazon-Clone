from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

# Get all user products
# @user_routes.route("/<int:id>/products")
# def get_user_products(id):
#     user = User.query.get(id)

#     if not user:
#         return {"errors": "User Not Found"}, 404

#     return {product.id: product.to_dict() for product in user.products}

# Get all user reviews
# @user_routes.route("/<int:id>/reviews")
