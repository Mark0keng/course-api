# course-api
Implementasi API sederhana menggunakan Nodejs, ExpressJS, Sequelize (ORM)

# How to use

1. Install Package  
`npm install`

2. Create a database and adjust the database name in config/config.json
```
"development": {
    ...
    ...
    "database": "course",
    ...
    ...
  },
```

3. Run Migration  
`npx sequelize-cli db:migrate`

4. Run Server  
`nodemon index`

## Made with
- ExpressJS
- Sequelize (ORM)
- JWT
