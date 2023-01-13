import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Job } from "./jobs.entity"
import { User } from "./users.entity"

@Entity('usersJobs')
class UserJob {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @ManyToOne(() => User, (user) => user.userJob)
    user: User

    @ManyToOne(() => Job, (job) => job.userJob , {onDelete: 'SET NULL', eager: true})
    job: Job
}

export { UserJob }