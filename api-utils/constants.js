export const SERVER = {
  STATUS: {
    SUCCESS: "Success",
    FAILURE: "Failure",
    ALIVE: "Alive",
  },
  FAUNA_ERRORS: {
    NOT_UNIQUE: "document is not unique.",
  },
  URL: {
    DOMAIN:
      process.env.NODE_ENV !== "production"
        ? "https://localhost:3000"
        : "https://modest-cori-434d1e.netlify.app",
  },
  HEADERS: {
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTION",
  },
};

export const USER = {
  ACCESS_LEVELS: {
    STUDENT: "Student",
    ADMIN: "Administrator",
    ROOT: "Root",
  },
  STATUS: {
    PENDING: "Pending",
    APPROVED: "Approved",
    REJECTED: "Rejected",
  },
  USER_ERRORS: {
    NO_CODE: "User has does not a verification code",
    ALREADY_VERIFIED: "User has already verified their account",
    NO_CODE_UNVERIFIED: "Generated new code, check email to obtain it",
    USER_DOES_NOT_EXIST:
      "No user with the supplied email exists in the database",
    CODE_DOES_NOT_MATCH: "The code you entered is not correct",
    USER_NOT_APPROVED: "User has not approved to login",
    USER_NOT_VERIFIED: "User has not verified their email",
    USER_NOT_UNIQUE: "Email already exists",
    NO_UNAPPROVED_USERS: "All users are approved",
    REJECTED_USER: "Users account has been rejected",
  },
};
