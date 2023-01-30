# T3A2-B

## Source code links

[Frontend](https://github.com/Henry229/T3A2-B)  
[Backend](https://github.com/lmh4686/MERN-Restaurant-API)

## Used libraries

## Frontend

## Backend

### Express

Express is a free open-source web framework for Node.js. It is minimal and flexible and used to build web applications and APIs. By using Express, developers can easily create a server that receives requests from clients and responds correspondingly with pre-defined functions. A server built with Express responds in the following sequence:

1. Receive a request from a client.
2. The server checks for a matching HTTP method and URL that is requested from the client.
3. Runs all functions that are called by the router or have matching HTTP method and URL one-by-one  from top to bottom until it sends a response back to the client.

Middleware In Express

In number 3, ‘all functions’ are called ‘middlewares’ in Express. They are functions that are executed before it sends a response. Developers can define them for error-handling, validation, calculation, database query, etc. Also Express has some built-in middlewares, for example, ‘express.json()’ parses JSON requests and returns parsed data to request so developers can access  and manipulate the request object using dot notation.

```js
import express from 'express'
import reservationRoutes from './controllers/ReservationRoutes.js'

const app = express()

app.get('/', (req, res) => {
  res.json({msg: 'Restaurant booking API'})
})

app.use('/reservation', reservationRoutes)

app.listen(process.env.PORT || 3000, () => console.log('API Connected'))
```

The code snippet above shows basic usage of express. Firstly, it makes an instance of express and define response by endpoints and HTTP verbs. And app.use() method lets the 'app' uses the given middleware. In this case, the reservationRoutes is imported from other file, and it prefixes a part of url to be '/reservation'. So all url starts with '/reservation', will be passed to the 'reservationRoutes' middleware which looks like this:

```js
import express from 'express'

const router = express.Router()

router.get('/', verifyJwt, generateAdminJWT, async (req, res) => {
  const reservations = await Reservation.find().populate(populateOption)
  reservations.sort((a, b) => a.guest.date - b.guest.date)

  reservations.length ? res.json({jwt: req.jwt, reservations}) : res.status(404).json(notFoundMsg)
})

export default router
```

This is a part of the reservationRouter middleware. The router has been defined on the top and instead of using 'app.[httpVerb]', it uses router.[httpVerb]. The verifyJwt and the generateAdminJWT are middlewares that will be executed in sequence when a get request is made for 'https://someURL/reservation'. Then, finally the callback function will be executed and will send the response. At the bottom, it shows that the defined router is default exported. Which enables to assign more semantic name in the index.js and register it.

### bcrypt

Bcrypt has been used in this project to implement following features:

1. Add salt to the admin login credentials.
2. Hash the salted admin credentials.
3. Compare hashed data and unhashed data.

```js
const saltRounds = 10

export async function hashString(stringToHash) {
  let salt = await bcrypt.genSalt(saltRounds)
  return await bcrypt.hash(stringToHash, salt)
}

export async function validateHashedData(unhashedData, hashedData) {
  return await bcrypt.compare(unhashedData, hashedData)
}
```

The 'slatRound' specifies the number of iterations to use when generating a salt for login credential hash. And it also determines the time to compute the salt ans hash. The larger the number is, the longer it takes and the more secure. Therefore, all salt and hash related methods are asynchronous.

The 'bcrypt.genSalt(saltRounds)' apply the defined 'slatRounds' and generate the salt. And the 'bcrypt.hash(stringToHash, salt)' add the salt to the given string and hash it.

Unlike encryption, once data is hashed, it is impossible to unhash the data. However, it provides a method to compare a unhashed data and hashed data. If the original data is the same, the 'bcrypt.compare(unhashedData, hashedData)' method will return true. Otherwise, it will return false.

### cors

Cors is used to prevent the cross-origin error. The cross-origin error is one of the security restriction by web browsers which blocks sending requests to other domains. This policy is 'Same Origin Policy' and is implemented by default to prevent malicious scripts from accessing sensitive information from other websites. To undo this policy, we should change the policy to be 'Cross-origin Resource Sharing' which allows to make request to any other origins. And the library 'cors' can implement this policy by simply including this code `app.use(cors())` between the express instance(app) and the firstly defined route.

### dotenv

dotenv is used to safely store the environment variables. It is useful to save sensitive information such as API keys, JWT secrete, database url, etc. By saving them in the .env file, developers can conceal the sensitive information from the source code.  
To access the environment variables,

1. Import dotenv
2. Call `dotenv.config()`
3. Write `process.env.[variableName]` to access an environment variable.

`dotenv.config()` reads the .env file, parse the contents, assign it to `process.env` and return an Object that contains ket, value pairs of the environment variables.

In this project, it has been used to store:

1. Enc key and ENC IV for encryption configuration
2. JWT secret key
3. Database URL
4. Admin login credentials

### helmet

Helmet is a node JS library that is used to improve security by setting various HTTP headers.  

```js
app.use(helmet())
app.use(helmet.permittedCrossDomainPolicies())
app.use(helmet.referrerPolicy())
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc:["'self'"]
  }
}))
```

The top level `app.use(helmet())` is a middleware that wraps around 15 smaller middlewares that all improve headers' security. And the developers can use other middleware configurations as above.

### jsonwebtoken

JWT is one of the popular user authentication methods and the library jsonwebtoken provides various JWT related functions. In this project, the jsonwebtoken library has been used to generate JWT and verify JWT.  

```js
import jwt from 'jsonwebtoken'

jwt.sign({username: 'foo', password: 'bar'}, jwtSecret, {expiresIn: "1d"})
jwt.verify(targetJWT, jwtSecret, {complete: true})
```

The jwt.sign() method creates a new JWT. We can pass three arguments, an object, JWT secret key and expiry time. Then it will return a new JWT that based on the given arguments.

The jwt.verify() method verifies if the given JWT has the same secret key value. And because of the optional argument '{complete: true}', it will returns a complete object that contains payload, header and signature. Because it only checks if the JWT secret key is valid, we should check if the login credentials are valid manually. To read the login credentials, we can use payload.data which returns stringified login credentials (usually encrypted as well). Then we can use JSON.parse() to convert it to a JavaScript object and compare the values with the original values.

### mongoose

mongoose is an ODM (Object Data Modeling) that provides a connection between the mongoDB and the server. By using mongoose, developers can create read and manipulate data. The following will show some of usages of mongoose in the project.

**Creating a model**

```js
import mongoose from "mongoose";

const GuestSchema = mongoose.Schema({
  firstName : { type: String, required: true },
  lastName : { type: String, required: true },
  mobile: { type: String, required: true },
  date: { type: Date, required: true },
  guestNumber: { type: Number, required: true }
})

const ReservationSchema = mongoose.Schema({
  table: { type: mongoose.Types.ObjectId, ref: "Table", required: true },
  guest: GuestSchema,
  isConfirmed: { type: Boolean, default: false }
})

const Reservation = mongoose.model("Reservation", ReservationSchema)
```

The mongoose.Schema() method is used to define a structure of a collection. Developers can specify the data type in each field and some conditions such as mandatory required or default values.  
The GuestSchema is nested inside of the ReservationSchema. This form is called 'sub document'. The sub document can only exist inside of the parent document and it will be assigned its own unique _id value when it's created as if other normal documents. There's an other way to reference other document as well. In the ReservationSchema, table field, it references the table ID by specifying the type as an object id and where it comes from. However, this way will not generate the unique ID for the field.

On the last line, `const Reservation = mongoose.model("Reservation", ReservationSchema)` will create a new model called Reservation that has the structure of the ReservationSchema. Then the model is accessible by calling `Reservation`.

**Query**

```js
const dateFilteredReservations = await Reservation.find({
    'guest.date': {$lt: manipulateHours(bookingInfo.date, 'plus', 4), 
                   $gt: manipulateHours(bookingInfo.date, 'minus', 4)}
                  }).populate('table')
```

The `Model.find()` method returns an array of the all documents that belong to the Model. However, we can filter the results by passing some conditions. The 'guest.date' is the target value to filter, the "\$lt" means 'less than', '\$gt' means 'greater than' and the 'manipulateHours' is a custom function that add or subtract the given hours value to the given date. So it will return all documents that have the 'guest.date' values are from 'bookingInfo.date' - 4hr to 'bookingInfo.date + 4hr'. And the '.populate('table')' will show all the table document's fields instead of only showing its id. On the other hand, `Model.findOne()` will return the first document that it's found and `Model.findById(idValue)` will find a document that have the given id. All database queries happen asynchronously so it's important to use await keyword when it's necessary.

```js
  const newBooking = await Reservation.create({
    table: req.availableTableId,
    guest: req.body
  })
```

`Model.create()` method will insert a new document into the collection. If the argument does not match with its schema, it won't be created. It will return the created document by default.

```js
const updatedReservation = await Reservation.findByIdAndUpdate(
        req.params.id, 
        { table: req.availableTableId, guest: req.updatedGuestForm, isConfirmed: Boolean(req.updatedGuestForm.isConfirmed)}, 
        {returnDocument: 'after'}
        )
```

`Model.findByIdAndUpdate()` method will find the document whose id is the same as the given id argument and update it with the given fields. The optional third argument '{returnDocument: 'after'}' will return the updated document instead of the original document. And `Model.findByIdAndDelete()` works same as this method but it doesn't require any fields to be provided, it will search the document that has the given id and delete the corresponding document.

### jest, supertest

Jest is one of the most popular JavaScript testing frameworks. And supertest lets developers to send requests to the server and able to access the response object in test scripts.  

The following code snippet will show the usage of jest and supertest.

```js
import request from 'supertest'
import app from '../index.js'

describe('POST Reservation',() => {
  for (let testCase of sameCustomerFilterTestCases) {
    test(testCase.condition, async () => {
      const res = await request(app).post('/reservation').send(testCase.guest)
      expect(res.statusCode).toBe(testCase.expectedStatus)

      if (testCase.expectedStatus === 201) {
        expect(res.statusCode).toBe(201)
        expect(new Date(res.body.guest.date).toLocaleString()).toEqual(new Date(testCase.guest.date).toLocaleString())
        expect(res.body.guest).toEqual(testCase.guest)
      }else {
        expect(res.statusCode).toBe(409)
        expect(res.body.error).toBe('Same guest found!')
        expect(Object.keys(res.body).length).toEqual(1)
      }
    })
  }
})
```

describe('Testing category') method group tests by the given category. Then it uses callback function to call test() method execute the test. The first argument of the test method should specify the test condition and the expected outcome. And the following callback function will perform the test.  
A request can be sent to the server as follows:  
`const response = await request([imported app]).[httpVerb]([url]).set([headers]).send([body])`  
Then, this will return the response from the server and developers can check if the response is as expected:  
`expect([res.body.someValue]).toBe(expectedValue)`  
If the 'some value' is not 'expected value', the test will fail. If it's the same, it will move to the next.  
The 'expect' argument no need to be specific. For example, we can use Boolean operator as well:  
`expect(res.body.someValue > 5).toBe(true)`  
To check if a specific field is in the response body, we can use 'toBeDefined()' method. It is useful to check if a specific field is included in the response body that has unpredictable value such as JWT:  
`expect(res.body.jwt).toBeDefined()`
And it also can access the response status code by calling `response.statusCode`.

## Testing

### Development Testing

#### Frontend

#### Backend

The automated test covers all the test scenarios.  
Please check [src/test/](https://github.com/lmh4686/MERN-Restaurant-API/tree/main/src/test) directory for more details.  

**Automated test cases and outcomes**
![test Case](resources/exp_test1.png)
![test Case](resources/exp_test2.png)
![test Case](resources/exp_test3.png)

### Production Testing
