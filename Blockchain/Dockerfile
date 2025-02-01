# Utilise une image Node.js basée sur Debian
FROM node:18-bullseye

# Installe Ganache CLI et Truffle
RUN npm install -g ganache-cli truffle

# Création d'un utilisateur non-root
ARG USER_ID=1001
ARG GROUP_ID=1001
RUN groupadd -g ${GROUP_ID} satoshi && \
    useradd -m -u ${USER_ID} -g satoshi satoshi

# Définir le répertoire de travail
WORKDIR /home/Blockchain/

RUN truffle init

# Copier les fichiers du projet
COPY --chown=satoshi:satoshi Blockchain/smartContract/. .

RUN chown -R satoshi:satoshi /home/Blockchain

USER satoshi

# Expose le port utilisé par Ganache
EXPOSE 8545

# Lance Ganache CLI
CMD ["ganache-cli", "--host", "0.0.0.0", "--port", "8545", "--deterministic"]
