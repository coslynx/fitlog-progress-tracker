const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";
const JWT_SECRET_KEY = process.env.JWT_SECRET || "thisIsARandomSecretKeyForJWTWhichIsLongEnough";
const LOCAL_STORAGE_TOKEN_KEY = "token";
const DEFAULT_ERROR_MESSAGE = "Something went wrong, please try again later.";
const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_REGEX = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+{}\\[\\]:;<>,.?~\\\\/-]).{8,}$";
const VALID_DATE_FORMAT = "YYYY-MM-DD";

export {
    API_BASE_URL,
    JWT_SECRET_KEY,
    LOCAL_STORAGE_TOKEN_KEY,
    DEFAULT_ERROR_MESSAGE,
    PASSWORD_MIN_LENGTH,
    PASSWORD_REGEX,
    VALID_DATE_FORMAT
};