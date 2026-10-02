using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace IGApp.Datamodels
{
    [BsonIgnoreExtraElements]
    public class TweetPost
    {
        public ObjectId _id { get; set; }
        public DateTime published_at_dt { get; set; }

        [BsonElement("type")]
        public string MediaType { get; set; } = "tweet";

        public string status { get; set; } = "published";
        public string title { get; set; } = "";
        public string published_at { get; set; } = "";
        public List<string> tags { get; set; } = new List<string> { "tweet" };
    }
}

