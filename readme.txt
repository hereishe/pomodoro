App is rudimentary pomodoro timer that allows you to track sessions completed across different task categories
Select a category and start the timer (test mode recommended)
Upon completion your work session will be logged and be available for viewing on the dashboard.


--Installation Instructions--

server
-----------
1.npm install
2.set mongodb url in /src/helpers/config.js
3. node app.js

client
-----------
1.npm install
2.configure server api baseUrl in src/lib/axios.js
npm run dev


--App Usage Instructions--
app entry point is located at localhost:xxxx/dashboard
if installation was successful you will be redirected to a login page
Create an account and/or login to authorize your session.
