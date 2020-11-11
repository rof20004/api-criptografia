import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import LocalCrypto from '../../utils/crypto';

@Entity()
export class Purchase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userDocument: string;

  @Column()
  creditCardToken: string;

  @Column()
  value: number;

  @BeforeInsert()
  @BeforeUpdate()
  async encrypt () {
    this.userDocument = await LocalCrypto.encrypt(this.userDocument);
    this.creditCardToken = await LocalCrypto.encrypt(this.creditCardToken);
  }
}
