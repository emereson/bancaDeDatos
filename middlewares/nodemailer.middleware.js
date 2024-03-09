import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.HOSTEMAIL,
  port: 465, // Puerto de SMTP
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});
transporter.verify((error, success) => {
  if (error) {
    console.error('Error al conectar con el servidor de correo:', error);
  } else {
    console.log('Conexión exitosa con el servidor de correo');
  }
});

export const sendConfirmationEmail = (products, dataClient, delivery, totalPrice) => {
  const currentDate = new Date();

  const options = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  };

  const linkImg = process.env.LOGO_URL;

  const formattedDate = new Intl.DateTimeFormat('es-PE', options).format(currentDate);

  const emailBody = `
    <div style=" max-width: 600px; margin: 0 auto; padding:32px 16px; ">
        <img src="${linkImg}" alt="" style="width:200px; height: 100px; margin:auto; display: block;">
        <div style=" width:100% ; margin:16px " >
            <h2 style="text-align:center; font-size: 24px; padding: 0;  margin: 0 auto; color:rgb(104, 104, 104)">
                GRACIAS!
            </h2>
            <p
                style="text-align:center; color:rgb(104, 104, 104); font-size: 24px; font-weight: 600; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">
                El pago se realizo con exito y su pedido esta en camino</p>
        </div>
        <div
            style=" display:flex";   max-width: 650px; margin: 0 auto; padding:32px 16px; gap:48px; background-color: rgba(250, 219, 215, 0.681); border-radius: 1em;">
            <img src="${linkImg}" alt="" style="width: 100px;  display: block; margin:auto">
            <div style="width: 90%; height: 100%; ;  margin: 0 auto;">
                <h3 style="margin: 0; font-size: 18px; color:rgb(104, 104, 104) ">GRACIAS POR TU COMPRA!</h3>
                <p style="margin: 0; font-size: 16px; color:rgb(104, 104, 104) ">Toda la informacion te lo hemos enviado
                    por correo electronico</p>
                <p style="margin: 0; font-size: 16px; color:rgb(104, 104, 104) ">si el correo llego a la bandeja de SPAM
                    no
                    olvides agregar el correo info@donquezo.com a tu lista de
                    remitentes segurso</p>
            </div>
        </div>
        <img src="${linkImg}/public/logo.png" alt="" style="width: 30%; margin:auto;">
        <div style=" width: 100%;  display:block;  max-width: 650px;  padding:2em 1em; gap:2em; margin:auto; ">

            <h5 style="margin: 0; width: 100%; display: flex; padding:8px">
                <p
                    style="padding:0 0.5em; margin: 0; width: 30%; text-align: end; font-size: 1.3em; color:black; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">
                    TIENDA:</p>
                <p
                    style="margin: 0; width: 50%; text-align: start; font-size: 1.3em; color: rgb(126, 126, 126); font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">
                    Don Quezo</p>
            </h5>
            <h5 style="margin: 0; width: 100%; display: flex;  padding:8px">
                <p
                    style=" padding:0 8px; margin: 0; width: 30%; text-align: end; font-size: 18px; color:black; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">
                    WEB:</p>
                <a style="margin: 0; width: 50%; text-align: start; font-size: 1.3em; color: rgb(126, 126, 126); font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;"
                    href="">https://tiendadonquezo.com/</a>
            </h5>
            <h5 style="margin: 0; width: 100%;  display: flex;  padding:8px ">
                <p
                    style="  padding:0 0.5em; margin: 0; width: 30%; text-align: end; font-size: 1.3em; color:black; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">
                    CONTACTO:</p>
                <p
                    style="margin: 0; width: 50%; text-align: start; font-size: 1.3em; color: rgb(126, 126, 126); font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">
                    99999999</p>
            </h5>
            <hr />
            <h5 style="margin: 0; width: 100%;  display: flex;  padding:8px">
                <p
                    style="padding:0 0.5em; margin: 0; width: 30%; text-align: end; font-size: 1.3em; color:black; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">
                    CLIENTE:</p>
                <p
                    style="margin: 0; width: 50%; text-align: start; font-size: 1.3em; color: rgb(126, 126, 126); font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">
                    ${dataClient?.name}</p>
            </h5>
            <h5 style="margin: 0; width: 100%;  display: flex;  padding:8px">
                <p
                    style="  padding:0 0.5em; margin: 0; width: 30%; text-align: end; font-size: 1.3em; color:black; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">
                    NUMERO:</p>
                <p
                    style="margin: 0; width: 50%; text-align: start; font-size: 1.3em; color: rgb(126, 126, 126); font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">
                    ${dataClient.phoneNumber}</p>
            </h5>
            </h5>
            <h5 style="margin: 0; width: 100%;  display: flex;  padding:8px">
                <p
                    style="padding:0 0.5em; margin: 0; width: 30%; text-align: end; font-size: 1.3em; color:black; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">
                    DIRECCION:</p>
                <p
                    style="margin: 0; width: 50%; text-align: start; font-size: 1.3em; color: rgb(126, 126, 126); font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">
                    ${dataClient.address}</p>
            </h5>
            </h5>
            <h5 style="margin: 0; width: 100%;  display: flex;  padding:8px">
                <p
                    style="padding:0 0.5em; margin: 0; width: 30%; text-align: end; font-size: 1.3em; color:black; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">
                    REFERENCIA:</p>
                <p
                    style="margin: 0; width: 50%; text-align: start; font-size: 1.3em; color: rgb(126, 126, 126); font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">
                    ${dataClient.reference}</p>
            </h5>
            </h5>
            </h5>
            <h5 style="margin: 0; width: 100%;  display: flex;  padding:8px">
                <p
                    style="padding:0 0.5em; margin: 0; width: 30%; text-align: end; font-size: 1.3em; color:black; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">
                    MENSAJE:</p>
                <p
                    style="margin: 0; width: 50%; text-align: start; font-size: 1.3em; color: rgb(126, 126, 126); font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">
                    ${dataClient.message}</p>
            </h5>
            <h5 style="margin: 0; width: 100%;  display: flex;  padding:8px">
                <p
                    style="padding:0 0.5em; margin: 0; width: 30%; text-align: end; font-size: 1.3em; color:black; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">
                    FECHA HORA:</p>
                <p
                    style="margin: 0; width: 50%; text-align: start; font-size: 1.3em; color: rgb(126, 126, 126); font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">
                    ${formattedDate}</p>
            </h5>
            <h5 style="margin: 0; width: 100%; display: flex;  padding:8px">
                <p
                    style="padding:0 0.5em; margin: 0; width: 30%; text-align: end; font-size: 1.3em; color:black; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">
                    SU PEDIDO:</p>

                <ul
                    style="margin: 0; padding: 0; width: 50%; text-align: start; font-size: 1.3em; color: rgb(126, 126, 126); font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">
                    ${products
                      ?.map(
                        (product, index) =>
                          `

                    <li key=${index}
                        style="display: flex; gap: 0.5em; padding: 0; margin: 0; text-decoration: none ; list-style: none;">
                        <p style="margin: 0;"> ${product.counter}</p>
                        <p style="margin: 0;  padding:0 0.5em">${product.dataProduct.name}  ${
                            product.selectOption.name
                          },  ${product.selectPizza?.map((pizza) => pizza.name)},
                          ${product?.selectDrink ? `bebida:${product?.selectDrink.name}` : null},
                           ${product.selectExtra?.map((extra) => extra.name)}</p>
                    </li>
                    `
                      )
                      .join('')}
                </ul>
            </h5>
            <h5 style="margin: 0; width: 100%;  display: flex; padding:8px">
                <p
                    style="padding:0 0.5em; margin: 0; width: 30%; text-align: end; font-size: 1.3em; color:black; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">
                    DELIVERY:</p>
                <p
                    style="margin: 0; width: 50%; text-align: start; font-size: 1.3em; color: rgb(126, 126, 126); font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">
                    s./ ${delivery.price}</p>
            </h5>

            <h5 style="margin: 0; width: 100%;  display: flex;  padding:8px">
                <p
                    style="padding:0 0.5em; margin: 0; width: 30%; text-align: end; font-size: 1.3em; color:black; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">
                    TOTAL:</p>
                <p
                    style="margin: 0; width: 50%; text-align: start; font-size: 1.3em; color: rgb(126, 126, 126); font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">
                    s./ ${totalPrice}</p>
            </h5>
        </div>
    </div>

`;

  const mailOptions = {
    from: process.env.EMAIL,
    to: dataClient?.email,
    subject: 'Confirmación de compra',
    html: emailBody,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(`Error al enviar el correo electrónico: `, error);
    } else {
      console.log(`Correo electrónico enviado: ${data.email}`);
    }
  });
};
