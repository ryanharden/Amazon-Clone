from app.models import db, User, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        first_name='Demo', last_name="User", email='demo@aa.io', password='password')
    ryan = User(
        first_name='Ryan', last_name='Harden', email='ryan@aa.io', password='password')
    gabe = User(
        first_name='Gabriel', last_name='Debaca', email='gabe@aa.io', password='password')
    dave = User(
        first_name='David', last_name='Harden', email='dave@aa.io', password='password')
    sheryl = User(
        first_name='Sheryl', last_name='Van Tassel', email='sheryl@aa.io', password='password')
    nicole = User(
        first_name='Nicole', last_name='Harden', email='nicole@aa.io', password='password')
    ryans = User(
        first_name='Ryan', last_name='Sellner', email='ryans@aa.io', password='password')
    vicky = User(
        first_name='Vicky', last_name='Chang', email='vicky@aa.io', password='password')
    pgav = User(
        first_name='Patrick', last_name='Gavin', email='patrick@aa.io', password='password')

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
