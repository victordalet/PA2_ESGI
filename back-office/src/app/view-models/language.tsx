export default class LanguageViewModel {

    public downloadCSVFIle = async () => {
        const csv = process.env.PUBLIC_URL + "/en-fr.csv";
        const blob = await fetch(csv).then((r) => r.blob());
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = "example.csv";
        link.click();
    };

}