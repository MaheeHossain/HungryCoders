**Notes about project**
HungryCoders was a group assignment for the INFO30005 subject in UniMelb. The project spanned 11 weeks and was done in a group of 5, 
and was an introduction to web development using React.js. I was involved heavily in most areas of development, and handled the 
majority of the back end development through the MVC Framework, and also helped create many pages such as the map, login and registration,
and the vendor pages. 

**The University of Melbourne**
# INFO30005 – Web Information Technologies

### Run instructions
- git clone https://github.com/INFO30005-2021-SM1/workshop-4-t03.git
- cd workshop-4-t03
- npm install
- node vendorApp.js or customerApp.js

### Heroku link
- https://food-app-007.herokuapp.com/

### Database

NeDB: a lightweight JavaScript database using MongoDB API, stored on the Heroku cloud. Used with permission from tutor, as we thought it would suit the problem space.

Installation instructions:
```
npm install nedb --save
npm test
bower install nedb
```
More information: https://github.com/louischatriot/nedb

# How to use website
- When you start the website, you go to a control page
- where you can select the customer or vendor app

# Customer app
- As a customer, you can select a van by finding the van on the map and clicking
- it, and then pressing the Start Ordering button. Otherwise, you can just press
- the Start Ordering button, and it will select the closest van. If the van
- is moved you have to refresh the home page. You cannot start ordering without 
- selecting a van. You can only see the closest 5 vans to you. If you want to see more 
- then you have to enter a location in the code yourself. Sometimes there is a bug where
- the map will not show, refreshing once or twice will fix it. 
- 
- You can go log in in the log in page with one of the dummy customer logins, or you
- can register a new user. Afterwards, you can go to menu and start ordering by 
- pressing the up or down buttons next to each item. You can reselect van or continue
- with order. In the cart page, you can continue until you're in the order summary. 
- Due to some bugs it isn't perfect (note doesn't work, order summary doesn't automatically
- reload), but you can see all the orders on order summary, and can delete them. 
- When the order is ready, if page is refreshed you can see the status change.
- 
- You can go to the account page to check account details, and edit the details. You can also
- add payment methods, but they don't do anything. 

# Vendor app
- As the vendor, you can log in using one of the dummy vendor logins (each vendor is linked
- to a van). You cannot register here, as it is assumed vendor registration is done on another 
- system. If you want to send a message about where you are, you enter it in the top and press
- enter (refresh the customer page to see message). You can update your location by selecting
- Share Live Location, and then pressing ready. You may have to logout to see your new map 
- location. In the vendor preparing section, you can see each order, and see when they were 
- made. You can set the order to ready and to complete, and you can move through the preparing, 
- ready and complete tabs. You can also get rid of the orders from the complete tab by pressing
- the invisible action button. 


# Database is nedb so no login details necessary

#### Dummy customer logins
# email/password
alice@gmail.com/alice
a/a


#### Dummy vendor logins for each van
# vanName: email/password
zeroCafe: ven/ven
piedmontCafe: thomasedison@gmail.com/thomas
oppositeCafe: steve@smith.com/steve
van2: jake@rake.com/jake
highpointCafe: admin@admin.com/Admin123
examCafe: two@million.com/greenland
bobaCafe: bobogong1@gmail.com/bobo
queensberryCafe: office@email.com/jim
marathonCafe: v/v
flindersCafe: train@email.com/choo
tramStopCafe: tram@email.com/horn
highSchoolCanteen: nossal@high.com/mark
