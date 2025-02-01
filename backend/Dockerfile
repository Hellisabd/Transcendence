# Utiliser une image Python comme base
FROM python:3.9-slim

# Créer un utilisateur non-root avec un UID et un GID spécifiques
ARG USER_ID=1000
ARG GROUP_ID=1000
RUN groupadd -g ${GROUP_ID} django && \
    useradd -m -u ${USER_ID} -g django django

# Installer les dépendances système nécessaires
RUN apt-get update && apt-get install -y \
    gcc \
    libpq-dev \
    build-essential \
    curl \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

RUN pip install djangorestframework
RUN pip install web3

# Définir le répertoire de travail (pas de `chown` ici)
WORKDIR /home/django/app

# Copier les fichiers en tant que l'utilisateur courant du conteneur
COPY --chown=django:django backend/app/. .
RUN chown -R django:django /home/django/app

# Passer à l'utilisateur non-root pour installer les dépendances
USER django
RUN pip install --no-cache-dir -r requirements.txt

# Copier le reste du projet
COPY --chown=django:django . .


# Exposer le port utilisé par Django
EXPOSE 8000

# Commande par défaut pour exécuter le serveur Django
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
