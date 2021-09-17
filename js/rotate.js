function rotateBG(i, imgArr) {
	i=i+1;
	if (i>=imgArr.length){
		i = 0;
	}
	$( "#bdy" ).fadeOut("1500", function() {
		$('#bdy').css('background-image', 'url(images/' + imgArr[i] + ')');
	});
	$( "#bdy" ).fadeIn("1500");
	setTimeout(function() {rotateBG(i, imgArr);}, 5000);
}

$(function() {
	var imgArr = ['bg1.JPG','bg15.jpg', 'bg13.jpg', 'bg2.JPG', 'bg11.jpg', 'bg7.jpg','bg4.JPG', 'bg3.JPG', 'bg10.jpg', 'bg14.jpg'];
	
    $(imgArr).each(function(){
        (new Image()).src = 'images/'+this;
    });

	setTimeout(function() {rotateBG(0, imgArr);}, 9000);
});