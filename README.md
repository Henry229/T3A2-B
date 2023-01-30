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

`Model.findByIdAndUpdate()` method will find the document whose id is the same as the given id argument and update it. The optional second argument '{returnDocument: 'after'}' will return


### jest

### supertest