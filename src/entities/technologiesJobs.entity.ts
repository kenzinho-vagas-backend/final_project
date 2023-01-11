import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Job } from "./jobs.entity"
import { Technology } from "./technologies.entity"


@Entity('techsJobs')
class TechJob {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @ManyToOne (() => Technology, (technology) => technology.techsJobs)
    technology: Technology

    @ManyToOne (() => Job, (job) => job.techsJobs)
    job: Job
}

export { TechJob }