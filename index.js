const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const courses = [

{id:1,name:"dk"},
{id:2,name:"ek"},
{id:3,name:"lk"},

]

app.get('/',(req,res)=>{
    res.send('hello');
})
app.get('/api/courses/', (req, res) => {
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
   const course =  courses.find(c =>c.id === parseInt(req.params.id))
   if(!course) res.status(404).send('id was not found');
   res.send(course);
});

app.post('/api/courses', (req, res) => {
    const {error} = validateCourse(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);  
    }
    const course = {
        id: courses.length+1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(c=>c.id === parseInt(req.params.id));
    if(!course){
        res.status(404).send('id was not found');
        return;
    } 

    const {error} = validateCourse(req.body);
    if(error){
        res.status(400).send(error.details[0].message);
    }
    course.name = req.body.name;
    res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c=>c.id === parseInt(req.params.id));
    if(!course) res.status(404).send('id was not found');

    let filtered = courses.filter(val=> val !== course)
    res.send(filtered);
});

const port = process.env.PORT || 3000;;
app.listen(port, ()=>{
  console.log(`up at ${port}`);
});

function validateCourse(course){
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(course, schema);
}