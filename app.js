//jshint esversion: 6

const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https = require("https");
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
    const firstName=req.body.firstName;
    const lastName=req.body.lastName;
    const email=req.body.email;
    const data={
        members:[
            {
                email_address: email,
                status:"subscribed",
                merge_fields:{
                    FNAME:firstName,
                    LNAME:lastName
                }
            }
        ]
    };

    const jsonData=JSON.stringify(data);
    // url 'https://<dc>.api.mailchimp.com/3.0/lists/[listID]'
    //dc=usX
    const url="https://us14.api.mailchimp.com/3.0/lists/6141359c23";
    const options={
        method:"POST",
        auth:"vaishnavi:0ebee3b9d4723b2f7cfe6b6c38761a46-us14"
    };
    const request= https.request(url,options,function(response){
        if(response.statusCode===200){
            res.sendFile(__dirname+"/success.html");
        }else{
            res.sendFile(__dirname+"/failure.html");
        }
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })
    request.write(jsonData);
    request.end();
    //res.send(firstName+" "+lastName+" "+email);
});

app.post("/failure",function(req,res){
    res.redirect("/");
})
app.listen(process.env.POST || 3000,function(){
    console.log("Server is running on the port 3000");
})

//API Key
//0ebee3b9d4723b2f7cfe6b6c38761a46-us14

//List ID
//6141359c23


//https://young-ridge-52585.herokuapp.com/
//https://pacific-woodland-91454.herokuapp.com/
//https://desolate-fortress-23160.herokuapp.com/