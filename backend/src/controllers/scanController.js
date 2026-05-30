import Scan from '../models/Scan.js';

const generateMockRiskScore = (target, type) => {
  // Mock risk score generation based on URL/email patterns
  let baseScore = Math.random() * 100;

  if (type === 'url') {
    // Check for suspicious URL patterns
    if (target.includes('phishing') || target.includes('fake') || target.includes('verify')) baseScore = 80 + Math.random() * 20;
    if (target.includes('malware') || target.includes('trojan')) baseScore = 90 + Math.random() * 10;
    if (target.includes('trusted') || target.includes('google.com') || target.includes('microsoft.com')) baseScore = Math.random() * 20;
    if (target.includes('github.com') || target.includes('stackoverflow.com')) baseScore = Math.random() * 10;
  } else if (type === 'email') {
    // Check for suspicious email patterns
    if (target.includes('urgent') || target.includes('verify') || target.includes('confirm')) baseScore = 70 + Math.random() * 30;
    if (target.includes('paypal') || target.includes('amazon') || target.includes('apple')) baseScore = 60 + Math.random() * 40;
  }

  return Math.min(100, Math.max(0, baseScore));
};

const getRiskLevel = (score) => {
  if (score < 30) return 'safe';
  if (score < 70) return 'suspicious';
  return 'critical';
};

const generateMockDetails = (target, type, riskScore) => {
  if (type === 'url') {
    return {
      domainAge: Math.floor(Math.random() * 3650) + ' days',
      sslCertificate: riskScore < 50 ? 'Valid' : 'Invalid',
      domainRegistrar: riskScore < 50 ? 'GoDaddy' : 'Unknown',
      pageTitle: riskScore < 50 ? 'Legitimate Site' : 'Suspicious Page',
      pageContent: riskScore < 50 ? 'Standard web content' : 'Phishing keywords detected',
      externalLinks: Math.floor(Math.random() * 50),
      redirects: riskScore > 70 ? Math.floor(Math.random() * 5) + 1 : Math.floor(Math.random() * 2),
    };
  } else {
    return {
      senderDomain: riskScore > 60 ? 'spoofed.com' : 'legitimate.com',
      spfCheck: riskScore > 60 ? 'Failed' : 'Passed',
      dkimCheck: riskScore > 60 ? 'Failed' : 'Passed',
      urgencyKeywords: riskScore > 60 ? ['urgent', 'verify', 'confirm'] : [],
      suspiciousLinks: riskScore > 60 ? Math.floor(Math.random() * 5) : 0,
      attachmentTypes: riskScore > 60 ? ['exe', 'zip'] : [],
    };
  }
};

export const scanURL = async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a URL to scan',
      });
    }

    // Basic URL validation
    try {
      new URL(url);
    } catch {
      return res.status(400).json({
        success: false,
        message: 'Invalid URL format',
      });
    }

    // Check if USE_REAL_APIS is enabled
    const useRealAPIs = process.env.USE_REAL_APIS === 'true';

    let riskScore;
    let details;

    if (useRealAPIs) {
      // TODO: Integrate with VirusTotal API
      // For now, use mock
      riskScore = generateMockRiskScore(url, 'url');
      details = generateMockDetails(url, 'url', riskScore);
    } else {
      riskScore = generateMockRiskScore(url, 'url');
      details = generateMockDetails(url, 'url', riskScore);
    }

    const riskLevel = getRiskLevel(riskScore);

    const scan = await Scan.create({
      userId: req.user.id,
      type: 'url',
      target: url,
      riskScore,
      riskLevel,
      details,
      confidence: 75,
      ipAddress: req.ip,
      userAgent: req.headers['user-agent'],
    });

    res.status(201).json({
      success: true,
      scan: {
        id: scan._id,
        target: scan.target,
        type: scan.type,
        riskScore: scan.riskScore,
        riskLevel: scan.riskLevel,
        details: scan.details,
        confidence: scan.confidence,
        safetyScore: 100 - scan.riskScore,
        createdAt: scan.createdAt,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const scanEmail = async (req, res) => {
  try {
    const { subject, body, sender } = req.body;

    if (!subject || !body || !sender) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email subject, body, and sender',
      });
    }

    // Generate mock risk score based on email content
    const emailContent = `${subject} ${body} ${sender}`.toLowerCase();
    let riskScore = generateMockRiskScore(emailContent, 'email');

    const riskLevel = getRiskLevel(riskScore);
    const details = generateMockDetails(emailContent, 'email', riskScore);

    const scan = await Scan.create({
      userId: req.user.id,
      type: 'email',
      target: sender,
      riskScore,
      riskLevel,
      details: {
        ...details,
        subject,
        sender,
      },
      confidence: 75,
      ipAddress: req.ip,
      userAgent: req.headers['user-agent'],
    });

    res.status(201).json({
      success: true,
      scan: {
        id: scan._id,
        target: scan.target,
        type: scan.type,
        riskScore: scan.riskScore,
        riskLevel: scan.riskLevel,
        details: scan.details,
        confidence: scan.confidence,
        phishingLikelihood: Math.round(riskScore),
        createdAt: scan.createdAt,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getScanHistory = async (req, res) => {
  try {
    const { limit = 10, skip = 0 } = req.query;
    const parsedLimit = Math.min(parseInt(limit) || 10, 100);
    const parsedSkip = parseInt(skip) || 0;

    const scans = await Scan.find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .limit(parsedLimit)
      .skip(parsedSkip);

    const total = await Scan.countDocuments({ userId: req.user.id });

    res.status(200).json({
      success: true,
      scans: scans.map((scan) => ({
        id: scan._id,
        target: scan.target,
        type: scan.type,
        riskScore: scan.riskScore,
        riskLevel: scan.riskLevel,
        safetyScore: 100 - scan.riskScore,
        confidence: scan.confidence,
        createdAt: scan.createdAt,
      })),
      total,
      limit: parsedLimit,
      skip: parsedSkip,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
