from django.http import HttpResponse
from django.shortcuts import render

def game(request):
	return render(request, 'game/test.html')