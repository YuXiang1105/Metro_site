#Este archivo le dice a python que esto es una carpeta python, se puede dejar vacío. También se puede usar para configuraciones,

#Se basa en la estructura aplication factory, donde se divide todo en blueprints

#Se eligió esta estructura en caso de querer ampliar la lógica en un futuro del proyecto
from flask import Flask 

def create_app():
    app = Flask(__name__)
    app.config["SECRET_KEY"] = "reza_para_que_compile_porfavor"
    from .routes import main
    #Los blueprints se pueden interpretear como división de sectores en una pagina web, por ejemplo, dividir la pagina principal
    #del sector de administracion, o el sector de la base de datos, etc, dependiendo del gusto del desarrollador
    app.register_blueprint(main)

    return app