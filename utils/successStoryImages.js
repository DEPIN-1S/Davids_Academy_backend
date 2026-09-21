const fs = require('fs');
const path = require('path');
const http = require('http');
const https = require('https');
const logger = require('./logger');

const uploadsDir = path.join(__dirname, '../public/uploads/successimage');

const remoteUploadsBase = () =>
  (
    process.env.PUBLIC_UPLOADS_BASE_URL ||
    (process.env.NODE_ENV === 'local' ? 'https://api.davids-academy.com' : '')
  ).replace(/\/$/, '');

const remoteImageExists = (url) =>
  new Promise((resolve) => {
    try {
      const client = url.startsWith('https') ? https : http;
      const req = client.request(url, { method: 'HEAD', timeout: 2500 }, (res) => {
        resolve(res.statusCode >= 200 && res.statusCode < 400);
        res.resume();
      });
      req.on('error', () => resolve(false));
      req.on('timeout', () => {
        req.destroy();
        resolve(false);
      });
      req.end();
    } catch (error) {
      resolve(false);
    }
  });

const attachValidStoryImages = async (stories = []) => {
  const base = remoteUploadsBase();

  const mapped = await Promise.all(
    stories.map(async (story) => {
      const relativeUrl = `/uploads/successimage/${story.image}`;
      const filePath = path.join(uploadsDir, story.image);
      if (fs.existsSync(filePath)) {
        return { ...story, imageUrl: relativeUrl };
      }

      if (!base) {
        logger.warn('Success story image missing on disk', {
          id: story.id,
          image: story.image,
        });
        return null;
      }

      const remoteUrl = `${base}${relativeUrl}`;
      const existsRemotely = await remoteImageExists(remoteUrl);
      if (!existsRemotely) {
        logger.warn('Success story image missing locally and remotely', {
          id: story.id,
          image: story.image,
        });
        return null;
      }

      return { ...story, imageUrl: remoteUrl };
    })
  );

  return mapped.filter(Boolean);
};

module.exports = { attachValidStoryImages };
