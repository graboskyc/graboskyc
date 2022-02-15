exports = async function(tag, lastValue) {
    var conn = context.services.get("mongodb-atlas").db("ig").collection("blog");
    
    var pipeline = [];
    tag = tag.toLowerCase();
    

    if(lastValue) {
      pipeline.push({$match: {
        type:"post", status:"published", _id: {$lt: BSON.ObjectId(lastValue)}, tags:tag
      }});
    } else {
      pipeline.push({$match: {
        type:"post", status:"published", tags:tag
      }});
    }
    
    
    pipeline.push({$sort: {
        published_at:-1
      }});
      
      
    pipeline.push({$limit: 12});


    var resp = await conn.aggregate(pipeline);
    return resp;
  }
