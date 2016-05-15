function clicked(id) {
        var open = $('#'+id).attr('data-open');
       //console.log(open);
       if(open == "true") {
           $('#'+id).hide();
            $('#'+id).attr('data-open', 'false');
       } else {
           $('#'+id).show();
           $('#'+id).attr('data-open', 'true');
       }
    }