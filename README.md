# Front-End Interview Test
Apr 2020

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Purpose
Open Table has a public API available at [https://opentable.herokuapp.com/](https://opentable.herokuapp.com/)
As an example, [http://opentable.herokuapp.com/api/restaurants?city=toronto](http://opentable.herokuapp.com/api/restaurants?city=toronto) returns a list of restaurants that deliver to Toronto, including some basic restaurant information.

### Platform
The following technologies are **required**:
- ReactJS
- Redux

### Goals
Provide a list of restaurants based on city, address, and name. Listed restaurants provide the following details:
- Name
- Address
- Price

Two (2) input controls are provided to users:

#### `city`
A string that is matched against city names in the database.

#### `refine` (optional)
An optional string, that filters the current list of restaurants based on the fields:
- Name
- Address
- Area

#### Additional Controls
Additional controls and filters are up to the developer's discretion.

#### Redux
Redux is used to store the following information:
- Name
- Address
- Area

### Requirements
- Feel free to spend as much or as little time on the exercise as you like as long as the following requirements have been met.
- Please complete the user story below.
- Your code should compile and run in one step.
- Try not to use any UI library (ex. Bootstrap), as the more of your own hand-written code and design is there, the better it is to evaluate your own skills.

#### User Story
> As a user **running the application** I can **view a list of restaurants in a user submitted City (e.g. Toronto)** So that **I know which restaurants are currently available**

#### Acceptance criteria
- For the known City, results are returned
- User should be able to further refine the results, i.e. using part of a restaurant name, or street, area, etc.
- You **must** include tests
- UI must be responsive
- Must be fully WCAG 2.0/2.1 AA compliant for the entire page
- Must perform well in a Lighthouse audit - Performance, SEO, Accessibility
- The Name, Cuisine Types and Rating of the restaurant are displayed
- Must work in common browsers, desktop and mobile (Chrome, Safari, IE11)
- Send your Github repo of your application
- Host the app on heroku or any other cloud host platform of your choice
- Send your answers to the tech questions as a .md file in your repo
 
##### Technical Questions
Please answer the following questions in a markdown file called `answers-to-technical-questions.md`:

- How long did you spend on the coding assignment? What would you add to your solution if you had more time? If you didn't spend much time on the coding test then use this as an opportunity to explain what you would add.
- What was the most useful feature that was added to the latest version of your chosen language? Please include a snippet of code that shows how you've used it.
- How would you track down a performance issue in production? Have you ever had to do this?
- How would you improve the API that you just used?
- Please describe yourself using JSON.