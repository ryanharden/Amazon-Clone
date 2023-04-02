from flask_wtf import FlaskForm
from wtforms import StringField,DecimalField,IntegerField, SubmitField
from wtforms.validators import DataRequired, Email, ValidationError, Length,NumberRange

class ReviewForm(FlaskForm):
    rating = IntegerField("Rating", validators=[DataRequired(), NumberRange(min=1)])
    headline = StringField("Headline", validators=[Length(min=3,max=100)])
    body = StringField("Body", validators=[DataRequired(), Length(min=1,max=5000, message='Reviews be between 1 and 5000 characters')])
    submit = SubmitField()
