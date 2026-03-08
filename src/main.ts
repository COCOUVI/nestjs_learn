import { NestFactory } from '@nestjs/core';
import 'dotenv/config'
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { from } from 'rxjs';
import { doubleCsrf } from 'csrf-csrf';
import helmet from 'helmet';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: ['*'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    preflightContinue: false,
    optionsSuccessStatus: 204,
    allowedHeaders: ['Content-Type', 'Authorization'],//authoriser les headers dans les requetes entrantes
    exposedHeaders: ['Content-Range', 'X-Content-Range'],
    credentials: true

  })
  // Configuration du middleware CSRF (double protection contre les attaques Cross-Site Request Forgery)
  const {
    generateToken, // Fonction pour générer un token CSRF unique
    doubleCsrfProtection // Middleware à utiliser pour protéger les routes
  } = doubleCsrf({
    // Fonction pour récupérer le secret utilisé pour signer les tokens CSRF
    getSecret: () => process.env.CSRF_SECRET as string,

    // Nom du cookie qui stocke le token CSRF
    cookieName: "csrf-token",

    // Options du cookie :
    // httpOnly : le cookie n'est pas accessible en JS côté client
    // sameSite : strict, le cookie n'est envoyé que pour les requêtes du même site
    // secure : le cookie n'est envoyé que en HTTPS en production
    cookieOptions: {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production"
    },

    // Taille du token CSRF généré
    size: 64,

    // Méthodes HTTP ignorées par la protection CSRF (pas besoin de token pour GET, HEAD, OPTIONS)
    ignoredMethods: ["GET", "HEAD", "OPTIONS"],

    // Fonction pour récupérer le token CSRF depuis l'en-tête de la requête
    getCsrfTokenFromRequest: (req) => req.headers["x-csrf-token"],
    // Fonction pour récupérer l'identifiant de session (utilisé pour lier le token à une session)
    getSessionIdentifier: (req: any) => req.session.id as string,
  });
  app.use(doubleCsrfProtection);
  // Helmet ajoute des en-têtes de sécurité pour protéger l'application contre diverses attaques.
  // Voici quelques options courantes :
  // - contentSecurityPolicy : protège contre les attaques XSS en définissant une politique de sécurité du contenu.
  // - crossOriginEmbedderPolicy : contrôle l'accès aux ressources embarquées.
  // - crossOriginOpenerPolicy : protège contre certains types d'attaques cross-origin.
  // - crossOriginResourcePolicy : limite le partage de ressources entre origines.
  // - dnsPrefetchControl : contrôle la pré-résolution DNS.
  // - expectCt : contrôle la transparence des certificats.
  // - frameguard : empêche l'affichage du site dans un iframe.
  // - hidePoweredBy : masque l'en-tête X-Powered-By.
  // - hsts : force l'utilisation du HTTPS.
  // - ieNoOpen : ajoute X-Download-Options pour empêcher l'ouverture automatique de fichiers téléchargés.
  // - noSniff : empêche le navigateur de deviner le type de contenu.
  // - originAgentCluster : isole les agents d'origine.
  // - permittedCrossDomainPolicies : contrôle les politiques cross-domain pour Flash.
  // - referrerPolicy : définit la politique de référent.
  // - xssFilter : active la protection XSS du navigateur.
  // Dans ta configuration, xDownloadOptions est désactivé (false), donc l'en-tête X-Download-Options ne sera pas ajouté.
  app.use(helmet());
  app.set('trust proxy ','loopback') ///RECUPERATION DE l'ip
  await app.listen(process.env.PORT ?? 3000);
  
}
bootstrap();
