# Full-stack contacts app

- Contacts Book is a full-stack contacts app that allows you to add, edit and delete contacts. It also allows you to search for contacts by either name or phone number (though the search isn't as smart as Google's... speaking of Google, the design of it is inspired by Google's very own contact app). It was a project to learn Golang and web-frameworks like Gin-gonic.

- I ultimately decided on Gin-gonic due to the availability of resources and simplicity of the guides. I also considered Fiber, which was known for being similar to Express.js, but decided against it due to lack of familiarity with the language. Also looked into Echo and Gorilla/Mux, but resources were limited and the latter seems to be more of router/library rather than a framework.

- Frontend: React.js, MUIv5 for component libraries and styling
- Backend: Golang + web-framework serving RESTful API: Gin-gonic
- Database: MongoDB


## Demo

- Paginated contacts list
  <video src="https://user-images.githubusercontent.com/16322250/189772771-b10d9059-f86f-4cd9-97c9-c196942eded5.mov" controls="controls" style="max-width: 730px;">
  </video>

- Create Contact and Searching for it
  <video src="https://user-images.githubusercontent.com/16322250/189773217-1dd32541-b68b-4e40-8e96-f5d64685eb99.mov" controls="controls" style="max-width: 730px;">
  </video>

- Search returns multiple matching documents (name or number)
  <video src="https://user-images.githubusercontent.com/16322250/189773181-7f70d894-069b-4d29-8a8d-7f570567d25b.mov" controls="controls" style="max-width: 730px;">
  </video>

- Update Contact
  <video src="https://user-images.githubusercontent.com/16322250/189773496-9ea7392b-f060-40d0-810c-dc43e257a28a.mov" controls="controls" style="max-width: 730px;">
  </video>

- Delete Contact
  <video src="https://user-images.githubusercontent.com/16322250/189773659-b30de7c5-8485-4d33-bdce-fa472b93e785.mov" controls="controls" style="max-width: 730px;">
  </video>


## APIs developed

Contacts API
| Method | Address             | Description                  |
| ------ | ------------------- | ---------------------------- |
| POST   | /contact            | Create contact               |
| GET    | /contact/:contactId | Retrieve single contact data |
| GET    | /contact            | Retrieve all contact data    |
| PATCH  | /contact/:contactId | Update single contact data   |
| DELETE | /contact/:contactId | Delete single contact data   |

User API TBD
| Method  | Address            | Description                  |
| ------  | ------------------ | ---------------------------- |
| POST    | /user/register     | Create user                  |
| POST    | /user/signin       | Login user (send jwt)        |
| POST    | /user/logout       | Logout user (if sessions)    |
| GET     | /user/:userId      | Retrieve user details        |
| GET     | /user              | Retrieve all user deatils    |
| PATCH   | /user/:userId      | Update user details          |
| DELETE  | /user/:userId      | Delete user                  |
| POST    | /token/refresh     | Refresh JWT token            |
| POST    | /token/blacklist   | Blacklist token (if jwt)     |

### TBD Swagger Documentation - WIP


## Difficulties Encountered

- Learning Golang was challenging as a SWE bootcamp-er, with no formal training on data structures, how memory works (pointers -- passing by value, passing by reference, structs, BSON v. JSON), it required a bit more thinking to statically type variables, in addition to somewhat unfamiliar syntax. However, it was an excellent learning experience and hope that it will help me become a better software engineer going forwards.

- React --> It took me some adjusting to use JavaScript after spending the last 3 weeks in Python (for leetcode practice.....), but it was overcome relatively quickly compared to Golang since JS is rather "unstructured" compared to latter.

- HTML/CSS --> Have not had much practise for awhile now, so it took some time to get back into figuring out how to align/center things. I tend to have an overreliance on `display: flex` as i think it fixes all centering problems (provided i know what's happening...), but it seems to serve its purposes so far, when used in conjunction with Grids to create the right layout and even responsive when using breakpoints correctly.


## Things to work on

- Backend:

  - task: swagger to document API
  - jwt authentication for account creation, and API security
    - task on looking into auditing and logging requests for security and block anomalous requests (use ML if necssary)
    - Elastic Kibana?
  - add more fields to contact model
  - add validation to controller
  - look into implementing cloudinary for image upload
  - look into unit testing (testify)

- Frontend:
  - BUGS:
    - when searching for a string while on a page that is not 1, the results are not correct as the page retained the previous page number.
      - to fix by resetting page number to 1 when search is triggered -- however that will require refactoring the code where the state is elevated to the parent component or possibly context/redux
    - Edit page: occasionally, after editing and saving the contact details, the page does not show the updated details.
      - possibly because the page redirecting (used navigate /view/contactId to redirect) is rendering faster than the the database saves the details, so it retrives the old information. 
        - to perhaps add in a delay to allow database to update (not sure if there's another more optimal solution)    
  - refactor haphazard code (e.g. move repeated code (e.g. fetching data) to services.js)
  - add validation in frontend
  - add login/register page
  - work on CSS, fix alignment issues and add dialogs/modals (instead of coding with window/alerts/confirms)
  - Look into unit testing (?jest)


## Resources

- Gin-gonic cors: https://pkg.go.dev/github.com/gin-contrib/cors#section-readme

- What are pointers and how to use them in APIs
  - https://willnorris.com/2014/05/go-rest-apis-and-pointers/
  - https://dave.cheney.net/2017/04/26/understand-go-pointers-in-less-than-800-words-or-your-money-back

- What is omitempty?
  - https://www.sohamkamani.com/golang/omitempty/
  - https://stackoverflow.com/questions/47158987/how-to-update-mongodb-fields-with-omitempty-flag-in-golang-structure
  - https://www.golang-book.com/books/intro/8
  - https://www.digitalocean.com/community/conceptual_articles/understanding-pointers-in-go

- Pagination resources:
  - https://github.com/icza/minquery (kind of inactive)
  - https://github.com/gobeam/mongo-go-pagination (kind of inactive)
  - https://www.youtube.com/watch?v=yObwJgoXR7o&t=994s

- Swagger resources to follow:
  - https://santoshk.dev/posts/2022/how-to-integrate-swagger-ui-in-go-backend-gin-edition/
  - https://blog.logrocket.com/documenting-go-web-apis-with-swag/
  - https://github.com/swaggo/swag

- Potentially API monitoring stuff to follow (will edit):
  - https://www.youtube.com/watch?v=pP2DKCKR4CQ

- More Golang project guides which I intend to follow:
  - A few topics: https://codevoweb.com/golang/
  - GraphQL with Golang: https://dev.to/hackmamba/create-a-graphql-powered-project-management-endpoint-in-golang-and-mongodb-18a
  - Gin gonic GO JWT https://www.youtube.com/watch?v=Cr3BiwGN2Tg&list=PL5dTjWUk_cPY7Q2VTnMbbl8n-H4YDI5wF&index=8
  - Gin-gonic Cloudinary https://dev.to/hackmamba/robust-media-upload-with-golang-and-cloudinary-gin-gonic-version-54ii


## Wireframes (intended design - TBD (maybe))

![image](https://user-images.githubusercontent.com/16322250/189774221-1de561b9-44c9-46c6-a3d7-ffe4a4c91813.png) </br>
![image](https://user-images.githubusercontent.com/16322250/189774240-a68012b3-cdf5-48ac-b9dd-a2afd62dfc19.png)
