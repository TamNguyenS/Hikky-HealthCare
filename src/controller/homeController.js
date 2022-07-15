import db from '../models/index';
let getTest = (req, res) => {
    return res.render('index.ejs');
}
let getHomepage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        return res.render('index.ejs', { dataUser: JSON.stringify(data) });
    }
    catch (err) {
        console.error(err);
    }
}

// module.exports = {
//     getTest, getHomepage
// }
export default { getTest, getHomepage }