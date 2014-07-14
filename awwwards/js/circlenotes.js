var timer;
var timerFinish;
var timerSeconds;


function drawTimer(id, percent){

    $('#note_'+id).html('<div class="percent"></div><div id="slice"'+(percent > 5?' class="gt50"':'')+'><div class="pie"></div>'+(percent > 5?'<div class="pie fill"></div>':'')+'</div>');

    var deg = 360/10*percent;

    $('#note_'+id+' #slice .pie').css({
        '-moz-transform':'rotate('+deg+'deg)',
        '-webkit-transform':'rotate('+deg+'deg)',
        '-o-transform':'rotate('+deg+'deg)',
        'transform':'rotate('+deg+'deg)'
    });

    percent = Math.floor(percent*100)/100;
    arr = percent.toString().split('.');
    intPart = arr[0];
    dec = arr[1];
    if(!dec > 0){
        dec = 0;
    }
    $('#note_'+id+' .percent').html('<span class="int">'+intPart+'</span><span class="dec">.'+dec+'</span>');

}

function stopNote(id, note){

    var seconds = (timerFinish-(new Date().getTime()))/1000;
    var percent = 10-((seconds/timerSeconds)*10);
    percent = Math.floor(percent*100)/100;
    if(percent <= note){
        drawTimer(id, percent);
    }else{
        note = $('#note_'+id).data('note');
        arr = note.toString().split('.');
        $('#note_'+id+' .percent .int').html(arr[0]);
        $('#note_'+id+' .percent .dec').html('.'+arr[1]);
    }

}

$(document).ready(function(){

    timerSeconds = 3;
    timerFinish = new Date().getTime()+(timerSeconds*1000);
    $('.notesite').each(function(id) {
        note = $('#note_'+id).data('note');
        timer = setInterval('stopNote('+id+', '+note+')',0);
    });

});
