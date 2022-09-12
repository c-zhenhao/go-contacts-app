# Full-stack contacts app

- Contacts Book is a full-stack contacts app that allows you to add, edit and delete contacts. It also allows you to search for contacts by either name or phone number (though the search isn't as smart as Google's... speaking of Google, the design of it is inspired by Google's very own contact app). It was a project to learn Golang and web-frameworks like Gin-gonic.

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
    - task on looking into auditing and logging requests for security and block anomalous requests (use ML if necssary)
    - Elastic Kibana?
  -
  - add more fields to contact model
  - add validation to controller
  - look into implementing cloudinary for image upload

- Frontend:

  - BUGS:
    - when searching for a string while on a page that is not 1, the results are not correct as the page retained the previous page number.
      - to fix by resetting page number to 1 when search is triggered -- however that will require refactoring the code where the state is evalated to the parent component or possibly context/redux
  - refactor haphazard code (e.g. move repeated code (e.g. fetching data) to services.js)
  - add validation in frontend
  - add login/register page
  - work on CSS, fix alignment issues and add dialogs/modals (instead of coding with window/alerts/confirms)

- Look into unit testing

## Resources

- Gin-gonic cors: https://pkg.go.dev/github.com/gin-contrib/cors#section-readme

- WTF are pointers and how to use them in APIs

  - https://willnorris.com/2014/05/go-rest-apis-and-pointers/
  - https://dave.cheney.net/2017/04/26/understand-go-pointers-in-less-than-800-words-or-your-money-back

- WTF is omitempty?

  - https://www.sohamkamani.com/golang/omitempty/
  - https://stackoverflow.com/questions/47158987/how-to-update-mongodb-fields-with-omitempty-flag-in-golang-structure
  - https://www.golang-book.com/books/intro/8
  - https://www.digitalocean.com/community/conceptual_articles/understanding-pointers-in-go

- Pagination resources:

  - https://github.com/icza/minquery (kind of inactive)
  - https://github.com/gobeam/mongo-go-pagination (kind of inactive)

- More Golang project guides which I intend to follow:
  - A few topics: https://codevoweb.com/golang/
  - GraphQL with Golang: https://dev.to/hackmamba/create-a-graphql-powered-project-management-endpoint-in-golang-and-mongodb-18a
  - Gin gonic GO JWT https://www.youtube.com/watch?v=Cr3BiwGN2Tg&list=PL5dTjWUk_cPY7Q2VTnMbbl8n-H4YDI5wF&index=8
  - Gin-gonic Cloudinary https://dev.to/hackmamba/robust-media-upload-with-golang-and-cloudinary-gin-gonic-version-54ii

## Wireframes (intended design - TBD (maybe))
