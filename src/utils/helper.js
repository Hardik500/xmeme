// This function handles the main logic to validate fields and their respective values
export const validate = (values) => {
    let errors = {};
    if (!values.name) {
        errors.name = "Name is required";
    } else if (values.name.length < 3) {
        errors.name = "At least 3 character name is required";
    }

    if (!values.caption) {
        errors.caption = "Caption is required";
    }

    if (!values.url) {
        errors.url = "URL is required";
    }

    return errors;
};