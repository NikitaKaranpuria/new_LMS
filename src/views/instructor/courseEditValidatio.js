
const coursevalidation = (values) => {
    let error = {};
    const reWhiteSpace = new RegExp(/^\s+$/);
    if (!values.title) {
        error.title = "Course title is required"
    }
    if (!values.description) {
        error.description = "Course description is required"
    }
    if (!values.id_category) {
        error.id_category = "category is required"
    }
    if (reWhiteSpace.test(values.title)) {

        error.title = 'Please check your fields for spaces'
    }
    if (reWhiteSpace.test(values.description)) {

        error.description = 'Please check your fields for spaces'
    }
    if (!values.id_topic) {
        error.id_topic = "Topic is required"
    }
    if (!values.id_level) {
        error.id_level = "Level is required"
    }
    if (!values.id_price) {
        error.id_price = "Price is required"
    }
    if (!values.id_language) {
        error.id_language = "Language is required"
    }
    if (!values.id_duration) {
        error.id_duration = "Duration is required"
    }
    if (!values.id_features) {
        error.id_features = "Features is required"
    }
    if (!values.id_subtitles) {
        error.id_subtitles = "Subtitle is required"
    }
    // if(!values.price){
    //     error.price="Amount  is required"
    // }
    return error;
}
export default coursevalidation;