# from app.models import db, Product, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
# def seed_products():

#     basic1 = Product(seller_id=1, name="Rainforest Basics 20 Pack AAA High-Performance Alkaline Batteries, 10-Year Shelf Life, Easy to Open Value Pack", description = "IN THE BOX: 20-pack of 1.5 volt AA alkaline batteries for reliable performance across a wide range of devices\nDEVICE COMPATIBLE: Ideal battery for game controllers, toys, flashlights, digital cameras, clocks, and more\nDESIGNED TO LAST: 10-year leak-free shelf life; store for emergencies or use right away\nEASY USE & STORAGE: Ships in Certified Frustration-Free Packaging; easy to open and store extras for later use\nSINGLE USE: These batteries are NOT rechargeable; for rechargeable options, check out Rainforest Basics rechargeable batteries", category="Electronics", price="14.86", inventory=50)
#     basic2 = Product(seller_id=2, name="Rainforest Basics 6-Piece Fade Resistant Bath, Hand and Washcloth Towel Set - Navy Blue", description="100% Cotton\nImported\n6-piece towel set includes (2) 54 x 30-inch bath towels, (2) 26 x 16-inch hand towels, and (2) 12 x 12-inch washcloths\nMade of soft, durable, absorbent cotton for lasting quality and comfort/nDesigned with a classic and simple pique border/nFade-resistant navy-blue color/nMade in OEKO-TEX Standard 100 factory, an independent certification system that ensures textiles meet high safety and environmental standards.", category="Bathroom", price="22.03", inventory=70)
#     basic3 = Product(seller_id=3, name="Rainforest Basics Slim, Velvet, Non-Slip Shirt Clothes Hangers, Black/Silver - Pack of 30", description="Set of 30 matching hangers to help keep shirts, jackets, sweaters and dresses supported and organized\nVelvet texture surface and notched shoulders to prevent slipping\nUltra slim profile to maximize space in your closet\nSturdy design can hold up to 10 pounds\nDimensions: each hanger measures 16.4 x 0.2 x 8.9 inches (LxWxH)", category="Bedroom", price="16.93", inventory=60)
#     basic4 = Product(seller_id=4, name="Rainforest Basics Medicine Ball for Workouts Exercise Balance Training", description = "10-pound weighted medicine ball for upper, lower, and full body exercises\nConstructed with sturdy, firm rubber with weight labeled on both sides of ball; lightly textured surface provides a superior grip\nCan bounce off hard surfaces (for slam ball workouts, search Rainforest Basics Slam Ball)\nDesigned for classic medicine ball workouts, including ball toss, weighted twists, squats, sit ups, and more\nIdeal for developing core strength, balance, and coordination\nDimensions: 9.3 inches in diameter", category="fitness", price="32.74", inventory=60)
    # basic1 = Product(seller_id=1, name="", description = "", category="", price="", inventory=50)
    # basic1 = Product(seller_id=1, name="", description = "", category="", price="", inventory=50)
    # basic1 = Product(seller_id=1, name="", description = "", category="", price="", inventory=50)
    # basic1 = Product(seller_id=1, name="", description = "", category="", price="", inventory=50)
    # basic1 = Product(seller_id=1, name="", description = "", category="", price="", inventory=50)
    # basic1 = Product(seller_id=1, name="", description = "", category="", price="", inventory=50)
    # basic1 = Product(seller_id=1, name="", description = "", category="", price="", inventory=50)
    # basic1 = Product(seller_id=1, name="", description = "", category="", price="", inventory=50)
    # basic1 = Product(seller_id=1, name="", description = "", category="", price="", inventory=50)
    # basic1 = Product(seller_id=1, name="", description = "", category="", price="", inventory=50)
    # basic1 = Product(seller_id=1, name="", description = "", category="", price="", inventory=50)
    # basic1 = Product(seller_id=1, name="", description = "", category="", price="", inventory=50)
    # basic1 = Product(seller_id=1, name="", description = "", category="", price="", inventory=50)
    # basic1 = Product(seller_id=1, name="", description = "", category="", price="", inventory=50)
    # basic1 = Product(seller_id=1, name="", description = "", category="", price="", inventory=50)
    # basic1 = Product(seller_id=1, name="", description = "", category="", price="", inventory=50)
    # basic1 = Product(seller_id=1, name="", description = "", category="", price="", inventory=50)
    # basic1 = Product(seller_id=1, name="", description = "", category="", price="", inventory=50)
    # basic1 = Product(seller_id=1, name="", description = "", category="", price="", inventory=50)
    # basic1 = Product(seller_id=1, name="", description = "", category="", price="", inventory=50)
    # basic1 = Product(seller_id=1, name="", description = "", category="", price="", inventory=50)
    # basic1 = Product(seller_id=1, name="", description = "", category="", price="", inventory=50)
    # basic1 = Product(seller_id=1, name="", description = "", category="", price="", inventory=50)
    # basic1 = Product(seller_id=1, name="", description = "", category="", price="", inventory=50)
    # basic1 = Product(seller_id=1, name="", description = "", category="", price="", inventory=50)
    # basic1 = Product(seller_id=1, name="", description = "", category="", price="", inventory=50)
    # basic1 = Product(seller_id=1, name="", description = "", category="", price="", inventory=50)
    # basic1 = Product(seller_id=1, name="", description = "", category="", price="", inventory=50)
    # basic1 = Product(seller_id=1, name="", description = "", category="", price="", inventory=50)

    # db.session.add(basic1)
    # db.session.add(basic2)
    # db.session.add(basic3)
    # db.session.add(basic4)
    # db.session.add(sheryl)
    # db.session.add(nicole)
    # db.session.add(ryans)
    # db.session.add(vicky)
    # db.session.add(pgav)
    # db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.


# def undo_products():
#     if environment == "production":
#         db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
#     else:
#         db.session.execute("DELETE FROM products")

#     db.session.commit()
