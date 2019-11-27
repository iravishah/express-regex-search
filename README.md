# express-regex-search
Simple API service to search district, town and state with regex

## Quick start

### Step 1: Prerequisite
+ Install Node.js - v8.0 or >=
+ Install MongoDB - v3.6 or >=

### Step 2: Create DB user for MongoDB
```sh
> use expressapi
switched to db expressapi
> db.createUser({user: "admin", pwd: "root", roles: ["readWrite", "dbAdmin"]})
Successfully added user: { "user" : "admin", "roles" : [ "readWrite", "dbAdmin" ] }
```

### Step 3: Load database with data
```sh
npm run load
```

### Step 4: Install the dependencies
```sh
npm install
```
### Step 5: Run
```sh
npm run start
```

### Step 6: Testcases
To run testcases
``` sh
npm run test
```

### Step 7: Admin key to access resources
```sh
admin_key: test
```

### API calls
```sh
url: http://localhost:8081

resource: /v1.0/state
query: { q : 'Kera' }

resource: /v1.0/town
query: { q : 'Phule' }

resource: /v1.0/district
query: { q: 'Jaip' }
```