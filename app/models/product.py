from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Product(db.Model):
    __tablename__ = 'products'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    seller_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    name = db.Column(db.String(300), nullable=False)
    description = db.Column(db.String(5000))
    category = db.Column(db.String(30), nullable=False)
    price = db.Column(db.DECIMAL(50, 2), nullable=False)
    inventory = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow())
    updated_at = db.Column(db.DateTime, default=datetime.utcnow(), onupdate=datetime.utcnow())

    seller = db.relationship("User", back_populates="products")
    reviews = db.relationship("Review", back_populates="product", cascade="all, delete")
    images = db.relationship("ProductImage", back_populates="product", cascade="all, delete")
    cart_items = db.relationship("CartItem", back_populates="product")
    order_items = db.relationship("OrderItem", back_populates="product")

    def to_dict(self):
        return {
            "id": self.id,
            "seller": self.seller.to_dict(),
            "name": self.name,
            "description": self.description,
            "category": self.category,
            "price": str(self.price),
            "inventory": self.inventory
        }

    def to_dict_details(self):
        # product_images = [image.product_image_url for image in sorted(self.product_images, key=lambda x: x.number)]
        # preview_images = [image for image in self.product_images if image.preview]
        return {
            "id": self.id,
            "seller": self.seller.to_dict_product(),
            "name": self.name,
            "description": self.description,
            "category": self.category,
            "price": str(self.price),
            "inventory": self.inventory,
            # "num_ratings": len(self.reviews),
            # "avg_rating": sum([review.rating for review in self.reviews]) / len(self.reviews) if len(self.reviews) > 0 else None,
            # "preview_image": preview_images[0].product_image_url if len(preview_images) else None,
            "images": [image.to_dict_product() for image in self.images]
        }
