export const getSafeEnvVar = ({
  key,
  defaultValue,
  required = true,
}: {
  key: string;
  defaultValue?: string;
  required?: boolean;
}): string => {
  const value = import.meta.env[key];

  if (value !== undefined && value !== null && value !== "") {
    return value;
  }

  if (defaultValue) {
    console.warn(
      `Environment variable '${key}' is not set, using default value: ${defaultValue}`,
    );
    return defaultValue;
  }

  if (required) {
    throw new Error(
      `Required environment variable '${key}' is not set. Please check your environment configuration.`,
    );
  }

  throw new Error(
    `Environment variable '${key}' is not set and no default value provided.`,
  );
};
