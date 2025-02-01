from django.urls import path
from .views import TaskListCreateView, TaskDetailView

urlpatterns = [
    # Route pour la liste et la création des tâches
    path('tasks/', TaskListCreateView.as_view(), name='task-list-create'),

    # Route pour voir, mettre à jour et supprimer une tâche spécifique
    path('tasks/<int:pk>/', TaskDetailView.as_view(), name='task-detail'),
]