exports = async function(lastValue) {
    var conn = context.services.get("mongodb-atlas").db("ig").collection("media");
    
    
    var pipeline = [];
    
    if(lastValue) {
      var lastDoc = await conn.findOne({_id: BSON.ObjectId(lastValue)});
      pipeline.push({$match: {
        type:"picture", taken_at:{$lt:lastDoc.taken_at}
      }})
    } else {
      pipeline.push({$match: {
        type:"picture"
      }});
    }
    
    pipeline.push({$sort: {
        taken_at:-1
      }});
      
    pipeline.push({$limit: 12});
    
    pipeline.push({$project: {
        taken_at:{$dateToString: {
          date:"$taken_at",
          format:"%m/%d/%Y"}},
        path:1
      }});
    
    var resp = await conn.aggregate(pipeline);
    return resp;
  }