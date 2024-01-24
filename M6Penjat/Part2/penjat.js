//Variables globals per poder accedir desde qualsevol funcio
let paraula = "";
let paraulaOculta = "";
let intents = 0;
let lletres  = "";
//Les variables de partides son un condicional que mira si getItem es buit o no, donant 0 en cas de que no.
let partidesTotals = parseInt(localStorage.getItem('partidesTotals')) || 0;
let partidesGuanyades = parseInt(localStorage.getItem('partidesGuanyades')) || 0;
let partidesPerdudes = parseInt(localStorage.getItem('partidesPerdudes')) || 0;
//Aquesta funcio es trucada quan clickem el boto i inicialitza les variables amb valors, ens dona una imatge del penjat i ens mostra la paraula oculta amb la funcio
function novaPartida() {
    mostrarAbecedari();
    paraula = prompt("Escriu una paraula");
    partidesTotals++;
    paraulaOculta = paraula.replace(/./g, '_');
    intents = 0;
    lletres  = "";  
    canviarImatge();
    lletra = "";
    mostrarEncert(lletra);
}
//Aquesta funcio agafa un div amb el id 'abecedari' i asigna amb innerHTML tots els buttons per lletra del abecedari
function mostrarAbecedari() {
    let div = document.getElementById('abecedari');
    let abecedari ='abcdefghijklmnopqrstuvwxyz';
    let butons = '';

    for (let i = 0; i < abecedari.length; i++) {
        butons += `<button onclick="clickLletra('${abecedari[i]}')" id="${abecedari[i]}">${abecedari[i]}</button>`;
    }
    div.innerHTML = butons;
}
//Aquesta funcio es crida quan clickem un boto, i ens envia una lletra, asignada en mostrarAbecedari()
function clickLletra(lletra) {
    //Truca la funci jugarPenjat i li pasa lletra
    if (jugarPenjat(lletra)) {
        //Si retorna true ens mostra el nostre progress
        mostrarEncert(lletra);
        //En cas de que la paraula y la paraulaOculta siguin iguals ens mostra el nostre alert i desactiva
        //els botons amb la funcio desactivabutons, tambe afegeir un +1 a partides guanyades y guarda les estadistiques
        if (paraula === paraulaOculta) {
            desactivarButons();
            setTimeout(function () { alert("S'ha acabat la partida"); }, 1000);
            partidesGuanyades++;
            guardarEstadistiques();
            return;
        }
    } else {
        //En cas de retornar false sumen intents y afegim lletres. Seguim desactivant el buto
        intents++;
        lletres += lletra;
        desactivarButo(lletra);
        //Truquem la funcio per canviar la imatge
        canviarImatge();
        //Si els intents son 6 desactivem tots els butons, donem la alerta i afegim les partides perdudes
        //, ademes guardem les estadistiques
        if (intents == 6) {
            desactivarButons();
            setTimeout(function () { alert("S'ha acabat la partida"); }, 1000);
            partidesPerdudes++;
            guardarEstadistiques();
            return;
        }
    }

}

function jugarPenjat(lletra) {
    //Truquem la funcio de comprovarLLetra que ens retorna la paraulaOculta amb lletres si son iguals o la mateixa
    let novaParaulaOculta = comprovarLletra(lletra, paraula, paraulaOculta);
    // comprova si la paraulaoculta es igual, i retorna false en cas de si
    if (paraulaOculta === novaParaulaOculta) {
        return false;
    }
    //converteix la paraula oculta en nova paraula oculta i retorna true
    paraulaOculta = novaParaulaOculta;
    return true
}
//La funcio de comprova lletra mira si la paraula en cadascuna de les seves posicions son igual a la lletra
//que l'usuari ha clicat, i en cas de ser-ho ho afegeix a la paraula que fa return, sino de la paraulaOculta
//ja que pot tenir lletres ja guardades.
function comprovarLletra(lletra, paraula, paraulaOculta) {
    let paraulaOcultaReturn = "";
    for (let i = 0; i < paraula.length; i++) {
        if (paraula.charAt(i) === lletra) {
            paraulaOcultaReturn += lletra;
        } else {
            paraulaOcultaReturn += paraulaOculta.charAt(i);
        }
    }
    return paraulaOcultaReturn;
}
//Aquesta funcio ens mostra en el div amb el id jocPenjat, ens desactiva el boto amb el id de la lletra y mostra la paraula oculta
function mostrarEncert(lletra) {
    let div = document.getElementById('jocPenjat');
    if (lletra === "") { div.innerHTML = paraulaOculta; return;}
    desactivarButo(lletra);
    div.innerHTML = paraulaOculta;
}
//Li pasem la imatge amb el id imatgePenjat i canviem el seu source per un de img/penjat_intent.png
function canviarImatge() {
    let imatge = document.getElementById('imatgePenjat');
    imatge.src = 'img/penjat_' + intents + '.png';
}

//Aquesta funcio agafa el buto amb el id de la lletra y el desactiva
function desactivarButo(lletra) {
    let buto = document.getElementById(lletra);
    buto.disabled = true;
}
//Mira tot el contingut de abecedari i desactiva tots els botons amb el id que tingui la posicio del buto
function desactivarButons() {
    let abecedari ='abcdefghijklmnopqrstuvwxyz';
    for (let i = 0; i < abecedari.length; i++) {
        let buto = document.getElementById(abecedari.charAt(i));
        buto.disabled = true;
    }
}
//Quan aquesta funcio es cridada mostra en el div estadistica la informacio de les partides
//totals, guanyades y perdudes amb un innerhtml
function estadistiques() {
    let div = document.getElementById('estadistica');

    let estadistiquesTotalsMostrar = `<p>Partides Totals: ${partidesTotals}</p>`;
    let estadistiquesGanadesMostrar = `<p>Partides Ganades: ${partidesGuanyades}</p>`;
    let estadistiquesPerdudesMostrar = `<p>Partides Perdides: ${partidesPerdudes}</p>`;
    
    div.innerHTML = estadistiquesTotalsMostrar + estadistiquesGanadesMostrar + estadistiquesPerdudesMostrar;
}

//Aquesta funcio fa un setItem amb la informacio de les variab les de les partides
function guardarEstadistiques() {
    localStorage.setItem('partidesTotals', partidesTotals.toString());
    localStorage.setItem('partidesGuanyades', partidesGuanyades.toString());
    localStorage.setItem('partidesPerdudes', partidesPerdudes.toString());
}
//Borra estadistiques fa que les tres variables globals siguin un 0 y truca la funcio de guardarEstadistiques
//per a que es guardin i truca estadistiques per canviar/mostrar la informacio de les tres variables
function borrarEstadistiques() {
    partidesTotals = 0;
    partidesGuanyades = 0;
    partidesPerdudes = 0;
    guardarEstadistiques();
    estadistiques();
}