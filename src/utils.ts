export const handlePrintErrors = (errorCode: string) => {
  switch (errorCode) {
    case "auth/invalid-email":
      return "Invalid email";
      break;
    case "auth/email-already-in-use":
      return "Email already in use";
      break;
    case "auth/weak-password":
      return "Weak password";
      break;
    case "auth/missing-email":
      return "Email required";
      break;
    case "auth/missing-password":
      return "Password required";
      break;
    case "auth/wrong-password":
      return "Wrong password";
      break;
    case "auth/invalid-login-credentials":
      return "Wrong password or email";
      break;
    case "auth/user-not-found":
      return "User not found";
      break;
    case "auth/invalid-verification-code":
      return "Invalid verification code";
      break;
    default:
      return "Something went wrong";
      break;
  }
};
