angular.module('angularFirebaseChatApp')
    .controller('ChatController', function ($scope, $firebase, $filter) {
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
            offset += 400;
            list.scrollTop(list.scrollTop() + offset);
        });
        $scope.message = "";
        $scope.name = "";
        
        $scope.send = function() {
            var message = {};
            var error = false;

            var input = $('#name').parent();
            if(!$scope.name.trim()) {                        
                input.addClass("has-error");
                if(!input.has("p").length) {
                    input.append('<p class="text-danger">Name should not be empty.</p>')
                }
                error = true;
            } else {
                input.removeClass("has-error");
                input.children().remove('p');
            }

            input = $('#message').parent();
            if(!$scope.message.trim()) {
                input.addClass("has-error");
                if(!input.has("p").length) {
                    input.append('<p class="text-danger">Message should not be empty.</p>')
                }
                error = true;
            } else {
                input.removeClass("has-error");
                input.children().remove('p');
            }

            if(error) {
                return;
            }

            message.name = $scope.name;
            message.text = $scope.message;
            var currentDate = new Date();
            message.time = $filter('date')(currentDate, "HH:mm")
            $scope.messages.$add(message)
            $scope.message = "";
        };

        $scope.clearMessage = function() {
            $scope.message = "";
        }
  });
