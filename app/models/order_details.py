# from .db import db, environment, SCHEMA, add_prefix_for_prod
# from datetime import datetime

# class OrderDetail(db.Model):
#     __tablename__ = "order_details"

#     if environment == "production":
#         __table_args__ = {'schema': SCHEMA}

#     id = db.Column(db.Integer, primary_key=True)
#     user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
#     total = db.Column(db.Float, nullable=False)
#     created_at = db.Column(db.DateTime, default=datetime.utcnow())
#     # updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

#     order_items = db.relationship("OrderItem", back_populates="order_details", cascade="all, delete")
#     user = db.relationship("User", back_populates="order_details")

#     def to_dict(self):
#         return {
#             "id": self.id,
#             "user_id": self.user_id,
#             "total": self.total,
#             "created_at": self.created_at,
#             "updated_at": self.updated_at,
#         }
