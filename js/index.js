"use strict";
$(() => {
   $("#updateMatch").hide();

   let datiPartite = sendRequestNoCallback("php/getPartite.php", "GET", {});
   datiPartite.fail(function (jqXHR) {
      error(jqXHR);
   });
   datiPartite.done(function (data) {
      //console.log(data);
      let table = $("<table class='table table-striped table-hover'>");
      let tBody = $("<tbody>");
      tBody.appendTo(table);
      $("#elencoPartite").append(table);
      let intest = Object.keys(data[0]);
      let row = $("<tr>");
      row.appendTo(tBody);
      for (let i = 0; i < intest.length; i++) {
         let th = $("<th>");
         th.html(intest[i]);
         th.appendTo(row);
      }
      for (let i = 0; i < data.length; i++) {
         let newRow = $("<tr>");
         tBody.append(newRow);
         for (var name in data[i]) {
            $("<td id='"+ name +""+i+"'>").html(data[i][name]).appendTo(newRow);
         }
         newRow.on("click", function () { 
            getPartita(i);
          });
      }
   

      $("#btnAnnulla").click(function () {
         $("#updateMatch").hide();
         $("#elencoPartite").show();
      });

      $("#btnUpdate").click(function(){
         var datas = {"data" : $("#dataMatch").val(),
               "id" : $("#idMatch").val(),
               "ora" : $("#oraMatch").val(),
                "squadra" : $("#squadra").val(),
                "casa_trasferta" : $("#casa_fuori").val(),
                "campo" : $("#campo").val(),
                "home" : $("#home").val(),
                "visitor" : $("#visitor").val(),
                "note" : $("#note").val()};
                console.log(datas);
                $.ajax({

                });
         sendRequestNoCallback("php/updatePartita.php", "POST", {data:JSON.stringify(datas)});
         $("#updateMatch").hide();
         $("#elencoPartite").show();
         
      });
   });
});

function getPartita(index) {
   console.log($("#home" + index).html());
   $("#updateMatch").show();
   $("#elencoPartite").hide();
   $("#idMatch").val($("#id" + index).html());
   /*let dataM = new Date($("#data"+index).html().toLocaleString('en-CA', {year: 'numeric', month: '2-digit', day: '2-digit'}));
   console.log(dataM);*/
   $("#dataMatch").val($("#data" + index).html().substr(0, 10));
   $("#oraMatch").val($("#ora" + index).html());
   $("#squadra").val($("#squadra" + index).html());
   $("#casa_fuori").val($("#casa_trasferta" + index).html());
   $("#campo").val($("#campo" + index).html());
   $("#home").val($("#home" + index).html());
   $("#visitor").val($("#visitor" + index).html());
   $("#note").val($("#note" + index).html());
}


// for(let j = 0;j<8; j++) {
//    console.log(intest[j]);
//    $("<td id='"+ intest[j] +""+i+"'>").html(data[i].intest[j]).appendTo(newRow);
//    // $("<td id='data"+i+"'>").html(data[i].data).appendTo(newRow);
//    // $("<td id='ora"+i+"'>").html(data[i].ora).appendTo(newRow);
//    // $("<td id='squadra"+i+"'>").html(data[i].squadra).appendTo(newRow);
//    // $("<td id='casa_trasferta"+i+"'>").html(data[i].casa_trasferta).appendTo(newRow);
//    // $("<td id='campo"+i+"'>").html(data[i].campo).appendTo(newRow);
//    // $("<td id='home"+i+"'>").html(data[i].home).appendTo(newRow);
//    // $("<td id='visitor"+i+"'>").html(data[i].visitor).appendTo(newRow);
//    // $("<td id='note"+i+"'>").html(data[i].note).appendTo(newRow);
// }

// for(let i=0;i<data.length;i++){
//    let newRow=$("<tr>");
//    tBody.append(newRow);
//       console.log(data.length);
//       var stringa = "id";
//    });
//    newRow.on("click", function(){
//       getPartita(i);
//    });
// }

// 
      //    
      //    console.log(data.length);
      //    var stringa = "id";

      //    
      // }

      // "id" : $("#idMatch").val(),"data" : $("#dataMatch").val(),
      //    "ora" : $("#oraMatch").val(),
      //    "squadra" : $("#squadra").val(),
      //    "casa_trasferta" : $("#casa_fuori").val(),
      //    "campo" : $("#campo").val(),
      //    "home" : $("#home").val(),
      //    "visitor" : $("#visitor").val(),
      //    "note" : $("#note").val()

      // data="+ $("#dataMatch").val() + "&ora="+ $("#oraMatch").val() + "&squadra=". $("#squadra").val() +"&casa_traferta