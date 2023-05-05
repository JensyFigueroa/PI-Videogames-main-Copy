export default function validateInputs (inputs){
    let errors = {}

    if(!inputs.name || inputs.name.length < 1) errors.name = 'Required field, must have more than 1 character';
    if(!/[A-Za-z0-9]/.test(inputs.name)) errors.name = 'Required field, special characters are not accepted';
    if(!inputs.description) errors.description = 'Required field';
    if(!inputs.image) errors.image = 'Required field';
    if(!inputs.name) errors.name = 'Required field';

    // console.log(inputs)
    if(!inputs.released) errors.released = 'Required field';
    if(!inputs.rating) errors.rating = 'Required field';
    if(!inputs.platforms.length) errors.platforms = 'Required field';
    if(!inputs.genres.length ) errors.genres = 'Required field';

    console.log(!inputs.platforms.length)



    return errors
}