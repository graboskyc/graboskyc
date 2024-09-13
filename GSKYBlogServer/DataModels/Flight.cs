using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace GSKYBlogServer.DataModels {
    
    [BsonIgnoreExtraElements]
    public class Flight {
        [BsonElement("Code")]

        public string Code {get;set;}
        [BsonElement("Count")]
        public int Count {get;set;} = 0;
        [BsonElement("Lat")]
        public Double Lat {get;set;} = 0;
        [BsonElement("Lon")]
        public Double Lon {get;set;} = 0;
    }
}