var db = require('../../config/db');
var util = require("util");
const query = util.promisify(db.query).bind(db);

module.exports.ListExamTypesQuery = async () => {
    var Query = `SELECT * FROM tb_questionType`;
    var data = query(Query);
    return data;
};
module.exports.delteExamTypesquery=async(ext_id)=>{
    var Query=`update tb_questionType set status ='removed' WHERE id=?`;
    var data = query(Query,[ext_id]);
    return data;
}