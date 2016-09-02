var db = new WebSqlDB(sucesso, erro);

function sucesso() {
    console.log("sucesso DB!");
}

function erro(error) {
    console.log("Erro de DB: " + error);
}


/*jshint browser:true */
/*global $ */(function()
{
 "use strict";
 /*
   hook up event handlers 
 */
 function register_event_handlers()
 {  
     
/* button  #btnmenu */
    $(document).on("click", "#btnmenu", function(evt)
    {     
         uib_sb.toggle_sidebar($("#sbmenu"));  
         return false;
    });
         
/* button  #btnsair */
    $(document).on("click", "#btnsair", function(evt)
    {
        navigator.notification.confirm(
         'Deseja realmente sair?',
         function (buttonIndex) {
             if(buttonIndex == 1) {
                 //terminar app
                 navigator.app.exitApp();
             }
         });  
         return false;
    });
     
/* button  #btnaddaluno */
        $(document).on("click", "#addaluno", function (evt) {
            /*global activate_subpage */
            activate_subpage("#sbalunos");
            return false;
        });
    
/* button  #btnvoltaralunos */
    $(document).on("click", "#btnvoltaralunos", function(evt)
    {
         /*global activate_subpage */
         activate_subpage("#page_77_52"); 
         return false;
    });
    
/* button  #btnvoltarprofessores */
    $(document).on("click", "#btnvoltarprofessores", function(evt)
    {
         /*global activate_subpage */
         activate_subpage("#page_77_52"); 
         return false;
    });
    
/* button  #btnprofessores */
    $(document).on("click", "#btnprofessores", function(evt)
    {
        uib_sb.close_sidebar($("#sbmenu"));
         /*global activate_subpage */
        
         // listar professores
            db.findProfessorAll(function (professores) {
                // limpando a lista
                $("#lstprofessores").html("");
                for (var i = 0; i < professores.length; i++) {
                    // adicionando os itens na lista
                    $("#lstprofessores").prepend(
                        '<ion-item id="' + professores[i].codprof + '" class="item widget uib_w_6 item-button-right" data-uib="ionic/list_item" data-ver="0"> ' +
                        '<div class="buttons"> ' +
                        ' <button id="' + professores[i].codprof + '" class="button button-positive"><i class="icon icon ion-edit"></i>                    </button> ' +
                        ' <button id="' + professores[i].codprof + '" name = "' + i + '" class="button button-assertive" click="deleteProfessor()"><i class="icon icon ion-trash-b"></i> ' +
                        ' </button>' +
                        ' </div>' +
                        '<img src="' + professores[i].fotprof + '" height="32" width="32"> ' +
                        professores[i].nomeprof + ' - ' + professores[i].faixaprof + '</ion-item>'
                    );
                }
            });
        
         activate_subpage("#sbpprofessores"); 
         return false;
    });
    
/* button  #btnnovoaluno */
    $(document).on("click", "#btnnovoaluno", function(evt)
    {
         /*global activate_subpage */
         activate_subpage("#sbaluno"); 
         return false;
    });
    
/* button  #btnnovoprofessor */
    $(document).on("click", "#btnnovoprofessor", function(evt)
    {
         /*global activate_subpage */
         activate_subpage("#sbprofessor"); 
         return false;
    });
     
/*FOTOS*/
    $(document).on("dblclick", "#imgaluno", function(evt)
    {
        navigator.camera.getPicture(
            onSucessoFotoAluno, 
            onErroFoto,
            {
                quality: 50,
                destinationType: Camera.DestinationType.DATA_URL
            }
        );                
    });
    
    $(document).on("dblclick", "#imgprofessor", function(evt)
    {
        navigator.camera.getPicture(
            onSucessoFotoProfessor, 
            onErroFoto,
            {
                quality: 50,
                destinationType: Camera.DestinationType.DATA_URL
            }
        );                
    }); 
     
/* button  #btncancelaraluno */
    $(document).on("click", "#btncancelaraluno", function(evt)
    {
         /*global activate_subpage */
         activate_subpage("#sbpalunos"); 
         return false;
    });
    
/* button  #btncancelarprofessor */
    $(document).on("click", "#btncancelarprofessor", function(evt)
    {
         /*global activate_subpage */
         activate_subpage("#sbpprofessores"); 
         return false;
    });
    
/* button  #btnsalvarprofessor */
    $(document).on("click", "#btnsalvarprofessor", function(evt)
    {
       db.insertProfessores(JSON.stringify({
                "nomeprof": $("#txtnomeprofessor").val(),
                "idadeprof": $("#txtidadeprofessor").val(),
                "pesoprof": $("#txtpesoprofessor").val(),
                "faixaprof": $("#txtfaixaprofessor").val(),
                "fotprof": $("#imgprofessor").attr('src')
            }), function(status){
                if (status === true){
                    navigator.notification.alert(
                        "Professor cadastrado com sucesso!"
                    );
                }    
            });
         
         return false;
    
    }); 
        
/* button  #btnalunos */
    $(document).on("click", "#btnalunos", function(evt)
    {   
        uib_sb.close_sidebar($("#sbmenu"));
             
            // listar alunos
            db.findAlunoAll(function (alunos) {
                // limpando a lista
                $("#lstalunos").html("");
                for (var i = 0; i < alunos.length; i++) {
                    // adicionando os itens na lista
                    $("#lstalunos").prepend(
                        '<ion-item id="' + alunos[i].codalu + '" class="item widget uib_w_6 item-button-right" data-uib="ionic/list_item" data-ver="0"> ' +
                        '<div class="buttons"> ' +
                        ' <button id="' + alunos[i].codalu + '" class="button button-positive"><i class="icon icon ion-edit"></i>                    </button> ' +
                        ' <button id="' + alunos[i].codalu + '" name = "' + i + '" class="button button-assertive" click="deleteAluno()"><i class="icon icon ion-trash-b"></i> ' +
                        ' </button>' +
                        ' </div>' +
                        '<img src="' + alunos[i].fotalu + '" height="32" width="32"> ' +
                        alunos[i].nomealu + ' - ' + alunos[i].idadealu + '</ion-item>'
                    );
                }
            });

            /*global activate_subpage */
            activate_subpage("#sbpalunos");
            return false;
    });
    
    
    /* button  #btnincluiraluno */
    $(document).on("click", "#btnincluiraluno", function(evt)
    {
        /*  navigator.notification.alert(
            "Esse alert funciona mas o resto não!"
        );*/ 
        
            db.insertAluno(JSON.stringify({
                "nomealu": $("#txtnomealuno").val(),
                "idadealu": $("#txtidadealuno").val(),
                "pesoalu": $("#txtpesoaluno").val(),
                "faixaalu": $("#txtfaixaaluno").val(),
                "fotalu": $("#imgaluno").attr('src')
            }), function(status){
                if (status === true){
                    navigator.notification.alert(
                        "Aluno cadastrado com sucesso!"
                    );
                }    
            });
                 
             /*global activate_subpage */
             activate_subpage("#sbpalunos");
         return false;

    });
    
     function editaluno(codalu) {
        alert("Editar: " + codalu);
     }

     function deleteAluno(codalu) { 
            db.deleteAluno(JSON.stringify({
                "codalu": codalu
            }), function (status) {
                if (status === true) {
                    // removendo elementos
                    var item = document.getElementById(codalu);
                    item.parentNode.removeChild(item);
                }
            });
     }
     
     
}

document.addEventListener("app.Ready", register_event_handlers, false);
})();




//CALLBACK DE ERRO E SUCESSO DE FOTOS
function onErroFoto(erroFoto){
    alert("Erro na captura da imagem!" + erroFoto);
}  
function onSucessoFotoAluno(foto) {
    //exibindo foto
    $("#imgaluno").attr("src", "data:image/jpeg;base64," + foto);
}
function onSucessoFotoProfessor(foto) {
    //exibindo foto
    $("#imgprofessor").attr("src", "data:image/jpeg;base64," + foto);
}