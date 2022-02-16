# myBackend-validation

step 1: new repo<br>
step 2: name repo<br>
step 3: click add read.me<br>
step 4: click.gitignore<br>
step 5: select node<br>
step 6: create repo<br>
step 7: copy SSH<br>
step 8: in terminal git clone SSH<br>
step 9: cd into folder<br>
step 10: in terminal npx express-generator --view=ejs backend<br>
step 11: cd into backend<br>
step 12: npm i<br>
step 13: npm i mongoose dotenv<br>
step 14: git status, git add ., git commit -m "created express-generator", git push<br>
step 15: app.js<br>
-    const mongoose = require("mongoose")<br>
-    require("dotenv").config()<br>
-    mongoose<br>
-    .connect(process.env.MONGODB_URI)<br>
-    .then(() => console.log('Established a connection to the database'))<br>
-    .catch(err => console.log('Something went wrong when connecting to the database ', err))<br>
step 16: create .env file<br>
step 17: .env MONGODB_URI = mongodb://localhost:27017/name-of-folder<br>
step 18: bin folder var port = normalizePort(process.env.PORT || '3001')<br>