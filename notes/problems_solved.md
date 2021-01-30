Q: When adding multiple characters, why are not all of them showing up unless I hard refresh?

Q: How to have all characters show up and not some without refreshing?

A: It takes time to update the database. Use Promise.all() or await and async, or even a setTimeout function (with something like a 100ms delay) to delay the page from refreshing until after the database edits have been completed.

Also make sure that you don't have any premature `process.exit()` or `res.render/response/redirects` happening before any forEach loops are done. 

See: "root/controllers/characters.js" for hacky setTimeout solution.

---

Q: Why are only some of my API calls populating my table?

A: Similar response to above, you might be moving on to the next step before you've received your API results and added it to your table.

See server_api.js for 3 solutions of going about this. The first one is the only one that is un-commented and is where I used a setTimeout delay. The 2nd solution uses Promise.all(), and the 3rd solution sandwiches multiple `await`s and `async`s to solve for asynchronous forEach.

You can also check out "root/server_test_api.js" to view the 3rd solution stand-alone.


---

Q: What type of data do multi-select forms send?

A: Sends a string (even if that value is a number) if one value is passed.

Sends an array of strings if multiple values are selected.

Use req.body.name to grab the item, where 'name' was defined in the form, and where the value was defined as form or option 'value'. 

See 'root/views/characters/myCharacters.ejs' for a multiselect form with one submit button, and see 'root/views/dashboardView.ejs for a multiselect form with two submit buttons. 
 
---

Q: How to nest forms within each other
Q: How to have two submit buttons for one form

A: You can't nest forms, so instead you'll need multiple submit buttons. 

I have a checklist on 'root/views/dashboardView.ejs' where the user selects multiple comments, and either bulk edits or bulk deletes them. 

Instead of setting the path in the form as `<form action='/dashboard/goal/delete/?_method=DELETE'>`, I set the `<button formaction='/dashboard/goal/delete/?_method=DELETE'>` in the Delete button tag.

Similar thing with the edit button, where each button has a different route.

---

Q: How to get results from axios

A: .then(results => results.data)

See 'root/controllers/characters.js' and search for axios

--

Q: How to pass API or Sequelize objects from backend to frontend

A: Grab results.data from Axios and then feed it through. EJS understands results.data.dataValues so you don't need the dataValues key.

For sequelize calls, make sure to `include` any associated databases. For example, I pass through myCharacters but included models.goal, which belongs to myCharacters (many to one relationship). 

In my EJS, I was able to refer to them as myCharacters.forEach(character => character.goals (array that I would also forEach through))

See 'root/views/dashboard/dashboardView.ejs'

---

Q: Express EJS how to have new lines show up

A: Add `style="white-space:pre-wrap"` to your tag. See 'root/views/dashboardView.ejs' for the goal.li (list item), or goal contents, to be displayed using this style tag.