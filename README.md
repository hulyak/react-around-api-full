# Around the U.S.

This is an interactive page that the user can create an account, edit profile information, add like/dislike/add/remove photo cards. They can also see other users' photos and like other users' photos.

Frontend: React

Backend: Node.js, using Express, and MongoDB.

## Features

- The user can sign up/in and log out from their account.
- The user can update their profile avatar and user information.
- The user can like the cards or dislike them by toggling the heart icon. Likes are counted.
- If the user wants to delete the card, they can click the bin icon. They will be prompted to confirm the deletion.
- The user can only remove their pictures not other users. The bin icon appears only on the user's cards.
- Users can close the modals by pressing the Esc key or by clicking outside the modal.


This repository contains the full API of "Around the U.S." project that features user authorization and user registration and handles cards and users.

- Domain: [hulyak.students.nomoreparties.site](https://hulyak.students.nomoreparties.site)
- Api Domain: [api.hulyak.students.nomoreparties.site](https://api.hulyak.students.nomoreparties.site)

## Technologies:

- React.js
- Multiple routes and navigation using React Router
- Asynchronous API calls using callbacks and Promises
- Node.js
- Back end routing with Express
- [Google Cloud Compute Engine](https://cloud.google.com/)
- [Mongo DB](https://www.mongodb.com/) data storage using[Mongoose ODM](https://mongoosejs.com/) models
- [Winston](https://github.com/winstonjs/winston) and [Express Winston](https://www.npmjs.com/package/express-winston) Logging
- [Celebrate](https://github.com/arb/celebrate) and [Joi](https://joi.dev/api/) for data validation
- Json Web Tokens
- Jest and Supertest
- Cors
- [PM2](https://pm2.keymetrics.io/docs/usage/pm2-doc-single-page/) daemon process manager
- [NGINX](https://www.nginx.com/) HTTP Server
- [Certbot](https://certbot.eff.org/) SSL Certificate, HTTPS Protocol
- Frontend authentication system for user registration and login
- Locally-stored tokens to 'remember' logged in users
- BEM Methodology
- Flexbox
- CSS Grids
- CSS transitions
- Mobile-First Responsive Design
- Embedded custom fonts







