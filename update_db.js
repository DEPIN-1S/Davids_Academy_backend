require('dotenv').config({ encoding: 'latin1' });
const pool = require('./config/db');

async function updateDb() {
  try {
    console.log("Creating tb_topics table...");
    await pool.query(`
      CREATE TABLE IF NOT EXISTS tb_topics (
        topic_id INT AUTO_INCREMENT PRIMARY KEY,
        course_id INT NOT NULL,
        topic_name VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("tb_topics table created or already exists.");

    console.log("Checking if topic_id column exists in tb_questions...");
    const columns = await pool.query(`SHOW COLUMNS FROM tb_questions LIKE 'topic_id'`);
    if (columns.length === 0) {
      console.log("Adding topic_id column to tb_questions...");
      await pool.query(`ALTER TABLE tb_questions ADD COLUMN topic_id INT AFTER courseId`);
      console.log("Column topic_id added.");
    } else {
      console.log("Column topic_id already exists in tb_questions.");
    }

    console.log("Checking if passage column exists in tb_questions...");
    const passageStatus = await pool.query(`SHOW COLUMNS FROM tb_questions LIKE 'passage'`);
    if (passageStatus.length > 0 && passageStatus[0].Null === 'NO') {
      console.log("Altering passage column to allow NULL...");
      await pool.query(`ALTER TABLE tb_questions MODIFY passage TEXT DEFAULT NULL`);
      console.log("Column passage modified.");
    } else {
      console.log("Column passage already supports NULL or does not exist.");
    }

  } catch (error) {
    console.error("Error updating database:", error);
  } finally {
    process.exit(0);
  }
}

updateDb();
