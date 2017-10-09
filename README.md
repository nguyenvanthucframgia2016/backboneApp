# backboneApp
#1 . Install JSON Server
```php
    npm install -g json-server
```
#2. Create an empty directory and cd into it
```php
    mkdir customer-manager && cd customer-manager
```

#3. Create a JSON file in which we'll store some customer data for JSON Server
```php
    touch customers.json
```

#4. Open up customers.json and add a customer
```php
    {
      "customers": [
        { "id": 1, "first_name": "John", "last_name": "Smith" }
      ]
    }
```

#5. Run Server
```php
    json-server customers.json
```

#6. Open browser and run command line
```php
    http://localhost:3000/customers
```

** Note:
```php
    guide: https://coligo.io/create-mock-rest-api-with-json-server/
    docs: https://github.com/typicode/json-server
```