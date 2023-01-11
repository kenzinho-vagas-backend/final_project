import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { TechJob } from "./technologiesJobs.entity"


@Entity('technologies')
class Technology {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({unique: true})
    tech: string

    @OneToMany(() => TechJob, (techJob) => techJob.technology)
    techsJobs: TechJob
}

export { Technology }