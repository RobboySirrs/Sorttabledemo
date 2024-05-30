

const express = require("express");
const app = express();

const http = require("http");
const fetch = require("node-fetch");

const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const server = http.createServer(app);

server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

server.listen(port);
// set the view engine to ejs
app.set('view engine', 'ejs');



app.use(express.static("public"));
app.use(express.json());


// index page

let korv = [
  {
    "_id": "id1",
    "vad": "korv",
    "text": "Robin Axelsson",
  },
 {
    "_id": "id2",
    "vad": "hello",
    "text": "Erik Svensson",
  },
 {
    "_id": "id3",
    "vad": "hello",
    "text": "Sten Stensson",
  },
 {
    "_id": "id4",
    "vad": "korv",
    "text": "Klas Malmberg",
  },
 {
    "_id": "id5",
    "vad": "hello",
    "text": "Linnea Arnberg",
  },
 {
    "_id": "id6",
    "vad": "world",
    "text": "Axel Ohlson",
  },
 {
    "_id": "id7",
    "vad": "korv",
    "text": "Mimmi Eriksson",
  },
 {
    "_id": "id8",
    "vad": "hello",
    "text": "Christer Andersson",
  },
 {
    "_id": "id9",
    "vad": "world",
    "text": "Lexus Jaha",
  }]

app.get('/', function(req, res) {
  
  
  if (req.query.filter === "world") {
    
    const filter = korv.filter(korv => korv.vad === 'world');


    res.render('../views/index', {
    test: filter
  });
    
  }
  else if (req.query.filter === "hello") {
    
    const filter = korv.filter(bajs => bajs.vad === 'hello');


    res.render('../views/index', {
    test: filter
  });
    
  }
   else if (req.query.filter === "korv") {
    
    const filter = korv.filter(korv => korv.vad === 'korv');


    res.render('../views/index', {
    test: filter
  });
   
  } else {
        
  res.render('../views/index', {
    test: korv
  });
}
});


//delete data
app.delete("/korv/:id", (req, res) => {
const { id } = req.params;
test = id.split(",");
console.log(test.length);
try {
for (let i = 0; i < test.length; i++) {
 
const item = korv.find(item => item._id == test[i]);

let tb = korv.filter(item => item._id != test[i]);
korv = tb
}
}
catch (err) {
res.status(400).json("något gick fel")
}
res.status(200).json("deleted")

})



//POST DATA
app.post("/korv", (req, res) => {
const text = req.body


if (!text.text) {

return res.status(400).send({status : "NEJ"})
  }
 korv.push(text)
// korvar = {text}
 
 
res.render('../views/index', {
    test: korv
  });
    
          
})













 