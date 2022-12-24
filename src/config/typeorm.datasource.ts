import { DataSource } from 'typeorm';
import { dataSourceConfig } from './typeorm.config';

export const dataSource = new DataSource(dataSourceConfig());
