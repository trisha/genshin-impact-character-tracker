https://gawdiseattle.gitbook.io/wdi/00-config-deployment/deploy-node

1. Create a free Heroku account
2. [Download](https://devcenter.heroku.com/articles/heroku-cli) Heroku CLI if you haven't already.
3. Make sure node_modules and .env files AREN'T uploaded to GitHub. If they are, then you have to remove them from your .git so that they don't have merge conflicts with Heroku (which will download your modules and which uses its own environment)
3. `heroku login` and login via the popup
4. `echo "web: node index.js" >> Procfile` to create a Heroku Procfile
5. Don't upload your port, Heroku uses another. But make sure to include a key for it in your server.js or index.js file: `app.listen(process.env.PORT || 3000)`
6. Heroku uses package.json to install modules. Locally install sequelize-cli (we normally have it installed globally) so we can run Sequelize commands in our command line: `npm i sequelize-cli`
7. `heroku apps:create sitename` to choose your URL. I wrote `heroku apps:create genshin-impact` because genshin-impact.herokuapp.com was available.
8. `git add .`, `git commit -m "Commit message"`, and then `git push heroku main` to push to heroku!
9. Upload config/environment variables: `heroku config:set SESSION_SECRET=supersonicsecret API_Key=apikey" where the variable name is the same as how they're referenced in your server.js/index.js files, and where the value for session_secret doesn't matter as long as the variable name matches your code.
10. `heorku addons:create heroku-postgresql:hobby-dev` to install add-on for postgres
11. In config.json, add a production and the below verbatim: 
```javascript
"production": {
    "use_env_variable": "DATABASE_URL"
  }
```

  So overall, it should look something like this:
```javascript
  {
  "development": {
    "database": "genshin_tracker_dev",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "database": "genshin_tracker_test",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "use_env_variable": "DATABASE_URL"
  }
}
```

12. Add and commit changes, then push to `heroku: git push heroku main`
13. `heroku run sequelize db:migrate` to run migrations
14. `heroku run node server_api.js` to run seeder files
15. `heroku open` to open app, or go to the URL in your browser!