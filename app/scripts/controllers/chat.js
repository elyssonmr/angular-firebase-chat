angular.module('angularFirebaseChatApp')
    .controller('ChatController', function ($scope, $firebase) {
        var messagesRef = new Firebase("https://amber-fire-1008.firebaseio.com/messages");
        $scope.messages = $firebase(messagesRef);
        $('#loading').modal('show');
        $scope.messages.$on("loaded", function() {
            $('#loading').modal('hide');
        });
        $scope.messages.$on("child_added", function(childSnapshot, prevChildName) {
            var list = $("#messages-panel .list-group");
            var offset = 0;
            $.each($('.list-group-item'), function(index, item) {
                offset += $(item).height();
            });
            list.scrollTop(list.scrollTop() + offset);
        });
        $scope.message = "";
        $scope.name = "";
        
        $scope.send = function() {
            var message = {};
            message.name = $scope.name;
            message.text = $scope.message;
            var currentDate = new Date();
            message.time = currentDate.getHours() + ":" + currentDate.getMinutes();
            $scope.messages.$add(message)
            $scope.message = "";
        };

        $scope.clearMessage = function() {
            $scope.message = "";
        }
  });
