module.exports.validateTaskPayload = (req, res, next) => {
  const taskPayload = req.body;
  if (
    taskPayload.hasOwnProperty("title") &&
    taskPayload.hasOwnProperty("description") &&
    taskPayload.hasOwnProperty("status") &&
    taskPayload.hasOwnProperty("priority")
  ) {
    return next();
  }
  return res.status(400).json({
    success: false,
    message: 'title, description, status and priority is required'
  })
};
