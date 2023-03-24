from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import Order, OrderItem, Product, db

order_routes = Blueprint('orders', __name__)

# Get Users Orders
@order_routes.route("/current")
@login_required
def get_users_orders():
    orders = Order.query.filter(Order.buyer_id == current_user.id).all()
    order_items = [{"order_items": [orderItem.to_dict() for orderItem in order.order_items], "created_at": order.created_at, "id": order.id} for order in orders]
    return order_items

# Create Order
@order_routes.route("", methods=["POST"])
@login_required
def create_order():
    requestBody = request.get_json()
    cart = requestBody["cart"]
    print("cart: ", cart)
    # cart:  {'1': {'id': 1, 'product_id': 40, 'quantity': 1, 'user_id': 1}}
    # cart:  {'1': {'id': 1, 'product_id': 40, 'quantity': 1, 'user_id': 1}, '2': {'id': 2, 'product_id': 13, 'quantity': 1, 'user_id': 1}}
    productIds = [item['product_id'] for item in cart.values()]
    print("productIds: ", productIds)
    # productIds = [item.product_id for item in cartArr]

    products = Product.query.filter(Product.id.in_(productIds)).all()
    print("products: ", products)
    print("product.price", products[0].price)
    print("product.seller_id: ", products[0].seller_id)

    products_by_id = {product.id: product for product in products}
    print("products_by_id: ", products_by_id)

    seller_ids = (product.seller_id for product in products)
    if current_user.id in seller_ids:
        return {"error": "Seller cant order own product"}, 401

    order = Order(
        buyer_id = current_user.id,
        # address=requestBody["address"]
    )

    orderItems = [OrderItem(
        order=order,
        seller_id = products_by_id[item["product_id"]].seller_id,
        product_id = item["product_id"],
        price = products_by_id[item["product_id"]].price,
        quantity = item["quantity"])
        for item in cart.values()]

    db.session.add_all(orderItems)
    db.session.commit()
    return {"id": order.id}, 201

# Delete Order
@order_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_order(id):
    order= Order.query.filter(Order.id == id, Order.buyer_id == current_user.id).first()

    if not order:
        return {
            "errors": "The order was not found"
        }

    order_items = OrderItem.query.filter(OrderItem.order_id == id).all()
    for item in order_items:
        db.session.delete(item)

    db.session.delete(order)
    db.session.commit()
    # print("Successfully Deleted")
    return order.to_dict()
