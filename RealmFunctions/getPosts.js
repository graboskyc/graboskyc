exports = async function(lastValue) {
    var conn = context.services.get("mongodb-atlas").db("ig").collection("blog");
    
    var pipeline = [];
    

    if(lastValue) {
      pipeline.push({$match: {
        type:"post", status:"published", _id: {$lt: BSON.ObjectId(lastValue)}
      }});
    } else {
      pipeline.push({$match: {
        type:"post", status:"published"
      }});
    }
    
    
    pipeline.push({$sort: {
        published_at:-1
      }});
      
      
    pipeline.push({$limit: 12});


    var resp = await conn.aggregate(pipeline);
    return resp;
  }
