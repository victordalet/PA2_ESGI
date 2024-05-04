import {Job} from "../../core/job";
import {JobRepository} from "./job.repository";

export class JobService {

    jobRepository: JobRepository;

    constructor() {
        this.jobRepository = new JobRepository();
    }

    async getJob() {
        return await this.jobRepository.getJob();
    }

    async postJob(body: Job) {
        return await this.jobRepository.addJob(body.name);
    }
}