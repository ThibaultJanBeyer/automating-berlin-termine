let config = {
    "recieveMails": [
        "ENTER EMAIL ADDRESSES",  // <- example my@mail.com
        "OF RECIPIENTS"  // <- example my@mail.com
    ],
    "sender": {
        "host": "smtp.gmail.com",  // <- change hostname as needed
        "port": 465,  // <- change port as needed
        "mail": "ENTER EMAIL ADDRESS OF SENDER HERE TOO",  // <- example foo@bar.baz
        "passw": "ENTER PASSWORD OF SENDER MAIL HERE"  // <- example myPassword123
    },
};

export default config;
