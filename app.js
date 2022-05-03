require("dotenv").config()
require("express-async-errors")

const express = require("express")
const app = express()

const mainRouter = require("./routes/main")
const notFoundMiddleware = require("./middleware/not-found")
const errorHandlerMiddleware = require("./middleware/error-handler")

app.use(express.json())

app.use("/api/v1", mainRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const PORT = process.env.PORT || 3000

const init = async () => {
    try {
        app.listen(PORT, () =>
            console.log(`Server is running on port ${PORT}...`)
        );
    } catch (error) {
        console.log(`Application init error: ${error}`);
    }
};

init();