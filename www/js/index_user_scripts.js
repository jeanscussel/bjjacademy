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
         /*global uib_sb */
         /* Other possible functions are: 
           uib_sb.open_sidebar($sb)
           uib_sb.close_sidebar($sb)
           uib_sb.toggle_sidebar($sb)
            uib_sb.close_all_sidebars()
          See js/sidebar.js for the full sidebar API */
        
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
         })  
        
        /* your code goes here */ 
         return false;
    });
    
        /* button  #btnalunos */
    $(document).on("click", "#btnalunos", function(evt)
    {
         uib_sb.close_sidebar($("#sbmenu"));
        
         /*global activate_subpage */
         activate_subpage("#sbpalunos"); 
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
         })  
        /* your code goes here */ 
         return false;
    }); 
     
     /* button  #btnsalvaraluno */
    $(document).on("click", "#btnsalvaraluno", function(evt)
    {
        navigator.notification.confirm(
         'Deseja realmente salvar?',
         function (buttonIndex) {
             if(buttonIndex == 1) {
                 //salvar
                 navigator.notification.beep(1);
             }
         })  
        /* your code goes here */ 
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