const error = { message: 'Запрашиваемый ресурс не найден' };

const notFound = (req, res) => {
  res.status(404).send(error);
};

module.exports = notFound;
