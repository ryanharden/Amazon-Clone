# from flask_wtf import FlaskForm
# from wtforms import  StringField, SubmitField
# from wtforms.validators import DataRequired, Length

# class AddressForm(FlaskForm):
#     firstName = StringField("First Name", validators=[DataRequired(), Length(max=100)])
#     lastName = StringField("Last Name", validators=[DataRequired(), Length(max=100)])
#     address = StringField("Address", validators=[DataRequired(), Length(max=1000)])
#     address2 = StringField("Address2", validators=[Length(max=100)])
#     city = StringField("City", validators=[DataRequired(), Length(max=100)])
#     state = StringField("State", validators=[Length(max=100)])
#     zipcode = StringField("Zipcode", validators=[DataRequired(), Length(min=5, max=10)])
#     submit = SubmitField()
