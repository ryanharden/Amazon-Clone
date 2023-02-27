from .db import db, environment, SCHEMA, add_prefix_for_prod
import datetime

class ProductImage(db.Model):
    __tablename__ = "product_images"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("products.id")))
    url = db.Column(db.String(255), nullable=False)
    # preview = db.Column(db.Boolean, nullable=False)
    # number = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default= datetime.datetime.utcnow())

    product = db.relationship("Product", back_populates="images")

    def to_dict(self):
        return {
            "id": self.id,
            "product_id": self.product_id,
            "url": self.url,
            # "preview": self.preview
        }

    def to_dict_product(self):
        return {
            "id": self.id,
            "url": self.url
        }
