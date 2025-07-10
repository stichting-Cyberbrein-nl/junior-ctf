import { codes } from '../../../codes'; // Importeer je bestaande codes

export default function handler(req, res) {
  const { codeId } = req.query; // Haal de codeId uit de URL-parameters
  const code = codes.find((item) => item.id === parseInt(codeId, 10));

  if (code) {
    res.status(200).json(code);
  } else {
    res.status(404).json({ message: 'flag 5: byqrbibr Code niet gevonden' });
  }
}
