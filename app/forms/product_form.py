from flask_wtf import FlaskForm
from wtforms import StringField,DecimalField,IntegerField, TextAreaField
from wtforms.validators import DataRequired, Email, ValidationError,Length,NumberRange
from datetime import datetime

class ProductForm(FlaskForm):
    name = StringField("Name", validators=[DataRequired()])
    description = TextAreaField("Description")
    category = StringField("Category", validators=[DataRequired()])
    price = DecimalField("Price", validators=[DataRequired()])
    inventory = IntegerField("Inventory", validators=[DataRequired(), NumberRange(min=1)])
