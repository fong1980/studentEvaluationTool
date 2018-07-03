## Project description

#### Evaluation Tool for Teachers

As for my final personall assignment for the Codaisseur Academy I needed to make an evaluation tool for the teachers.
I got 4 days to finish my project, before I needed to present and explain my code

#### User Stories

* As a Teacher I can sign into the tool with my email and password to start using it
* As a Teacher, after I signed in, I see a (list of) current classes, identifiable by their Batch number (e.g. Batch #1), start date, and end date.
* As a Teacher, I can create a new class by giving it a Batch number, start date, and end date.
* As a Teacher I can add, edit, remove students in a class. To add a student I need to provide: 1) their full name, 2) (a link to) their profile picture.
* As a Teacher, I can click on a class, after which I see a grid of all the students by their name and photo, and the last colour code given to them. Above the students grid, I see a bar with 1-3 segments, showing me the percentage (%) of students evaluated GREEN, YELLOW, and RED. As a Teacher, when I click on a photo or name, I can click on GREEN, YELLOW, or RED, fill in the date (defaults to today), and a remark. When I click “Save” it saves my evaluation, and takes me back to the student overview, when I click “Save and Next” it saves and shows me the next student.
* As a Teacher, when I look at a student’s page, I can only fill in one evaluation per student per day. I can edit my own evaluations.
* ALGORITHM PART! As a Teacher, from the class view I can click a button “ASK A QUESTION”. It shows me the name and picture of a random student to ask a question. Not entirely random though: RED students get ~53% of the questions YELLOW students ~28%, and GREEN students ~19%.

## Language and Tools

**Frontend:**

* React/Redux

* JSX

* Styling: CSS, Material-ui-next


**Backend:**

* Typescript

* TypeORM

* PostgreSQL

## How to:

1. Install the dependencies:

* In each project directory run `yarn `

2. Run the back-end side of the app:

* Have a ‘DATABASE_URL' environment variable set
* Start the TypeScript compiler: `tsc -w`
* Connect to Postgres with TypeORM: `yarn start`

3. Run the front-end side of the app:

* In the ‘client’ directory run `yarn start`

**API and Databases**

The database containes four tables:

* Users        -  registred teachers/users. E-mail and a hashed password.
* Students     -  registred students. Firstname, Lastname and picture url. Its linked with evaluation and batches table
* Batches      -  The class. Batchnumber, Startdate, Enddate. It's linked with students of this batch.
* Evaluations  -  evaluations per student. Evaluation color, date and remark. Linked to the correct student

## Endpoints

#### Users                       
|Endpoint | what it does   |      
|-------- | ---------------|     
|POST     | Create user    |    
|GET      | Get user by Id |     
|GET      | Get all users  |     

#### Students                                 
|Endpoint | what it does        |                                 
|-------- | --------------------|
|POST     | Create Student      |
|GET      | Get student by Id   |
|GET      | Get all students    |
|PUT      | Update students info|
|DELETE   | Delete student      |

#### Batches                     
|Endpoint | what it does   |        
|-------- | ---------------|          
|POST     | Create batch   |          
|GET      | Get batch by Id|          
|GET      | Get all batches|  

#### Evaluations
|Endpoint | what it does                   |
|-------- | -------------------------------|
|POST     |  Create evaluation             |
|GET      | Get all evaluations per student|

## Route

|**URI**|**ACTION**|
|-----------------------------------|--------------------------------------|
| /logout                           | logout Page                          |
| /login                            | login Page                           |
| /signup                           | signup Page                          |
| /batches                          | All batches/ classes                 |
| /students/:id                     | one batch with all students          |
| /student/:batchId/:studentId      | Student, details and evaluations     |


## Evaluation student app

link coming
