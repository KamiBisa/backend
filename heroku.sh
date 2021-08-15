#!/bin/sh

APPNAME="kamibisabackend"

# create the heroku app
heroku apps:create $APPNAME

# remove existing heroku upstream if exist
git remote rm heroku
# add heroku upstream
heroku git:remote -a $APPNAME

# add db
heroku addons:create heroku-postgresql:hobby-dev

# deploy
git push heroku deploy

# open the app
heroku open

# tail logs
heroku logs --tail