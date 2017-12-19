app.controller("agendaCtrl", function ($scope) {

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
    //generarJson();
  });

  $scope.refrescarContactos = function () {};
  
  $scope.nuevoContacto = function () {

    if ($scope.nuevo.name !== '' && $scope.nuevo.email !== '' && $scope.nuevo.phone !== '') {
      ref.push(
        {
        name: $scope.nuevo.name,
        email: $scope.nuevo.email,
        phone: $scope.nuevo.phone
        }, function () { // Se ejecuta al final del push
        $scope.nuevo = { name: '', email: '', phone: '' };
        }
      );
      //generarJson();
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
    //generarJson();
  };
/*generarJson = function()
  {
    var json =  '{"@context": "http://schema.org","@type": "WebPage","name": "AgendaJS","description": "Una gran agenda hecha en AngularJS, tomada como ejemplo del ejercicio hecho en clase.","publisher": {"@type": "Organization","name": "Universidad de Deusto", "member": [{"@type": "Person", "givenName":"Beñat", "familyName": "Galdós", "gender":"male", "email": "benatgaldos@opendeusto.es"},{"@type": "Person", "givenName":"Garikoitz", "familyName": "Bereciartua", "gender":"male", "email": "gari.bereciartua@opendeusto.es"},{"@type": "Person", "givenName":"Imanol", "familyName": "Echeverría", "gender":"male", "email": "imanol.echeverria@opendeusto.es"},{"@type": "Person", "givenName":"Anne", "familyName": "Idigoras", "gender":"female", "email": "anneidigoras@opendeusto.es"} ] }'
      json += '"contactos":{[';
      for (i=0;i<$scope.contactos.length;i++){
        json += ' {"email": "'+$scope.contactos[i].email+'", "name":"'+$scope.contactos[i].name+'", "phone": "'+$scope.contactos[i].phone+'"}';
      }
      json+= ']}}'
  }*/
});