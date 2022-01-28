namespace GSKYBlog.DataModels {
    public class IG {
        public string _id {get;set;}
        public string taken_at {get;set;}
        public string path {get;set;}
        public string caption {get;set;} = null;
        public string location {get;set;} = null;
        public List<string> tags {get;set;} = null;
    }
}