from flask import Blueprint, abort, request, Response, jsonify
from app import app, models, db
from sqlalchemy.exc import IntegrityError
from datetime import datetime



resources_bp = Blueprint('resources_bp', __name__, url_prefix='/api/resource')

@resources_bp.route('/create', methods=['POST'])
def create():
    name = request.json.get('name')
    mpg = float(request.json.get('mpg'))
    campaign_id = request.json.get('campaign')
    carbon_to_manufacture = request.json.get('carbon_to_manufacture')
    expected_life_km: request.json.get('expected_life_km')
    units: request.json.get('units')
    
    # Convert MPG to L/100KM
    GAL_PER_L = 0.2641729
    KM_PER_MILE = 1.609344
    fuel_l_per_100km = 100 / (mpg * GAL_PER_L * KM_PER_MILE )

    vehicle = models.Vehicle(
        name=name,
        fuel_l_per_100km=fuel_l_per_100km,
        campaign_id=campaign_id,
        carbon_to_manufacture=carbon_to_manufacture,
        expected_life_km=expected_life_km,
        units=units,
    )
    # Associate the vehicle with the campaign
    campaign = models.Campaign.query.filter_by(id=campaign_id).first_or_404()
    vehicle.campaigns.append(campaign)

    db.session.add(vehicle)
    db.session.commit()
    return vehicle.jsonify(), 201

@resources_bp.route('/<id>', methods=['GET'])
def get(id):
    vehicle = models.Vehicle.query.filter_by(id=id).first_or_404()
    return vehicle.jsonify()

@resources_bp.route('/<id>/history', methods=['POST'])
def append_to_history(id):
    date = datetime.strptime(request.json.get('date'), models.DATE_FORMAT_ISO8061)
    value = request.json.get('value')
    history_item = models.ResourceMeasurement(
        date=date,
        value=value,
        resource=id,
    )
    vehicle = models.Vehicle.query.filter_by(id=id).first_or_404()
    db.session.add(history_item)
    db.session.commit()
    return vehicle.jsonify(), 201
