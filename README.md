# Goals [![HitCount](http://hits.dwyl.com/Gurjot-Sidhu/GoalFrontend.svg)](http://hits.dwyl.com/Gurjot-Sidhu/GoalFrontend)

A goal setting app designed to help you plan your future

## Motivation
I noticed I would use reminders on my phone as a sort of short term goals list but I knew i could make something better.  

## Build Status
[![Build Status](https://travis-ci.com/Gurjot-Sidhu/GoalFrontend.svg?branch=master)](https://travis-ci.com/Gurjot-Sidhu/GoalFrontend)

## Code Style
[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

## Demo Video
[![Demo](http://img.youtube.com/vi/8gQHg3Ap_vc/0.jpg)](http://www.youtube.com/watch?v=8gQHg3Ap_vc "Smart Goal Demo")

## Screenshots
<img width="640" height="480" alt="Screen Shot 2020-06-05 at 3 23 42 PM" src="https://user-images.githubusercontent.com/9657307/83915106-95ba9500-a740-11ea-95d6-dcbdfe47114f.png">

<img width="640" height="480" alt="Screen Shot 2020-06-05 at 3 20 10 PM" src="https://user-images.githubusercontent.com/9657307/83915117-9a7f4900-a740-11ea-9da1-3f168e31d2e1.png">

<img width="640" height="480" alt="Screen Shot 2020-06-05 at 3 17 14 PM" src="https://user-images.githubusercontent.com/9657307/83915123-9e12d000-a740-11ea-937f-dc892a337804.png">

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


## Installation

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

## API Reference 
TBA. Project still in development

## Tests
TBA. Project still in development 

## Contribute
All contributers welcome.If you would like to contribute just ask(permission granted upon request)

## Credits
- Nicky Dover - helped me solve issues and design flaws I encountered while building this project https://github.com/NickyEXE 
- Randy Herasme - helped me adjust backed api functionality for my frontend and so much more https://github.com/randyher

## License
GNU General Public License v3.0 @ Gurjot-Sidhu
