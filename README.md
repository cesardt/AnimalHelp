ANIMAL HELP
==============================

Requirements:
- NodeJS
- Mongodb

Installation:
1.Start mongod
2.Run server.js with nodeJS
3. Import public/municipios.csv into the db cities with mongoimport --db test --collection cities --type csv --headerline --file 'Location of municipios.csv'\municipios.csv
(Replace the quoted section with the correct path)
4. Restart mongod and server.js