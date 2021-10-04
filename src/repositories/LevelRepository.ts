import { EntityRepository, Repository } from 'typeorm';
import Level from '../models/Level';

@EntityRepository(Level)
export default class LevelRepository extends Repository<Level> {}