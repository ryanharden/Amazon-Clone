from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import User, Product, ProductImage, db
from app.forms import ProductForm
import app.s3 as s3
# ( upload_file_to_s3, upload_image_file_to_s3, audio_file, get_unique_filename, image_file)

product_routes = Blueprint('products', __name__)

# Get all products
@product_routes.route("")
def products():
    products = Product.query.all()
    return {product.id: product.to_dict() for product in products}


# Get single product
@product_routes.route("/<int:id")
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
            name = form.name.data,
            description = form.description.data,
            category = form.category.data,
            price = form.price.data,
            inventory = form.inventory.data
        )
        db.session.add(product)
        db.session.commit()
        return product.to_dict()


# Add Image to Product
@product_routes.route("/<int:id>/images", methods=["POST"])
@login_required
def add_product_image(id):

    if "image" not in request.files:
        return {"errors": "Image required"}, 400

    image = request.files["image"]

    if not s3.image_file(image.filename):
        return {"errors": "file type not permitted"}, 400

    image.filename = s3.get_unique_filename(image.filename)

    upload = s3.upload_image_file_to_s3(image)

    if "url" not in upload:
        return {"errors": upload}, 400

    image_url = upload["url"]

    product_image = ProductImage(
        product_id = id,
        product_image_url = image_url,
        preview = request.form["preview"] == 'true',
        number = request.form['number'] if request.form['number'] else None
    )

    db.session.add(product_image)
    db.session.commit()
    return product_image.to_dict()


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
        product.name = form.name.data,
        product.description = form.description.data,
        product.category = form.category.data,
        product.price = form.price.data,
        product.inventory = form.inventory.data

        db.session.commit()
        return product.to_dict()


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


