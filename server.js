const app = require("./app");

const port = process.env.PORT || 3000;

const listener = app.listen(port, () => {});
