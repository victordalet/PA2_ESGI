export class AcceptModel {

    public fetchEmails = async (): Promise<string[]> => {
        const apiPath = process.env.API_HOST || "https://apipcs.c2smr.fr";
        const response = await fetch(apiPath + "/user/get-request-bail", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: localStorage.getItem("token") || "",
            },
        });
        const data = await response.json();
        return data.map((el: any) => el.email + " | " + el.rules.split('-')[1]);
    };

    public acceptEmail = async (email: string) => {
        const apiPath = process.env.API_HOST || "https://apipcs.c2smr.fr";
        await fetch(apiPath + "/user/accept-request-bail", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: localStorage.getItem("token") || "",
            },
            body: JSON.stringify({
                email: email,
            }),
        });
        document.location.reload();
    };

}
