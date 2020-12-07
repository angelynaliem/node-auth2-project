const db = require("../database/connection.js");

module.exports = {
  add,
  find,
  findBy,
  findById,
};

function find() {
  return db("users as u")
    .join("roles as r", "u.department", "r.id")
    .select("u.id", "u.username", "r.name as rolename");
}

function findBy(filter) {
  return db("users as u")
    .join("roles as r", "u.department", "r.id")
    .select("u.id", "u.username", "r.name as departmentname", "u.password")
    .where(filter)
    .orderBy("u.id");
}

async function add(user) {
  const [id] = await db("users").insert(user, "id");

  return findById(id);
}

function findById(id) {
  return db("users").where({ id }).first();
}
