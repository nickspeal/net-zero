# Net Zero Carbon Footprint

Measure your carbon footprint so that you can manage it!


## How to Run the App for Development

* Run the frontend in a development server on port 3000: `cd client && npm run start`
* This way the BrowserRouter handles almost all urls
* A proxy route for `/api` is specified in package.json. All requests to this route are forwarded to port 5000 to be handled by the Node server
* Run the node server: `npm run start`
* The node server now handles requests to the `/api` endpoint
* Navigate the browser to localhost:3000 and observe that the client handles requests to all endpoints eccept `/api`. Notice that the node server handles requests to `/api`.

## How to run for "Production"

* This isn't really production yet, but it no longer uses the create-react-app development server
* Build the client into static files in the `client/build` directory: `cd client && npm run build`
* Run the node server: `npm run start`
* Navigate the browser to localhost:5000 (different port this time!)
* Observe that all requests are handled by the only server that is running.
* Requests to `/gibberish` get index.html as a response
* Requests to `/api` are handled by express
* Requests for static assets (i.e. css requested by the client from index.html) are handled by the express static middleware
