<p>&nbsp;</p>
<h3 style="text-align: center;">&nbsp;Bienvenido</h3>
<p><strong>El proyecto backend esta funcionando con una base de datos en MongoDB por lo que para poder utilizarlo se recomienda descargar MongoDB Compass de aqui podemos obtener la cadena de conexion al localhost.</strong></p>
<p><img src="https://res.cloudinary.com/latamarket/image/upload/v1627735113/conexion_yyq4om.png" /></p>
<p><strong>Esta cadena de conexion se debe asignar a la variable CONNECTION en el .env del proyecto.</strong></p>
<p></p>
<ul>
<li>Para correr la prueba tecnica se necesita descargar el front-end y correr el comando yarn para recuperar los paquetes.</li>
<li>Despues se puede correr el FrontEnd directamente con el comando yarn dev.</li>
<li>Considero que el BackEnd se encuentra 100% funcional con todas las especificaciones que se entrego no obstante al FrontEnd le faltan algunas caracteristicas.</li>
<li style="color: #ff3600;"><strong>Una vez el proyecto del frontend se este ejecutando se puede visualizar el mismo desde la direccion&nbsp;<a href="http://localhost:3000/">http://localhost:3000/</a>&nbsp;al ingresar por primera vez la pagina deberia mostrarse vac&iacute;a esto es por que la base de datos aun no ha sido creada localmente, para continuar por favor cree un usuario en el apartado Iniciar secion - Registrarse en el frontend.</strong></li>
<li style="color: #ff3600;"><strong>Una vez realizado el paso anterior desde MongoDB Compass ya deberia mostrarse la base de datos como test.</strong></li>
<li style="color: #ff3600;"><strong>En esta base de datos se recomienda crear una coleccion productos e importar el archivo productos que se encuentra adjunto.</strong></li>
<li>Esto se debe a que el frontend no se encuentra completo y faltan las funciones del administrador, unicamente esta creada la pagina con la ruta protegida a la misma que se puede acceder desde el apartado Mi cuenta pero ingresando unicamente con un usuario de role administrador (debe escribirse asi exactamente).</li>
<li>Finalmente si se desea se puede probar los diferentes End-points de la API Rest desde postman tambi&eacute;n se adjuntan los mismos.</li>
</ul>
<p>Colecciones de postman:&nbsp;<a href="https://drive.google.com/file/d/1mfx7-I9XXy346uplDC1NkymGBLKP93Rm/view?usp=sharing">https://drive.google.com/file/d/1mfx7-I9XXy346uplDC1NkymGBLKP93Rm/view?usp=sharing</a></p>
<p>Tabla productos:&nbsp;<a href="https://drive.google.com/file/d/1YmPS6douK9jeZFbMoyI6kawLACTNU5Cc/view?usp=sharing">https://drive.google.com/file/d/1YmPS6douK9jeZFbMoyI6kawLACTNU5Cc/view?usp=sharing</a></p>
<h3 style="text-align: center;">Muchas gracias por su atenci&oacute;n 😁</h3>
<p><!-- Este comentario es visible solo en el editor fuente --></p>
<p></p>

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.tsx`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
