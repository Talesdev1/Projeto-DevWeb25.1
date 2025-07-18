import { QueryTypes, Sequelize } from "sequelize";
import sequelize from "../config/database";

type PgSetting = { name: string; setting: string };

async function status(): Promise<object> {
  const updatedAt = new Date().toISOString();
  const resultados = await sequelize.query<PgSetting[]>(
    "SELECT * FROM pg_settings where name = 'server_version' or name='max_connections';",
    { type: QueryTypes.SELECT }
  );
  const max_connections = resultados
    .filter((line: PgSetting) => line.name == "max_connections")
    .map((line: PgSetting) => line.setting)[0];
  const server_version = resultados
    .filter((line: PgSetting) => line.name == "server_version")
    .map((line: PgSetting) => line.setting)[0];

  const databaseName = process.env.POSTGRES_DB;
  const [resultados2] = await sequelize.query<any>(
    "SELECT COUNT(*)::int FROM pg_stat_activity WHERE datname = ?;",
    { replacements: [databaseName], type: QueryTypes.SELECT }
  );

  return {
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: server_version,
        max_connections: parseInt(max_connections),
        opened_connections: resultados2.count,
      },
    },
  };
}

export default status;
