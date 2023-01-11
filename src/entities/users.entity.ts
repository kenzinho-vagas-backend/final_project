import {hashSync} from 'bcryptjs'
import { BeforeInsert, BeforeRemove, BeforeUpdate, Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Company } from './companies.entity'
import { UserJob } from './usersJobs.entity'

@Entity('users')
class User {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column({unique: true})
    email: string

    @Column()
    password: string

    @Column()
    isAdm: boolean

    @Column({default: true})
    isActive: boolean

    @Column()
    linkedin: string

    @Column({nullable: true})
    bio?: string

    @Column()
    specialty: string

    @Column()
    jobLevel: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @DeleteDateColumn()
    deletedAt: Date

    @BeforeRemove()
    isActiveChanged() {
        this.isActive = false
    }

    @BeforeUpdate()
    @BeforeInsert()
    hashPassword() {
        this.password = hashSync(this.password, 10)
    }

    @OneToMany(() => Company, (company) => company.user)
    companies: Company[]

    @OneToMany(() => UserJob, (userJob) => userJob.user)
    userJob: UserJob[]
}

export { User }