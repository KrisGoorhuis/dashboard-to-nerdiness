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
Controls contain the ability to input something new. Copy and paste a URL? Not sure yet.

Their personal list of subscribed sites is below, listed nicely.
Each listing contains a checkbox. The check determines whether or not it is displayed in the central area.

Sidebar will expand into view based on mouse position by default, but this behavior can be toggled to manual button clicks in the controls.

### Center
# dashboard-to-nerdiness
