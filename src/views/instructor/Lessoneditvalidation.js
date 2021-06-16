
const editvalidations=(values)=>{
let error={};
const  reWhiteSpace = new RegExp(/^\s+$/);
if(!values.title){
    error.title="Lesson title is required"
}
if(!values.summary){
    error.summary="Lesson description is required"
}
if(!values.section_id){
    error.section_title="Section  title is required"
}
if(reWhiteSpace.test(values.title)){

    error.title='Please check your fields for spaces'
}
if(reWhiteSpace.test(values.summary)){

    error.summary='Please check your fields for spaces'
}
return error;
}
export default editvalidations;