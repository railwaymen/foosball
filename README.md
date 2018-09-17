# Table football

Mobile app to manage table football scores.

## Stack

* ionic-angular 3.9.2

## Usefull commands

Development mode
```
ionic serve
```

Production mode
```
ionic cordova build browser --prod
```
cordova run browser

## API

* For development it is possible to use local api
```
cp -i db-seed.json db.json
json-server --watch db.json

## ENVIRONMENT

*development
cp -i src/environments/environment.example.ts src/environments/environment.ts

* production
cp -i src/environments/environment.example.ts src/environments/environment.prod.ts
