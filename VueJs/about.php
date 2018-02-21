<!DOCTYPE html>



<!-- oeuvre artistique de la IFAP3A 2017 ;)
                                                                  C’estense                                         
                                                          baladantdanslacom                                     
                                                  pagneGenevoiseàvéloundim                                  
                                  anchebienensole           illéquel                                
                           ’idéedeceproj                  etestné                               
                         e.Toutsportifpa                   rtantp                               
                         ourquelquesheure                   sdeba                               
                         lade,emmène sagour    deremplied’  eau.C                               
                         ejour-là,ilfaisaitp articulièrement chau                               
                         d,etlagourdes’est  vidéeplusvitequeprévu                               
                        .Etlà  ,aucunefont  ained'eauàproximitéet                               
                   pasmoyend'entrouveru nepoursedés alterer!C                               
                  ’estensebaladantdan   slacompagneGenevoiseà                               
                 véloundimanchebienensoleilléquel’idé  edece                                
                proje          testnée.Toutsporti     fparta                                
           ntpou                      rquelqu     esheur                                
          esdeba                                 lade,e                                 
         mmènes                                 agourd                                  
        erempl                                  ied’ea                                  
        u.Cej                      our-        là,ilf                                   
        aisa                      itpar tic   ulière                                    
        ment                      chaud,etla  gourd                         es’estvid   
   éeplu                      svitequep  révu.                        Etlà,aucunef  
   ontai                     ned'eauàpr oximi                       téetpa    smoy  
   end'e                     ntrouveru  nepou                     rsedésa    ltere  
   r!C’e                    stensebal  adantd                   anslaco     mpagn   
   eGene                    voiseàvé   loundimanchebienenso   leilléq     uel’i     
        déed                   eceproje    testnée.Toutsportifpartantpo      urque      
        lque                   sheures     debal   ade,e   mmènesagou      rderem       
        plie                  d’eau.Ce      jou   r-là,ilfaisaitpar      ticuli         
        èreme               ntcha ud,et         lagourdes’estvidée     plusvit          
         eque             prévu  .Etlà,a         ucunefontained'eauà   proximit         
         éetpa            smoyend'entrou                     verunepo    ursedésal      
          terer            !C’estenseba              lada       ntdans  laco mpagn      
          eGenev              oise                   àvél        oundim  anchebie       
           nensol                                eil              léque    l’id         
                éedecepr                            ojet              estné     e.To        
                   utsport                          ifpa              rtantpourquelq        
 ues        heuresdeba                       lade           ,emmènesagourde         
remplie    d’eau.Cejour-là,i                  lfa         isaitpa    r              
ticulièrementc haud,etlagourdes’estv           idée    plusvit                      
eque prévu.Etlà,auc    unefontained'ea uàproximitéetpasmoyen                        
 d'en  trouverune         poursedésal terer!C’estensebala                           
  dant   dansla         compagneGene voise àvéloundima                              
   nchebienen           soleilléque  l’id                                           
        éedecep              rojetest   née.                                            
          Tou                tsport    ifpa                                             
                                                  rtantp  ourq                                              
                                                   uelquesheu                                               
                                                         resdeba                                                
                                                           lad     										
-->
<html lang="en">
    <head>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
        <script src="https://unpkg.com/vue"></script>
        <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false"></script>
        <script src="src/vue.js" type="text/javascript"></script>
        <script src="src/aPropos-Vue.js" type="text/javascript"></script>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="MyGe-SoifCss.css" rel="stylesheet" type="text/css"/>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
        <script src="https://unpkg.com/vue"></script>
        <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false"></script>
        <script src="src/vue.js" type="text/javascript"></script>
        <script src="src/Ge-SoifVue.js" type="text/javascript"></script>
        <?php
//META
        include("./Menu/meta.php");
        ?>

        <title>Ge-Soif! | A propos</title>
        <!-- Bootstrap -->
        <link href="MyGe-SoifCss.css" rel="stylesheet" type="text/css"/>
        <!--Js maps-->
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>

        <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
        <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
        <!--[if lt IE 9]>
          <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
          <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
        <![endif]-->
        <style>
            #btnShowAddFountain{
                display: none;
            }
        </style>
    </head>
    <body class="scrollActive">
        <?php
        include("./Menu/MenuDeco.php");
        ?>
        <!--Content-->    
        <div class="container">
            <div class="row">
                <div class="col-sm-2">
                    <div class="sidebar-nav">
                        <div class="navbar navbar-default" role="navigation">
                            <div class="navbar-header">
                                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".sidebar-navbar-collapse">
                                    <span class="sr-only">Toggle navigation</span>
                                    <span class="icon-bar"></span>
                                    <span class="icon-bar"></span>
                                    <span class="icon-bar"></span>
                                </button>
                                <span class="visible-xs navbar-brand">Menu</span>
                            </div>
                            <div class="navbar-collapse collapse sidebar-navbar-collapse" v-if="isDisplayed"> 
                                <ul class="nav navbar-nav aProposNav">
                                    <li><a v-on:click="btnActu">Actualité</a></li>
                                    <li><a v-on:click="btnEquipe">Notre équipe</a></li>
                                    <li><a v-on:click="btnPropos">A propos</a></li>
                                </ul>
                            </div><!--/.nav-collapse -->
                        </div>
                    </div>
                </div>
                <div class=" col-sm-offset-1 col-lg-offset-1 col-md-offset-1 col-xs-12 col-sm-9 col-lg-9 col-md-9 ">
                    
                    
                    <!--  Actualité  -->
                    <div class="actu col-xs-12 col-sm-12 col-lg-12 col-md-12">
                        <div v-if="isDisplayed"> 
                            <div class="row">
                                <div class="">
                                    <div class="clearfix">
                                        <!--<section>-->
                                        <h1>Actualité</h1>
                                        <hr>
                                        <article class=" col-xs-12 col-sm-12 col-lg-6 col-md-6">
                                            <div class="thumbnail">
                                                <div class="caption">
                                                    <!--<h4>Ytb</h4>-->
                                                </div>
                                                <iframe width="100%" height="296" src="https://www.youtube.com/embed/K3JngtvrcdI"
                                                        frameborder="1" allow="autoplay; encrypted-media" allowfullscreen></iframe>

                                            </div>
                                        </article>
                                        <article class="col-xs-12 col-sm-12 col-lg-6 col-md-6">
                                            <div class="thumbnail">
                                                <div class="caption">
                                                    <!--<h4>Ytb</h4>-->
                                                </div>
                                                <iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fgenevasoif%2F&tabs=timeline&width=340&height=500&small
                                                        _header=true&adapt_container_width=true&hide_cover=true&show_facepile=false&appId"
                                                        width="100%" height="500" style="border:none;overflow:hidden" scrolling="no"
                                                        frameborder="1" allowTransparency="true"></iframe>
                                            </div>
                                        </article>                                             
                                        <!--</section>-->
                                    </div>
                                </div>
                            </div>
                        </div> 
                    </div>
                    <!--  Fin Actualité  -->

                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    <!--  Notre équipe -->
                    <div class="equipe col-xs-12 col-sm-12 col-lg-12 col-md-12">
                        <div v-if="isDisplayed" class="container">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="clearfix">
                                        <section>
                                            <h1>Equipe et remerciements</h1>
                                            <hr>
                                            
                                            <article class="col-xs-12 col-sm-12 col-lg-9 col-md-9">
                                                <div class="thumbnail">
                                                    <img class="img-rounded" src="./img/about/dev.png" alt="Dev. Team">
                                                    <div class="caption">
                                                        <h4>Développeurs</h4>
                                                        <p class="text-justify">Le développement s'est fait en plusieurs étapes, dans le cadre d'un atelier web dispensé au <a href="http://icp.ge.ch/po/cfc-informatique"  target="_blank">CFPT</a>.</p>
                                                        <!-- Version 3.0 -->
                                                        <div class="versions">
                                                            <button class="btn btn-default btnversions" type="button" data-target="#DevV3" data-toggle="collapse" aria-expanded="false" aria-controls="DevV3">Version 3.0<span style="float:right;">▼</span></button>
                                                            <section id="DevV3" class="collapse">
                                                                <div class="list-group-item">
                                                                    <h5>
                                                                        <ul>
                                                                            <li class="listeDev">Simon Fanetti</li>
                                                                            <li class="listeDev">Raphael Ferreira</li>
                                                                            <li class="listeDev">Ardi Ramushi</li>
                                                                            <ul class="listeDate">2016-2017</ul>
                                                                        </ul>
                                                                    </h5>
                                                                </div>
                                                            </section>
                                                        </div>
                                                        <!-- Version 2.0 -->
                                                        <div class="versions">
                                                            <button class="btn btn-default btnversions" type="button" data-target="#DevV2" data-toggle="collapse" aria-expanded="false" aria-controls="DevV2">Version 2.0<span style="float:right;">▼</span></button>
                                                            <section id="DevV2" class="collapse">
                                                                <div class="list-group-item">
                                                                    <h5>
                                                                        <ul>
                                                                            <li class="listeDev">Nohan Budry</li>
                                                                            <li class="listeDev">Yohann Perez</li>
                                                                            <li class="listeDev">Gabriel Strano</li>
                                                                            <ul class="listeDate">2015-2016</ul>
                                                                        </ul>
                                                                    </h5>
                                                                </div>
                                                            </section>
                                                        </div>
                                                        <!-- Version 1.0 -->
                                                        <div>
                                                            <button class="btn btn-default btnversions" type="button" data-target="#DevV1" data-toggle="collapse" aria-expanded="false" aria-controls="DevV1">Version 1.0<span style="float:right;">▼</span></button>
                                                        <!--<button class="btn btn-primary" style="width:100%" type="button" data-target="#MonCollapse" data-toggle="collapse" aria-expanded="false" aria-controls="MonCollapse">Version 1.0<span class="badge" style="float:right;">5</span></button>-->
                                                            <section id="DevV1" class="collapse">
                                                                <div class="list-group-item">
                                                                    <h5>
                                                                        <ul>
                                                                            <li class="listeDev">Antonio Pisanello</li>
                                                                            <li class="listeDev">Robin Plojoux</li>
                                                                            <ul class="listeDate">2014-2015</ul>
                                                                        </ul>
                                                                    </h5>
                                                                </div>
                                                            </section>
                                                        </div>
                                                    </div>
                                                </div>
                                            </article>
                                            
                                            
                                            
                                            <article class="col-xs-12 col-sm-12 col-lg-6 col-md-6">
                                                <div class="thumbnail">
                                                    <img class="img-rounded" src="./img/about/graph.png" alt="Graphisme">
                                                    <div class="caption">
                                                        <h4>Graphisme</h4>
                                                        <p class="text-justify">Les graphismes ont été créés dans le cadre d'un atelier graphique dispensé au <a href="http://icp.ge.ch/po/cfc-informatique"  target="_blank">CFPT</a>.</p>
                                                        <!-- Version 3.0 -->
                                                        <div class="versions">
                                                            <button class="btn btn-default btnversions" type="button" data-target="#MonCollapseV3" data-toggle="collapse" aria-expanded="false" aria-controls="MonCollapseV3">Version 3.0<span style="float:right;">▼</span></button>
                                                            <section id="MonCollapseV3" class="collapse">
                                                                <div class="list-group-item">
                                                                    <h5>
                                                                        <ul>
                                                                            <li class="listeDev">Raphael Ferreira</li>
                                                                            <ul class="listeDate">2016-2017</ul>
                                                                        </ul>
                                                                    </h5>
                                                                </div>
                                                            </section>
                                                        </div>
                                                        <!-- Version 2.0 -->
                                                        <div class="versions">
                                                            <button class="btn btn-default btnversions" type="button" data-target="#MonCollapseV2" data-toggle="collapse" aria-expanded="false" aria-controls="MonCollapseV2">Version 2.0<span style="float:right;">▼</span></button>
                                                            <section id="MonCollapseV2" class="collapse">
                                                                <div class="list-group-item">
                                                                    <h5>
                                                                        <ul>
                                                                            <li class="listeDev">Marlon P. De La Rosa</li>
                                                                            <li class="listeDev">Damiano Rossello</li>
                                                                            <ul class="listeDate">2015-2016</ul>
                                                                        </ul>
                                                                    </h5>
                                                                </div>
                                                            </section>
                                                        </div>
                                                    </div>
                                                </div>
                                            </article>

                                            
                                            <article class="col-xs-12 col-sm-12 col-lg-6 col-md-6">
                                                <div class="thumbnail">
                                                    <img class="img-rounded" src="./img/about/idee.png" alt="Product Owner">
                                                    <div class="caption">
                                                        <h4>Product Owner</h4>
                                                        <h5><b>Jasmina Travnjak</b></h5>
                                                        <p class="text-justify">Initiatrice de l'idée, enseignante à <a href="https://edu.ge.ch/site/cfpt-informatique/" target="_blank">l'école d'informatique du CFPT</a>, elle a géré le projet et accompagné ses étudiants dans l'étude des besoins, le développement, les tests et les graphismes ainsi que la mise en pratique de la méthodologie de gestion de projet SCRUM.</p>
                                                    </div>
                                                </div>
                                            </article>
                                            <hr>
                                        </section>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--  Fin Notre équipe -->

                    <!--  A propos -->
                    <div class="nosPropos">
                        <div v-if="isDisplayed" class="container"> 
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="row">
                                        <section class="col-xs-12 col-sm-12 col-lg-12 col-md-12">
                                            <article>
                                                <h1>A propos</h1>
                                                <hr>
                                                <h2>Ge Soif!</h2>
                                                <p class="text-justify">C’est en se baladant dans la compagne Genevoise à vélo un dimanche bien ensoleillé que l’idée de ce projet est née. Tout
                                                    sportif partant pour quelques heures de balade, emmène sa gourde remplie d’eau. Ce jour-là, il faisait
                                                    particulièrement chaud, et la gourde s’est vidée plus vite que prévu. Et là, aucune fontaine d'eau à proximité et pas moyen d'en trouver une pour se désalterer!</p>
                                                <h2> Et si on rendait l'accès à l'eau potable disponible grâce à une application web mobile?</h2>
                                                <p><strong>A vous de jouer!</strong> Ajoutez les fontaines lors de vos promenades en compagne ou en ville et ce partout en Suisse!</p>
                                                <p>L'initiative est <em>Genevoise</em>, mais l'application peut être utilisée partout dans le monde!</p>
                                                <p><strong>Depuis le lancement de l'application en juin 2016, plus de 90 fontaines ont été ajoutées de parts et d'autres en Suisse et ailleurs!</strong></p>

                                                <p><strong>Alors à vos smartphones!</strong></p>
                                            </article>
                                        </section>
                                    </div>
                                    <div class="clearfix">
                                        <section>

                                            <article class="col-xs-12 col-sm-6 col-lg-6 col-md-6">
                                                <div class="thumbnail">
                                                    <img class="img-rounded" src="./img/about/merci.png" alt="">
                                                    <div class="caption">
                                                        <h4>Remerciements</h4>
                                                        <h5>Service du Génie Civil</h5>
                                                        <h5>Classe Atelier Web IFAP2B & IDAP2B 2016</h5>
                                                        <h5>L'équipe Gemprunte de la classe INP4B 2017</h5>
                                                        <p><strong>Et surtout merci à VOUS tous de participer et ajouter des fontaines!</strong></p>
                                                    </div>
                                                </div>
                                            </article>                        

                                            <article class="col-xs-12 col-sm-6 col-lg-6 col-md-6">
                                                <div class="thumbnail">
                                                    <img id="DistImg"  class="img-rounded" src="./img/about/distinction.png" alt="">
                                                    <div class="caption">
                                                        <h4>Concours Cantonal de Développement Durable</h4>
                                                        <p class="text-justify">Ce projet a reçu la Distinction Cantonale de Développement Durable 2016.</p>
                                                    </div>
                                                </div>
                                            </article>

                                            <article class="col-xs-12 col-sm-6 col-lg-6 col-md-6">
                                                <div class="thumbnail">
                                                    <img class="img-rounded" src="./img/about/data.png" alt="">
                                                    <div class="caption">
                                                        <h4>Données et tests</h4>
                                                        <p class="text-justify">Tout le monde a participé et aidé à la mise en production du projet, aux tests et à l'insertion de données.</p>
                                                        <!-- Version 3.0 -->
                                                        <div class="versions">
                                                            <button class="btn btn-default btnversions" type="button" data-target="#TestV3" data-toggle="collapse" aria-expanded="false" aria-controls="TestV3">Version 3.0<span style="float:right;">▼</span></button>
                                                            <section id="TestV3" class="collapse">
                                                                <div class="list-group-item">
                                                                    <h5>
                                                                        <ul>
                                                                            <li class="listeDev">Classe IFAP3A</li>
                                                                            <li class="listeDev">Atelier Web 2ème</li>
                                                                            <li class="listeDev">Classe INP4B</li>
                                                                            <ul class="listeDate">2016-2017</ul>
                                                                        </ul>
                                                                    </h5>
                                                                </div>
                                                            </section>
                                                        </div> <!-- Version 2.0 -->
                                                        <div class="versions">
                                                            <button class="btn btn-default btnversions" type="button" data-target="#TestV2" data-toggle="collapse" aria-expanded="false" aria-controls="TestV2">Version 2.0<span style="float:right;">▼</span></button>
                                                            <section id="TestV2" class="collapse">
                                                                <div class="list-group-item">
                                                                    <h5>
                                                                        <ul>
                                                                            <li class="listeDev">Steve Blandin</li>
                                                                            <li class="listeDev">Thomas Carreira</li>
                                                                            <li class="listeDev">Fabio Dello Buono</li>
                                                                            <ul class="listeDate">2015-2016</ul>
                                                                        </ul>
                                                                    </h5>
                                                                </div>
                                                            </section>
                                                        </div>
                                                    </div>
                                                </div>
                                            </article>

                                        </section>
                                    </div>
                                </div>
                            </div>
                        </div> 
                    </div>
                    <!--  Fin A propos -->

                </div>
            </div>
        </div>
        <?php
        include("Menu/footer.php");
        ?>

        <!-- Include all compiled plugins (below), or include individual files as needed -->
        <script src="bs/js/bootstrap.min.js"></script>
        <script>
            $(function () {
                $("#addFountainLink").click(function () {
                    window.location = "index.php?add";
                });
            });
        </script>
    </body>
</html>
