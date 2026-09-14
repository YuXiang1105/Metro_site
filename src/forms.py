# Archivo para los form de flask, añadimos validación para evitar injection, como ha sido mencionado en el html

from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired

class buscarRutaOptima(FlaskForm):
    salida = StringField('salida', validators=[DataRequired()])
    destino = StringField('destino', validators=[DataRequired()])