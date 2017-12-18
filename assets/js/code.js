$(document).ready(function() {

})

$(".makeDraggable").draggable();

$(".makeDroppable").droppable({
    drop: function(ev, ui) {
        if($(this)[0].childElementCount > 0 && $($(this).children()[0]).text() == $(ui.draggable).text()) {
            let val = $(ui.draggable).text() * 2;
            $(ui.draggable).detach().remove();
            $(this).html("");
            $(this).append($("<span class='makeDraggable'>"+val+"</span>").draggable());
        } else {
            $(ui.draggable).detach().css({top: 0,left: 0}).appendTo(this);
        }
    }
});
