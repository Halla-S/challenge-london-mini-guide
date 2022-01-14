const express = require("express");
const app = express();

const cities=require("./data/cities.json");
const harrow = require("./data/Harrow.json");
const stratford = require("./data/Stratford.json");



app.get("/",(req,res)=>{
 res.json("try/city/category")
});

//All about Harrow
app.get("/harrow", (req, res) => {
  res.json(cities.harrow);
});


//pharmacies in Harrow
app.get("/harrow/pharmacies", (req, res) => {
  res.json(harrow.pharmacies);
});
//colleges in Harrow
app.get("/harrow/colleges", (req, res) => {
  res.json(harrow.colleges);
});

//schools in Harrow
app.get("/harrow/schools", (req, res) => {
  res.json(harrow.schools);
});


//hospitals in Harrow
app.get("/harrow/hospitals", (req, res) => {
  res.json(harrow.hospitals);
});



// make the city dynamic 
app.get("/:city", (req, res) => {
  const found = cities.some(item=>item.city==req.params.city);

  if (found) {
  res.json(cities.filter((item) => item.city == req.params.city));
  } else {
    res
      .status(400)
      .json({ msg: `No city with the name: ${req.params.city}` });
  }
});

//get pharmacies of each city
app.get("/:city/pharmacies", (req, res) => {
  const found = cities.some((item) => item.city == req.params.city);

  if (found) {
    res.json(cities.filter((item) => item.city == req.params.city).map(item=>(item.pharmacies)));
  } else {
    res
      .status(400)
      .json({ msg: `No information about  ${req.params.city} ` });
  }
});




//making cities and categories in a single route 


app.get("/:city/:category", (req, res) => {
  const reqCat = req.params.category;
  const found =
    cities.some((item) => item.city == req.params.city && item[reqCat])


  if (found) {
  
  res.json(
    cities.filter((item) => item.city == req.params.city).map((item) => item[reqCat])
   
  );
  } else {
    res.status(400).json({ msg: `No ${reqCat} found in ${req.params.city}` });
  }
});

const PORT = process.env.PORT || 3030;
var listener = app.listen(PORT, function () {
  console.log("Listening on port " + listener.address().port); 
});

