const express = require("express")
const cors = require("cors")
const fs = require("fs")
const app = express()
app.use(express.json())
app.use(cors())
let lastID=3
// get method
app.get("/product", (req, res) => {
  fs.readFile("./db.json", "utf-8", (err, data) => {
    if (err) {
      res.send(err)
    }
    else {
      res.send(data)
    }
  })
})
// post method
app.post("/addproduct", (req, res) => {
  fs.readFile("./db.json", "utf-8", (err, data) => {
    if (err) {
      res.send(err)
    } else {
      const newdata = JSON.parse(data)
      newdata.push({...req.body,
        id:++lastID
      })
      fs.writeFile("./db.json", JSON.stringify(newdata), (err) => {
        if (err) {
          res.send(err)
        } else {
          res.send("product added successfully")
        }
      })
    }
  })
})
// patch method

app.patch("/editproduct/:id", (req, res) => {
  const { id } = req.params;
  fs.readFile("./db.json", "utf-8", (err, data) => {
    if (err) {
      res.send(err)
    } else {
      const productData = JSON.parse(data)
      const index = productData.findIndex((el) => el.id == id)
      if (index != -1) {
        productData[index] = { ...productData[index], ...req.body };
        fs.writeFile("./db.json", JSON.stringify(productData), (err) => {
          if (err) {
            res.send(err)
          }
          else {
            res.send("data Edit succesfully")
          }
        })
      } else {
        res.send("data is not Found")
      }
    }
  })
})
app.listen(8080, () => {
  console.log("Running on port 8080");
});

