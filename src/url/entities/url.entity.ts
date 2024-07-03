import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('url')
class UrlEntity {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column({ type: 'varchar', length: 5, nullable: false, unique: true })
  short_url: string;

  @Column({ type: 'text', nullable: false })
  full_url: string;

  @Column({ type: 'timestamp', default: new Date() })
  created_on: Date;

  @Column({ type: 'timestamp', nullable: true })
  updated_on: Date;
}

export default UrlEntity;
