from django.shortcuts import render
from django.http import JsonResponse

def index(request):
    return render(request, "index.html")

def pong_game(request):
    return render(request, 'pong_game.html')

def bonjour_monsieur(request):
    return render(request, 'bonjour_monsieur.html')

def bonjour_madame(request):
    return render(request, 'bonjour_madame.html')


def get_page(request, page):
    if page == 'get_page/pong_game':
        return render(request, 'pong_game.html')
    elif page == 'get_page/bonjour_monsieur':
        return render(request, 'bonjour_monsieur.html')
    elif page == 'get_page/bonjour_madame':
        return render(request, 'bonjour_madame.html')