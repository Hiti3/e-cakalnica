setInterval (function getPeople_value() {
    var peeps = document.getElementById('peopleQueue').innerText;
    peeps = parseInt(peeps);
    
    var string = "";
    if (peeps >= 15) {
        string = '<div class="col-xs-3"><i class="fa fa-frown-o fa-5x"></i></div>\
        <div class="col-xs-9 text-right">\
          <div class="huge" id="peopleQueue">30</div>\
          <div>Ljudje pred teboj v čakalni vrsti</div>\
        </div>';
        console.log(string);
    }
    else if (peeps < 15 && peeps >= 4) {
        string = '<div class="col-xs-3"><i class="fa fa-meh-o fa-5x"></i></div>\
        <div class="col-xs-9 text-right">\
          <div class="huge" id="peopleQueue">10</div>\
          <div>Ljudje pred teboj v čakalni vrsti</div>\
        </div>';
    }
    else if (peeps < 4 && peeps >= 0) {
        string = '<div class="col-xs-3"><i class="fa fa-smile-o fa-5x"></i></div>\
        <div class="col-xs-9 text-right">\
          <div class="huge" id="peopleQueue">3</div>\
          <div>Ljudje pred teboj v čakalni vrsti</div>\
        </div>';  
    }
    
    document.getElementById("peopleInFront").innerHTML = string; 
}, 100);

//$(document).ready(getPeople_value());
