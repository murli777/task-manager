const path = require("path");
const express = require("express");
const { connectToDatabase } = require("./src/database/mongoConnect");
const notFound = require("./src/middlewares/notFound");
const errorHandler = require("./src/middlewares/errorHandler");

const app = express();
const port = process.env.PORT || 3001;

const tasks = require("./src/routes/tasks");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.use("/api/v1/tasks", tasks);

app.use(notFound);
app.use(errorHandler);

const startServer = async () => {
  try {
    await connectToDatabase();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
