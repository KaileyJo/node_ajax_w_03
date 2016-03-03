# node_ajax_w_03

Refactor Time!
Now that we have learned about databases and tables and (gasp!) joins -- it's time to update our short-lived Spirit Animal Assigner 
to have permanent data storage.

Tables

Your app will have two tables: people and animals. Update your existing logic to use the new tables and completely change how animals 
are assigned to people.

The People table will need to have a Primary Key person_id field plus a first_name, last_name, and an animal_id (Foreign Key). 
Your Animal table will likewise need an animal_id (Primary Key) field, plus animal_name and animal_color (let's be specific here!). 
Update the forms to capture these new fields.

Note that we will be storing the animal_id given for a person in the people.animal_id column!

Assigning Animals to People

Update your listing of people to include a text input field and a button for each name listed. This input will take an animal_id 
entered by the user. The button will need an event listener on it that will POST the person's id and given animal_id to a new route. 
This route will have to UPDATE the correct person's record with their new animal assignment.

When a person is assigned an animal successfully, this listing should be removed from this name list on the DOM.

This completed assignment paring should be placed in a new section on the DOM which will list all of the information for every 
completed assignment. You'll need to JOIN the people and animal tables in order to do this.

Animals can be duplicated across assignments. People only get one animal assigned.

User Experience

There is now a lot going on for the user to keep track of on the page. Give some thought to how best to organize all these forms and 
buttons and lists. Take a shot at updating the layout to provide a smoother user experience.

On page load, your application should display all available information from the database.

Tips

Previously your POST routes sent back your updated array. This will no longer work. You will need to make a GET request after your 
POST has returned to the client app ajax request (in the success callback).

You will need to bring in the npm module 'pg'
