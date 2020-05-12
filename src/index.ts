import axios from "axios";

export default async function (secret: string, token: string) {
    try {
        const response: any = await axios.post("https://hcaptcha.com/siteverify", {
            secret: secret,
            response: token
        });
        if(response.status == 200) {
            if(response.json.success == true) {
                return true;
            } else return false;
        } else return false;
    } catch(error) {
        return false;
    }
}