const setMessage = (req, res, next) => {
    if (req.session.pendingMessage) {  // check if there is a pending message in the session
      res.locals.message = req.session.pendingMessage;   // if there is, set it as a local variable to be rendered in the view
    } else {
      res.locals.message = "";  // if there is no pending message, set the local variable to an empty string
    }
    req.session.pendingMessage = "";  // reset the pending message in the session
    next();  // call the next middleware function
  };
  
  module.exports = setMessage;