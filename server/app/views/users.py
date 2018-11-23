from flask import Blueprint, abort, request, Response, jsonify
from app import app, models, db
from sqlalchemy.exc import IntegrityError

user_bp = Blueprint('user_bp', __name__, url_prefix='/api/user')


@user_bp.route('/signup', methods=['POST'])
def signup():
    try:
        username=request.json.get('username')
        user = models.User(
            username=username,
        )
        # Create a new Campaign for the user
        campaign = models.Campaign(
            name="Personal Campaign for {}".format(username)
        )
        campaign.users.append(user)

        # Insert the user and campaign in the database
        db.session.add(campaign)
        db.session.commit()
        return user.jsonify(), 201
    except IntegrityError:
        return 'Username Taken', 400

@user_bp.route('/login', methods=['POST'])
def login():
    user = models.User.query.filter_by(username=request.json.get('username')).first_or_404()
    return user.jsonify()

@user_bp.route('/<username>', methods=['GET'])
def get_user(username):
    user = models.User.query.filter_by(username=username).first_or_404()
    return user.jsonify()
