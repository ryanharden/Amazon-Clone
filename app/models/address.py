# from .db import db, environment, SCHEMA, add_prefix_for_prod
# import datetime

# class Address(db.Model):
#     __tablename__ = 'addresses'

#     if environment == "production":
#         __table_args__ = {'schema': SCHEMA}

#     id = db.Column(db.Integer, primary_key=True)
#     user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
#     first_name = db.Column(db.String(30), nullable=False)
#     last_name = db.Column(db.String(30), nullable=False)
#     address = db.Column(db.String(1000), nullable=False)
#     address2 = db.Column(db.String(1000))
#     city = db.Column(db.String(500), nullable=False)
#     state = db.Column(db.String(30), nullable=False)
#     zipcode = db.Column(db.String(20), nullable=False)
#     created_at = db.Column(db.DateTime, default= datetime.datetime.utcnow())
#     updated_at = db.Column(db.DateTime, default= datetime.datetime.utcnow())

#     created_at = db.Column(db.DateTime, default= datetime.datetime.utcnow())
#     updated_at = db.Column(db.DateTime, default= datetime.datetime.utcnow())

#     def to_dict(self):
#         return {
#             "id": self.id,
#             "user_id": self.user_id,
#             "first_name": self.first_name,
#             "last_name": self.last_name,
#             "address": self.address,
#             "address2": self.address2,
#             "city": self.city,
#             "state": self.state,
#             "zipcode": self.zipcode,
#         }
