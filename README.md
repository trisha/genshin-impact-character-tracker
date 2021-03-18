# Genshin Impact Character Tracker
A browser-based app for manually tracking your Genshin Impact characters and their stats, and for managing your in-game goals.

The purpose of this project is to have all your character information stored online, which you can bookmark or keep open in a tab, and which takes less time to load than the actual game itself. You can add, edit, and delete your goals or notes for each character in the dashboard view--no need to flip through pages of crossed-out notes anymore!

## Link to Live Project:
https://genshin-impact.herokuapp.com/

Test account:  
Email: test@email.com  
Password: test

## How to Setup After Cloning:
1. Install node dependencies: 
```npm install```
- Install the Sequelize CLI if you don't have it already: `npm i sequelize-cli` or `npm i -g sequelize-cli` to install globally

2. Create a SQL database called "genshin_tracker" (Make sure that the config.json database name matches your database name): `psql`, `CREATE DATABASE genshin_tracker;`
3. Migrate models: `sequelize db:migrate`
4. Run the API to populate the stockCharacter model: `node server_api.js`
5. Run the code: `node server.js` or `nodemon` (if you have nodemon installed)
6. Go to port 3000 in your browser: `localhost:3000`

## Features
- Sequelize hook to convert email address to lowercase before validating 
- Password hashing using bcrypt
- Local login authentication using passport
- Multi-select and search from a dynamic dropdown list when adding characters
- Multi-select edit and delete character comments
- Dynamic CSS: see what happens when you adjust your browser size 👀
- Colored text dependent on each character's vision (element)

## Technologies Used
- HTML
- CSS, Scss
- JavaScript
- Express
- Node.js
- EJS, EJS Layouts 
- Bootstrap, Bootstrap-select
- Axios (for API calls)
- Passport (for user authentication)
- Bcrypt (for password hashing)

## Next Steps
- Add confirmation modal when deleting character.
- Have 'add new note' more visible (instead of at bottom), perhaps on side
- Have Edit and Delete note buttons more visible, perhaps as a float
- Update Characters view  to match Figma wireframes
- Add ability to enter character stats (ATK, DEF, HP, etc.)  
- Add weapon slot and domain information 
- Aggregate domain information on dashboard, depending on the day 

## Contact: 
Reach out to Trisha at genshin.character.tracker@gmail.com for comments or inquiries!

--- 

## Project Planning:
[Entity Relationship Diagram:](https://lucid.app/lucidchart/invitations/accept/18a984d6-26ce-4ce0-a51e-ee6e22bc8714)
![Lucidchart ERD Screenshot](public/img/screenshots/ERD.png)

[Wireframes:](https://www.figma.com/file/YYpdBfzQkJaAiz9c5pFhUF/Genshin-Character-Tracker-Wireframes?node-id=0%3A1)
![Figma Wireframes Screenshot](public/img/screenshots/Wirefames.png)

Inspiration: 
- https://genshin.gg/
- https://www.gensh.in/
- https://genshin.poporing.life/
- https://www.genshingamer.com/

## Timeline
Click [here](notes/timeline.md) (notes/timeline.md) for a more detailed progress timeline. 

1/20/21 - Found and added Genshin custom font

1/21/21 - Added background and EJS layout scss, 404 page  

1/23/21 - Minimized scope of project, added user model  

1/25/21 - Added login authentication, password hashing, flash messages, navbar, character and goal models    

1/26/21 - Populated stockCharacter model with API, added bootstrap-select multi-select+search form for adding characters, incorporated ability to view all and delete characters, aligned link formatting in the navigation bar. 

1/27/20 - Added multi-select form with user's characters to dashboard page, added ability to add comments/notes for each character, and display them grouped by character

1/28/20 - Added ability to bulk edit or bulk delete comments using the same form. Refactored 'add new character' multi-select search form to be based on stockCharacters, instead of having hard-coded dropdown values.  

1/30/20 - Have white spaces and  new lines in character notes show up in display view.

## Screenshots
My Characters view:
![My Character View](public/img/screenshots/My_Characters_2021-01-29.png)
Character detail view:
![Character Detail View](public/img/screenshots/Character_View_2021-01-29.png)
My Goals view:
![View Goals Screenshot](public/img/screenshots/My_Goals_2021-01-29.png)
Add Goal view:
![Add Goal Screenshot](public/img/screenshots/Add_Goal_2021-01-29.png)
Edit Goals view:
![Edit Goals Screenshot](public/img/screenshots/Edit_Goals_2021-01-29.png) 

## Background:
Whenever I talk about anything related to my characters in Genshin Impact on Reddit or with my friends--such as character builds or team compositions--I find that I oftentimes have to open the game just to see what my character's stats are, the name and level of their weapon they're using, or which artifacts (plus their main- and sub- stats) they have equipped. 

I also keep forgetting if I can use my resin (i.e. Genshion's stamina currency) on artifacts, or whether I should use them on today's ascension domains. 

And I'll forget which specific artifacts I'm farming for each character (in order to fulfill artifact set bonuses): Whenever I see my domain drops, I have to find my physical list of artifacts so I can know whether I'm done running a domain or whether I should continue to do another run.

This app arose from the intersection of the pain points above, and the exigence below. 

## Credit:
Character information API: https://github.com/genshindev/api  
Background image: https://www.gensh.in/gallery/wallpaper#lg=1&slide=0 


<!-- 3/8/21 Feedback from Dave:
x Remove mention of bcrypt on homepage.
- Add 'stroke' for geo text, since hard to read.
x Have images open in new tab.
- Confirm password when signing up.
- Add profile page (instead of 404 not found).
- Have Delete button display a 'Confirm Delete' and 'Cancel' button show up. 
- Issue when adding all characters at once: font color doesn't show up, everything is white.
 -->