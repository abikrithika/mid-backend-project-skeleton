\# Week 1 – Backend Database Setup (Events Startup Project)



\## Overview

This week focused on designing and implementing the foundational database for the Events Startup Project using SQLite and Knex migrations.



\---



\## ERD (Entity Relationship Diagram)



The database design includes:



\- user table

\- event table



Relationships:

\- A user can view/book multiple events (future extension)

\- Events are the main catalog items



📌 ERD Diagram:





\---



\## Database Setup



\### Tools used:

\- SQLite (default database)

\- Knex.js (migrations \& seeds)

\- Express.js (API layer)



\---



\## Migrations



Tables created:



\### user

\- id (primary key)

\- name

\- email

\- created\_at

\- updated\_at



\### event

\- id (primary key)

\- title

\- description

\- location

\- price

\- currency

\- created\_at

\- updated\_at



\---



\## Seed Data



Seed files were used to populate initial data:



\- 1 test user

\- multiple event records



\---



\## API Testing



The following endpoints were tested:



\### Get all events

GET /api/events

### Get event by id
GET /api/events/:id

---

## SQL Queries (Manual Testing)

### Get all events
```sql
SELECT * FROM event;
Get event by ID
SELECT * FROM event WHERE id = 1;
Get all users
SELECT * FROM user;


How to run project
cd api
npm install
npm run db:migrate
npm run db:seed
npm run dev
Then open:
http://localhost:3000/api/events

