from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import User, Product, ProductImage, db
from app.forms import ProductForm
from .user_routes import user_routes
from .image_routes import upload_product_images
import app.s3 as s3
# ( upload_file_to_s3, upload_image_file_to_s3, audio_file, get_unique_filename, image_file)

product_routes = Blueprint('products', __name__)


def validation_errors_to_error_messages(validation_errors):
  """
  Simple function that turns the WTForms validation errors into a simple list
  """
  errorMessages = []
  for field in validation_errors:
    for error in validation_errors[field]:
      errorMessages.append(f'{field} : {error}')
  return errorMessages

# @product_routes.route("")
# def products():
#     search_term = request.args.get("q", "")

#     # Filter products based on search term
#     products = Product.query.filter(Product.name.ilike(f"%{search_term}%")).all()

#     return {product.id: product.to_dict() for product in products}

# Get all products
@product_routes.route("")
def products():
    products = Product.query.all()
    return {product.id: product.to_dict_details() for product in products}


# Get User Products
@user_routes.route("/<int:id>/products")
def get_user_products(id):
    user = User.query.get(id)

    if not user:
        return {"errors": "User not found"}, 404

    products = user.products
    return {product.id: product.to_dict_details() for product in products}


# Get single product
@product_routes.route("/<int:id>")
def get_product(id):
    product = Product.query.get(id)

    if not product:
        return {"errors": "Product Not Found"}, 404

    return product.to_dict_details()


# Create Product
@product_routes.route("", methods=["POST"])
@login_required
def create_product():
    form = ProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        product = Product(
            seller_id = current_user.id,
            name = form.data["name"],
            description = form.data["description"],
            category = form.data["category"],
            price = form.data["price"],
            inventory = form.data["inventory"]
        )

        db.session.add(product)
        db.session.commit()

        return product.to_dict_details()

    if form.errors:
        return {"errors": validation_errors_to_error_messages(form.errors)}, 400

# Add image to Product
# @product_routes.route("/<int:id>/images", methods=["POST"])
# @login_required
# def add_product_images(id):

#     if "image" not in request.files:
#         return {"errors": "Image required"}, 400

#     images = request.files.getlist("image")
#     print("images: ", images)
#     image_list = []
#     for image in images:
#         url = image.product_image_url
#         product_image = ProductImage(
#             product_image_url = url,
#             product_id = id,
#         )

#         db.session.add(product_image)
#         db.session.commit()

        # image_dict = {"product_image_url": image_url}
    #     image_list.append(product_image.to_dict());
    # return image_list
    #This is the data being return from res2

@product_routes.route("/<int:id>/images", methods=["POST"])
@login_required
def add_product_images(id):

    if "images" not in request.files:
        return {"errors": "Image required"}, 400

    images = request.files.getlist("images")
    print("req.files: ", request.files)
    print("images-routes: ", images)
    image_list = []
    for image in images:
        print("image :", image)
        if not s3.image_file(image.filename):
            return {"errors": "file type not permitted"}, 400

        image.filename = s3.get_unique_filename(image.filename)

        upload = s3.upload_image_file_to_s3(image)
        print("upload :", upload)
        if "url" not in upload:
            return {"errors": upload}, 400

        image_url = upload["url"]

        product_image = ProductImage(
            product_image_url = image_url,
            product_id = id
            # number = request.form['number'] if request.form['number'] else None
        )

        db.session.add(product_image)
        db.session.commit()

        image_dict = {"product_image_url": image_url}
        image_list.append(image_dict)
    return image_list

# Edit Product
@product_routes.route("/<int:id>", methods=["PUT"])
@login_required
def edit_product(id):
    product = Product.query.get(id)

    if not product:
        return {"errors": "Product Not Found"}

    form = ProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # product.name = form.data["name"],
        # product.description = form.data["description"],
        # product.category = form.data["category"],
        # product.price = form.data["price"],
        # product.inventory = form.data["inventory"]
        form.populate_obj(product)
        db.session.add(product)
        db.session.commit()
        return product.to_dict_details()
    if form.errors:
        return {"errors": validation_errors_to_error_messages(form.errors)}, 400

# Delete Product
@product_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_product(id):
    product = Product.query.get(id)

    if not product:
        return {"errors": "Product Not Found"}

    ## Delete product images on cascade

    db.session.delete(product)
    db.session.commit()

    return {"message": "Delete Successful"}
