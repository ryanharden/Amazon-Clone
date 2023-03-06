from flask_wtf import FlaskForm
from wtforms import StringField,DecimalField,IntegerField, TextAreaField
from wtforms.validators import DataRequired, Email, ValidationError,Length,NumberRange
from datetime import datetime

# def name_length(form, field):
#     name = field.data
#     if len(name) < 2:
#         raise ValidationError("Name must be more 2 characters")
#     if len(name) > 500:
#         raise ValidationError("Name must be less than 500 characters")

# def description_length(form, field):
#     description = field.data
#     if len(description) < 3:
#         raise ValidationError("description must be more 3 characters")
#     if len(description) > 3000:
#         raise ValidationError("Name must be less than 3000 characters")

class ProductForm(FlaskForm):
    name = StringField("Name", validators=[DataRequired()])
    description = TextAreaField("Description")
    category = StringField("Category", validators=[DataRequired()])
    price = DecimalField("Price", validators=[DataRequired()])
    inventory = IntegerField("Inventory", validators=[DataRequired(), NumberRange(min=1)])
