from flask import Blueprint, abort, request, Response, jsonify
from app import app, models, db
from sqlalchemy.exc import IntegrityError

campaign_bp = Blueprint('campaign_bp', __name__, url_prefix='/api/campaign')


@campaign_bp.route('/create', methods=['POST'])
def create():
    username = request.json.get('username')
    name = request.json.get('name')
    print("Creating campaign with name ", name)
    try:
        campaign = models.Campaign(
            name=name,
        )
        # Associate the user with the campaign
        user = models.User.query.filter_by(username=username).first_or_404()
        campaign.users.append(user)
        
        db.session.add(campaign)
        db.session.commit()
        return campaign.jsonify(), 201
    except IntegrityError:
        return 'Name Taken', 400

@campaign_bp.route('/<id>', methods=['GET'])
def get(id):
    
    campaign = models.Campaign.query.filter_by(id=id).first_or_404()
    return campaign.jsonify()
