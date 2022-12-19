const express = require("express");
const app = express();
const PORT = 4321;
const authRoutes = require("./routes/authRoutes");
//middlewares
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use("/api/v1", authRoutes);

app.listen(PORT, () => {
  console.log(`App is running at http://localhost:${PORT}`);
});
