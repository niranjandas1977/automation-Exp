
"use strict";

const envDetails = {
    get_client_detail: (clientName) => {
        let key_val;
        switch (clientName) {
            case 'clientName1':
                key_val = {
                    url : 'https://xxxxxxxxxx',
                    user1 : "xxxxxxx",
                    user2 : "xxxxxxxx",
                    pass : "xxxxxxx"
                }
                break;
            case 'clientName2':
                key_val = {
                    url : 'https://xxxxxxxxxx',
                    user1 : "xxxxxxx",
                    user2 : "xxxxxxxx",
                    pass : "xxxxxxx"
                }
                break; 
            default:
                console.log("You are searching a wrong environment details.");
                throw new Error("You are searching a wrong environment details.");       
            }
            return key_val;
        },
    };
    module.exports = envDetails;
