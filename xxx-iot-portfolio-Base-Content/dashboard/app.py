import random
import logging

from sqlalchemy.sql.expression import select
# import current as current
# import self as self

from flask import Flask, render_template

from flask_cors import CORS
from sqlalchemy import create_engine,select
from sqlalchemy.orm import sessionmaker



db_filename = './data/monitor_data.db'

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

# def index():
#     return render_template('index.html')
# @app.route('./api/device_load')

# @app.route('./api/environment')
# def get_api_environment():
#     current_enviro = get_api_temperature(),get_api_pressure(),get_api_humidity()

#     return {"Environment":current_enviro}

# @app.route('./api/tempurature')
# def get_api_temperature():
#     current_temp = EnvironmentTPH().temperature
#     return {"Tempurature":current_temp}

# @app.route('./api/pressure')
# def get_api_pressure():
#     current_pressure = EnvironmentTPH().pressure
#     return {"Tempurature":current_pressure}
    
# @app.route('./api/humidity')
# def get_api_humidity():
#     current_humidity = EnvironmentTPH().humidity
#     return {"Tempurature":current_humidity}

# @app.route('/api/history')
# def temp_history():
#     @app.route('/api/ticker')
#     def something():
#         x = 0
#         for num in range(1):
#             r = random.randint(0, 50)
#             x = r

#         return{'History':x}
#     return render_template('Historical_page.html') 

@app.route('/about')
def about():
    return render_template('about.html')


@app.route('/cpu')
def chart_cpu():
    return render_template('chart-cpu.html')


if __name__ == '__main__':
    app.run(port=5555)
# host="0.0.0.0",port=int("80"),debug=True