namespace GSKYBlog.DataModels {
    public class Blog {
        public string _id {get;set;}
        public string type {get;set;}
        public string status {get;set;}
        public string plaintext {get;set;}
        public string feature_image {get;set;}
        public string title {get;set;}
        public string slug {get;set;}
        public string html {get;set;}
        public string published_at {get;set;}
        public string Body {get {
            return html.Replace("__GHOST_URL__","").Replace("<img src=\"/content/images", "<img src=\"https://gskypublicmedia.s3.amazonaws.com");
        }}
        public string Hero {
            get{
                if(feature_image != null) {
                    if(feature_image.StartsWith("http")) {
                        return feature_image;
                    } else if(feature_image.StartsWith("/content")) {
                        return "https://gskypublicmedia.s3.amazonaws.com/"+feature_image.Replace("/content/images/","");
                    } else if(feature_image.StartsWith("__GHOST_URL")) {
                        return "https://gskypublicmedia.s3.amazonaws.com/"+feature_image.Replace("__GHOST_URL__/content/images/","");
                    } else {
                        return feature_image;
                    }
                } else {
                    return "";
                }
            }
        }
    }
}