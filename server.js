
const app = require("./app");


const port = process.env.PORT || 3000;

  const listener = app.listen(port, () => {
    console.log(`App running on port ${listener.address().port}...`);
  });