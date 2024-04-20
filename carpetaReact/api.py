from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

uri = "mongodb+srv://oswalralo03:1135792wal@hackaton.1tgjkg7.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(uri, server_api=ServerApi('1'))
try:
    client.admin.command('ping')
except Exception as e:
    print(e)

db = client['Seagates']

def get_mensajes():
    mensaje_collection = db['Mensajes']
    mensajes = mensaje_collection.find()
    return list(mensajes)

def agregar_mensaje(usuario_remitente, mensajero, mensaje):
    mensaje_collection = db['Mensajes']
    nuevo_mensaje = {
        "UsuarioRemitente": usuario_remitente,
        "Mensajero": mensajero,
        "Mensaje": mensaje
    }
    resultado = mensaje_collection.insert_one(nuevo_mensaje)
    return resultado.inserted_id

def get_puertos():
    puertos_collection = db['Puertos']
    puertos = puertos_collection.find()
    return list(puertos)

def get_usuarios():
    usuario_collection = db['Usuarios']
    usuarios = usuario_collection.find()
    return list(usuarios)


if __name__ == "__main__":
    mensajes = get_mensajes()
    print("Mensajes:", mensajes)

    puertos = get_puertos()
    print("Puertos:", puertos)

    usuarios = get_usuarios()
    print("Usuarios:", usuarios)