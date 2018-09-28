exports = async function(payload, response){
  var rc = context.services.get("mongodb-atlas").db("linkshortener").collection("links");
  var d = new Date(Date.now());
  var html="";
  var url = "";
  
  if(typeof payload.query.url != "undefined") {
    if(payload.query.pw == "") {
      rc.insertOne({"query":payload, "key": payload.query.key, "url": payload.query.url, "when": d});
      html = "Created Record.";
    }
    else {
      html = "Could not create record.";
    }
  }
  else {
    let doc = await rc.findOne({"key":payload.query.key});
    var wc = context.services.get("mongodb-atlas").db("linkshortener").collection("use");
    if (doc){
      wc.insertOne({"query":payload, "key":doc.key, "url":doc.url, "when":d, "valid":true});
      //html = "<html><body><script>window.self.location='"+doc.url+"';</script><a href='"+doc.url+"'>Click here if not redirected.</a></body></html>";
      url = doc.url;
    }
    else {
      html = "Bad link.";
      wc.insertOne({"query":payload, "when":d, "key":payload.query.key, "valid":false});
    }
  }
  
  if(html.length > 1) {
    response.setHeader("Content-Type", "text/html");
    response.setBody(html);
  }
  else {
    response.setStatusCode(301);
    response.setHeader("Location", url);
  }
};