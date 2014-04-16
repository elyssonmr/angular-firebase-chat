angular.module('angularFirebaseChatApp')
    .controller('ChatController', function ($scope, $firebase) {
        var messagesRef = new Firebase("https://amber-fire-1008.firebaseio.com/messages");
        $scope.messages = $firebase(messagesRef);
        $scope.message = "";
        $scope.name = "";
        
        $scope.send = function() {
            var message = {};
            message.name = $scope.name;
            message.text = $scope.message;
            message.time = "15:15";
            $scope.messages.$add(message)
            $scope.message = "";
        };

        $scope.clearMessage = function() {
            $scope.message = "";
        }

        $scope.clearChat = function() {
            $scope.messages = [];
        }
  });
