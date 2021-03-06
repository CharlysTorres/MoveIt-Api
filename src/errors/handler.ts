import { ErrorRequestHandler } from 'express'
import { ValidationError } from 'yup';

interface ValidationErrors {
  [key: string]: string[];
}

const errorHandler: ErrorRequestHandler = (error, request, response, next) => {
  if(error instanceof Error) {
    return response.status(400).json({
      error: error.message
    })
  }

  return response.status(500).json({
    status: "error",
    message: "Internal Server Error!!! 😩"
  })
}

// const errorHandler: ErrorRequestHandler = (error, request, response, next) => {
//   if(error instanceof ValidationError) {
//     let errors: ValidationErrors = {};

//     error.inner.forEach(err => {
//         errors[err.value] = err.errors;
//     });

//     return response.status(400).json({ message: 'Validations fails', errors });
//   }

//   console.error(error);

//   return response.status(500).json({ message: 'Internal server Error!!! 😩' })
// };

export default errorHandler;