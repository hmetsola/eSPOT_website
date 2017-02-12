# esports_dev

Katso gitissä olevaa uusinta versiota sivustosta:
https://rawgit.com/rkataine/esports_dev/master/index.html

Lisätty NetBeans project speksi, hyvä open source ohjelma useamman kielen editoimiseen, nopeuttaa kirjottamista ja helpottaa formatin standardisoimisessa + sisältää monenmoista autotesteria, bugien etsimis työkalua, gitin yhteydessä toimivaa bugi testeriä, jne jne suosittelen tutustuun: http://netbeans.org/ -Joni

Ohjeet sisällön lisäämiseen:

index.html on pääsivu, johon lisäillään sivupalkin nappeja. 
  ../database-kansioon lisätään xxx_content.html:iä ja se tiedoston nimi lisätään index.html:ssä olevan napin valueksi. Siinä kaikki.
  
  ../scripts/filereader.js:ssä oleva readFile()-funktio lukee nappiin määritellyn tiedoston ja avaa sen index.html:n "content" -div:iin. Funktio myös generoi navigointinapit xxx_content.html:ään määritellyistä väliotsikoista (\<h2> elementeistä). 
  
  ../database/xxx_content.html - Katso mallia lol_content.html:stä, miten sivu rakennetaan. Käytännössä siellä on vain pelkkää tekstiä ja upotettuja kuvia. Kaikki tyylit määritellään styles.css:ssä. Contentit on jaettu \<div> elementeillä ja kappaleet \<p> elementeillä. Otsikot \<h1>, \<h2> ja \<h3> elementeillä. Muuta ei paljoa tarvitsekaan :). Joka toiseen \<div>:iin laitetaan eri class-arvo: "white_back" tai "gray_back". \<h2> -elementteihin, joista napit generoidaan, laitetaan joku kuvaava id (laitan sen id:n näkymään napin viereen, kun hiiren laittaa siihen päälle).

styles.css: kaikki ulkoasuun liittyvät määrittelyt. Fontit, värit, \<div>:ien asettelu ja koko jne...



