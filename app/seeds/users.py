from app.models import db, User, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        fullname='Demo', email='demo@aa.io', password='password')
    ryan = User(
        fullname='Ryan Harden', email='ryan@aa.io', password='password')
    gabe = User(
        fullname='Gabriel Debaca', email='gabe@aa.io', password='password')
    dave = User(
        fullname='David Harden', email='dave@aa.io', password='password')
    sheryl = User(
        fullname='Sheryl Van Tassel', email='sheryl@aa.io', password='password')
    nicole = User(
        fullname='Nicole Harden', email='nicole@aa.io', password='password')
    ryans = User(
        fullname='Ryan Sellner', email='ryans@aa.io', password='password')
    vicky = User(
        fullname='Vicky Chang', email='vicky@aa.io', password='password')
    pgav = User(
        fullname='Patrick Gavin', email='patrick@aa.io', password='password')

    db.session.add(demo)
    db.session.add(ryan)
    db.session.add(gabe)
    db.session.add(dave)
    db.session.add(sheryl)
    db.session.add(nicole)
    db.session.add(ryans)
    db.session.add(vicky)
    db.session.add(pgav)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")

    db.session.commit()
