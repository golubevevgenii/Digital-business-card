import { Column, Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity({ name: 'profile_info' })
export class ProfileInfoEntity {
  @PrimaryColumn({ type: 'varchar', length: 64 })
  id!: string;

  @Column({ type: 'varchar', length: 120 })
  first_name!: string;

  @Column({ type: 'varchar', length: 120 })
  last_name!: string;

  @Column({ type: 'integer', nullable: true })
  birth_year!: number | null;

  @Column({ type: 'varchar', length: 32, nullable: true })
  phone!: string | null;

  @Column({ type: 'varchar', length: 254 })
  email!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  telegram_url!: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  location!: string | null;
}

@Entity({ name: 'education' })
export class EducationEntity {
  @PrimaryColumn({ type: 'varchar', length: 64 })
  id!: string;

  @Column({ type: 'varchar', length: 255 })
  user_id!: string;

  @ManyToOne(() => ProfileInfoEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  profile!: ProfileInfoEntity;

  @Column({ type: 'varchar', length: 255 })
  university!: string;


  @Column({ type: 'integer', nullable: true })
  start_year!: number | null;

  @Column({ type: 'integer', nullable: true })
  end_year!: number | null;

  @Column({ type: 'varchar', length: 120, nullable: true })
  degree!: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  field_of_study!: string | null;
}

@Entity({ name: 'experience' })
export class ExperienceEntity {
  @PrimaryColumn({ type: 'varchar', length: 64 })
  id!: string;

  @Column({ type: 'varchar', length: 255 })
  user_id!: string;

  @ManyToOne(() => ProfileInfoEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  profile!: ProfileInfoEntity;

  @Column({ type: 'varchar', length: 255 })
  company_name!: string;

  @Column({ type: 'integer', nullable: true })
  start_year!: number | null;

  @Column({ type: 'integer', nullable: true })
  end_year!: number | null;

  @Column('text', { array: true, default: '{}' })
  achievements!: string[];
}

@Entity({ name: 'skills' })
export class SkillEntity {
  @PrimaryColumn({ type: 'varchar', length: 64 })
  id!: string;

  @Column({ type: 'varchar', length: 120 })
  name!: string;

  @Column({ type: 'varchar', length: 255 })
  user_id!: string;

  @ManyToOne(() => ProfileInfoEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  profile!: ProfileInfoEntity;
}
