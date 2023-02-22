from flask_wtf import FlaskForm
from wtforms import StringField,DecimalField,IntegerField
from wtforms.validators import DataRequired, Email, ValidationError,Length,NumberRange

class ReviewForm(FlaskForm):
    review_image_url = StringField("Upload Image URL")
    rating = IntegerField("Rating", validators=[DataRequired(), NumberRange(min=1)])
    headline = StringField("Headline")
    body = StringField("Body", validators=[DataRequired(), Length(min=1,max=5000, message='Reviews be between 1 and 5000 characters')])
