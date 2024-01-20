

class Teem {
    constructor(name, city, starts) {
        this.name = name,
            this.city = city,
            this.starts = starts
    }
}

const esMayorDeEdad = (edad = 18) => edad >= 18;
const esUnaEdadValida = (edad = 18) => edad >= 1 && edad <= 100;
const obtenerEdad = (fechaDeNacimiento = new Date()) => {
    const fechaDeHoy = new Date();
    const diaDeHoy = fechaDeHoy.getDate();
    const mesDeHoy = fechaDeHoy.getMonth();
    const añoDeHoy = fechaDeHoy.getFullYear();
    const diaDeNacimiento = fechaDeNacimiento.getDate();
    const mesDeNacimiento = fechaDeNacimiento.getMonth();
    const añoDeNacimiento = fechaDeNacimiento.getFullYear();
    let edad = añoDeHoy - añoDeNacimiento;
    if (mesDeNacimiento > mesDeHoy ||
        (mesDeNacimiento === mesDeHoy && diaDeNacimiento > diaDeHoy)
    ) edad--;
    if (esUnaEdadValida(edad)) {
        if (esMayorDeEdad(edad)) return edad;
        else throw new Error("No tiene la Edad suficiente para acceder al recurso");
    } else {
        throw new Error("La edad de nacimiento no es creible");
    }
}

const fechaDeNacimiento = new Date(2002, 2, 5);
console.log(obtenerEdad(fechaDeNacimiento));

const DIM = new Teem("Deportivo Independiente Medellín", "Medellín", 6);
const JUNIOR = new Teem("Junior De Barranquilla", "Barranquilla", 10);
const AMERICA = new Teem("América de Calí", "Calí", 15);
const SANTAFE = new Teem("Independiente Santa Fe", "Bogotá", 9);
const MILLONARIOS = new Teem("Millonarios", "Bogotá", 16);

const teemList = [JUNIOR, DIM, AMERICA, MILLONARIOS, SANTAFE];
const BogotaTeemList = teemList.filter(teem => teem.city === "Bogotá");

console.log(teemList.length);
console.log(BogotaTeemList);