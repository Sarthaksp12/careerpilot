from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    APP_NAME: str = "CareerPilot AI"
    ENVIRONMENT: str = "development"

    POSTGRES_USER: str = "careerpilot"
    POSTGRES_PASSWORD: str = "careerpilot_pass"
    POSTGRES_DB: str = "careerpilot_db"
    POSTGRES_HOST: str = "localhost"
    POSTGRES_PORT: int = 5432

    model_config = SettingsConfigDict(
        env_file=".env",
        extra="ignore"
    )

    @property
    def database_url(self) -> str:
        host = self.POSTGRES_HOST
        if not host or host == "localhost":
            host = "127.0.0.1"
        return f"postgresql://{self.POSTGRES_USER}:{self.POSTGRES_PASSWORD}@{host}:{self.POSTGRES_PORT}/{self.POSTGRES_DB}"


settings = Settings()