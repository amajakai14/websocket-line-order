import { dataSourceConfig } from './typeorm.config';
import { DataSource } from 'typeorm';
const datasource = new DataSource(dataSourceConfig());
export default datasource;
