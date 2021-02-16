## Detailed Timeline

1/20/21 - Found and added Genshin custom font  

1/21/21 - Added background and EJS layout scss, 404 page  

1/23/21 - Minimized scope of project, added user model  

1/25/21 - Added login authentication, password hashing, flash messages, navbar, character and goal models    

1/26/21 - Populated stockCharacter model with API (removed a process.exit() that was causing it to terminate prematurely), added bootstrap-select multi-select+search form for adding user's characters, incorporated ability to view all and delete myCharacters on the /characters page, aligned link formatting in the navigation bar.   

This night was my most stressful night of the GA SEI, because I was going crazy trying to figure out what about the code I just wrote was causing everything to break. Turns out, what was working before wasn't working anymore (I made the mistake of ruling it out from my mind), and prior, it was essentially luck that my poorly-written code wasn't breaking--I was redirecting back to the /characters page before my forEach was done running and adding all my new characters.  

1/27/20 - Added multi-select form with user-specific character options to dashboard page, added ability to add comments/notes for each user's specific characters and have them show up on the dashboard page, grouped by character. Got stuck on this for a few hours because I didn't include the db.comment high enough when trying to findAll myCharacters.  

1/28/20 - Added ability to bulk edit or bulk delete comments from dashboard view. Refactored 'add new character' multi-select search form to be based on stockCharacters, instead of having hard-coded dropdown values.  