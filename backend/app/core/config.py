from pydantic_settings import BaseSettings, SettingsConfigDict

class DatabaseSettings(BaseSettings):
    DB_HOST: str
    DB_PORT: int
    DB_USER: str
    DB_PASSWORD: str
    DB_NAME: str

    @property
    def DATABASE_URL(self):
        return f'postgresql+asyncpg://{self.DB_USER}:{self.DB_PASSWORD}@{self.DB_HOST}:{self.DB_PORT}/{self.DB_NAME}'

    model_config = SettingsConfigDict(env_file='app/.env.db', env_file_encoding='utf-8')


class JsonWebTokenSettings(BaseSettings):
    SECRET_KEY: str
    ALGORITHM: str

    model_config = SettingsConfigDict(env_file='app/.env.jwt', env_file_encoding='utf-8')


database_settings = DatabaseSettings()
jwt_settings = JsonWebTokenSettings()


print("Database settings loaded:", database_settings.model_dump())
print("JWT settings loaded:", jwt_settings.model_dump())
