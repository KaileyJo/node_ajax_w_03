# node_ajax_w_03

Spirit Animal Assigner
Your job is to take our AJAX-node-routing code as a starting point, and extended it to do some cool new things. You'll need to flex 
your jQuery-fu, your understanding of node routing, and server-side logic to make it work.

Separate out the inputs into two different forms, one for capturing names, the other for capturing animals.

Each one should POST data to a new node/express route named for what it is they handle: name.js and animals.js. Store the input data 
in global arrays in each module to use later on. Note that these arrays will be lost when you restart the node server. But as long as 
the server remains on, your data will be persistent across requests.

Display Names and Animals

When the page loads, all of the names and animals should be displayed (if there are any on the server). When a new name or animal is 
created, the page should be updated to reflect this new information.

Name.js

This router module will handle both GET and POST requests to the /name url. GET will retrieve a name at random from the array of names 
already stored. POST will store the given name to the array.

Animals.js

This router module will do the same thing as name.js, but for the spirit animal data instead. Define both a GET and POST route that 
will randomly pull an animal or store the animal given.

Assign

Place a new button on the DOM that will, when clicked, make an AJAX request to the server to make a GET request for both a name and an animal. Once both are returned, show the name/animal combination on the DOM.

Deploy to Heroku

Deploy your new app to heroku.

Pro Mode
Only allow each name to be used once, but animals can be assigned as much as needed. When all the names are assigned animals, show something on the DOM to notify the user.
