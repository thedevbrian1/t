import mailchimp from "@mailchimp/mailchimp_marketing";
import { createHash } from "node:crypto";

mailchimp.setConfig({
    apiKey: process.env.MAILCHIMP_API_KEY,
    server: process.env.MAILCHIMP_SERVER_PREFIX
});

export async function subscribe(name, email) {

    function generateMD5(input) {
        return createHash('md5').update(input).digest('hex');
    }

    let subscriberHash = generateMD5(email.toLowerCase());

    let nameArray = name.split(' ');

    let res = await mailchimp.lists.setListMember(process.env.MAILCHIMP_AUDIENCE_ID, subscriberHash, {
        email_address: email,
        status_if_new: 'subscribed',
        merge_fields: {
            FNAME: nameArray[0],
            ...(nameArray[1] && { LNAME: nameArray[1] })
        }
    });

    return res;
}