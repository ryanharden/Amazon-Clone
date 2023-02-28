from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, CartItem, Product
from app.forms import CartItemForm
from .product_routes import product_routes

cart_routes = Blueprint("cart_items", __name__)

# Get all cart items

@cart_routes.route("/cartitems")
@login_required
def get_cart_items():
    cart_items = CartItem.query.filter(CartItem.user_id == current_user.id).all()
    return {item.id: item.to_dict() for item in cart_items}


# Add a cart item

@product_routes.route("/<int:id>/cartitems", methods=["POST"])
@login_required
def add_cart_item(id):
    form = CartItemForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    product = Product.query.get(id)

    if form.validate_on_submit():

        cart_item = CartItem.query.filter(CartItem.user_id == current_user.id).filter(CartItem.product_id == id).first()

        if not cart_item:
            new_cart_item = CartItem(
                user_id = current_user.id,
                product_id = id,
                quantity = form.data["quantity"]
            )
            if form.data["quantity"] > product.inventory:
                return {
                    "errors": "The requested quantity exceeds this products stock"
                }
            form.populate_obj(new_cart_item)
            db.session.add(new_cart_item)
            db.session.commit()
            return new_cart_item.to_dict_details()
        else:
            actual_quantity = cart_item.quantity + form.data["quantity"]
            if actual_quantity > product.inventory:
                return {
                    "errors": "The requested quantity exceeds this products stock"
                }
            dupe_cart_item = CartItem(
                user_id = current_user.id,
                product_id = id,
                quantity = actual_quantity
            )
            db.session.delete(cart_item)
            db.session.add(dupe_cart_item)
            db.session.commit()
            return dupe_cart_item.to_dict_details()

# Edit a cart item

@cart_routes.route("/cartitems/<int:id>", methods=["PUT"])
@login_required
def edit_cart_item(id):
    form = CartItemForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    cart_item = CartItem.query.get(id)

    if form.validate_on_submit():
        product = Product.query.get(cart_item.product_id)

        if form.data["quantity"] > product.inventory:
            return {
                    "errors": "The requested quantity exceeds this products stock"
                }
        cart_item.quantity = form.data["quantity"]
        db.session.add(cart_item)
        db.session.commit()
        return cart_item.to_dict_details()

# Delete a cart item

@cart_routes.route("/cartitems/<int:id>", methods=["DELETE"])
@login_required
def delete_cart_item(id):
    cart_item = CartItem.query.get(id)

    if not cart_item:
        return {
            "errors": "The cart_item was not found"
        }

    db.session.delete(cart_item)
    db.session.commit()
    return {"id": cart_item.id}
