const Nexmo = require("nexmo");
const nexmoConfig = require("./nexmo.json");
const path = require("path");
const { read } = require("fs");

nexmoConfig.privateKey = path.join(__dirname, "private.key");

const nexmo = new Nexmo(nexmoConfig);

function send(otp, phoneNO) {
    const message = `Insert the following code: ${otp.code}`;
    console.log(message);
    console.log(phoneNO);
    nexmo.dispatch.create(
        "failover", [{
                from: { type: "sms", number: "918545024928" },
                to: { type: "sms", number: phoneNO },
                message: {
                    content: {
                        type: "text",
                        text: message,
                    },
                },
                failover: {
                    expiry_time: 200,
                    condition_status: "read",
                },
            },
            {
                from: { type: "sms", number: "918545024928" },
                to: { type: "sms", number: phoneNO },
                message: {
                    content: {
                        type: "text",
                        text: message,
                    },
                },
            },
        ],
        (err, data) => {
            if (err) {
                console.error("hello", JSON.stringify(err.body.invalid_parameters));

            } else {
                console.log("hello2", data);
            }
        }
    );
}

module.exports = {
    send,
};