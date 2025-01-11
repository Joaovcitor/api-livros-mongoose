export const idMissing = (req, res, next) => {
  if (!req.params.id) {
    return res.status(400).json({ errors: 'ID faltando!' });
  }

  nest();
};
