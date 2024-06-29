from django.shortcuts import render
from django.http import JsonResponse
import psycopg2
from psycopg2 import Error

user = "postgres"
password = "postgres"
dbname = "modis"

def index(request):
	return render(request, 'modis/index.html')

def getDataChart1(request):
	connection = psycopg2.connect(user = user, password = password, host = "127.0.0.1", port = "5432", dbname = dbname)
	query =  "SELECT month_name, SUM(percentage)/count(percentage) AS average FROM stats_day GROUP BY month_name"
	cursor = connection.cursor()
	cursor.execute(query)
	data = cursor.fetchall()
	connection.commit()

	# context = {'data': data}
	# return render(request, 'modis/index.html', context)
	return JsonResponse({'data': data})

def getDataChart2(request):
	connection = psycopg2.connect(user = user, password = password, host = "127.0.0.1", port = "5432", dbname = dbname)
	query =  "SELECT * FROM stats_day order by datenumber asc"
	cursor = connection.cursor()
	cursor.execute(query)
	data = cursor.fetchall()
	connection.commit()

	return JsonResponse({'data': data})

def map(request):
	return render(request, 'modis/map.html')

def getData(request):

	limit = request.GET.get('limit', '1')
	datenumber = request.GET.get('datenumber', '1')

	connection = psycopg2.connect(user = user, password = password, host = "127.0.0.1", port = "5432", dbname = dbname)
	query =  "SELECT datenumber, latitude, longitude from modis_data_py_clouds WHERE datenumber = "+datenumber+" LIMIT "+limit
	cursor = connection.cursor()
	cursor.execute(query)
	data = cursor.fetchall()
	connection.commit()
	return JsonResponse({'data':data})