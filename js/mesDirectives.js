angular.module("MesDirectives", [])
    .directive("contenuMail", () => {
        return {
            restrict: "E",
            template: `<div class="card p-4 bg-light">
                    <h1>{{email.subject}}</h1>
                    <p class="m-0">
                        <label>De :</label>
                        <span>{{email.from}}</span>
                    </p>
                    <p class="m-0">
                        <label>&Agrave; :</label>
                        <span>{{email.to}}</span>
                    </p>
                    <p class="m-0">
                        <label>Date :</label>
                        <span>{{email.date | date:"dd/MM/yyyy HH: mm"}}</span>
                    </p>
                </div>
            <p class= "my-4" ng-bind-html="email.content"></p>`,
            scope: {
                email: "="
            }
        }
    })
    .directive("nouveauMail", () => {
        return {
            restrict: "E",
            template: `<form id="formNouveauMail" class="form-group col-6" name="formNouveauMail">
                    <div class="input-group my-2">
                        <div class="input-group-prepend">
                            <div class="input-group-text">À</div>
                        </div>
                        <input type="text" class="form-control" ng-model="nouveauMail.to">
                    </div>
                    <div class="input-group my-2">
                        <div class="input-group-prepend">
                            <div class="input-group-text">Objet</div>
                        </div>
                        <input type="text"  class="form-control" ng-model="nouveauMail.subject">
                    </div>
                    <textarea ui-tinymce="optionsTinyMce" class="w-100 my-2 form-control" rows="10" ng-model="nouveauMail.content" placeholder="Votre message..."></textarea>
                    <div class="my-2">
                        <button ng-click="clicEnvoiMail()" class="btn btn-primary mr-2">Envoyer E-mail</button>
                        <button ng-click="razMail()" ng-disabled="formNouveauMail.$pristine" class="btn btn-outline-secondary">Effacer Saisie</button>
                    </div>
                </form>`,
            scope: {
                envoiMail : "&"
            },
            controller: function ($scope) {

                $scope.optionsTinyMce = {
                    language: "fr_FR",
                    statusbar: false,
                    menubar: false
                };

                $scope.razMail = function () {
                    $scope.nouveauMail = {
                        from: "Rudy",
                        date: new Date()
                    };
                    if (tinyMCE.activeEditor) {
                        tinyMCE.activeEditor.setContent("");
                    }
                    $scope.formNouveauMail.$setPristine();
                }

                $scope.clicEnvoiMail = function () {
                    var regExpValidEmail = new RegExp("^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$", "gi");

                    if (!$scope.nouveauMail.to || !$scope.nouveauMail.to.match(regExpValidEmail)) {
                        window.alert("Erreur\n\nMerci de vérifier l'adresse e-mail saisie.");
                        return;
                    }

                    if (!$scope.nouveauMail.subject) {
                        if (!window.confirm("Confirmation\n\nÊtes-vous certain de vouloir envoyer un mail sans objet ?")) {
                            return;
                        }
                    }

                    $scope.envoiMail({ nouveauMail: $scope.nouveauMail });
                }

                $scope.$on("initFormNouveauMail", function () {
                    $scope.razMail();
                })
            }
        };
    })