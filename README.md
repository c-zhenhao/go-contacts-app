# Full-stack contacts app

- Contacts Book is a full-stack contacts app that allows you to add, edit and delete contacts. It also allows you to search for contacts by either name or phone number. It was a project to learn Golang and web-frameworks like Gin-gonic.

- I ultimately decided on Gin-gonic due to the availability of resources and simplicity of the guides. I also considered Fiber, which was known for it being similar to Express.js, but decided against it due to lack of familarity with the language. Also looked into Echo and Gorilla/Mux, but resources were limited and the latter seems to be more of router/library rather than a framework.

- Frontend: React.js, MUIv5 for component libraries and styling
- Backend: Golang + web-framework serving RESTful API: Gin-gonic
- Database: MongoDB

## Demo

- Paginated contacts list

- Create Contact

- Update Contact

- Delete Contact

## Difficulties Encountered

- Learning Golang was challenging as a SWE bootcamp-er, with no formal training on data structures, how mmemory works (pointers, addresses), it required a bit more thinking to statically type variables. However, it was an excellent learning experience and hope that it will help me become a better software engineer.

- React --> it took me some adjusting to use Javascript after spending so much time in Python (for leetcode practice) and then Golang, but it was overcome relatively quickly compared to Golang since it was rather "unstructured" compared to latter.

- CSS --> Have not had much practise for awhile now, so it took some time to get back into figuring out how to align/center things. I had an overreliance on display: flex, but it seems to serve its purposes so far, when used in conjunction with Grids

## Things to work on

- Backend:

  - jwt authentication for account creation, and API security
  - add more fields to contact model
  - add validation to controller
  - task on looking into auditing and logging requests for security and block anomalous requests (use ML if necssary)
    - Elastic Kibana?

- Frontend:

  - add validation in frontend
  - add login/register page
  - work on CSS, fix alignment issues and add dialogs/modals (instead of coding with window/alerts/confirms)

- Look into unit testing

## Resources
