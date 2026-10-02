using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace IGApp.Datamodels
{
    [BsonIgnoreExtraElements]
    public class IG
    {
        public ObjectId _id { get; set; }
        public DateTime taken_at { get; set; }
        public string path { get; set; } = "";
        public string? caption { get; set; }
        public string? location { get; set; }
        public List<string>? tags { get; set; }
        public string? trigger { get; set; }

        [BsonElement("type")]
        public string MediaType { get; set; } = "picture";
    }
}
