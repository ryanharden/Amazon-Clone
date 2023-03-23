from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Order(db.Model):
    __tablename__ = "orders"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    buyer_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    address = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("addresses.id")), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow())

    order_items = db.relationship("OrderItem", back_populates="order")
