from .db import db, environment, SCHEMA, add_prefix_for_prod
import datetime

class ReviewImage(db.Model):
    __tablename__ = "review_images"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    review_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("reviews.id")), nullable=False)
    url = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default= datetime.datetime.utcnow())

    review = db.relationship("Review", back_populates="images")

    def to_dict(self):
        return {
            "id": self.id,
            "review_id": self.review_id,
            "url": self.url,
        }
