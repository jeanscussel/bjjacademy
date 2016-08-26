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
        navigator.notification.confirm(
         'Deseja realmente salvar?',
         function (buttonIndex) {
             if(buttonIndex == 1) {
                 //salvar
                 navigator.notification.beep(1);
             }
         });  
        /* your code goes here */ 
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
                        ' <button id="' + alunos[i].codalu + '" name = "' + i + '" class="button button-assertive"><i class="icon icon ion-trash-b"></i> ' +
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
    
/* button  #IncluirAluno */
    $(document).on("click", "#IncluirAluno", function(evt)
    { 
      /*  navigator.notification.alert(
            "TESTANDO"
        );  */ 
        
            db.insertAluno(JSON.stringify({
                "nomealu": $("#txtnomealuno").val(),
                "idadealu": $("#txtidadealuno").val(),
                "pesoalu": $("#txtpesoaluno").val(),
                "faixaalu": $("#txtfaixaaluno").val(),
                "fotalu": $("#imgaluno").attr('src')
            }), function(status){
                if (status){
                    navigator.notification.alert(
                        "Aluno cadastrado com sucesso!"
                    );
                }
            });

            return false;
        });
    
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