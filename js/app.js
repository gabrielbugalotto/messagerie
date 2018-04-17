angular.module("Webmail", ["ngSanitize", "ui.tinymce", "MailServiceMock","MesFiltres","MesDirectives"])
    .controller("WebmailCtrl", function ($scope, $location, $filter, mailService) {

        // tri
        $scope.champTri = null;
        $scope.triDesc = false;
        $scope.icon = null;

        $scope.triEmails = (champ) => {
            if ($scope.champTri == champ) {
                $scope.triDesc = !$scope.triDesc;
            } else {
                $scope.champTri = champ;
                $scope.triDesc = false;
            }
        };
        $scope.cssChevronsTri = function (champ) {
            $scope.champTri == champ;
            if ($scope.champTri == champ && !$scope.triDesc) {
                $scope.icon = '<i class="fas fa-chevron-up text-primary ml-2"></i>';
            } else {
                $scope.icon = '<i class="fas fa-chevron-down text-primary ml-2"></i>';
            }
        }
        
        // recherche

        $scope.recherche = null;

        $scope.inputRez = () => {
            $scope.recherche = null;
        }
        // creation emails

        $scope.afficherNouveauMail = false;
        
        $scope.envoiMail = (nouveauMail) => {
            mailService.envoiMail(nouveauMail);
            $location.path("/");
        };

        // navigation   

        $scope.vueCourante = null;
        $scope.dossierCourant = null;
        $scope.emailSelectionne = null;

        $scope.versEmail = function (dossier, email) {
            $location.path("/" + dossier.value + "/" + email.id);
        }

        $scope.selectionDossier = function (valDossier) {
            $scope.vueCourante = "vueDossier";
            $scope.dossierCourant = mailService.getDossier(valDossier);
        }

        $scope.selectionEmail = function (valDosssier, idMail) {
            $scope.vueCourante = "vueContenuMail";
            $scope.emailSelectionne = mailService.getMail(valDosssier, idMail);
        };

        $scope.$watch(function () {
            return $location.path();
        }, function (newPath) {
            var tabPath = newPath.split("/");
            if (tabPath.length > 1 && tabPath[1]) {
                if (tabPath[1] == "nouveauMail") {
                    $scope.vueCourante = "vueNouveauMail";
                    $scope.$broadcast("initFormNouveauMail");
                } else {
                    var valDossier = tabPath[1];
                    if (tabPath.length > 2) {
                        var idMail = tabPath[2];
                        $scope.selectionEmail(valDossier, idMail);
                    } else {
                        $scope.selectionDossier(valDossier);
                    }
                }
            } else {
                $scope.vueCourante = null;
            }
        });

        $scope.dossiers = mailService.getDossiers();

    });