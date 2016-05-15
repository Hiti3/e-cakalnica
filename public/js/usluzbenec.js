$(document).ready(function() {
   $('.toggle-kartoteka').on('click', function() {
       var open = $('.toggle-kartoteka').attr('data-open');
       //console.log(open);
       if(open == "true") {
           $('#cdbceb38-191f-419c-96f1-c4182a004951').hide();
            $('.toggle-kartoteka').attr('data-open', 'false');
       } else {
           $('#cdbceb38-191f-419c-96f1-c4182a004951').show();
           $('.toggle-kartoteka').attr('data-open', 'true');
       }
    }); 
});