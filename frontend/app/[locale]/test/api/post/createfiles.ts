import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { pid } = req.query
    res.end(`Post: ${pid}`)
}

// export default (req: NextApiRequest, res: NextApiResponse) => {
//     console.log('req', req)
//
//     // const data = { /* Vos données JSON */ };
//     // const fileName = 'sampleJSON.json';
//     // const filePath = path.join(process.cwd(), 'public', 'json', fileName);
//
//     // fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
//
//     res.status(200).json({ success: true, message: 'Fichier créé avec succès.' });
// };
