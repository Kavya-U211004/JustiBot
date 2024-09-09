const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'Gmail', // or any email service you prefer
    auth: {
        user: "kavya.umakav@gmail.com",
        pass: "zdgw qgtk efzz fcnq"
    }
});

exports.sendFeedback = (req, res) => {
    const { email, feedback } = req.body;

    const mailOptions = {
        from: email,
        to: "kavya.umakav@gmail.com",
        subject: 'User Feedback',
        text: `Feedback from ${email}: \n\n${feedback}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error); 
            return res.status(500).json({ message: 'Failed to send feedback' });
        }
        res.status(200).json({ message: 'Feedback sent successfully' });
    });
};
