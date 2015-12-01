define(["jquery", "firebase", "slider"], 
function ($, firebase, slider) {

	function slideIt() {
	
    	// var refUserLibrary = new Firebase();
        console.log("sliding");
    	//adding slider
      $("#ex6").slider();
      $("#ex6").on("slide", function(slideEvt) {
        $("#ex6SliderVal").text(slideEvt.value);
      });


      //   for (var i =0; i < refUserLibrary.children().length; i++){

      //    if (slideEvt.value === refUserLibrary.child[i].rating) {
      //     $(".movieOutput").show(refUserLibrary.child[i];
      //     } 
      //   }

      // };

       // var sliderValue = ("ex6").getValue();

      // $(".movieOutput").hide();
      
      // for (var i =0; i < refUserLibrary.child.length; i++){

      //   // if (sliderValue === refUserLibrary.child[i].rating) {
      //   //   $(".movieOutput").show(refUserLibrary.child[i];

      //   } 
      
       // }
    

  return {
      slideIt: slideIt
    };
}
});