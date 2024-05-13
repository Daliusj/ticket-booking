# REQUIREMENTS

## Database Schema Design

### Create Tables

- **screenings** (id, movie_id, timestamp, total_tickets, available_tickets)
- **tickets** (id, screening_id, booking_time)

## Administrator Routes

### Create Screening

- **Endpoint:** `POST /screenings`
- **Validation:** movie_id (integer not null), timestamp (integer "YYYY-MM-DD HH:MM"), total_tickets (integer not null).
- **Logic:** Insert a new screening into the database.

### Delete Screening (Optional)

- **Endpoint:** `DELETE /screenings/:id`
- **Validation:** ID(integer not null).
- **Logic:** Check if the screening is empty (no tickets booked) and delete it if true.

### Update Screening Ticket Allocation (Optional)

- **Endpoint:** `PATCH /screenings/:id`
- **Validation:** ID(integer not null).
- **Logic:** Ensure the new ticket allocation is not lower than the number of reserved tickets before updating.

## User Routes

### Get Movies

- **Endpoint:** `GET /movies?id=1,2,3`
- **Query Parameters:** List of movie IDs.
- **Validation:** list of intger id's.
- **Logic:** Fetch and return movies with their title and year based on the provided IDs.

### Get Screenings

- **Endpoint:** `GET /screenings`
- **Validation:** None required.
- **Logic:** Fetch and return a list of available screenings, including session information and associated movie details.

### Get User Bookings

- **Endpoint:** `GET /tickets`
- **Validation:** Validate the user ID in the URL.
- **Logic:** Fetch and return a list of bookings (tickets) for the specified user.

### Create Booking

- **Endpoint:** `POST /tickets`
- **Validation:** validate the request body (user_id, screening_id).
- **Logic:** Check if tickets are available and create a new booking if true.

**Note:** For this exercise, we have provided an `.env` file with the database connection string. Normally, you would not commit this file to version control. We are doing it here for simplicity and given that we are using a local SQLite database.

# Setup

## Migrations

Before running the migrations, we need to create a database. We can do this by running the following command:

```bash
npm run migrate:latest
```

## Running the server

In development mode:

```bash
npm run dev
```

In production mode:

```bash
npm run start
```

## Updating types

If you make changes to the database schema, you will need to update the types. You can do this by running the following command:

```bash
npm run generate-types
```
