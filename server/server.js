import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json()); // Enable JSON parsing

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "vahan1",
});

app.get("/", (req, res) => {
  const sql = "SELECT * FROM students";
  db.query(sql, (err, result) => {
    if (err) return res.json({ Message: "Error inside server" });
    return res.json(result);
  });
});

app.post("/students", (req, res) => {
  const { ID, NAME, Email, Password, DOB, Mob } = req.body;

  const sql =
    "INSERT INTO students (`ID`,`Name`, `Email`, `DOB`, `Mob`) VALUES (?)";
  const values = [ID, NAME, Email, DOB, Mob];

  db.query(sql, [values], (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});

app.get("/read/:ID", (req, res) => {
  const sql = "SELECT * FROM students WHERE ID=?";
  const ID = req.params.ID;
  db.query(sql, [ID], (err, result) => {
    if (err) return res.json({ Message: "Error inside server" });
    return res.json(result);
  });
});

app.put("/update/:id", (req, res) => {
  const sql =
    "UPDATE students SET `NAME`=?, `Email`=?, `DOB`=?, `Mob`=? WHERE ID=?";
  const id = req.params.id;
  db.query(
    sql,
    [req.body.NAME, req.body.Email, req.body.DOB, req.body.Mob, id],
    (err, result) => {
      if (err) return res.json({ Message: "Error inside server" });
      return res.json(result);
    }
  );
});

app.delete("/delete/:id", (req, res) => {
  const sql = "DELETE FROM students WHERE ID=?";
  const id = req.params.id;
  db.query(sql, [id], (err, result) => {
    if (err) return res.json({ Message: "Error inside server" });
    return res.json(result);
  });
});

app.listen(8081, () => {
  console.log("Listening on port 8081");
});
