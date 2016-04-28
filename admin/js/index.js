// Easy way to wait for all videos to load before start playing

var promises = [];
var devicesLink = "file:///C:/Users/Bala/Desktop/273-%20EDS/admin/devices.html"
function makePromise(i, video) {
  promises[i] = new $.Deferred();
  // This event tells us video can be played all the way through, without stopping or buffering
  video.oncanplaythrough = function() {
    // Resolve the promise
    promises[i].resolve();
  }
}
// Pause all videos and create the promise array
$('video').each(function(index){
  this.pause();
  makePromise(index, this);
})

// Wait for all promises to resolve then start playing
$.when.apply(null, promises).done(function () {
  $('video').each(function(){
    this.play();
  });
});

function login()
{
	var isAuthenticated = false;
	/*
	    Login Logic should call a service here
		isAuthenticated is set to true if login successfull
	*/
	isAuthenticated = true;
	if(isAuthenticated)
		window.location.href = devicesLink;
}