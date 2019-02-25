from django.urls import path

from django.conf.urls import url, include
from modis import views

from . import views

app_name = 'modis'
urlpatterns = [
	path('', views.index, name='index'),
	path('map', views.map, name='map'),
	path('getData', views.getData, name='getData'),
	path('getDataChart1', views.getDataChart1, name='getDataChart1'),
	path('getDataChart2', views.getDataChart2, name='getDataChart2'),
]