import networkx as nx
import math

G = nx.Graph()

#añadir nodos al grafo
#tomamos coordenadas en metros de cada estacion con talleres como el origen
estaciones = {
    # Línea 1
    'TALLERES': (0, 0),
    'SAN BERNABÉ': (666, 1204),
    'UNIDAD MODELO': (1334, 1933),
    'AZTLÁN': (2097, 3027),
    'PENITENCIARÍA': (2558, 4007),
    'ALFONSO REYES': (2556, 4838),
    'MITRAS': (2541, 5970),
    'SIMÓN BOLÍVAR': (2465, 6724),
    'HOSPITAL': (2358, 7477),
    'EDISON': (3429, 8043),
    'CENTRAL': (4333, 8051),
    'CUAUHTÉMOC': (5089, 8148),
    'DEL GOLFO': (6124, 8277),
    'FÉLIX U. GÓMEZ': (7097, 8405),
    'PARQUE FUNDIDORA': (7973, 8441),
    'Y GRIEGA': (8844, 8499),
    'ELOY CAVAZOS': (10376, 8871),
    'LERDO DE TEJADA': (11571, 8911),
    'EXPOSICIÓN': (12254, 8951),

    # Línea 2
    'SENDERO': (7590, -986),
    'SANTIAGO TAPIA': (7301, 57),
    'SAN NICOLÁS': (7054, 797),
    'ANÁHUAC': (6579, 2212),
    'UNIVERSIDAD': (6003, 3920),
    'NIÑOS HÉROES': (5734, 4731),
    'REGINA': (5399, 5720),
    'GRAL. ANAYA': (5103, 6984),
    'ALAMEDA': (4949, 9157),
    'FUNDADORES': (4884, 9680),
    'PADRE MIER': (5203, 10090),
    'GRAL. I. ZARAGOZA': (5733, 10187),

    # Línea 3
    'SANTA LUCÍA': (6918, 9787),
    'COL. OBRERA': (7017, 9029),
    'METALÚRGICOS': (7192, 7744),
    'COL. MODERNA': (7526, 6599),
    'RUIZ CORTINES': (7951, 6275),
    'LOS ÁNGELES': (8513, 5848),
    'HOSPITAL METROPOLITANO': (9501, 5106)
}

for estacion, pos in estaciones.items():
   G.add_node(estacion, pos=pos)

#añadir aristas al grafo
#los tiempos de viaje se calculan en minutos, tomando como velocidad promedio según internet 30km/h = 500 m/min y la distancia real del recorrido entre estaciones
vel=500 #m/min
G.add_edge('TALLERES', 'SAN BERNABÉ', tiempo=1390/vel) 
G.add_edge('SAN BERNABÉ', 'UNIDAD MODELO', tiempo=1000/vel)
G.add_edge('UNIDAD MODELO', 'AZTLÁN', tiempo=1340/vel)
G.add_edge('AZTLÁN', 'PENITENCIARÍA', tiempo=1090/vel)
G.add_edge('PENITENCIARÍA', 'ALFONSO REYES', tiempo=840/vel)
G.add_edge('ALFONSO REYES', 'MITRAS', tiempo=1140/vel)
G.add_edge('MITRAS', 'SIMÓN BOLÍVAR', tiempo=760/vel)
G.add_edge('SIMÓN BOLÍVAR', 'HOSPITAL', tiempo=770/vel)
G.add_edge('HOSPITAL', 'EDISON', tiempo=1220/vel)
G.add_edge('EDISON', 'CENTRAL', tiempo=910/vel)
G.add_edge('CENTRAL', 'CUAUHTÉMOC', tiempo=770/vel)
G.add_edge('CUAUHTÉMOC', 'DEL GOLFO', tiempo=1050/vel)
G.add_edge('DEL GOLFO', 'FÉLIX U. GÓMEZ', tiempo=990/vel)
G.add_edge('FÉLIX U. GÓMEZ', 'PARQUE FUNDIDORA', tiempo=880/vel)
G.add_edge('PARQUE FUNDIDORA', 'Y GRIEGA', tiempo=880/vel)
G.add_edge('Y GRIEGA', 'ELOY CAVAZOS', tiempo=1590/vel)
G.add_edge('ELOY CAVAZOS', 'LERDO DE TEJEDA', tiempo=1200/vel)
G.add_edge('LERDO DE TEJEDA', 'EXPOSICIÓN', tiempo=690/vel)

G.add_edge('SENDERO', 'SANTIAGO TAPIA', tiempo=1210/vel)
G.add_edge('SANTIAGO TAPIA', 'SAN NICOLÁS', tiempo=870/vel)
G.add_edge('SAN NICOLÁS', 'ANÁHUAC', tiempo=1660/vel)
G.add_edge('ANÁHUAC', 'UNIVERSIDAD', tiempo=2010/vel)
G.add_edge('UNIVERSIDAD', 'NIÑOS HÉROES', tiempo=950/vel)
G.add_edge('NIÑOS HÉROES', 'REGINA', tiempo=1160/vel)
G.add_edge('REGINA', 'GRAL. ANAYA', tiempo=1450/vel)
G.add_edge('GRAL. ANAYA', 'CUAUHTÉMOC', tiempo=1300/vel)
G.add_edge('CUAUHTÉMOC', 'ALAMEDA', tiempo=1130/vel)
G.add_edge('ALAMEDA', 'FUNDADORES', tiempo=590/vel)
G.add_edge('FUNDADORES', 'PADRE MIER', tiempo=580/vel)
G.add_edge('PADRE MIER', 'GRAL. L. ZARAGOZA', tiempo=580/vel)

G.add_edge('GRAL. L. ZARAGOZA', 'SANTA LUCÍA', tiempo=1400/vel)
G.add_edge('SANTA LUCÍA', 'COL. OBRERA', tiempo=850/vel)
G.add_edge('COL. OBRERA', 'FÉLIX U. GÓMEZ', tiempo=700/vel)
G.add_edge('FÉLIX U. GÓMEZ', 'METALÚRGICOS', tiempo=750/vel)
G.add_edge('METALÚRGICOS', 'COL. MODERNA', tiempo=1330/vel)
G.add_edge('COL. MODERNA', 'RUIZ CORTINES', tiempo=600/vel)
G.add_edge('RUIZ CORTINES', 'LOS ÁNGELES', tiempo=790/vel)
G.add_edge('LOS ÁNGELES', 'HOSPITAL METROPOLITANO', tiempo=1380/vel)

#heurística
def heuristica(nodoA, nodoB):
    velocidad_promedio = 583.33 #m/min #más rápido que en la realidad para asegurarnos de que esta heurística funcione correctamente
    x1, y1 = G.nodes[nodoA]['pos']
    x2, y2 = G.nodes[nodoB]['pos']
    dist= math.hypot(x2 - x1, y2 - y1)
    tiempo= dist / velocidad_promedio
    return tiempo

def ruta (nodoA, nodoB):
    ruta = nx.astar_path(G, source=nodoA, target=nodoB, heuristic=heuristica, weight='tiempo')
    return ruta

def costo_total(nodoA, nodoB):
    costo_total = nx.astar_path_length(G, source=nodoA, target=nodoB, heuristic=heuristica, weight='tiempo')
    return costo_total