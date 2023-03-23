from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Order, OrderItem, Product, db

order_routes = Blueprint('orders', __name__)

# Get Users Orders
@order_routes.route("/current")
@login_required
def get_users_orders():
    orders = Order.query.filter(Order.buyer_id == current_user.id).all()
    order_items = [{"order_items": [orderItem.to_dict() for orderItem in order.order_items], "address": order.address, "created_at": order.created_at, "id": order.id} for order in orders]
    return order_items

@order_routes.route("", methods=["POST"])
@login_required
def create_order():
    requestBody = request.get_json()
    cart = requestBody["cart"]
    print("cart: ", cart)
    cartArr = list(cart)
    productIds = [item.product_id for item in cartArr]

    products = Product.query.filter(Product.id.in_(productIds)).all()
    print("products: ", products)



    seller_ids = (product.seller_id for product in products)
    if current_user.id in seller_ids:
        return {"error": "Seller cant order own product"}, 401

    order = Order(
        buyer_id = current_user.id,
        # address=requestBody["address"]
    )

    orderItems = [OrderItem(
        order=order,
        seller_id = products[product_id].seller_id,
        product_id = product_id,
        price = products[product_id].price,
        quantity = quantity)
        for product_id, quantity in cartArr]

    db.session.add_all(orderItems)
    db.session.commit()
    return {"id": order.id}, 201
