const errorHandler = (err, req, res, next) => {
    
    console.error(err);
  
    let statusCode = 500;
    let errorMessage = 'Internal Server Error';
  
    if (err.name === 'SequelizeValidationError') {
      statusCode = 400; // Bad Request
      errorMessage = 'Validation error. Please check your input.';
    }
  
    res.status(statusCode).json({ error: errorMessage });
  };
  
  module.exports = errorHandler;
  