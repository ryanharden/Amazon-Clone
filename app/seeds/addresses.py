# from app.models import db, Address, environment, SCHEMA


# Adds a demo Address, you can add other Addresss here if you want
# def seed_addresses():
#     demo = Address(
#         user_id="", address="", city="", state="", zipcode="")
#     ryan = Address(
#         fullname='Ryan Harden', email='ryan@aa.io', password='password')
#     gabe = Address(
#         fullname='Gabriel Debaca', email='gabe@aa.io', password='password')
#     dave = Address(
#         fullname='David Harden', email='dave@aa.io', password='password')
#     sheryl = Address(
#         fullname='Sheryl Van Tassel', email='sheryl@aa.io', password='password')
#     nicole = Address(
#         fullname='Nicole Harden', email='nicole@aa.io', password='password')
#     ryans = Address(
#         fullname='Ryan Sellner', email='ryans@aa.io', password='password')
#     vicky = Address(
#         fullname='Vicky Chang', email='vikcy@aa.io', password='password')
#     pgav = Address(
#         fullname='Patrick Gavin', email='patrick@aa.io', password='password')

    # db.session.add(demo)
    # db.session.add(ryan)
    # db.session.add(gabe)
    # db.session.add(dave)
    # db.session.add(sheryl)
    # db.session.add(nicole)
    # db.session.add(ryans)
    # db.session.add(vicky)
    # db.session.add(pgav)
    # db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the Address table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.


# def undo_addresses():
#     if environment == "production":
#         db.session.execute(f"TRUNCATE table {SCHEMA}.addresses RESTART IDENTITY CASCADE;")
#     else:
#         db.session.execute("DELETE FROM Address")

#     db.session.commit()
