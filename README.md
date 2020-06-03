# Goals [![HitCount](http://hits.dwyl.com/Gurjot-Sidhu/GoalFrontend.svg)](http://hits.dwyl.com/Gurjot-Sidhu/GoalFrontend)

A goal setting app designed to help you plan your future

## Motivation
I noticed I would use reminders on my phone as a sort of short term goals list but I knew i could make something better.  

## Build Status
Build failing

## Code Style
Standard

## Screenshots

<div style='position:relative; padding-bottom:calc(62.50% + 44px)'><iframe src='https://gfycat.com/ifr/BestSmoothGreatargus' frameborder='0' scrolling='no' width='100%' height='100%' style='position:absolute;top:0;left:0;' allowfullscreen></iframe></div>

## Tech/framework used
**Built with**
- Javascript
- React
- Redux
- Rails

## Features
- I added JWT to authenticate old accounts and create new accounts with secure logins.
- Integrated a token to persist the user on page change or refresh
- I added a sign up and login feature to allow uses to track their own goals. 
- The user can also view their progress with a dynamic progressbar.
- The user can create/update/delete goals
- The user can create/udpate/delete milestones 

## Code Example
Progressbar Code

<img width="447" alt="code" src="https://user-images.githubusercontent.com/9657307/83551190-06aa4480-a4d6-11ea-8ea0-5ff1f5d3ceb1.png">

In this snippet above, I am getting the percentage of goal completion based on the milestone completion. I start with the length of the milestones(counter).I then go through each element within the array and add 1 (amountCompleted) for each milestone that has complete:true in the database. I then mulitply both numbers and round them in the return statement to get a percentage for the progressbar component.


## How to use

### Clone down backend repo https://github.com/Gurjot-Sidhu/GoalsBackend

- Download and install `ruby v 2.6.1`
- run `bundle install`
- run `rails db:migrate`
- run `rails db:seed`
- run `rails s`

### Then Clone down this repo
- Download npm https://nodejs.org/en/
- run `npm install`
- run `npm start`

## Contribute
All contributers welcome.If you would like to contribute just ask(permission granted upon request)

## License
GNU General Public License v3.0 @ Gurjot-Sidhu
