import { EntityRepository, Repository } from 'typeorm';
import Level from '../models/Level';

@EntityRepository(Level)
export class levelRepository extends Repository<Level> {}