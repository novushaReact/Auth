import Session from '../models/Session.mjs';
import { sendFraudAlertEmail } from '../utils/emailService.mjs';

const fraudDetection = async (req, res, next) => {
  try {
    const { username } = req.body;
    const ip = req.ip || req.connection.remoteAddress;
    const userAgent = req.headers['user-agent'];

    // 1. Get the user's last session (if exists)
    const lastSession = await Session.findOne({ username }).sort({ loginAt: -1 });

    if (lastSession) {
      const timeDiff = Date.now() - new Date(lastSession.loginAt).getTime();
      const hoursDiff = timeDiff / (1000 * 60 * 60); // Convert to hours

      // 2. Get location from IP (using ipapi.co or similar service)
      const locationResponse = await fetch(`https://ipapi.co/${ip}/json/`);
      const locationData = await locationResponse.json();
      const currentLocation = `${locationData.city}, ${locationData.country}`;

      // 3. Check for impossible travel
      if (
        hoursDiff < 2 && // Less than 2 hours since last login
        lastSession.location !== currentLocation // Different location
      ) {
        console.log(`Impossible travel detected: ${lastSession.location} → ${currentLocation}`);

        // 4. Flag as suspicious
        req.isSuspicious = true;
        req.suspiciousDetails = {
          username,
          lastLocation: lastSession.location,
          currentLocation,
          lastLogin: lastSession.loginAt,
        };

        // 5. Send email alert to admin
        await sendFraudAlertEmail(username, currentLocation);
      }
    }

    next();
  } catch (err) {
    console.error('Fraud detection error:', err);
    next(err);
  }
};

export default fraudDetection;
