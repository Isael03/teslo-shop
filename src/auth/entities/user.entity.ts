import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../../products/entities';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class User {

  @ApiProperty({
    description: 'User id',
    nullable: false,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'User email',
    nullable: false,
  })
  @Column('text', { unique: true })
  email: string;

  @ApiProperty({
    description: 'User password',
    nullable: false,
  })
  @Column('text', { select: false })
  password: string;

  @ApiProperty({
    description: 'User fullname',
    nullable: false,
  })
  @Column('text')
  fullname: string;

  @ApiProperty({
    description: 'is user active?',
    nullable: true,
  })
  @Column('bool', { default: true })
  isActive: boolean;

  @ApiProperty({
    description: 'User roles',
    nullable: false,
  })
  @Column('text', { array: true, default: ['user'] })
  roles: string[];

  @OneToMany(() => Product, product => product.user)
  product: Product[];

  @BeforeInsert()
  checkFieldsBeforeInsert() {
    this.email = this.email.toLowerCase().trim();
  }

  @BeforeUpdate()
  checkFieldsBeforeUpdate() {
    this.checkFieldsBeforeInsert();
  }
}
