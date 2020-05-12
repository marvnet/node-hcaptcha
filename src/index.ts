import https from "https";
import querystring from "querystring";

const host: string = "hcaptcha.com";
const path: string = "/siteverify";

// verifies the given token by doing an HTTP POST request
// to the hcaptcha.com/siteverify endpoint by passing the
// hCaptcha secret key and token as the payload.
export default (secret: string, token: string) => {
    return new Promise(function verifyPromise(resolve, reject) {
        // stringify the payload
        const data: string = querystring.stringify({secret, response: token});

        // set up options for the request
        // note that we're using form data here instead of sending JSON
        const options: any = {
            host,
            path,
            method: 'POST',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'content-length': Buffer.byteLength(data),
            },
        };

        // make the request, add response chunks to buffer, and finally resolve
        // with the response. if any errors arise call the promise's reject
        // function with the error.
        const request: any = https.request(options, (response) => {
            response.setEncoding('utf8');

           let buffer: string = '';

            response
                .on('error', reject)
                .on('data', (chunk) => buffer += chunk)
                .on('end', () => resolve(JSON.parse(buffer)))
        });

        request.on('error', reject);
        request.write(data);
        request.end();
    });
};
