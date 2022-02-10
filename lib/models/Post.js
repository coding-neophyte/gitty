const pool = require('../utils/pool');

module.exports = class Post{
  id;
  text;
  userId;

  constructor(row){
    this.id = row.id;
    this.text = row.text;
    this.userId = row.userid;
  }

  static async insert({ text, userId }){
    const { rows } = await pool.query(`
        INSERT INTO posts(text, userid)
        VALUES($1, $2)
        RETURNING *`, [text, userId]);
    console.log(userId, 'from model');
    console.log(rows);
    return new Post(rows[0]);
  }

  static async getPosts(){
    const { rows } = await pool.query(`
      SELECT * FROM posts`);

    return rows.map((row) => new Post(row));
  }
};
