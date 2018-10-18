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

* To use this application, you need to run api first. Also please copy environment config file and fill properly.
```
## ENVIRONMENT

*development
cp -i src/environments/environment.example.ts src/environments/environment.ts

* production
cp -i src/environments/environment.example.ts src/environments/environment.prod.ts
