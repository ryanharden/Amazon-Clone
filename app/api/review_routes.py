from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import User, Product, Review, db, ReviewImage
from app.forms import ReviewForm
from .product_routes import validation_errors_to_error_messages, product_routes
import datetime
import app.s3 as s3

review_routes = Blueprint("reviews", __name__)


# Get Reviews by product id
@product_routes.route("/<int:product_id/reviews")
def get_reviews(product_id):
    reviews = Review.query.filter(Review.product_id == product_id).order_by(Review.created_at).all()

    if reviews:
        # return [json.dumps(comment.to_dict() for comment in comments)]
        return [review.to_dict() for review in reviews]
    else:
        return {"Error": "No Reviews Found"}
        
# Create Review
@product_routes.route("/<int:product_id>/reviews", methods=["POST"])
@login_required
def create_review(product_id):
    form = ReviewForm()
    form['crsf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        review = Review(
            headline = form.data["headline"],
            body = form.data["body"],
            rating = form.data["rating"],
            created_at = datetime.datetime.utcnow(),
            product_id = product_id
        )
        db.session.add(review)
        db.session.commit()
        return review.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)}, 400

@product_routes.route("/<int:product_id>/reviews/<int:review_id>/images", methods=["POST"])
@login_required
def add_review_images(review_id):
    # print("hi im here")
    if "images" not in request.files:
        return {"errors": "Image required"}, 400

    images = request.files.getlist("images")
    image_list = []
    for image in images:
        # print("image :", image)
        if not s3.image_file(image.filename):
            # print("File type not permitted:", image.filename)
            return {"errors": "file type not permitted"}, 400

        image.filename = s3.get_unique_filename(image.filename)

        upload = s3.upload_image_file_to_s3(image)
        # print("upload :", upload)
        if "url" not in upload:
            # print("Upload failed:", upload)
            return {"errors": upload}, 400

        image_url = upload["url"]

        review_image = ReviewImage(
            url = image_url,
            review_id = review_id
        )

        db.session.add(review_image)
        db.session.commit()

        image_dict = {"url": image_url}
        image_list.append(image_dict)
    return image_list

# Edit Review
@review_routes.route("/<int:id>", methods=["PUT"])
@login_required
def edit_review(id):
    form = ReviewForm()
    review = Review.query.get(id)

    if current_user.id == review.buyer_id:
        review.headline = form.data["headline"],
        review.body = form.data["body"],
        review.rating = form.data["rating"],

        db.session.add(review)
        db.session.commit()
        return review.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)}, 400

# Delete Review
@review_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_review(id):
    review = Review.query.get(id)
    if not review:
        return {"error": "Review not found"}
    db.session.delete(review)
    db.session.commit()
    return {"message": "Delete successful"}
