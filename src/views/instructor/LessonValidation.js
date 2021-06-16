const { defaults } = require("chart.js");

const validations=(values)=>{
let error={};
const  reWhiteSpace = new RegExp(/^\s+$/);
if(!values.title){
    error.title="Lesson title is required"
}
if(!values.description){
    error.description="Lesson description is required"
}
if(!values.section_title){
    error.section_title="Section  title is required"
}
if(reWhiteSpace.test(values.title)){

    error.title='Please check your fields for spaces'
}
if(reWhiteSpace.test(values.description)){

    error.description='Please check your fields for spaces'
}
return error;
}
export default validations;