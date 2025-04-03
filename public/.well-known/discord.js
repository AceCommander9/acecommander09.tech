export default function handler(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.status(200).send('Your custom content here');
}
