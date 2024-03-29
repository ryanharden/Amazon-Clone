from .db import db, environment, SCHEMA, add_prefix_for_prod

class CartItem(db.Model):
    __tablename__ = 'cartitems'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("products.id")), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)

    user = db.relationship("User", back_populates="cart_items")
    product = db.relationship("Product", back_populates="cart_items", lazy='joined')

    def to_dict(self):
        return{
         "id": self.id,
         "user_id": self.user_id,
         "product_id": self.product_id,
         "quantity": self.quantity
        }

    def to_dict_details(self):
        return{
         "id": self.id,
         "user_id": self.user_id,
         "product_id": self.product_id,
         "quantity": self.quantity,
         "user": self.user.to_dict(),
         "product": self.product.to_dict()
        }
