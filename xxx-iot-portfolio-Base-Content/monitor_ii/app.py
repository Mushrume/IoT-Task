import random
import logging

from sqlalchemy.sql.expression import select
import current as current
import self as self

from flask import Flask, render_template, jsonify
from db import CPU, Storage, EnvironmentTPH, Base
from flask_cors import CORS

from sqlalchemy import create_engine, select
from sqlalchemy.orm import sessionmaker

db_filename = './data/monitor_data.db'

app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

engine = create_engine(f'sqlite:///{db_filename}')
session = sessionmaker()
session.configure(bind=engine)
Base.metadata.create_all(engine)


def set_status(status):
    if status is True:
        return 'Running', 'fa fa-smile', 'bg-success'
    elif status is False:
        return 'Stopped', 'fas fa-angry', 'bg-danger'
    else:
        return 'Unknown', 'fas fa-sad-tear', 'bg-dark'


@app.route('/')
def index():
    # check to see if cpu-monitor is running
    monitor_cpu = True
    # check to see if storage monitor is running
    monitor_storage = False
    # check to see if environmental monitor is running
    monitor_enviro = None

    # set up component dictionaries and set values
    cpu = {}
    cpu['name'], cpu['icon'] = 'CPU', 'fa-microchip',
    cpu['message'], cpu['emoticon'], cpu['class'] = set_status(monitor_cpu)

    storage = {}
    storage['name'], storage['icon'] = 'Storage', 'fa-hdd'
    storage['message'], storage['emoticon'], storage['class'] = set_status(
        monitor_storage)

    enviro = {}
    enviro['name'], enviro['icon'] = 'Enviro', 'fa-leaf'
    enviro['message'], enviro['emoticon'], enviro['class'] = set_status(
        monitor_enviro)

    statuses = [cpu, storage, enviro]
    return render_template('chart-cpu.html', statuses=statuses)

@app.route('/api/device_load')
def device_load_latest():
    return device_load(1)


@app.route('/api/device-load/<qty>')
def device_load(qty=1):
    try:
        qty = abs(int(qty))
    except:
        qty = 1
    active_session = session()
    cpu = active_session.query(CPU).order_by(CPU.created_at.desc()).first()
    data = {cpu.id:{
        'created_at':cpu.created_at,
        'host_mac':cpu.host_mac,
        'cpu_temp':cpu.cpu_temp,
        'gpu_temp':cpu.gpu_temp,
        'host_name':cpu.host_name,
        'id':cpu.id,
        'load':cpu.load,
        'serial':cpu.serial,
    }}
    return jsonify(data)


@app.route('/api/environment')
def get_api_environment():
    current_enviro = get_api_temperature(), get_api_pressure(), get_api_humidity()

    return {"Environment":current_enviro}


@app.route('/api/temperature')
def get_api_temperature():
    current_temp = EnvironmentTPH().temperature
    return {"Temperature":current_temp}


@app.route('/api/pressure')
def get_api_pressure():
    current_pressure = EnvironmentTPH().pressure
    return {"Pressure":current_pressure}


@app.route('/api/humidity')
def get_api_humidity():
    current_humidity = EnvironmentTPH().humidity
    return {"Humidity":current_humidity}


@app.route('/api/history')
def temp_history():
    @app.route('/api/ticker')
    def something():
        x = 0
        for num in range(1):
            r = random.randint(0, 50)
            x = r

        return{'History':x}
    return render_template('Historical_page.html')


@app.route('/about')
def demo_template():
    return render_template('about.html')


if __name__ == '__main__':
    app.run()