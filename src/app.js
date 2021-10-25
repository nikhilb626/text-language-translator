const express=require("express");
const bodyParser=require("body-parser");

const translate=require("@vitalets/google-translate-api");

const app=express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// app.set('views', './views');
app.set("view engine","hbs");

const PORT=process.env.PORT || 5000;
app.get("/",(req,res)=>{
    res.render("index");
})

app.post('/',(req,res)=>{
    console.log(req.body.speech);
    translate(req.body.speech,{to:req.body.language}).then(response=>{
        res.render("index",{translated:response.text})
    }).catch(err=>{
        console.error(err);
    })
})


app.listen(PORT,()=>{
    console.log(`server connected at port ${PORT}`)
});
