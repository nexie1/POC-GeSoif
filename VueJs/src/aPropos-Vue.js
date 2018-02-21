// Permet l'éxécution du code (sinon ça ne marche pas)
$(document).ready(function () {

    
    /*******************************************************
     ******************** Modif HTML ***********************
     *******************************************************/
    var navbarApropos = new Vue({
        el: '.aProposNav',
        data: {
            
        },
        methods: {
            btnActu: function(){
                divActualite.isDisplayed = true;
                divEquipe.isDisplayed = false;
                divNosPropos.isDisplayed = false;
            },
            btnEquipe: function(){
                divActualite.isDisplayed = false;
                divEquipe.isDisplayed = true;
                divNosPropos.isDisplayed = false;
                
            },
            btnPropos: function(){
                divActualite.isDisplayed = false;
                divEquipe.isDisplayed = false;
                divNosPropos.isDisplayed = true;     
            }       
        }
    });


    var divActualite = new Vue({
        el: '.actu',
        data: {                
            isDisplayed: true
        },
    });
    var divEquipe = new Vue({
        el: '.equipe',
        data: {                
            isDisplayed: false
        },
    });
    var divNosPropos = new Vue({
        el: '.nosPropos',
        data: {                
            isDisplayed: false
        },
    });










});