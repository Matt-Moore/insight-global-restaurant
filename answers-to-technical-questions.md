# Technical Questions

## How long did you spend on the coding assignment? What would you add to your solution if you had more time? If you didn't spend much time on the coding test then use this as an opportunity to explain what you would add.
I spent about 8 hours on the initial app. As I am retaking this test (for another position), I spent about 2 hours adding new the new filters. 

First things I'd add with more time, would be redux and tests. I know these were listed as requirements, however: I have not used Redux (and focused on providing a working product); My focus has been more on providing valid front-ended code, and testing were the focus of others on the team.

Next, I'd spend some more time providing a better design. This would also include a tighter IE11 fallback; IE11 has near non-existent support for CSS grid, so I use flexbox to replicate the grid feel. Unofrtunately flexbox does not emulate a grid as cleanly as wanted (flexbox has several pending updates to address petitions to expand its features).

Regarding functionality: it could use more filters (price, distance from a defined point), and more results; either via pages or "infinity scrolling" (Currently it only returns the first 100 results); I would also like to add a `datalist` to provide the city search with all valid city choices, and alleviate the AJAX calls by limiting to valid choices only.

Adding multiple language support (and supporting routes) would also expand its use. This would also entail converting the `rel="canonical"` and `rel="alternate"` links to dynamic (currently hard coded as there's only a single page).

## What was the most useful feature that was added to the latest version of your chosen language? Please include a snippet of code that shows how you've used it.
I'm not sure about React, but as for Javascript the spread operator. It's pretty simple and basic, but I ended up using it a lot in my previous role.

```javascript
let x = [1,2,3];
let y = ['a','b','c'];

let z = [...x,...y];
// [1, 2, 3, "a", "b", "c"]
```

## How would you track down a performance issue in production? Have you ever had to do this?
There are several performance profiler tools, and React 16.4 introduced a `<Profiler />` component. I have never had to do performance auditing in a React app.

## How would you improve the API that you just used?
Currently the API is lacking in several fields that are often standard. For example: ratings, type of food, takeout/dine-in/delivery.

I was also let down by the `area` field, which seems better suited to be attached to cities than the restaurant itself. Toronto - for instance - all state `Toronto / SW Ontario`. My initial assumption was that it would be about the restaurant's location within a city (e.g. Midtown, Waterfront, etc.). Perhaps it would be better represented if it was named `region`.

It could use an option to provide a location (zip, lat/long, etc.) and a radius to return results for.

## Please describe yourself using JSON.
```javascript
{
    "name": ["Matthew","Moore"],
    "description": {
        "hair": "Brown",
        "eyes": {
            "left": "hazel and blue",
            "right": "hazel"
        }
    },
    "job": "Developer",
    "languages": [
        {
            "language": "English",
            "code": "en",
            "proficiency": {
                "verbal": "fluent",
                "written": "fluent"
            }
        }
    ],
    "skills": [
        "HTML",
        "CSS",
        "Javascript",
        "jQuery",
        "React",
        "Angular",
        "NodeJS"
    ]
}
```