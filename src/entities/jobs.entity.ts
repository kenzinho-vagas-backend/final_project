import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Company } from './companies.entity'
import { TechJob } from './technologiesJobs.entity'
import { UserJob } from './usersJobs.entity'


@Entity('jobs')
class Job {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    wage: string

    @Column()
    modality: string

    @Column()
    jobLevel: string

    @Column()
    jobUrl: string

    @CreateDateColumn()
    createdAt: Date

    @ManyToOne(() => Company, (company) => company.job, {onDelete: 'CASCADE'})
    companies: Company

    @OneToMany(() => UserJob, (userJob) => userJob.job)
    userJob: UserJob[]

    @OneToMany(() => TechJob, (techJob) => techJob.job)
    techsJobs: TechJob[]
}

export { Job }