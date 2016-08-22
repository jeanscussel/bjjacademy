function uib_w_38_popup_controller($scope, $ionicPopup) {

  // A confirm dialog
  $scope.show = function() {
    var confirmPopup = $ionicPopup.confirm({
      title: 'Confirmar salvamento?',
      template: 'Tem certeza que deseja salvar estas informações?'
    });
    confirmPopup.then(function(res) {
      if(res) {
        console.log('Sim');
      } else {
        console.log('Não');
      }
    });
  };

};


            
