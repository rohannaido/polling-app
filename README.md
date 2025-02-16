# Polling App

Task: Create a simple polling app where a user can:

- Create a poll with a question and multiple options.
- Vote on a poll.
- View poll results in real-time (auto-refresh every 5 seconds).

Requirements:
- All data should be stored and fetched from a database of your choice.
- In your README file, list down your API endpoints as well as your database schema.
- Deploy the API + UI online. You can use Vercel, Netlify, Cloudflare, Heroku, Render, etc.

APIs
POST
/polls
- create a new poll
question
options []

GET /polls
list of all polls

GET /polls/:id
poll detail

POST /polls/:id/vote
vote on a poll

GET /polls/:id/vote
get all votes

Database Schema

poll
id
question

option
pollId
name

vote
pollId
optionId
userId
