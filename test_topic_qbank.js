const config = require('./config/admin/dbConfig');

async function check() {
    try {
        const [rows] = await config.query(`SELECT COUNT(*) as c FROM tb_questions WHERE topic_id = 5 AND exam_type = 'q-bank'`);
        const [all] = await config.query(`SELECT COUNT(*) as c FROM tb_questions WHERE exam_type = 'q-bank'`);
        console.log("Q-Bank Topic 5 Questions:", rows[0].c);
        console.log("Q-Bank All Questions:", all[0].c);
    } catch (e) {
        console.error(e);
    }
    process.exit(0);
}
check();
