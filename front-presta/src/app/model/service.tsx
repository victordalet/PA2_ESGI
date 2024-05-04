import {Service} from "../@types/service";

export class ServiceModel {


    public getPictureBackground = async () => {
        const job = (document.getElementById("job") as HTMLSelectElement).value;
        const apiPath = process.env.API_HOST || 'http://localhost:3001';
        const res = await fetch(`${apiPath}/picture/${job}-1`, {
            headers: {
                'authorization': localStorage.getItem('token') || ''
            }
        });
        const data = await res.json();
        const imgBase64 = `data:image/png;base64,${data.base64}`;
        const background = document.querySelector('.container-service') as HTMLElement;
        background.style.backgroundImage = `url(${imgBase64})`;
    };


    public formatSchedule = () => {
        const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        const schedule: any = {};
        days.forEach(day => {
            const start = (document.getElementById(`start-${day}`) as HTMLInputElement).value;
            const end = (document.getElementById(`end-${day}`) as HTMLInputElement).value;
            schedule[day] = {
                start: start,
                end: end
            };
        });
        return schedule;
    };

    public createService = async (dataToSend: Service) => {
        const apiPath = process.env.API_HOST || 'http://localhost:3001';
        await fetch(apiPath + '/service', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'authorization': localStorage.getItem('token') || ''
            },
            body: JSON.stringify(dataToSend)
        });
        document.location.href = '/resources';
    };


    public async getJobs() {
        const apiPath = process.env.API_HOST || 'http://localhost:3001';
        const res = await fetch(apiPath + '/job', {
            headers: {
                'authorization': localStorage.getItem('token') || ''
            }
        });
        return await res.json();
    }


}
