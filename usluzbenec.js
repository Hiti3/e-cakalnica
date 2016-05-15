$(document).ready(function() {
   $('.toggle-kartoteka').on('click', function() {
       var open = $('.toggle-kartoteka').attr('data-open');
       //console.log(open);
       if(open == "true") {
           $('#0').hide();
            $('.toggle-kartoteka').attr('data-open', 'false');
       } else {
           $('#0').show();
           $('.toggle-kartoteka').attr('data-open', 'true');
       }
    }); 
});


