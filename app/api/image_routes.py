from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import User, Product, ProductImage, db
from app.forms import ProductForm
from .user_routes import user_routes
import app.s3 as s3

image_routes = Blueprint('images', __name__)

# @image_routes.route("", methods=["POST"])
# @login_required
# def upload_product_image():

#     if "image" not in request.files:
#         return {"errors": "Image required"}, 400

#     image = request.files["image"]

#     if not s3.image_file(image.filename):
#         return {"errors": "file type not permitted"}, 400

#     image.filename = s3.get_unique_filename(image.filename)

#     upload = s3.upload_image_file_to_s3(image)

#     if "url" not in upload:
#         return {"errors": upload}, 400

#     image_url = upload["url"]

#     product_image = ProductImage(
#         product_image_url = image_url,
#         # number = request.form['number'] if request.form['number'] else None
#     )

#     db.session.add(product_image)
#     db.session.commit()
#     return product_image.to_dict()

@image_routes.route("", methods=["POST"])
@login_required
def upload_product_images():

    if "images" not in request.files:
        return {"errors": "Image required"}, 400

    images = request.files.getlist("images")
    # print("req.files: ", request.files)
    # print("images-routes: ", images)
    image_list = []
    for image in images:
        # print("image :", image)
        if not s3.image_file(image.filename):
            return {"errors": "file type not permitted"}, 400

        image.filename = s3.get_unique_filename(image.filename)

        upload = s3.upload_image_file_to_s3(image)
        # print("upload :", upload)
        if "url" not in upload:
            return {"errors": upload}, 400

        image_url = upload["url"]

        product_image = ProductImage(
            url = image_url,
            # number = request.form['number'] if request.form['number'] else None
        )

        db.session.add(product_image)
        db.session.commit()

        image_dict = {"url": image_url}
        image_list.append(image_dict)
    return image_list

@image_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_image(id):
    product_image = ProductImage.query.get(id)
    db.session.delete(product_image)
    db.session.commit()
    return {"message": "Successfully Deleted"}
