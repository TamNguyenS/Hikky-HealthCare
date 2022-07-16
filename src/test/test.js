
const regexMail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
let validateEmail = (email) => {
    let vaidateMail = email.match(regexMail);
    if (vaidateMail) {
        return true;
    }
    return false;
}
console.log(validateEmail('nguyenchitam123@gmail.com'))