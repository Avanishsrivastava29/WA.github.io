const http=require("http")
const fs =require("fs");
var requests=require("requests")
const homeFile=fs.readFileSync("home.html","utf-8")
const replaceval=(tempval,orgval)=>{
  let temprature=tempval.replace("{%tempval%}",(orgval.main.temp/10).toFixed(2));
  temprature=temprature.replace("{%tempmin%}",(orgval.main.temp_min/10).toFixed(2))
  temprature=temprature.replace("{%tempmax%}",(orgval.main.temp_max/10).toFixed(2))
  temprature=temprature.replace("{%location%}",orgval.name)
  temprature=temprature.replace("{%country%}",orgval.sys.country)
  return temprature;
   

}
const server=http.createServer((req,res)=>{
    if(req.url=="/"){
        requests('https://api.openweathermap.org/data/2.5/weather?q=pune&appid=b556175d45e6f80fb858737725659c3a')
.on('data',  (chunk)=> {
  const objdata=JSON.parse(chunk)
  const arrdata=[objdata]
  console.log(arrdata[0].main.temp/10)
  const realtimedata=arrdata.map((val)=>replaceval(homeFile,val)).join("")
  //console.log(realtimedata);
       res.write(realtimedata);

  
  
})
.on('end',  (err)=> {
  if (err) return console.log('connection closed due to errors', err);
 
  res.end();
});


    }
});
server.listen(3000,"127.0.0.1");