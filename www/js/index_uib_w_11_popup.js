function uib_w_11_popup_controller($scope, $ionicPopup) {

// A confirm dialog
    $scope.show = function () {
        
        uib_sb.close_sidebar($("#sbmenu"));
        
        var confirmPopup = $ionicPopup.confirm({
            title: 'Informações do dispositivo/software',
            template: '<b>Autor:</b> Jean Scussel <br/> ' +
                '<b>Nome do App:</b> Bjj Academy <br/> ' +
                '<b>Descrição:</b> O Bjj Academy tem como objetivo auxiliar mestres e academias de jiu-jitsu no controle de graduações e exames de faixa de seus professores e alunos.<br/> ' +
                '<b>Sistema: </b>' + window.device.platform + ' ' + window.device.version + '<br/>' +
                '<b>Modelo: </b>' + window.device.model + '<br/>' + 
                '<b>Cordova: </b>' + window.device.cordova + '<br/>' +
                '<b>UUID: </b>' + window.device.uuid,
            // customização do botão do popup
            buttons: [
                {
                    text: 'OK',
                    type: 'button-positive',
                    onTap: function (e) {
                        // fecha o popup
                        return $scope.close;
                    }
                }
            ]
        });
        confirmPopup.then(function (res) {
            if (res) {
                console.log('Tem certeza');
            } else {
                console.log('Não tem certeza');
            }
        });
  };

};