from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired, NumberRange
from datetime import datetime


class CartItemForm(FlaskForm):
    # product_id = IntegerField("product_id")
    quantity = IntegerField("Quantity", validators=[DataRequired(), NumberRange(min=1)])
