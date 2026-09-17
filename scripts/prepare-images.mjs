import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
const rows=(await fs.readFile('assets/property/manifest.csv','utf8')).trim().split('\n').slice(1);
const photos=JSON.parse(await fs.readFile('src/content/photos.json','utf8'));
await fs.mkdir('public/photos',{recursive:true});
for(const row of rows){const [order,,category,filename]=row.split(',');const source=path.join('assets/property',category,filename);const photo=photos[Number(order)-1];if(!photo)throw new Error(`Missing photo ${order}`);await sharp(source).webp({quality:88,effort:6}).toFile(path.join('public',photo.src));}
const [, ,category,filename]=rows[77].split(',');
await sharp(path.join('assets/property',category,filename)).resize(1200,800).extract({left:0,top:70,width:1200,height:630}).jpeg({quality:90}).toFile('public/social.jpg');
console.log(`Prepared ${photos.length} local photographs and social image.`);
