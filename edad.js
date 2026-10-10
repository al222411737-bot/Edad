const dia = document.getElementById("dia");
const mes = document.getElementById("mes");
const anio = document.getElementById("anio");
const form = document.getElementById("formEdad");
const resultado = document.getElementById("resultado");

// Actualizar los días según el mes y el año
function actualizarDias() {
    const diaAnterior = dia.value;
    const m = Number(mes.value);
    const a = Number(anio.value) || 2000;

    let cantidadDias = 31;

    if (mes.value !== "") {
        cantidadDias = new Date(a, m + 1, 0).getDate();
    }

    dia.innerHTML = '<option value="">Selecciona el día</option>';

    for (let i = 1; i <= cantidadDias; i++) {
        const opcion = document.createElement("option");
        opcion.value = i;
        opcion.textContent = i;
        dia.appendChild(opcion);
    }

    if (Number(diaAnterior) <= cantidadDias) {
        dia.value = diaAnterior;
    }
}

mes.addEventListener("change", actualizarDias);
anio.addEventListener("input", actualizarDias);

actualizarDias();

// Calcular la edad
form.addEventListener("submit", function(event) {
    event.preventDefault();

    const d = Number(dia.value);
    const m = Number(mes.value);
    const a = Number(anio.value);

    const nacimiento = new Date(a, m, d);
    const hoy = new Date();

    if (
        !dia.value ||
        mes.value === "" ||
        !anio.value ||
        a < 1900 ||
        nacimiento > hoy ||
        nacimiento.getFullYear() !== a ||
        nacimiento.getMonth() !== m ||
        nacimiento.getDate() !== d
    ) {
        resultado.textContent =
            "Error: ingresa una fecha válida.";
        return;
    }

    let años = hoy.getFullYear() - a;
    let meses = hoy.getMonth() - m;

    if (hoy.getDate() < d) {
        meses--;
    }

    if (meses < 0) {
        años--;
        meses += 12;
    }

    resultado.textContent =
        `Tu edad es ${años} años y ${meses} meses.`;
});