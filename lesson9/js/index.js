let name;
let bdy;
let bdm;
let bdd;
let gender;
let games = [];
let note;
const fireBaseData = firebase.database().ref("register");


//document ready
$(function(){
    $("#send").click(function(e){ send(e); });
})

function send(event)
{
    event.preventDefault();

    let allpass = true;
    $(".is-invalid").removeClass("is-invalid");
    $("#check_games_invalid").hide();

    name = $("#input_name").val();
    if(name == "")
    {
        $("#input_name").addClass("is-invalid");
        allpass = false;
    }

    bdy = $("#sel_bdy").val();
    if(bdy == "")
    {
        $("#sel_bdy").addClass("is-invalid");
        allpass = false;
    }

    email = $("#input_email").val();
    if(email == "")
    {
        $("#input_email").addClass("is-invalid");
        allpass = false;
    }

    phone = $("#input_phone").val();
    if(phone == "")
    {
        $("#input_phone").addClass("is-invalid");
        allpass = false;
    }

    
    bdm = $("#sel_bdm").val();
    bdd = $("#sel_bdd").val();
    gender = $("input[name='radio_gender']:checked").val();
    
    games = [];
    $.map($("input[name='check_games']:checked"), function (el) {
        games.push($(el).val())
        })
    if(games.length == 0)
    {
        $("input[name='check_games']").addClass("is-invalid");
        $("#check_games_invalid").show();

    }
    
    note = $("#text_note").val();
    if(!allpass) return;
    fireBaseData.push({
        name: name,
        bd: bdy+"/"+bdm+"/"+bdd,
        gender: gender,
        email: email,
        phone: phone,
        games: games.toString(),
        note:note,
        time: firebase.database.ServerValue.TIMESTAMP
},
function (error) {
 if (error) {
   alert('系統出現問題，請稍後再試。');
 } else {
   alert('我們已收到您的訊息，將會有專人與您聯繫。');
 }
});

 
}
