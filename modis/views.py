from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from django.template import loader
import psycopg2
from psycopg2 import Error
import json

def index(request):
	return HttpResponse("index")

def map(request):
	data = "map"
	context = {'data': data}
	return render(request, 'modis/index.html', context)

def getData(request):

	user = "postgres"
	password = "postgres"
	dbname = "modis"

	# sample URL with datenumber and limit as params
	# http://127.0.0.1:7000/modis/getData?datenumber=5&limit=5

	limit = request.GET.get('limit', '1')
	datenumber = request.GET.get('datenumber', '1')

	connection = psycopg2.connect(user = user, password = password, host = "127.0.0.1", port = "5432", dbname = dbname)
	query =  "SELECT datenumber, latitude, longitude from modis_data_py_clouds WHERE datenumber = "+datenumber+" LIMIT "+limit
	cursor = connection.cursor()
	cursor.execute(query)
	data = cursor.fetchall();
	connection.commit()
	return JsonResponse({'data':data})