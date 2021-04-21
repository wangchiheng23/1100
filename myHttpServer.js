const http=require('http')
const fs=require('fs');

var i=0;
const server=http.createServer((req,res)=> {
    if(req.url=="/"){
      res.statusCode = 200;
      res.setHeader('Content-Type','text/html')
      var fsData=fs.readFileSync("form1.html")
      
      res.write(fsData)
      res.end()
    }
    else if(req.url=="/icon.ico"){
      res.statusCode = 200;
      res.setHeader('Content-Type','text/html')
      var fsData=fs.readFile("form1.html",(err,fsData)=>{
        if(err){
          console.log("read file error.")
          throw err
        }
        console.log("1")
        res.write(fsData)
        res.end()

      })
      console.log("2")
    }
    else if(req.url.slice(0,6)=="/input"){
      res.statusCode=200;
      let url1=req.url.split("?")
      let obquery=querystring.parse(url1[1]);
      if(obquery.submit1=="Save"){
        fs.writeFile('./savefile',obquery.name123,'w',(err)=>{
          if(err) console.log("Write file err!")
          else console.log("Write file success!")
        })
      }
      else {
        fs.appendFile('./savefile',obquery.name123,'w',(err)=>{
            if(err) console.log("Append file err!")
            else console.log("Append file success!")
          })
      }
      res.setHeader("Content-Type","text/html")
      res.write(obquery.name123+"<br>");
      res.write(obquery.submit1+"<br>");
      res.end("submit success")
    }
    else{
      res.statusCode = 200;
      res.setHeader('Content-Type','text/html')
      res.write('this is W.You are the'+i+' visitor');
      i=i+1;
      res.end()
    }
    /*res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    i=i+0.5;
    res.write('this is W.You are the'+i+' visitor');
    res.end;
    console.log("this is my consolelog");*/
    }); 
  server.listen(3000);