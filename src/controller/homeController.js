
let getTest = (req, res) => {
    return res.render('index.ejs');
}
let getHomepage = (req, res) => {
    return res.send('Hello World! sadasdasd');
}

// module.exports = {
//     getTest, getHomepage
// }
export default { getTest, getHomepage }