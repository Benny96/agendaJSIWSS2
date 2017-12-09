app.controller("agendaCtrl", function ($scope) {
/*
  $scope.contactos = [
    { name: 'Pablo Garaizar', email: 'garaizar@deusto.es', phone: '2512' }
  ];
*/
    $scope.contactos = [];
    $scope.query = "";
    $scope.nuevo = { name: '', email: '', phone: '' };

    var ref = new Firebase('https://iw-ss-2.firebaseio.com/contactos');

    // Actualización de datos

    ref.on('child_added', function(snapshot) {
        var contacto = snapshot.val();
        var clave = snapshot.key();
        // Añadir al array local
        $scope.contactos.push( { id: clave, name: contacto.name, email: contacto.email, phone: contacto.phone } );
    });

  $scope.refrescarContactos = function () {};
  
  $scope.nuevoContacto = function () {

    if ($scope.nuevo.name !== '' && $scope.nuevo.email !== '' && $scope.nuevo.phone !== '') {
      // $scope.contactos.push(angular.copy($scope.nuevo));
      // $scope.nuevo = { name: '', email: '', phone: '' };
      ref.push(
        {
        name: $scope.nuevo.name,
        email: $scope.nuevo.email,
        phone: $scope.nuevo.phone
        }, function () { // Se ejecuta al final del push
        $scope.nuevo = { name: '', email: '', phone: '' };
        }
      );
    }

  };

  $scope.borrarContacto = function (index, key) {
//    $scope.contactos.splice(index, 1);
    var contactoRef = new Firebase('https://iw-ss-2.firebaseio.com/contactos/'+key);
    contactoRef.remove(function () { // Se ejecuta al final del remove
        $timeout(function () {
        $scope.contactos.splice(index, 1);
        }, 500); // Se puede poner 0 en vez de 500 ms
    });
  };

});