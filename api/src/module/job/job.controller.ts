import {Body, Controller, Get, Post} from "@nestjs/common";
import {ApiOkResponse, ApiOperation, ApiTags} from "@nestjs/swagger";
import {Job} from "../../core/job";
import {JobService} from "./job.service";

@Controller({path: 'job'})
@ApiTags('Job')
export class JobController {

    private jobService: JobService;

    constructor() {
        this.jobService = new JobService();
    }

    @Get()
    @ApiOperation({summary: 'Get job '})
    @ApiOkResponse({description: 'Job '})
    async getJob() {
        return this.jobService.getJob();
    }

    @Post()
    @ApiOperation({summary: 'Post job by name'})
    async postJob(@Body() body: Job) {
        return this.jobService.postJob(body);
    }


}