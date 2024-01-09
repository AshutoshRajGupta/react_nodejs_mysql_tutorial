import express from 'express'
import mysql from 'mysql'
import cors from 'cors';
const app=express()

const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    "password":"ashutosh",
    database:"my"
})

app.use(express.json());
app.use(cors());

// if there isa authentication problem 
// Alter user 'root'@'localhost' identified with mysql_native_password by 'password'
;app.get("/",(req,res)=>{
    res.json("hello this is the backend");
})


app.get("/books",(req,res)=>{
    const q="select * from books"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.post("/books",(req,res)=>{
    const q="insert into books (`title`,`desc`,`price`,`cover`) values(?)"
    const values=[
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover
    ]

    db.query(q,[values],(err,data)=>{
        if (err) return res.json(err);
        return res.json("book has been created sucessfully");
    });
})

app.delete("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = " DELETE FROM books WHERE id = ? ";
  
    db.query(q, [bookId], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  });
  
  app.put("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "UPDATE books SET `title`= ?, `desc`= ?, `price`= ?, `cover`= ? WHERE id = ?";
  
    const values = [
      req.body.title,
      req.body.desc,
      req.body.price,
      req.body.cover,
    ];
  
    db.query(q, [...values,bookId], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  });



app.listen(8800,()=>{
    console.log("connected to backend!!");
})