from .db import db, environment, SCHEMA, add_prefix_for_prod
import datetime

class Product(db.Model):
    __tablename__ = 'products'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    seller_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(500))
    category = db.Column(db.String(30), nullable=False)
    price = db.Column(db.Float, nullable=False)
    inventory = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow())
    updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow())

    seller = db.relationship("User", back_populates="products")
    reviews = db.relationship("Review", back_populates="product", cascade="all, delete")
    product_images = db.relationship("ProductImage", back_populates="product", order_by="ProductImage.number", cascade="all, delete")
    cart_items = db.relationship("CartItem", back_populates="product")
    order_items = db.relationship("OrderItem", back_populates="product")
    
    def to_dict(self):
        return {
            "id": self.id,
            "seller": self.seller.to_dict(),
            "name": self.name,
            "description": self.description,
            "price": self.price
        }

    def to_dict_details(self):
        product_images = [image.product_image_url for image in sorted(self.product_images, key=lambda x: x.number)]
        preview_images = [image for image in self.product_images if image.preview]

        return {
            "id": self.id,
            "seller": self.seller.to_dict_product(),
            "name": self.name,
            "description": self.description,
            "price": self.price,
            "num_ratings": len(self.reviews),
            "avg_rating": sum([review.rating for review in self.reviews]) / len(self.reviews) if len(self.reviews) > 0 else None,
            "preview_image": preview_images[0].product_image_url if len(preview_images) else None,
            "product_images": [image.to_dict_product() for image in product_images]
        }
