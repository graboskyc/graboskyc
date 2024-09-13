using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace GSKYBlogServer.DataModels {
    [BsonIgnoreExtraElements]
    public class IG {
        public ObjectId _id {get;set;}
        public DateTime taken_at {get;set;}
        public string path {get;set;}
        public string caption {get;set;} = null;
        public string location {get;set;} = null;
        public List<string> tags {get;set;} = null;
    }
}