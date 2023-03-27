from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Review(db.Model):
    __tablename__ = "reviews"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("products.id")), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    headline = db.Column(db.String(100))
    body = db.Column(db.String(5000))
    created_at = db.Column(db.DateTime, default=datetime.utcnow())
    updated_at = db.Column(db.DateTime, default=datetime.utcnow(), onupdate=datetime.utcnow())

    product = db.relationship("Product", back_populates="reviews")
    # buyer = db.relationship("User", )
    images = db.relationship("ReviewImage", back_populates="review", order_by="ReviewImage.id", cascade="all, delete-orphan")
    user = db.relationship("User", back_populates="reviews")

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "product_id": self.product_id,
            "rating": self.rating,
            "headline": self.headline,
            "body": self.body,
            "created_at": self.created_at,
            "user": self.user.to_dict(),
            "images": [image.to_dict() for image in self.images]
        }
