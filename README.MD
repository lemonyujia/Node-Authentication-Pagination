#1  Overall
	Author:   Yujia Zhai
	Date:     07/11/2018
	Included: Express.js, node.js, MySQL, Ajax, JavaScript, HTML, CSS, BootStrap, JQuery

#2  Application Overview
	|Node Authtication Homepage (Passport uses md5 hash generator algorithm)
	|--	Local Login
	|--	Local Sign Up

	|Data Show Page (Data is query from MySQL database)
	|--	Dropdown Menu (Sort by the following dropdown menu items)
	|------	Recent Projects
	|------	Username
	|------	Project_title
	|------	Catogery_name

	JQuery Pagination

#3  Running Configuration
    MySQL Port: 8889
    Localhost : 3000
    Database  : lemonyujia (includs 4 imported tables and 1 created table)

    Open the terminal in your computer
    --> cd to the app folder
    --> open the mysql server
    --> connect to the correct database
    --> type 'npm start' in the terminal
    --> go to your localhost address (example: http://localhost:3000/)
    --> Done!

NOTE: If you use any different configuration as above, please remember to change them in code files first before runnning the app!!!