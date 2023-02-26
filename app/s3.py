import boto3
import botocore
import os
import uuid
# from werkzeug.utils import secure_filename

PHOTO_BUCKET = os.environ.get("S3_PHOTO_BUCKET")

S3_PHOTO_LOCATION = f"https://{PHOTO_BUCKET}.s3.amazonaws.com/"

IMAGE_EXTENSIONS = {"jpg", "jpeg", "png", "gif"}


s3 = boto3.client(
   "s3",
   aws_access_key_id=os.environ.get("S3_KEY"),
   aws_secret_access_key=os.environ.get("S3_SECRET")
)

def image_file(filename):
    return "." in filename and \
           filename.rsplit(".", 1)[1].lower() in IMAGE_EXTENSIONS


def get_unique_filename(filename):
    ext = filename.rsplit(".", 1)[1].lower()
    unique_filename = uuid.uuid4().hex
    return f"{unique_filename}.{ext}"


def upload_image_file_to_s3(file, acl="public-read"):
    try:
        s3.upload_fileobj(
            file,
            PHOTO_BUCKET,
            file.filename,
            ExtraArgs={
                "ACL": acl,
                "ContentType": file.content_type
            }
        )
    except Exception as e:
        # in the case that our s3 upload fails
        return { "errors": str(e) }

    return { "url": f"{S3_PHOTO_LOCATION}{file.filename}" }


def remove_image_file_from_s3(key):
    try:
        s3.delete_object(
        Bucket=PHOTO_BUCKET,
        Key=key
        )
    except Exception as e:
        return { "errors": str(e) }

# def upload_image_to_bucket_from_url(url, acl="public-read"):
#     image_name = secure_filename(os.path.basename(url))
#     bucket_url = f"{CLOUDFRONT_LOCATION}{image_name}"

#     # Don't bother the third party if we already have the image
#     try:
#         s3.head_object(Bucket=BUCKET_NAME, Key=image_name)
#     except Exception:
#         print("Downloading", url)
#         response = requests.get(url, stream=True)
#         try:
#             s3.upload_fileobj(
#                 response.raw,
#                 BUCKET_NAME,
#                 image_name,
#                 ExtraArgs={
#                     "ACL": acl,
#                 }
#             )
#         except Exception as e:
#             # in case the our s3 upload fails
#             return {"errors": str(e)}

#     return bucket_url
