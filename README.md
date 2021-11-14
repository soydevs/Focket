# Focket - FOSS Pocket Alternative

A free and open source, self-hosted knowledge management app similar to Mozilla's proprietary article-saving and bookmarking tool - [Pocket](https://www.mozilla.org/en-US/firefox/pocket/)

## About Pocket by Mozilla

Mozilla has a product called Pocket which can be considered like a browser extension wherein the user can save links that can be accessed from any device which has **Pocket** installed. However, this is proprietary software and has the user data stored in the Mozilla cloud, leading to privacy concerns. For more info visit the official [link](https://support.mozilla.org/en-US/kb/what-pocket).

## Focket - An Abstract

In an era where self hosted apps are being more and more popular and in an age where privacy & data collection are big topics being discussed worldwide, we believe that the best way to safeguard user privacy is by not having to trust the provider.
Introducing **Focket** - A **privacy oriented** self hosted **knowledge management software suite** where the user owns and controls the data.

## Working

The software consists of two parts: A Focket client (browser-extension for now) which can be installed on the user's computer, and a self-hostable server which the user can run on any cloud vps of his/her choice.

The user runs the server in his vps (say heroku for eg) and enters the server-url + port in the client app(which will include native mobile and desktop apps in future). This will pair up the client with the server.
Afterwards, the user would need to enter a password (which he can set up in the server config file) to successfully log in.

This would enable the user to share any links which he may feel is useful to his projects, research, leisure or simply as a read-later list to the Focket client and have it saved in his server. The app supports creation of collections, which can be considered as projects to which you can add and group articles of your choice with just a single click. Think of this as a bookmarking app on steroids.
User can also take notes, group similar articles using tags, search and filter them etc.

## Features

- Privacy oriented - You own your data:
  - As Focket is self-hosted, your data is safe from the whims of any third party services or proprietary company.
- Open source: The code for both Focket server and client will be fully open source. Anyone is free to look at the them, suggest improvements, give constructive feedback and are fully welcome to contribute and improve the product.
- No vendor-lock-in: Focket server will be vps agnostic. You are free to host the server in any vps of your choice (P.S: a Heroku one-click install link will be coming soon).
- Access from multiple devices. You can install the Focket extension for your browser, or use the native mobile apps for Android and iOS. You can add links, articles, take notes, update, read and edit from any of these platforms.
- Take down additional footnotes, remarks, comments, your thoughts etc on each article you share and have them stay for later review and reflection in a database maintained by you, without fear of any company accessing your data.
- Just share urls to generate article which can be read free of any ads, banners or popups much like in [Telegram instant view](https://instantview.telegram.org/).
- Add in more articles, take notes etc to build your own private knowledge management system.
- Search and filter your added articles using title, date added and tags.

## Roadmap of additional features

- Native apps for windows and mac
- Feature to share article pages containing your comments and notes individually to others using a uniquely generated url.
- Feature to link together added articles using wiki-links and generate a graph of your knowledge base
- Feature to set a review time to prompt you to review a certain articles after a set period of time.
- Search articles using natural language based query using [Haystack](https://github.com/deepset-ai/haystack) or some other alternative. [Reference](https://forum.fossunited.org/t/hackathon-ideas/159/49)

## Deployment

- Create a MongoDb Database in Atlas [Reference](https://docs.atlas.mongodb.com/tutorial/create-new-cluster/)

One click deployment using Vercel or Netlfiy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fsoydevs%2FFocket%2Ftree%2Fmain%2Fweb-app&env=DB_URI,PASSWORD)
[![Deploy with netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/soydevs/Focket/)

Add the MongoDb uri (received from Atlas) and your secret password as environment variables in Netlify/vercel environment-variables section using the keys `MONGO_URI` and `SECRET_PASS` respectively.

### OR Manual Deploy

1. Clone this repo
   ```bash
   git clone https://github.com/soydevs/Focket.git
   ```
2. Create .env file in web-app directory similar to .env.local file
   ```bash
   cp .env.local web-app/.env
   ```
3. Fill in your values as specified
4. Deploy the web-app directory using your preferred way of deploying a nodeJS application.
