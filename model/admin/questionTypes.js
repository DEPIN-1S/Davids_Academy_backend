var db = require('../../config/db');
var util = require("util");
const query = util.promisify(db.query).bind(db);


module.exports.AddExamTypesQuery = async (question_type) => {
    var Query = ` insert into tb_questionType (type) values (?)`
    var data = query(Query, [question_type])
    return data;
}
module.exports.ListExamTypesQuery = async () => {
    var Query = `SELECT * FROM tb_questionType`;
    var data = query(Query);
    return data;
};
module.exports.delteExamTypesquery = async (ext_id) => {
    var Query = `update tb_questionType set status ='removed' WHERE id=?`;
    var data = query(Query, [ext_id]);
    return data;
}

module.exports.UpdateExamTypesQuery = async (question_type, ext_id) => {
    var Query = ` update tb_questionType set type=? where id=?`;
    var data = query(Query, [question_type, ext_id])
    return data;
}