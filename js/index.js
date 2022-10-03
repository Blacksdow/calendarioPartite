/*!
* Start Bootstrap - Agency v7.0.11 (https://startbootstrap.com/theme/agency)
* Copyright 2013-2022 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-agency/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});
"use strict";
$(() => {
   $("#updateMatch").hide();

   let datiPartite = sendRequestNoCallback("php/getGamesByMonth.php", "POST", {data :JSON.stringify(($("#filtro_mesi").val()))});
   datiPartite.fail(function (jqXHR) {
      error(jqXHR);
   });
   datiPartite.done(function (data) {
      costruisciTabella(data);
      // //console.log(data);
   
      caricaFiltro();

      $("#btnAnnulla").click(function () {
         $("#updateMatch").hide();
         $("#elencoPartite").show();
         $("#filtro").show();
      });

      $("#btnUpdate").click(function(){
         if($("#home").val() != $("#visitor").val()){
         var datas = {"data" : $("#dataMatch").val(),
               "id" : $("#idMatch").val(),
               "ora" : $("#oraMatch").val(),
                "squadra" : $("#squadra").val(),
                "casa_trasferta" : $("#casa_fuori").val(),
                "campo" : $("#campo").val(),
                "home" : $("#home").val(),
                "visitor" : $("#visitor").val(),
                "note" : $("#note").val()};
               //  console.log(datas);
                $.ajax({

                });
         sendRequestNoCallback("php/updatePartita.php", "POST", {data:JSON.stringify(datas)});
         let Partite = sendRequestNoCallback("php/getGamesByMonth.php", "POST", {data :JSON.stringify(($("#filtro_mesi").val()))});
         Partite.fail(function (jqXHR) {
            error(jqXHR);
         });
         Partite.done(function (dati) {
            costruisciTabella(dati);
         });
      }
      else
      alert("ATTENZIONE!! Visitor e Home sono identici! IMPOSSIBILE MODIFICARE");
         $("#updateMatch").hide();
         $("#elencoPartite").show();
         $("#filtro").show();
      
         
      });

      $("#filtro_mesi").change(function(){
         getGamesFromMonthAndChange();
      })

      $("#squadra").change(function(){
         getTeamsAndCharge();
      });
   });
});

function costruisciTabella(dati){
   let table = $("table").html(" ");
      let tBody = $("<tbody>");
      tBody.appendTo(table);
      $("#elencoPartite").append(table);
      let intest = Object.keys(dati[0]);
      let row = $("<tr>");
      row.appendTo(tBody);
      for (let i = 0; i < intest.length; i++) {
         let th = $("<th>");
         th.html(intest[i]);
         th.appendTo(row);
      }

      for (let i = 0; i < dati.length; i++) {
         let newRow = $("<tr>");
         tBody.append(newRow);
         for (var name in dati[i]) {
            $("<td id='"+ name +""+i+"'>").html(dati[i][name]).appendTo(newRow);
         }
         newRow.on("click", function () {
            getPartita(i);
         });
      }
}

function getGamesFromMonthAndChange(){
   let games = sendRequestNoCallback("php/getGamesByMonth.php", "POST", {data :JSON.stringify(($("#filtro_mesi").val()))});
   games.fail(function (jqXHR) {
      error(jqXHR);
   });
   games.done(function (data) {
   costruisciTabella(data);
   });
}

function getTeamsAndCharge(){
   let teams = sendRequestNoCallback("php/getAllTeams.php", "POST", {data :JSON.stringify(($("#squadra").val()))});
   teams.fail(function (jqXHR) {
      error(jqXHR);
   });
   teams.done(function (data) {
      // console.log(data);
      let selectHome = $("#home");
      let selectTrasferta = $("#visitor");
      selectHome.html(" ");
      selectTrasferta.html(" ");

      for (let i = 0; i < data.length; i++) {
         let newOption = $("<option>");
         newOption.html(data[i].home);
         newOption.val(data[i].home);
         selectHome.append(newOption);
      }

      for (let j = 0; j < data.length; j++) {
         let newOption = $("<option>");
         newOption.html(data[j].home);
         newOption.val(data[j].home);
         selectTrasferta.append(newOption);
      }
      $("#visitor").val(" ");
      $("#home").val(" ");
   });
}

function caricaFiltro(){
   
   let mesi = sendRequestNoCallback("php/getMonths.php", "GET", {});
   mesi.fail(function (jqXHR) {
      error(jqXHR);
   });
   mesi.done(function (data) {
      let select = $("#filtro_mesi");
      select.html(" ");
      $("<option>").html("Tutti i mesi").val("Tutti i mesi").appendTo(select);
      for (let i = 0; i < data.length; i++) {
         let newOption = $("<option>");
         newOption.html(data[i].mesi);
         newOption.val(data[i].mesi);
         select.append(newOption);
      }
      
      $("#filtro_mesi").val(" ");
   });
}

function getPartita(index) {
   // console.log($("#home" + index).html());
   $("#updateMatch").show();
   $("#elencoPartite").hide();
   $("#filtro").hide();
   $("#idMatch").val($("#id" + index).html());
   /*let dataM = new Date($("#data"+index).html().toLocaleString('en-CA', {year: 'numeric', month: '2-digit', day: '2-digit'}));
   console.log(dataM);*/
   $("#dataMatch").val($("#data" + index).html().substr(0, 10));
   $("#oraMatch").val($("#ora" + index).html());
   
   let squadre = sendRequestNoCallback("php/getSquadre.php", "GET", {});
   squadre.fail(function (jqXHR) {
      error(jqXHR);
   });
   squadre.done(function (data) {
      let select = $("#squadra");
      select.html(" ");
      for (let i = 0; i < data.length; i++) {
         let newOption = $("<option>");
         newOption.html(data[i].squadra);
         newOption.val(data[i].squadra);
         select.append(newOption);
      }
      $("#squadra").val($("#squadra" + index).html());
   });
   let campo = sendRequestNoCallback("php/getCampi.php", "GET", {});
   campo.fail(function (jqXHR) {
      error(jqXHR);
   });
   campo.done(function (data) {
      let select = $("#campo");
      select.html(" ");

      for (let i = 0; i < data.length; i++) {
         let newOption = $("<option>");
         newOption.html(data[i].campo);
         newOption.val(data[i].campo);
         select.append(newOption);
      }
      $("#campo").val($("#campo" + index).html());
   });
   let casa_fuori = sendRequestNoCallback("php/getCasa_fuori.php", "GET", {});
   casa_fuori.fail(function (jqXHR) {
      error(jqXHR);
   });
   casa_fuori.done(function (data) {
      let select = $("#casa_fuori");
      select.html(" ");

      for (let i = 0; i < data.length; i++) {
         let newOption = $("<option>");
         newOption.html(data[i].casa_trasferta);
         newOption.val(data[i].casa_trasferta);
         select.append(newOption);
      }
      $("#casa_fuori").val($("#casa_trasferta" + index).html());
   });
   let teams = sendRequestNoCallback("php/getAllTeams.php", "POST", {data :JSON.stringify(($("#squadra" + index).html()))});
   teams.fail(function (jqXHR) {
      error(jqXHR);
   });
   teams.done(function (data) {
      // console.log(data);
      let selectHome = $("#home");
      let selectTrasferta = $("#visitor");
      selectHome.html(" ");
      selectTrasferta.html(" ");

      for (let i = 0; i < data.length; i++) {
         let newOption = $("<option>");
         newOption.html(data[i].home);
         newOption.val(data[i].home);
         if(newOption.html() != $("#visitor" + index).html())
         selectHome.append(newOption);
      }
      $("#home").val($("#home" + index).html());

      for (let j = 0; j < data.length; j++) {
         let newOption = $("<option>");
         newOption.html(data[j].home);
         newOption.val(data[j].home);
         if(newOption.html() != $("#home").val())
         selectTrasferta.append(newOption);
      }
      $("#visitor").val($("#visitor" + index).html());
   });
   
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