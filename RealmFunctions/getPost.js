exports = async function(id) {
    var conn = context.services.get("mongodb-atlas").db("ig").collection("blog");
    var resp = await conn.findOne({"_id": BSON.ObjectId(id)});
    return resp;
  }
