import db from '../models/index';
const isExist = async (type, data) => {
    const count = await db.User.count({
        where: { [type]: `${data}` },
    });
    if (count > 0) {
        return true;
    }
    return false;
}
module.exports = {
    isExist,
}