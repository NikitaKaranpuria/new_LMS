const instructorFeedbackvalidation=(values)=>{
    let error={};
    const  reWhiteSpace = new RegExp(/^\s+$/);
    const  mailformat = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if(!values.email){
        error.email="Email is required"
    }
    if(!mailformat.test(values.email)){
        error.email="Email is not valid"
    }
    if(!values.issue){
        error.issue="Feedback description is required"
    }
  
    if(reWhiteSpace.test(values.email)){
    
        error.email='Please check your fields for spaces'
    }
    if(reWhiteSpace.test(values.issue)){
    
        error.issue='Please check your fields for spaces'
    }
    return error;
}
export default instructorFeedbackvalidation