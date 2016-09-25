README.md

## Inspiration
This Project was made to help the City of San Jose's Department of Transportation to move closer to "Vision Zero San Jose" 

"Vision Zero San Jose"  - Moving toward zero traffic deaths and providing safe streets for all, as soon as possible.

The city of San Jose's Department of Transportation currently has no system for residents to submit dangerous driving behavior that have potential to cause traffic accidents and fatalities.

Engineers of the city streets are trying to understand the behavior of drivers when they perform dangerous driving on roads that were built that follow street standards.

There is a Data Gap that Department of Transportation lacks to analyze causes of top dangerous driving activities that cause fatalities such as:
1. Drunk Driving
2. Speeding
3. Running Red Lights
4. Ignore Traffic Signs

We took the inspiration of a Yelp, Waze, and Uber to make our application easy to use and have a proper rating & user feedback system.

## What it does
We created an application that allows city residents to submit dangerous activity that occurs in streets & intersections.
We also have an administrative view of seeing the overall user submitted data. 

This allows the Department of Transportation to view the overall data of streets and intersections to understand driver behavior involving the cause of accidents according to dangerous activity reported.

## How we built it
User Workflow
1. User logs in application using Google Authentication
2. User is presenting with a map of their current location and nearby rated streets & intersections
3. User Interaction
4. Select Asset (Street or Intersection)
5. Views Street Address
6. Select Dangerous Activity from list of Categories
7. Add Comment
8. Submit Report which updates the rating of street/intersection

Admin Workflow
1. Administrator is able to add new assets by creating Geofencing/Polylines on Streets & Intersections
2. Able to see overall map view of all assets
3. Able to view rating/status of assets
4. Red = rating 1; Drunk Driving, Speeding, Reckless Driving, and Drivers ran Red Light here, Drivers Ignored Traffic Signs, Miscellaneous reports
5. Blue = rating 2-3; Speeding, Reckless Driving, and Drivers ran Red Light here, Drivers Ignored Traffic Signs, Miscellaneous reports
6. Green = rating 4-5; Drivers Ignored Traffic Signs, Miscellaneous reports

Application Workflow
1. Google Authentication allows user to view NodeJS application
2. NodeJS calls to javascript RESTAPI
3. RESTAPI calls to mySQL database
4. Polyline/Geofencing is presented as a new layer on top of map that represent an asset (street or intersection)
5. When asset is updated by the user, it calls to RESTAPI to perform an update/insert query in mySQL database

Front-end Setup
1. OpenStreetMap MapData API
2. LeafletJS MapData Rendering API
3. Iconic Responsive Mobile SDK

Back-end Setup
1. NodeJS (Deployed on AWS)
2. mySQL Database (Deployed on AWS), 2 tables
- asset | asset_id, asset_name, asset_type, total_number, user_rating, location
- user | user_id, username, asset_id, user_rating, comment, timestamp
