export const ERROR_MESSAGES = {
  INVALID_REQUEST: 'Invalid request. Please check your request parameters.',
  UNAUTHORIZED_ACCESS:
    'Unauthorized access. You do not have the required permissions.',
  RESOURCE_NOT_FOUND: 'The requested resource was not found.',
  DUPLICATE_ENTRY: 'Duplicate entry. The resource already exists.',
  INTERNAL_SERVER_ERROR: 'Internal server error. Please try again later.',
  INVALID_TOKEN:
    'Invalid or expired authentication token. Please log in again.',
  MISSING_TOKEN: 'Missing authentication token. Please log in first.',
  RATE_LIMIT_EXCEEDED:
    'Rate limit exceeded. Too many requests. Please try again later.',
  BAD_REQUEST: 'Bad request. The server could not understand the request.',
  FORBIDDEN: 'Forbidden. You do not have permission to access this resource.',
  METHOD_NOT_ALLOWED:
    'Method not allowed. The requested method is not supported for this resource.',
  UNPROCESSABLE_ENTITY:
    'Unprocessable entity. The server understands the request but cannot process it.',
  NOT_ACCEPTABLE:
    'Not acceptable. The server cannot generate a response that the client will accept.',
  UNSUPPORTED_MEDIA_TYPE:
    'Unsupported media type. The server does not support the request media type.',
  NOT_IMPLEMENTED:
    'Not implemented. The server does not support the requested feature.',
  SERVICE_UNAVAILABLE:
    'Service unavailable. The server is currently unavailable.',
  NETWORK_ERROR: 'Network error. There was a problem connecting to the server.',
  DATABASE_ERROR:
    'Database error. There was an issue with the database operation.',
  TIMEOUT_ERROR:
    'Timeout error. The request timed out before the server could respond.',
  TOO_MANY_REQUESTS:
    'Too many requests. The server is receiving more requests than it can handle.',
  INVALID_CREDENTIALS:
    'Invalid credentials. Please check your username and password.',
  ACCOUNT_LOCKED:
    'Account locked. Your account has been locked due to multiple failed login attempts.',
  UNKNOWN_ERROR: 'An unknown error occurred. Please try again later.',
  CONNECTION_ERROR:
    'Connection error. There was a problem establishing a connection.',
  SERVER_TIMEOUT: 'Server timeout. The server took too long to respond.',
  UNEXPECTED_RESPONSE: 'Unexpected response from the server.',
  SERVICE_DOWN: 'Service is down. Please try again later.',
  MAINTENANCE_MODE:
    'Service is currently undergoing maintenance. Please try again later.',
  DATA_NOT_FOUND: 'Data not found for the requested resource.',
  INVALID_INPUT: 'Invalid input. Please check your input data.',
  AUTHENTICATION_ERROR: 'Authentication error. Please check your credentials.',
  PERMISSION_DENIED:
    'Permission denied. You do not have sufficient permissions.',
  RESOURCE_CONFLICT:
    'Resource conflict. The request conflicts with another resource.',
  OPERATION_FAILED:
    'Operation failed. The requested operation could not be completed.',
  INVALID_OPERATION:
    'Invalid operation. The requested operation is not supported.',
  TOO_LARGE_REQUEST:
    'Request entity too large. Please reduce the request size.',
  SERVER_OVERLOAD: 'Server overload. The server is experiencing high load.',
};
