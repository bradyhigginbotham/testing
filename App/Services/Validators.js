const validateStrongPassword = value => {
  if (!value) {
    return 'Your password is required.';
  }

  if (value.length < 8) {
    return 'Your password must be at least 8 characters.';
  }

  if (!value.match(/[A-Z]/)) {
    return 'Your password must have an capital letter.';
  }

  if (!value.match(/[0-9]/)) {
    return 'Your password must have a number.';
  }

  return undefined;
};

export default {
  validateStrongPassword,
};
