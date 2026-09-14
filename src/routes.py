from flask import render_template
from .utils.estaciones import ESTACIONES
from .forms import buscarRutaOptima
from flask import Blueprint, render_template

main = Blueprint("main", __name__)

@main.route("/", methods=["GET", "POST"])
def hello_world():
    #importamos el form de su respectivo archivo, se pasa al render template y después, tras obtener los datos, hacemos el algoritmo
    form =  buscarRutaOptima()
   
    if form.validate_on_submit():
        salida = form.salida.data
        destino = form.destino.data
        #Debugging line, borrar luego
        print(f"EXITO, VA DE {salida} a {destino}") 
        #Aqui deberia ir el algoritmo, preferiblemente en una función escrita en otra clase fuera de esta misma


    return render_template('index.html', estaciones = ESTACIONES, form = form)