# Repository instructions

## Build, run, and test

- Install dependencies with `npm install`.
- Start the app with `node app.js`. A local MongoDB server must be available at `mongodb://localhost:27017/wonderlust`; the Express server listens on port `5000` after connecting.
- Populate the database with the sample listings using `node init/index.js`. The seed script uses the same local MongoDB database.
- There is no build or lint script, test framework, or project test suite configured. `npm test` is currently a placeholder that exits with an error, and there is no single-test command.

## Architecture

This is a server-rendered listings app. `app.js` connects to MongoDB through Mongoose, defines the Express routes, parses URL-encoded form submissions, and renders EJS templates. Listing persistence and field rules live in `models/listing.js`. The three page templates under `views/listings/` render the listing index, add form, and detail page. The sample records are defined in `init/data.js` and inserted by `init/index.js`.

The current route flow is:

- `GET /listings` loads all records and renders the index.
- `GET /listings/add` renders the creation form.
- `POST /listings/add_new` creates a Mongoose listing from the submitted form fields and redirects to the index.
- `GET /listings/:id` loads one record and renders its detail page.

## Project-specific conventions

- Server-side JavaScript uses CommonJS (`require` and `module.exports`); views use EJS.
- Keep form input names aligned with the Mongoose schema fields (`title`, `description`, `image`, `price`, `location`, and `country`), since Express passes the parsed request body directly into the listing model.
- Listing validation and image fallback behavior belong in the Mongoose schema. An empty image string is replaced with the schema's default image URL.
- Keep the fixed `GET /listings/add` route before `GET /listings/:id`; otherwise `add` can be treated as a listing ID.
- EJS output currently uses escaped interpolation (`<%= ... %>`); preserve escaping when rendering user-provided listing values.
- Seed data is exported as an object with a `data` array, which `init/index.js` passes to `Listing.insertMany`.
