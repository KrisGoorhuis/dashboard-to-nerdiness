## Concept
Nerdy internet content aggregator. At least mine will be nerdy.

This could probably done without a full server, but you know what? I want to make a server.

The intention is to integrate a remote database and handle user logins, but for the time being everything is held in each individual's localStorage.

### Server
Made with [this article](https://www.freecodecamp.org/news/how-to-make-create-react-app-work-with-a-node-backend-api-7c5c48acb1b0/)

Everything in CRA's (create-react-app's) directory stays just as it normally would, except we're telling it to use a proxy server. 
CRA has its own Webpack server going, as I understand it, and adding a `"proxy": "http://localhost:5000/"` to the client's `package.json` just moves everything through the port our `server.js` is listening on.

https://create-react-app.dev/docs/proxying-api-requests-in-development/

### Sidebar
The top contains components for each site type - these add new listings from that site.

We have a listing component type for each of the sites. This component contains hide and removal controls.


### Center
An amalgamation of the posts from each site on the sidebar, taken from our Redux store.

They are run through a function that organizes based on publishing date (after manipulating time formats) and filters out what we've hidden on the sidebar.

Each post can be clicked to open the story in a new tab.

### APIs
There are two endpoints for each site - one that handles collecting all the posts that fit the user's criteria (what foods they've chosen) and one that saves this criteria to a database. Or will when we reach that point. TODO.

The retrieval endpoints handle formatting, flattening, and, where needed, manipulates the data to make things more uniform on the client side.

### Site components
Each site has its own written-out sidebar listing component because each sidebar listing component uses different Redux `props.dispatch` types.

This means a lot of restated code. Which feels bad (and as though it must represent less than best practices). I don't know how to refactor this right now, but I am rather certain it could by more DRY somehow. TODO.


#### Reddit
OAuth was relatively inscrutable with no plain Node.js solutions to find out there, and we don't want to deal with token expiry. So we use a third party wrap called [Snoowrap](https://github.com/not-an-aardvark/snoowrap) (what every Node example used) with what we created as a "script" type app on Reddit.

Using an existing Reddit account, create an app in user preferences of the script type.
It will generate an app ID and app secret. Pass these and your account name / password to snoowrap, then just go!

Useful properties:
created_utc
title
permalink
author
comments (array)


#### Medium


#### Progression flow
Users add a content type on the left (we have a few defaults).
This causes the POST fetch to our server with the requested feeds, which then handles the heavier lifting.
We use the presence of actual results to verify that the intended feed exists, and if it does, we add it to our Redux store.

The sidebar receives updated state, updates its lists.
The main content column receives updated state, runs posts through an organizer/filter, updates its list.




#### Hardest Part?
Wrangling different data structures into the same functionalities. 

Not only do object properties differ, sometimes they're not even JS objects at all. Sometimes the data contained in one is missing from another, so it needs to be Regex'd out of a URL.

#### Lessons:
Don't fall into the trap of thinking all outer scope component variables need to be state variables. If you want to share something without rerenders mucking up your plans, just don't use the React thing! Not every thing needs to be an instantiation of the new tech thing. Do the original thing.

Keep track of the form of your objects somehow. Or at least keep them consistent.

Libraries save so, so much work. And their distributed solution is probably cleaner than your first idea.

Design layout beforehand. It's not just for aesthetics, but for code structure. Shooting from the hip is bad for things you intend to finish.

#### Other difficulties:
Case sensitivity in equivalence checks. Simple to address, overly hard bug to find.
Make sure you know whether a method modifies the original or returns something new.