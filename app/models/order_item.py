from .db import db, environment, SCHEMA, add_prefix_for_prod
import datetime

class OrderItem(db.Model):
    __tablename__ = "order_items"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("order_details.id")), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("products.id")), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Float, nullable=False)

    # address = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("addresses.id")), nullable=False)

    order_details = db.relationship("OrderDetail", back_populates="order_items")
    product = db.relationship("Product", back_populates="order_items")

    def to_dict(self):
        return {
         "id": self.id,
         "order_id": self.order_id,
         "product_id": self.product_id,
         "quantity": self.quantity,
         "price": self.price,
        }

    def to_dict_details(self):
        return {
         "id": self.id,
         "order_id": self.order_id,
         "order_details": self.order_details.to_dict(),
         "product_id": self.product_id,
         "product": self.product.to_dict(),
         "quantity": self.quantity,
         "price": self.price,
        }
