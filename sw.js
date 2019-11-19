//Création du service worker, permettant la mise en cache de nos fichier et donc l'accès à l'application hors ligne
//Implémentation de la bibliothèque de service workbox
importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.0.0/workbox-sw.js");

//Vérifié la bonne implémentation
if (workbox) {
    console.log("Yay! Workbox is loaded !");
    //fonction lançant le caching des fichiers
    workbox.precaching.precacheAndRoute([]);

    /*  Mise en cache de fichier png, gif et jpg et édition du fichier sw-config.js 
    */
    workbox.routing.registerRoute(nb), (
        //sélectionne le type de fichier à mettre en cache
        /(.*)others(.*)\.(?:png|gif|jpg)/,
        //créer une variable contenant les fichiers mise en cache
        //CacheFirst --> stratégie de cache : si un cache existe alors chargé le cache sans utilisié le réseaux
        new workbox.strategies.CacheFirst({
            cacheName: "images", //nom du cache
            plugins: [
                //gérer le nombre et l'age maximum des éléments dans le cache
                new workbox.expiration.Plugin({
                    maxEntries: 50,
                    maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
                })
            ]
        })
    );
    /* Mise en cache des fichier JS et css et être sur de leurs mise à jours pour les prochaines utilisations. 
    */
    workbox.routing.registerRoute(
        //sélectionne le type de fichier à mettre en cache
        /.*\.(?:css|js|scss|)/,
        //StaleWhileRevalidate --> stratégie de cache qui permet de répondre à la demande le plus rapidement avec une réponse en cache
        // Si pas de réponse : requête réseau pour maj du cache 
        new workbox.strategies.StaleWhileRevalidate({
            // Indiquer le cache utiliser par la fonction
            cacheName: "assets",
        })
    );

    // Mise en cache des polices
    workbox.routing.registerRoute(
        new RegExp("https://fonts.(?:googleapis|gstatic).com/(.*)"),
        //CacheFirst --> stratégie de cache : si un cache existe alors chargé le cache sans utilisié le réseaux
        new workbox.strategies.CacheFirst({
            // Indiquer le cache utiliser par la fonction
            cacheName: "google-fonts",
            plugins: [
                //Choisir les demandes de caches répondant aux statuts préciser)
                new workbox.cacheableResponse.Plugin({
                    statuses: [0, 200],
                }),
            ],
        })
    );

    //Permet au service worker de mettre à jours les fichier caches sans tenir compte du cycle de vie
    // Habituelle d'un service worker
    workbox.core.skipWaiting();
    workbox.core.clientsClaim();

    // Si ça ne marche pas :
} else {
    console.log("ça marche pas");
}
