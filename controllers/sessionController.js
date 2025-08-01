const Session = require("../models/Session");

exports.getPublicSessions = async (req, res) => {
  try {
    const sessions = await Session.find({ status: "published" });
    res.json(sessions);
  } catch (err) {
    console.error("Error fetching public sessions:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getMySessions = async (req, res) => {
  try {
    const sessions = await Session.find({ user_id: req.user.userId });
    res.json(sessions);
  } catch (err) {
    console.error("Error fetching user sessions:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getMySessionById = async (req, res) => {
  try {
    const session = await Session.findOne({
      _id: req.params.id,
      user_id: req.user.userId,
    });
    if (!session) return res.status(404).json({ message: "Session not found" });
    res.json(session);
  } catch (err) {
    console.error("Error fetching session by ID:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.saveDraft = async (req, res) => {
  try {
    const { sessionId, title, tags, json_file_url } = req.body;
    const user_id = req.user.userId;

    let session = null;

    if (sessionId) {
      session = await Session.findOneAndUpdate(
        { _id: sessionId, user_id },
        {
          title,
          tags,
          json_file_url,
          status: "draft",
          updated_at: new Date(),
        },
        { new: true }
      );
    }

    if (!session) {
      session = await Session.create({
        title,
        tags,
        json_file_url,
        status: "draft",
        user_id,
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    res.status(200).json(session);
  } catch (err) {
    console.error("Error saving draft:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.publishSession = async (req, res) => {
  try {
    const { sessionId } = req.body;

    const session = await Session.findOneAndUpdate(
      { _id: sessionId, user_id: req.user.userId },
      { status: "published", updated_at: new Date() },
      { new: true }
    );

    if (!session) return res.status(404).json({ message: "Session not found" });

    res.status(200).json(session);
  } catch (err) {
    console.error("Error publishing session:", err);
    res.status(500).json({ message: "Server error" });
  }
};
