const express = require("express");
const { connectToDatabase } = require("./src/database/mongoConnect");

const app = express();
const port = 3001;

const tasks = require("./src/routes/tasks");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/v1/tasks", tasks);

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
