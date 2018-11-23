# Net Zero Carbon Footprint

Measure your carbon footprint so that you can manage it!

## How to Run the Client App for Development

* Run the frontend in a development server on port 3000: `cd client && npm run start`
* This way the BrowserRouter handles almost all urls

## How to Run the Backend for Development

* From the server directory:
    * In a virtualenv, `pip install -r requirements.txt`
    * If you want to throw away old data or create a new empty database, `python reset_db.py`
    * `flask run`

## Data Model

* The data model is centered around campaigns: An effort to track net carbon footprint within some context.
* One context is a user. There is a personal campaign for each user, to track that user's individual footprint
* There are also group campaigns that have multiple users, i.e. for a group to track the footprint of a shared activity
* Each resource and consumption can be associated with multiple campaigns
* All of the above relationships are many-to-many
* An offset, once purchased, can be applied towards a single campaign (thus each offset has a single associated campaign id)
* Each consumption has an isOffset flag, which can be set by subtracting from the campaign's availableToOffset reserve.
* Resources should be able to be offset on time ranges from campaigns, TBD how.