import Report from '../models/Report.js';

export const submitReport = async (req, res) => {
  try {
    const { url, reportType, threatLevel, description, evidence, discoveryMethod } = req.body;

    if (!url || !reportType || !description) {
      return res.status(400).json({
        success: false,
        message: 'Please provide url, reportType, and description',
      });
    }

    // Validate URL format
    try {
      new URL(url);
    } catch {
      return res.status(400).json({
        success: false,
        message: 'Invalid URL format',
      });
    }

    const report = await Report.create({
      userId: req.user.id,
      url,
      reportType,
      threatLevel: threatLevel || 'medium',
      description,
      evidence: evidence || '',
      discoveryMethod: discoveryMethod || 'other',
      status: 'pending',
    });

    res.status(201).json({
      success: true,
      report: {
        id: report._id,
        url: report.url,
        reportType: report.reportType,
        threatLevel: report.threatLevel,
        status: report.status,
        createdAt: report.createdAt,
      },
      ticketId: report._id,
      message: 'Report submitted successfully',
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getReports = async (req, res) => {
  try {
    const { limit = 20, skip = 0, reportType, threatLevel, status } = req.query;
    const parsedLimit = Math.min(parseInt(limit) || 20, 100);
    const parsedSkip = parseInt(skip) || 0;

    // Build filter
    const filter = {};
    if (reportType) filter.reportType = reportType;
    if (threatLevel) filter.threatLevel = threatLevel;
    if (status) filter.status = status;

    const reports = await Report.find(filter)
      .sort({ createdAt: -1 })
      .limit(parsedLimit)
      .skip(parsedSkip)
      .lean();

    const total = await Report.countDocuments(filter);

    res.status(200).json({
      success: true,
      reports: reports.map((report) => ({
        id: report._id,
        url: report.url,
        reportType: report.reportType,
        threatLevel: report.threatLevel,
        status: report.status,
        upvotes: report.upvotes,
        reportedBy: report.reportedBy,
        createdAt: report.createdAt,
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

export const getReportById = async (req, res) => {
  try {
    const { id } = req.params;

    const report = await Report.findById(id);

    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Report not found',
      });
    }

    // Find related reports (same URL)
    const relatedReports = await Report.find({
      url: report.url,
      _id: { $ne: id },
    })
      .limit(5)
      .lean();

    res.status(200).json({
      success: true,
      report: {
        id: report._id,
        url: report.url,
        reportType: report.reportType,
        threatLevel: report.threatLevel,
        description: report.description,
        evidence: report.evidence,
        discoveryMethod: report.discoveryMethod,
        status: report.status,
        upvotes: report.upvotes,
        reportedBy: report.reportedBy,
        createdAt: report.createdAt,
      },
      relatedReports: relatedReports.map((r) => ({
        id: r._id,
        url: r.url,
        reportType: r.reportType,
        threatLevel: r.threatLevel,
        upvotes: r.upvotes,
        createdAt: r.createdAt,
      })),
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateReport = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, adminNotes } = req.body;

    // Check if user is admin (simplified - would need admin role in real app)
    // For now, only allow updating own reports
    const report = await Report.findByIdAndUpdate(
      id,
      { status: status || undefined },
      { new: true, runValidators: true }
    );

    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Report not found',
      });
    }

    res.status(200).json({
      success: true,
      report: {
        id: report._id,
        url: report.url,
        reportType: report.reportType,
        status: report.status,
        updatedAt: report.updatedAt,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const upvoteReport = async (req, res) => {
  try {
    const { id } = req.params;

    const report = await Report.findByIdAndUpdate(
      id,
      { $inc: { upvotes: 1 } },
      { new: true }
    );

    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Report not found',
      });
    }

    res.status(200).json({
      success: true,
      upvotes: report.upvotes,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
