# Tiny URL App

- Shortened URL length should be short enough to manually type (max 5)
- We should be able to shorten at least 1 billion URLs
- We are using 64 character: <b>a-z</b>, <b>A-Z</b>, <b>0-9</b>, <b>-</b>, <b>\_</b>
- We are getting a random string from these characters and creating shorten URL from it
- If shorten URL already exists in DB, we are retrying for 3 times. If not successful, then throwing error.

### Start the server

```bash
# installation
$ npm install

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
