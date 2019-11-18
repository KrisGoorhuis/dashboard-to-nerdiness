## Concept
Nerdy internet content aggregator. At least mine will be nerdy.

This could probably done without a full server, but you know what? I want to make a server.

Users log in. Database, Node.js, frontend

### Server
Made with [this article](https://www.freecodecamp.org/news/how-to-make-create-react-app-work-with-a-node-backend-api-7c5c48acb1b0/)

Everything in CRA's (create-react-app's) directory stays just as it normally would, except we're telling it to use a proxy server. 
CRA has its own Webpack server going, as I understand it, and adding a `"proxy": "http://localhost:5000/"` to the package.json just moves everything through the port our server.js is listening on.

https://create-react-app.dev/docs/proxying-api-requests-in-development/

### Sidebar
Left side.
Control component at the top.

We have a component for each of the sites. We can, via user controls, add a new component for a site type.
Each component is customizeable - eg the reddit one lets you choose the subreddit.

Each sidebar listing contains a checkbox. The check determines whether or not it is displayed in the central area.

Sidebar will expand into view based on mouse position by default, but this behavior can be toggled to manual button clicks in the controls.

### Center

### APIs
#### Reddit
OAuth was inscrutable and there was no easily found node.js solution out there, and we don't want to deal with token expiry. So we use a third party wrap called [Snoowrap](https://github.com/not-an-aardvark/snoowrap) with the script type app.

Using an existing Reddit account, create an app in user preferences of the script type.
It will generate an app ID and app secret. Pass these and your account name / password to snoowrap, then just go!

Remember to ping initReddit before trying to use it.

Useful properties:
created_utc
title
permalink
author
comments (array)




#### Progression flow
Users add a subreddit on the left.
This causes the fetch to occur.
We use the presence of actual results to verify that the subreddit existed, and if it does, we add it to our store of subreddits.

Sidebar receives updated subreddit listing state, updates its list.

Main content column can just loop through those subreddits.