const express = require('express');

const app = express();

app.listen(process.env.PORT || 3000, () => {
  console.log(`App listening on http://localhost:${process.env.PORT || 3000}`);
});
