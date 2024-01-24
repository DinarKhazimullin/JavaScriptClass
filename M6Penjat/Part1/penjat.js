//Variables globals per guardar les estadistiques
let partidesTotals = 0;
let partidesGuanyades = 0;
let partidesPerdudes = 0;
function menu() {
    let opcio = 0;
    //Si la opcio no es tres, no deixara fer res mes que escullir
    while (opcio !== '3') {
        opcio = prompt("Escull una de les tres opcions: \n1. Iniciar un joc\n2. Estadístiques\n3. Sortir");
        //Un switch on si la variable de la opcio es un dels seguents:
        switch (opcio) {
            case '1':
                //Enviem un missatge per console log per dir quina opcio ha seleccionem y truquem la funcio jugarPenjat
                console.log("Has seleccionat: Iniciar un joc");
                //La funcio jugarPenjat retorna un boolea en cas de ganar o perdre, i suma a les variables globals
                if (jugarPenjat()) {
                    partidesGuanyades++;
                } else {
                    partidesPerdudes++;
                }
                partidesTotals++;
                break;
            case '2':
                //Aqui truca a la funcio de mostrarEstadistiques
                console.log("Has seleccionat: Estadístiques");
                mostrarEstadistiques();
                break;
            case '3':
                //No fa res aqui i surt del switch i consequentment del while
                console.log("Has seleccionat: Sortir");
                break;
            default:
                //En cas de que la opcio no sigui 1, 2 o 3
                console.log("Opció incorrecta. Si us plau, torna a intentar-ho.");
        }
    }
}
function jugarPenjat() {
    //Preguntem per la paraula per endevinar al usuari i creem una nova funcio que reemplaza per barres baixes (_)
    let paraula = prompt("Escriu una paraula");
    let paraulaOculta = paraula.replace(/./g, '_');
    let intents = 0;
    let lletres  = "";
    //Si no ha arribat als 6 intents fara el buckle.
    while (intents < 6) {
        let lletra = prompt("Insereix una lletra:");
        //Truca la funcio comprovavrSiLletra per saber si el que ha inserit el usuari es una lletra de a-z, en cas de no 
        if (!comprovarSiLletra(lletra)) {
            intents++;
            lletres += lletra;
            console.log("Lletra invalida");
        } else {
            //En cas de ser una lletra valida fara la comprovacio trucan la funcio comprovarLletra() on li pasem la leltra, paraula i la paraula oculta.
            let novaParaulaOculta = comprovarLletra(lletra, paraula, paraulaOculta);
            //Si la nova paraula oculta es igual a la paraula oculta, ens dona errada
            if (novaParaulaOculta === paraulaOculta) {
                console.log("Has fallat");
                intents++;
                lletres += lletra;
            }
            //Aqui mostrara el missatge formatejat
            mostrarMissatge(novaParaulaOculta, intents, lletres);
            //Convertim la paraula oculta en la nova paraula oculta
            paraulaOculta = novaParaulaOculta;
            //En cas de que la paraula oculta sigui igual a la paraula, ens mostrara el missatge de victoria i ens fa un return
            if (paraulaOculta === paraula) {
                console.log("Has encertat");
                return true;
            }
        }
    }
    //En cas de tenir 6 intents ens diu que hem perdud i returna false
    console.log("T'has penjat");
    return false;
}

function comprovarSiLletra(lletra) {
    //Mira si la lletra no es de llargata 0
    if (lletra.length !== 0) {
        //Si lletra esta en el rang de a-z, donara un bolea de true o false.
        if (lletra = /^[a-z]+$/i.test(lletra)) {
            return true;
        }
    }
    return false;
}

function comprovarLletra(lletra, paraula, paraulaOculta) {
    let paraulaOcultaReturn = "";
    for (let i = 0; i < paraula.length; i++) {
        //Aqui comprovem si la paraula en la posicio 'i' es igual a la lletra i la sumem a la variable de return, sino sumarem la barra baixa o la lletra ja adivinada en paraulaOculta
        if (paraula.charAt(i) === lletra) {
            paraulaOcultaReturn += lletra;
        } else {
            paraulaOcultaReturn += paraulaOculta.charAt(i);
        }
    }
    return paraulaOcultaReturn;
}

function mostrarMissatge(paraula, intents, lletres) {
    //Aqui mostrem les lletres del usuari separades per comes, per a que es vegi millor
    let lletresFormat = lletres.split('').join(', ');
    console.log(paraula);
    console.log(`Lletres fallades ${intents}/6: ${lletresFormat}`);
}


function mostrarEstadistiques() {
    //Mostra les estadistiques, en cas de la divisio sent de 0, ens donara NaN, amb isNan podem fer un operador ternari que mostra un 0 o la divisio
    console.log(`Total de partides: ${partidesTotals}`);
    console.log(`Partides guanyades (${isNaN(partidesGuanyades / partidesTotals) || partidesTotals === 0 ? 0 : (partidesGuanyades / partidesTotals * 100).toFixed(2)}%): ${partidesGuanyades}`);
    console.log(`Partides perdudes (${isNaN(partidesPerdudes / partidesTotals) || partidesTotals === 0 ? 0 : (partidesPerdudes / partidesTotals * 100).toFixed(2)}%): ${partidesPerdudes}`);
}