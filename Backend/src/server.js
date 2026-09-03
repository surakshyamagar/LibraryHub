const app = require("./app");
require("dotenv").config();

// "Read everything from the .env file."
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});