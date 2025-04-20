const extractErrors = (error) => {
  if (error && error.response && error.response.data) {
    const response = error.response.data
    return {
      message: response.message || 'An error occurred. Please try again.',
      errors: response.errors || {},
    }
  }
  return {
    message: 'An unexpected error occurred. Please try again later.',
    errors: {},
  }
}

export default extractErrors
