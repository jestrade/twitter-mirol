## APIRest

Request:
```
{
   headers:{
      x-access-token: ******my-token*******
   }
}
```
Response:
```
{
	success: true|false
	items: [ ]
	message: “”
}
```

<table>
  <tr>
   <td><strong>Resource (endpoints)</strong>
   </td>
   <td><strong>GET</strong>
   </td>
   <td><strong>POST</strong>
   </td>
   <td><strong>PUT</strong>
   </td>
   <td><strong>DELETE</strong>
   </td>
  </tr>
  <tr>
   <td>/
   </td>
   <td>{success: false}
   </td>
   <td>{success: false}
   </td>
   <td>{success: false}
   </td>
   <td>{success: false}
   </td>
  </tr>
  <tr>
   <td>/users
   </td>
   <td>Users list
<p>
{success: true}
<p>
**authentication**
   </td>
   <td>New user
<p>
{success: true}
<p>
{username,
<p>
name,
<p>
email,
<p>
password}
   </td>
   <td>{success: false}
   </td>
   <td>{success: false}
   </td>
  </tr>
  <tr>
   <td>/users/:username
   </td>
   <td>User info
<p>
{success: true}
<p>
**authentication**
   </td>
   <td>{success: false}
   </td>
   <td>Update user
<p>
{success: true}
<p>
{name,
<p>
email,
<p>
password}
<p>
**authentication**
<p>
*authorization*
   </td>
   <td>Delete user
<p>
{success: true}
<p>
**authentication**
<p>
*authorization*
   </td>
  </tr>
  <tr>
   <td>/tweets
   </td>
   <td>Tweet list
<p>
{success: true}
   </td>
   <td>New tweet
<p>
{success: true}
<p>
{content}
<p>
**authentication**
   </td>
   <td>{success: false}
   </td>
   <td>{success: false}
   </td>
  </tr>
  <tr>
   <td>/tweets/:id
   </td>
   <td>Tweet info
<p>
{true}
   </td>
   <td>{success: false}
   </td>
   <td>{success: false}
   </td>
   <td>Delete user
<p>
{success: true}
<p>
**authentication**
   </td>
  </tr>
  <tr>
   <td><strong>/weather/:city</strong>
   </td>
   <td>Temp
<p>
{true}
   </td>
   <td>{success: false}
   </td>
   <td>{success: false}
   </td>
   <td>{success: false}
   </td>
  </tr>
  <tr>
   <td><strong>/users/login</strong>
   </td>
   <td>{success: false}
   </td>
   <td>isAuth?
<p>
{true}
<p>
{username,
<p>
password}
   </td>
   <td>{success: false}
   </td>
   <td>{success: false}
   </td>
  </tr>
</table>

**user must be authenticated
*own creator



```
{
	success: true|false
	items: []
	message: “”
}
```

1. Clone the app
```
git clone https://github.com/jestrade/make-it-real-online.git
```

2. Get into the folder make-it-real-online/05-express
```
cd make-it-real-online/05-express
```

3. Install the app
```
npm install
```

4. Create a .env file
```
PORT=3000
SALT=10
WEATHER_API_KEY={my-openweathermap-api-key}
JWT_KEY={my-secret-key}
CONSUMER_KEY={twitter-key}
CONSUMER_SECRET={twitter-secret}
ACCESS_TOKEN_KEY={twitter-token}
ACCESS_TOKEN_SECRET={twitter-token-secret}
DB_CONNECTION_STRING=i.e. mongodb://127.0.0.1:27017/dbname
```

5. Run the app
```
npm start
```

6. Run linting
```
npm run lint
```