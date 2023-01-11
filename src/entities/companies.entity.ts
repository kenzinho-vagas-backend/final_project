import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { Job } from "./jobs.entity";
import { User } from "./users.entity";

@Entity("companies")
class Company {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  companyName: string;

  @ManyToOne(() => User, (user) => user.companies)
  user: User;

  @OneToMany(() => Job, (job) => job.companies)
  job: Job[];
}

export { Company };
