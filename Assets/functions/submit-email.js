// submit-email.js
const fetch = require("node-fetch");

exports.handler = async (event, context) => {
    const { email } = JSON.parse(event.body);

    // Validate the email address
    if (!isValidEmail(email)) {
        return {
            statusCode: 300,
            body: JSON.stringify({ error: "Invalid email address" })
        };
    }

    // Send the email to Pageclip
    try {
        const pageclipResponse = await fetch("https://send.pageclip.co/Ssw0iKtDIUYfqQAFLTPHkdVxD0kqVB8p/f", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email })
        });

        if (!pageclipResponse.ok) {
            throw new Error("Failed to send email to Pageclip");
        }
    } catch (error) {
        console.error("Error sending email to Pageclip:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to send email to Pageclip" })
        };
    }

    // Redirect to the desired URL
    return {
        statusCode: 302,
        headers: {
            Location: `https://example.com/offer-page?email=${encodeURIComponent(email)}`
        }
    };
};

function isValidEmail(email) {
    // Add your email validation logic here
    // This is a simple example, you can use a library like validator.js for more robust validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
