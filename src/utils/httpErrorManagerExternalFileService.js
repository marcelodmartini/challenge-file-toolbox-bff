/* eslint-disable no-useless-constructor */
class httpErrorManagerExternalFileService {
  constructor () {
  }

  createHttpError (error) {
    if (error.response) {
      const { status, data } = error.response
      const message = data && data.message ? data.message : 'Unknown error occurred message.'
      const details = data && data.details ? data.details : 'Unknown error occurred details.'
      return {
        status,
        message,
        details
      }
    } else if (error.request) {
      return {
        status: 503,
        message: 'Service unavailable.',
        details: 'Service unavailable.'
      }
    } else {
      return {
        status: 500,
        message: 'Internal server error.',
        details: 'Internal server error.'
      }
    }
  }
}

export default httpErrorManagerExternalFileService
